import '../styles/component_styles/RecipeList.css'
import { useState } from 'react';
import { FoodByCategory, FoodByCategories } from '../types'
import { useNavigate } from 'react-router-dom';
import Filter from './Filter'
import Pagination from './Pagination'

interface RecipeListProps {
	foodByCategory: FoodByCategory | null,
}

export default function RecipeList({ foodByCategory }: RecipeListProps) {
	const [recipesPerPage] = useState(9);
	const [currentPage, setCurrentPage] = useState<number>(1);
	const [userText, setUserText] = useState<string>('');
	const [userSort, setUserSort] = useState<string | null>('Name');

	const navigate = useNavigate();

	const handleRecipeClick = (recipeId: string) => {
		navigate(`/recipe/${recipeId}`);
	};

	const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value;
		setUserText(value);
	};

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
		.sort((a: FoodByCategories, b: FoodByCategories) => {
			if (userSort === 'Id') {
				return a.idMeal.localeCompare(b.idMeal);
			}
			if (userSort === 'Name') {
				return a.strMeal.localeCompare(b.strMeal);
			}
			if (userSort === 'All') {
				return 0;
			}
			return 0;
		})
	const currentRecipe = filteredRepice.slice(firstRecipeIndex, lastRecipeIndex);
	const paginate = (pageNumber: number) => setCurrentPage(pageNumber)


	return (
		<div className='recipe-cont'>
			<Filter
				handleInput={handleInput}
				userSort={userSort}
				setUserSort={setUserSort}
			/>
			<ul className='recipe-list'>
				{currentRecipe && currentRecipe.length > 0 ? (
					currentRecipe.map(meal => (
						<li key={meal.idMeal} data-recipe-id={meal.idMeal} className='recipe-item' onClick={() => handleRecipeClick(meal.idMeal)}>
							<img className='recipe-img' src={meal.strMealThumb} alt="Meal Image" />
							<p className='recipe-title'>{meal.strMeal}</p>
						</li>
					))
				) : (
					<div className='not-found-meals'>Categories were not found</div>
				)}
			</ul>
			{currentRecipe.length >= 9 ? (
				<Pagination
					currentPage={currentPage}
					recipesPerPage={recipesPerPage}
					filteredRepice={filteredRepice}
					paginate={paginate}
				/>
			) : (
				null
			)}

		</div>
	)
}