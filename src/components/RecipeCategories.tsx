import '../styles/component_styles/RecipeCategories.css'
import { MealCategory } from '../types'

interface RecipeCategoriesProps {
	mealCategoriesList: MealCategory | null,
}

export default function RecipeCategories({ mealCategoriesList }: RecipeCategoriesProps) {
	return (
		<div className='categories-cont'>
			<h1 className='categories-title'>Categories</h1>
			<ul className='categories-list'>
				{mealCategoriesList ? (
					mealCategoriesList.categories.map(mealCategory => (
						<li key={mealCategory.idCategory} className='categories-item'><img className='categories-img' src={mealCategory.strCategoryThumb} alt="Meal Logo" />{mealCategory.strCategory}</li>
					))
				) : (
					<p>Categories were not found</p>
				)}
			</ul>
		</div>
	)
}