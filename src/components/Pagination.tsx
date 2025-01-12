import '../styles/component_styles/Pagination.css'
import { FoodByCategories } from '../types'
import arrow from '/Expand_left.svg'

interface PaginationProps {
	currentPage: number,
	recipesPerPage: number,
	filteredRecipe: FoodByCategories[] | null,
	paginate: (pageNumber: number) => void,
}

export default function Pagination({ currentPage, recipesPerPage, filteredRecipe, paginate }: PaginationProps) {
	const pageNumbers: Array<number> = [];

	if (!filteredRecipe) {
		return;
	}

	for (let i = 1; i <= Math.ceil(filteredRecipe.length / recipesPerPage); i++) {
		pageNumbers.push(i);
	}

	const nextPage = () => {
		if (currentPage < pageNumbers.length) {
			paginate(pageNumbers[currentPage]);
		} else {
			paginate(pageNumbers[0]);
		}
	}

	const prevPage = () => {
		if (currentPage > 1) {
			paginate(pageNumbers[currentPage - 2]);
		} else {
			paginate(pageNumbers[pageNumbers.length - 1]);
		}
	}

	return (
		<div className='pagination-cont'>
			<ul className="pagination">
				<li><button className='page-btn page-btn-prev' onClick={prevPage}><img src={arrow} alt="Prev" /></button></li>
				{
					pageNumbers.map(number => (
						<li className='page-item' key={number}>
							<button className={`page-btn ${currentPage === number ? `active` : ''}`} onClick={() => paginate(number)}>
								{number}
							</button>
						</li>
					))
				}
				<li><button className='page-btn page-btn-next' onClick={nextPage}><img src={arrow} alt="Next" /></button></li>
			</ul>
		</div>
	)
}