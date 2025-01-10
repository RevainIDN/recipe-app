import '../styles/page_styles/HomePage.css'
import { useState, useEffect } from 'react'
import RecipeCategories from '../components/RecipeCategories'
import RecipeList from '../components/RecipeList'
import { MealCategory, FoodByCategory } from '../types'

interface HomePageProps {
	mealCategoriesList: MealCategory | null,
}

export default function HomePage({ mealCategoriesList }: HomePageProps) {
	const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
	const [foodByCategory, setFoodByCategory] = useState<FoodByCategory | null>(null);

	return (
		<>
			<div className='bg-images-cont'>
				<img className='bg-image' src="hero-image.jpg" alt="background image" />
				<img className='bg-extra-image' src="hero-text.png" alt="" />
			</div>
			<div className='home-content'>
				<RecipeCategories
					mealCategoriesList={mealCategoriesList}
					selectedCategory={selectedCategory}
					setSelectedCategory={setSelectedCategory}
					setFoodByCategory={setFoodByCategory}
				/>
				<RecipeList
					foodByCategory={foodByCategory}
				/>
			</div>
		</>
	)
}