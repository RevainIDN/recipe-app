import '../styles/page_styles/HomePage.css'
import bgImg from '/hero-image.jpg'
import bgExtraImg from '/hero-text.png'
import { useState } from 'react'
import RecipeCategories from '../components/RecipeCategories'
import RecipeList from '../components/RecipeList'
import { MealCategory, FoodByCategory } from '../types'

interface HomePageProps {
	mealCategoriesList: MealCategory | null,
	foodByCategory: FoodByCategory | null,
	setFoodByCategory: React.Dispatch<React.SetStateAction<FoodByCategory | null>>,
}

export default function HomePage({ mealCategoriesList, foodByCategory, setFoodByCategory }: HomePageProps) {
	const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

	return (
		<>
			<div className='bg-images-cont'>
				<img className='bg-image' src={bgImg} alt="background image" />
				<img className='bg-extra-image' src={bgExtraImg} alt="" />
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