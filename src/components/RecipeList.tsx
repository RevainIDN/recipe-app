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
	const [userText, setUserText] = useState<string>('');

	const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value;
		setUserText(value);
	}

	const lastRecipeIndex = currentPage * recipesPerPage;
	const firstRecipeIndex = lastRecipeIndex - recipesPerPage;
	if (!foodByCategory?.meals || foodByCategory.meals.length === 0) {
		return <p>No recipes available.</p>;
	}
	const filteredRepice = [...foodByCategory.meals]
		.filter((repice) => {
			const matchesText = repice.strMeal.toLowerCase().includes(userText.toLowerCase());
			return matchesText;
		})
	const currentCountry = filteredRepice.slice(firstRecipeIndex, lastRecipeIndex);
	const paginate = (pageNumber: number) => setCurrentPage(pageNumber)


	return (
		<div className='recipe-cont'>
			<Filter
				handleInput={handleInput}
			/>
			<ul className='recipe-list'>
				{currentCountry && currentCountry.length > 0 ? (
					currentCountry.map(meal => (
						<li key={meal.idMeal} className='recipe-item'>
							<img className='recipe-img' src={meal.strMealThumb} alt="Meal Image" />
							<p className='recipe-title'>{meal.strMeal}</p>
						</li>
					))
				) : (
					<div className='not-found-meals'>Categories were not found</div>
				)}
			</ul>
			<Pagination
				currentPage={currentPage}
				recipesPerPage={recipesPerPage}
				filteredRepice={filteredRepice}
				paginate={paginate}
			/>
		</div>
	)
}