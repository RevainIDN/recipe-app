import '../styles/component_styles/Filter.css'
import { useState } from 'react'

interface FilterProps {
	handleInput: (e: React.ChangeEvent<HTMLInputElement>) => void,
	userSort: string | null,
	setUserSort: React.Dispatch<React.SetStateAction<string | null>>,
}

export default function Filter({ handleInput, userSort, setUserSort }: FilterProps) {
	const [isDropdownClicked, setIsDropdownClicked] = useState<boolean>(false);

	const handleClickDropdownList = () => {
		setIsDropdownClicked(prev => !prev);
	}

	const handleClickDropdownBtn = (e: React.MouseEvent<HTMLElement>) => {
		setUserSort(e.currentTarget.textContent)
	}

	return (
		<>
			<div className='recipe-filters-cont'>
				<div className='recipe-input-cont'>
					<input className='recipe-input' type="text" placeholder='Search recipes and more...' onChange={handleInput} />
				</div>
				<div className='recipe-dropdown-cont' onClick={handleClickDropdownList}>
					<button className='recipe-btn'>Sort by: <strong>{userSort}</strong></button>
					<ul className='dropdown-list' style={{ display: isDropdownClicked ? 'flex' : 'none' }}>
						<li className='dropdown-item' onClick={handleClickDropdownBtn}>Name</li>
						<li className='dropdown-item' onClick={handleClickDropdownBtn}>Id</li>
					</ul>
				</div>
			</div>
		</>
	)
}