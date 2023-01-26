import RatingsSelection from '../RatingsSelection'
import CategorySelection from '../CategorySelection'
import './index.css'

const FiltersGroup = props => {
  const {
    categoryOptions,
    ratingsList,
    resetState,
    categorySelected,
    ratingSelected,
    categorySelectedId,
    ratingsId,
  } = props

  const categorySelectedData = categoryId => {
    categorySelected(categoryId)
  }

  const ratingsIdData = ratingId => {
    ratingSelected(ratingId)
  }

  return (
    <div className="filters-group-container">
      <div>
        <h1 className="category-heading">Category</h1>
        <ul className="categories-box">
          {categoryOptions.map(categories => (
            <CategorySelection
              categories={categories}
              key={categories.categoryId}
              categorySelectedData={categorySelectedData}
              categorySelectedId={categorySelectedId}
            />
          ))}
        </ul>
      </div>
      <div>
        <p className="rating-heading">Rating</p>
        <ul className="rating-box">
          {ratingsList.map(ratings => (
            <RatingsSelection
              key={ratings.ratingId}
              ratings={ratings}
              ratingsIdData={ratingsIdData}
              ratingsId={ratingsId}
            />
          ))}
        </ul>
      </div>
      <div>
        <button type="button" onClick={resetState} className="reset-btn">
          Clear Filters
        </button>
      </div>
    </div>
  )
}

export default FiltersGroup
