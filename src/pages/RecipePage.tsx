import '../styles/page_styles/RecipePage.css'
import logo from '/logo-light.svg'
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Recipe } from '../types';

export default function RecipePage() {
	const { recipeName } = useParams();
	const [recipeData, setRecipeData] = useState<Recipe | null>(null);
	console.log(recipeData);

	const navigate = useNavigate();

	useEffect(() => {
		const fetchRecipe = async () => {
			try {
				const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${recipeName}`);
				const dataRecipe = await response.json();
				const recipe = dataRecipe.meals[0];

				const ingredients = [];
				const measures = [];

				for (let i = 1; i <= 20; i++) {
					const ingredient = recipe[`strIngredient${i}`];
					const measure = recipe[`strMeasure${i}`];
					if (ingredient && ingredient.trim() !== "") {
						ingredients.push(ingredient);
						measures.push(measure || "");
					}
					delete recipe[`strIngredient${i}`];
					delete recipe[`strMeasure${i}`];
				}

				const formattedRecipe = {
					...recipe,
					strIngredients: ingredients,
					strMeasures: measures,
				};

				setRecipeData(formattedRecipe);
			} catch (error) {
				console.error('Error loading data:', error);
			}
		}

		if (recipeName) {
			fetchRecipe();
		}
	}, [recipeName])

	const handleClickHomePage = () => {
		navigate('/');
	};

	return (
		<div className='recipe-page'>
			<header className='recipe-header'>
				<img className='recipe-logo' src={logo} alt="HomeChef" />
				<button className='recipe-back-btn' onClick={handleClickHomePage}>Back to categories</button>
			</header>
			<div className='recipe-info'>
				<img className='recipe-fullsize-img' src={recipeData?.strMealThumb} alt="Meal Image" />
				<h1 className='recipe-name'>{recipeData?.strMeal}</h1>
				<div className='recipe-add-info-cont'>
					<p className='recipe-add-info'>category: <strong>{recipeData?.strCategory}</strong></p>
					<p className='recipe-add-info'>area: <strong>{recipeData?.strArea}</strong></p>
				</div>
				<ul className='ingredients-list'>
					<li className='ingredients-title'><strong>Ingredients</strong></li>
					{recipeData?.strIngredients ? (
						recipeData.strIngredients.map((ingredient, index) => (
							<li key={index} className='ingredient-item'> {recipeData.strMeasures[index]} {ingredient}</li>
						))
					) : (
						<p>There are no ingredients in this recipe.</p>
					)}
				</ul>
				<div className='instruction-cont'>
					<p className='instruction-title'><strong>Instructions</strong></p>
					{recipeData?.strIngredients ? (
						recipeData.strInstructions.split('\n').map((step, index) => (
							<p key={index} className="instruction-step">
								{step.trim()}
							</p>
						))
					) : (
						<p>There are no instructions for this recipe.</p>
					)}
				</div>
			</div>
		</div>
	)
}