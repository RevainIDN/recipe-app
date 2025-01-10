import '../styles/component_styles/RecipeCategories.css'
import { MealCategory, FoodByCategory } from '../types'
import { useEffect } from 'react'

interface RecipeCategoriesProps {
	mealCategoriesList: MealCategory | null,
	selectedCategory: string | null,
	setSelectedCategory: React.Dispatch<React.SetStateAction<string | null>>,
	setFoodByCategory: React.Dispatch<React.SetStateAction<FoodByCategory | null>>
}

export default function RecipeCategories({ mealCategoriesList, selectedCategory, setSelectedCategory, setFoodByCategory }: RecipeCategoriesProps) {
	const handleClickCategory = async (e: React.MouseEvent<HTMLElement>) => {
		setSelectedCategory(e.currentTarget.getAttribute('data-category'));
	}

	useEffect(() => {
		const fetchData = async () => {
			if (!selectedCategory) return;
			try {
				const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${selectedCategory}`);
				const dataFoodByCategory = await response.json();
				setFoodByCategory(dataFoodByCategory);
			} catch (error) {
				console.error('Error loading data:', error)
			}
		}
		fetchData();
	}, [selectedCategory])

	return (
		<div className='categories-cont'>
			<h1 className='categories-title'>Categories</h1>
			<ul className='categories-list'>
				{mealCategoriesList ? (
					mealCategoriesList.categories.map(mealCategory => (
						<li
							key={mealCategory.idCategory}
							className='categories-item'
							data-category={mealCategory.strCategory}
							onClick={handleClickCategory}
						>
							<img className='categories-img' src={mealCategory.strCategoryThumb} alt="Meal Logo" />
							{mealCategory.strCategory}
						</li>
					))
				) : (
					<p>Categories were not found</p>
				)}
			</ul>
		</div>
	)
}