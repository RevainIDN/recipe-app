export interface MealCategories {
	idCategory: string;
	strCategory: string;
	strCategoryDescription: string;
	strCategoryThumb: string;
}

export interface MealCategory {
	categories: MealCategories[];
}

export interface FoodByCategories {
	strMeal: string;
	strMealThumb: string;
	idMeal: string;
}

export interface FoodByCategory {
	meals: FoodByCategories[];
}

export interface Recipe {
	dateModified: string | null;
	idMeal: string;
	strArea: string | null;
	strCategory: string | null;
	strCreativeCommonsConfirmed: string | null;
	strDrinkAlternate: string | null;
	strImageSource: string | null;
	strInstructions: string;
	strMeal: string;
	strMealThumb: string;
	strSource: string | null;
	strTags: string | null;
	strYoutube: string | null;

	strIngredients: (string | null)[];
	strMeasures: (string | null)[];
}