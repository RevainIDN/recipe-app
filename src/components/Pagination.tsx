import '../styles/component_styles/Pagination.css'
import { FoodByCategories } from '../types'

interface PaginationProps {
	currentPage: number,
	recipesPerPage: number,
	filteredRepice: FoodByCategories[] | null,
	paginate: (pageNumber: number) => void,
}

export default function Pagination({ currentPage, recipesPerPage, filteredRepice, paginate }: PaginationProps) {
	const pageNumbers = [];

	if (!filteredRepice) {
		return;
	}

	for (let i = 1; i <= Math.ceil(filteredRepice.length / recipesPerPage); i++) {
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