import '../styles/component_styles/Filter.css'

interface FilterProps {
	handleInput: (e: React.ChangeEvent<HTMLInputElement>) => void,
}

export default function Filter({ handleInput }: FilterProps) {
	return (
		<>
			<div className='recipe-filters-cont'>
				<div className='recipe-input-cont'>
					<input className='recipe-input' type="text" placeholder='Search recipes and more...' onChange={handleInput} />
					<img className='recipe-input-img' src="Search.svg" alt="Search" />
				</div>
				<div className='recipe-btn-cont'>
					<button className='recipe-btn'>Sort by: <strong>Name</strong></button>
					<img className='recipe-btn-img' src="Expand_down.svg" alt="Arrow down" />
				</div>
			</div>
		</>
	)
}