import '../styles/component_styles/Filter.css'

export default function Filter() {
	return (
		<>
			<div className='recipe-filters-cont'>
				<div className='recipe-input-cont'>
					<input className='recipe-input' type="text" placeholder='Search recipes and more...' />
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