export interface MealCategories {
	idCategory: string,
	strCategory: string,
	strCategoryDescription: string,
	strCategoryThumb: string,
}

export interface MealCategory {
	categories: MealCategories[],
}