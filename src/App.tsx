import { useState, useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import './App.css'
import HomePage from './pages/HomePage'
import RecipePage from './pages/RecipePage'
import NotFoundPage from './pages/NotFoundPage'
import { MealCategories } from './types'

export default function App() {
  const [mealCategoriesList, setMealCategoriesList] = useState<MealCategories | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const cachedData = localStorage.getItem('mealData')
        if (cachedData) {
          setMealCategoriesList(JSON.parse(cachedData));
        } else {
          try {
            const response = await fetch('https://www.themealdb.com/api/json/v1/1/categories.php');
            const data = await response.json();
            setMealCategoriesList(data);
            localStorage.setItem('mealData', JSON.stringify(data));
          } catch (error) {
            console.error('Ошибка при загрузке данных:', error)
          }
        }
      } catch (error) {
        console.error('Error reading data from localStorage:', error);
      }
    };

    fetchData();
  }, []);
  console.log(mealCategoriesList);

  return (
    <Routes>
      <Route path='/' element={<HomePage
        mealCategoriesList={mealCategoriesList}
      />} />
      <Route path='/Recipe' element={<RecipePage />} />
      <Route path='*' element={<NotFoundPage />} />
    </Routes>
  )
}
