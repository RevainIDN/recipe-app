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

	const getDisplayedPages = () => {
		const maxVisiblePages = 5;

		let startPage = currentPage - 2;
		let endPage = currentPage + 2;

		if (startPage < 1) {
			startPage = 1;
			endPage = Math.min(maxVisiblePages, pageNumbers.length);
		}

		if (endPage > pageNumbers.length) {
			endPage = pageNumbers.length;
			startPage = Math.max(pageNumbers.length - maxVisiblePages + 1, 1);
		}

		const displayedPages = pageNumbers.slice(startPage - 1, endPage);

		return displayedPages;
	};

	const displayedPages = getDisplayedPages();

	return (
		<div className='pagination-cont'>
			<ul className="pagination">
				<li><button className='page-btn page-btn-prev' onClick={prevPage}><img src={arrow} alt="Prev" /></button></li>

				{displayedPages.map((number) => (
					<li className="page-item" key={number}>
						<button
							className={`page-btn ${currentPage === number ? 'active' : ''}`}
							onClick={() => paginate(number)}
						>
							{number}
						</button>
					</li>
				))}

				<li><button className='page-btn page-btn-next' onClick={nextPage}><img src={arrow} alt="Next" /></button></li>
			</ul>
		</div>
	)
}