interface MealCategories {
	idCategory: string,
	strCategory: string,
	strCategoryDescription: string,
	strCategoryThumb: string,
}

export interface MealCategory {
	categories: MealCategories[],
}

interface FoodByCategories {
	strMeal: string,
	strMealThumb: string,
	idMeal: string,
}

export interface FoodByCategory {
	meals: FoodByCategories[],
}