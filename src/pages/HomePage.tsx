import '../styles/page_styles/HomePage.css'
import RecipeCategories from '../components/RecipeCategories'
import RecipeList from '../components/RecipeList'
import { MealCategory } from '../types'

interface HomePageProps {
	mealCategoriesList: MealCategory | null,
}

export default function HomePage({ mealCategoriesList }: HomePageProps) {
	return (
		<>
			<div className='bg-images-cont'>
				<img className='bg-image' src="hero-image.jpg" alt="background image" />
				<img className='bg-extra-image' src="hero-text.png" alt="" />
			</div>
			<div className='home-content'>
				<RecipeCategories
					mealCategoriesList={mealCategoriesList}
				/>
				<RecipeList />
			</div>
		</>
	)
}