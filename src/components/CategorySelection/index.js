import './index.css'

const CategorySelection = props => {
  const {categories, categorySelectedData, categorySelectedId} = props

  const {name, categoryId} = categories
  const selectedCategory = () => {
    categorySelectedData(categoryId)
  }

  const active = categorySelectedId === categoryId ? 'category-item-active' : ''

  return (
    <li className="category-name">
      <button
        type="button"
        className="category-item"
        onClick={selectedCategory}
      >
        <p className={`${active}`}>{name}</p>
      </button>
    </li>
  )
}

export default CategorySelection
