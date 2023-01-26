import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'

import FiltersGroup from '../FiltersGroup'
import ProductCard from '../ProductCard'
import ProductsHeader from '../ProductsHeader'

import './index.css'

const categoryOptions = [
  {
    name: 'Clothing',
    categoryId: '1',
  },
  {
    name: 'Electronics',
    categoryId: '2',
  },
  {
    name: 'Appliances',
    categoryId: '3',
  },
  {
    name: 'Grocery',
    categoryId: '4',
  },
  {
    name: 'Toys',
    categoryId: '5',
  },
]

const sortbyOptions = [
  {
    optionId: 'PRICE_HIGH',
    displayText: 'Price (High-Low)',
  },
  {
    optionId: 'PRICE_LOW',
    displayText: 'Price (Low-High)',
  },
]

const ratingsList = [
  {
    ratingId: '4',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/rating-four-stars-img.png',
  },
  {
    ratingId: '3',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/rating-three-stars-img.png',
  },
  {
    ratingId: '2',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/rating-two-stars-img.png',
  },
  {
    ratingId: '1',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/rating-one-star-img.png',
  },
]

class AllProductsSection extends Component {
  state = {
    productsList: [],
    isLoading: false,
    activeOptionId: sortbyOptions[0].optionId,
    searchTitle: '',
    categorySelectedId: '',
    ratingId: '',
    status: '',
  }

  componentDidMount() {
    this.getProducts()
  }

  getProducts = async () => {
    this.setState({
      isLoading: true,
    })
    const {
      activeOptionId,
      categorySelectedId,
      searchTitle,
      ratingId,
    } = this.state

    const jwtToken = Cookies.get('jwt_token')

    // TODO: Update the code to get products with filters applied

    const apiUrl = `https://apis.ccbp.in/products?sort_by=${activeOptionId}&category=${categorySelectedId}&title_search=${searchTitle}&rating=${ratingId}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    if (response.ok) {
      const fetchedData = await response.json()
      const updatedData = fetchedData.products.map(product => ({
        title: product.title,
        brand: product.brand,
        price: product.price,
        id: product.id,
        imageUrl: product.image_url,
        rating: product.rating,
      }))
      this.setState({
        productsList: updatedData,
        isLoading: false,
        status: 'Success',
      })
    } else {
      this.setState({status: 'Failure', isLoading: false})
    }
  }

  resetState = () => {
    this.setState(
      {
        searchTitle: '',
        categorySelectedId: '',
        ratingId: '',
      },
      this.getProducts,
    )
  }

  changeSortby = activeOptionId => {
    this.setState({activeOptionId}, this.getProducts)
  }

  renderProducts = () => {
    const {status} = this.state

    switch (status) {
      case 'Success':
        return this.renderProductsList()
      case 'Failure':
        return this.failurePage()
      default:
        return this.renderLoader()
    }
  }

  renderProductsList = () => {
    const {productsList} = this.state

    // TODO: Add No Products View
    return (
      <div className="all-products-container">
        {productsList.length > 0 ? (
          <>
            <ul className="products-list">
              {productsList.map(product => (
                <ProductCard productData={product} key={product.id} />
              ))}
            </ul>
          </>
        ) : (
          <>
            <center className="center-data">
              <img
                src="https://assets.ccbp.in/frontend/react-js/nxt-trendz/nxt-trendz-no-products-view.png"
                alt="no products"
                className="no-products"
              />
              <h1>No Products Found</h1>
              <p>We could not find any products. Try other filters.</p>
            </center>
          </>
        )}
      </div>
    )
  }

  categorySelected = async id => {
    this.setState(
      {categorySelectedId: id, isLoading: true},
      this.categorySelectionCall,
    )
  }

  categorySelectionCall = async () => {
    const {
      activeOptionId,
      categorySelectedId,
      searchTitle,
      ratingId,
    } = this.state

    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = `https://apis.ccbp.in/products?sort_by=${activeOptionId}&category=${categorySelectedId}&title_search=${searchTitle}&rating=${ratingId}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(apiUrl, options)

    if (response.ok) {
      const categorizedData = await response.json()
      const categoryUpdatedData = categorizedData.products.map(product => ({
        title: product.title,
        brand: product.brand,
        price: product.price,
        id: product.id,
        imageUrl: product.image_url,
        rating: product.rating,
      }))
      this.setState({
        productsList: categoryUpdatedData,
        isLoading: false,
        status: 'Success',
      })
    } else {
      this.setState({status: 'Failure', isLoading: false})
    }
  }

  updateSearchTitle = value => {
    this.setState({searchTitle: value})
  }

  submitSearchTitle = async () => {
    this.getProducts()
  }

  ratingSelected = async id => {
    this.setState(
      {
        isLoading: true,
        ratingId: id,
      },
      this.ratingsSelectionCall,
    )
  }

  ratingsSelectionCall = async () => {
    const {
      searchTitle,
      activeOptionId,
      ratingId,
      categorySelectedId,
    } = this.state
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = `https://apis.ccbp.in/products?sort_by=${activeOptionId}&category=${categorySelectedId}&title_search=${searchTitle}&rating=${ratingId}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(apiUrl, options)

    if (response.ok) {
      const ratingData = await response.json()

      const newUpdatedData = ratingData.products.map(product => ({
        title: product.title,
        brand: product.brand,
        price: product.price,
        id: product.id,
        imageUrl: product.image_url,
        rating: product.rating,
      }))
      this.setState({
        productsList: newUpdatedData,
        isLoading: false,
        status: 'Success',
      })
    } else {
      this.setState({status: 'Failure', isLoading: false})
    }
  }

  renderLoader = () => (
    <div className="products-loader-container">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  // TODO: Add failure view
  failurePage = () => (
    <div className="all-products-container">
      <center className="center-data">
        <img
          src="https://assets.ccbp.in/frontend/react-js/nxt-trendz/nxt-trendz-products-error-view.png"
          alt="products failure"
          className="products-failure"
        />
        <h1>Oops! Something Went Wrong</h1>
        <p>
          We are having some trouble processing your request. Please try again
        </p>
      </center>
    </div>
  )

  render() {
    const {
      isLoading,
      activeOptionId,
      searchTitle,
      productsList,
      categorySelectedId,
      ratingId,
    } = this.state

    return (
      <>
        <ProductsHeader
          productsList={productsList}
          activeOptionId={activeOptionId}
          sortbyOptions={sortbyOptions}
          changeSortby={this.changeSortby}
          updateSearchTitle={this.updateSearchTitle}
          submitSearchTitle={this.submitSearchTitle}
          searchTitle={searchTitle}
        />
        <div className="all-products-section">
          <FiltersGroup
            categoryOptions={categoryOptions}
            categorySelectedId={categorySelectedId}
            ratingsList={ratingsList}
            categorySelected={this.categorySelected}
            ratingSelected={this.ratingSelected}
            resetState={this.resetState}
            productsList={productsList}
            ratingsId={ratingId}
          />

          {isLoading ? this.renderLoader() : this.renderProducts()}
        </div>
      </>
    )
  }
}

export default AllProductsSection
