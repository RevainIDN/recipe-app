import { useState, useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import './App.css'
import HomePage from './pages/HomePage'
import RecipePage from './pages/RecipePage'
import NotFoundPage from './pages/NotFoundPage'
import { MealCategory, FoodByCategory } from './types'

export default function App() {
  const [mealCategoriesList, setMealCategoriesList] = useState<MealCategory | null>(null);
  const [foodByCategory, setFoodByCategory] = useState<FoodByCategory | null>(null);

  useEffect(() => {
    console.log('App: foodByCategory', foodByCategory);
  }, [foodByCategory]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const cachedCategories = localStorage.getItem('categoriesData');
        const cachedFood = localStorage.getItem('foodData');

        if (cachedCategories && cachedFood) {
          setMealCategoriesList(JSON.parse(cachedCategories));
          setFoodByCategory(JSON.parse(cachedFood));
          return;
        }

        const [categoriesResponse, foodResponse] = await Promise.all([
          fetch('https://www.themealdb.com/api/json/v1/1/categories.php'),
          fetch('https://www.themealdb.com/api/json/v1/1/filter.php?c=Beef')
        ]);

        if (!categoriesResponse.ok || !foodResponse.ok) {
          throw new Error('Error loading data from server');
        }

        const categoriesData = await categoriesResponse.json();
        const foodData = await foodResponse.json();
        console.log(foodData);

        setMealCategoriesList(categoriesData);
        localStorage.setItem('categoriesData', JSON.stringify(categoriesData));

        setFoodByCategory(foodData);
        localStorage.setItem('foodData', JSON.stringify(foodData));
      } catch (error) {
        console.error('Error loading data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <Routes>
      <Route path='/' element={<HomePage
        mealCategoriesList={mealCategoriesList}
        foodByCategory={foodByCategory}
        setFoodByCategory={setFoodByCategory}
      />} />
      <Route path='/Recipe' element={<RecipePage />} />
      <Route path='*' element={<NotFoundPage />} />
    </Routes>
  )
}
