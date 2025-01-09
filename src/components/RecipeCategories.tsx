import '../styles/component_styles/RecipeCategories.css'

export default function RecipeCategories() {
	return (
		<div className='categories-cont'>
			<h1 className='categories-title'>Categories</h1>
			<ul className='categories-list'>
				<li className='categories-item'>Beef</li>
				<li className='categories-item'>Chicken</li>
				<li className='categories-item'>Desert</li>
				<li className='categories-item'>Lamb</li>
				<li className='categories-item'>Miscellaneous</li>
				<li className='categories-item'>Pasta</li>
			</ul>
		</div>
	)
}