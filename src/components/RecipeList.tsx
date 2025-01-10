import '../styles/component_styles/RecipeList.css'
import { useState } from 'react';
import { FoodByCategory } from '../types'
import Filter from './Filter';
import Pagination from './pagination'

interface RecipeListProps {
	foodByCategory: FoodByCategory | null,
}

export default function RecipeList({ foodByCategory }: RecipeListProps) {
	const [recipesPerPage] = useState(9);
	const [currentPage, setCurrentPage] = useState<number>(1);
	console.log('RecipeList foodByCategory:', foodByCategory);
	const lastRecipeIndex = currentPage * recipesPerPage;
	const firstRecipeIndex = lastRecipeIndex - recipesPerPage;
	if (!foodByCategory?.meals || foodByCategory.meals.length === 0) {
		return <p>No recipes available.</p>;
	}
	const currentCountry = foodByCategory?.meals.slice(firstRecipeIndex, lastRecipeIndex);

	const paginate = (pageNumber: number) => setCurrentPage(pageNumber)

	return (
		<div className='recipe-cont'>
			<Filter />
			<ul className='recipe-list'>
				{currentCountry && currentCountry.length > 0 ? (
					currentCountry.map(meal => (
						<li key={meal.idMeal} className='recipe-item'>
							<img className='recipe-img' src={meal.strMealThumb} alt="Meal Image" />
							<p className='recipe-title'>{meal.strMeal}</p>
						</li>
					))
				) : (
					<p>Categories were not found</p>
				)}
			</ul>
			<Pagination
				currentPage={currentPage}
				recipesPerPage={recipesPerPage}
				foodByCategory={foodByCategory}
				paginate={paginate}
			/>
		</div>
	)
}