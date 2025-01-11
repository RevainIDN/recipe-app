import '../styles/component_styles/Pagination.css'
import { FoodByCategories } from '../types'

interface PaginationProps {
	currentPage: number,
	recipesPerPage: number,
	filteredRecipe: FoodByCategories[] | null,
	paginate: (pageNumber: number) => void,
}

export default function Pagination({ currentPage, recipesPerPage, filteredRecipe, paginate }: PaginationProps) {
	const pageNumbers = [];

	if (!filteredRecipe) {
		return;
	}

	for (let i = 1; i <= Math.ceil(filteredRecipe.length / recipesPerPage); i++) {
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