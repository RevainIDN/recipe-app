import '../styles/component_styles/Pagination.css'
import { FoodByCategory } from '../types'

interface PaginationProps {
	currentPage: number,
	recipesPerPage: number,
	foodByCategory: FoodByCategory | null,
	paginate: (pageNumber: number) => void,
}

export default function Pagination({ currentPage, recipesPerPage, foodByCategory, paginate }: PaginationProps) {
	const pageNumbers = [];

	if (!foodByCategory?.meals) {
		return;
	}

	for (let i = 1; i <= Math.ceil(foodByCategory.meals.length / recipesPerPage); i++) {
		pageNumbers.push(i);
	}

	return (
		<div className='pagination-cont'>
			<ul className="pagination">
				{
					pageNumbers.map(number => (
						<li className={`page-item ${currentPage === number ? `active` : ''}`} key={number}>
							<button onClick={() => paginate(number)}>
								{number}
							</button>
						</li>
					))
				}
			</ul>
		</div>
	)
}