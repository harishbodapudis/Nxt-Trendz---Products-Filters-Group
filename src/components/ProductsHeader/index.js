import {BsFilterRight, BsSearch} from 'react-icons/bs'

import './index.css'

const ProductsHeader = props => {
  const onChangeSortby = event => {
    const {changeSortby} = props
    changeSortby(event.target.value)
  }

  const {
    sortbyOptions,
    activeOptionId,
    updateSearchTitle,
    submitSearchTitle,
    searchTitle,
    productsList,
  } = props

  const filterItem = event => {
    updateSearchTitle(event.target.value)
  }

  const submitSearchData = event => {
    if (event.key === 'Enter') {
      submitSearchTitle()
    }
  }

  return (
    <div className="products-header">
      {productsList ? (
        <>
          <div className="input-field">
            <input
              type="search"
              onChange={filterItem}
              className="search-box"
              placeholder="Search"
              onKeyPress={submitSearchData}
              value={searchTitle}
            />
            <BsSearch className="search-icon" />
          </div>
          <h1 className="products-list-heading">All Products</h1>
          <div className="sort-by-container">
            <BsFilterRight className="sort-by-icon" />
            <p className="sort-by">Sort by</p>
            <select
              className="sort-by-select"
              value={activeOptionId}
              onChange={onChangeSortby}
            >
              {sortbyOptions.map(eachOption => (
                <option
                  key={eachOption.optionId}
                  value={eachOption.optionId}
                  className="select-option"
                >
                  {eachOption.displayText}
                </option>
              ))}
            </select>
          </div>
        </>
      ) : (
        <div>
          <input
            type="search"
            onChange={filterItem}
            className="search-box"
            placeholder="Search"
            onKeyPress={submitSearchData}
            value={searchTitle}
          />
          <BsSearch className="search-icon" />
        </div>
      )}
    </div>
  )
}

export default ProductsHeader
