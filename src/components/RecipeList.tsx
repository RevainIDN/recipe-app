import '../styles/component_styles/RecipeList.css'
import { useState } from 'react';
import { FoodByCategory } from '../types'
import Pagination from './pagination'

interface RecipeListProps {
	foodByCategory: FoodByCategory | null,
}

export default function RecipeList({ foodByCategory }: RecipeListProps) {
	const [recipesPerPage] = useState(9);
	const [currentPage, setCurrentPage] = useState<number>(1);

	const lastRecipeIndex = currentPage * recipesPerPage;
	const firstRecipeIndex = lastRecipeIndex - recipesPerPage;
	if (!foodByCategory?.meals) {
		return;
	}
	const currentCountry = foodByCategory?.meals.slice(firstRecipeIndex, lastRecipeIndex);

	const paginate = (pageNumber: number) => setCurrentPage(pageNumber)

	return (
		<div className='recipe-cont'>
			<div className='recipe-filters-cont'>
				<div className='recipe-input-cont'>
					<input className='recipe-input' type="text" placeholder='Search recipes and more...' />
					<img className='recipe-input-img' src="Search.svg" alt="Search" />
				</div>
				<div className='recipe-btn-cont'>
					<button className='recipe-btn'>Sort by: <strong>Name</strong></button>
					<img className='recipe-btn-img' src="Expand_down.svg" alt="Arrow down" />
				</div>
			</div>
			<ul className='recipe-list'>
				{currentCountry ? (
					Array.isArray(currentCountry) && currentCountry.map(meal => (
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