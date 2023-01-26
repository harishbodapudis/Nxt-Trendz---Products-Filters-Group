import './index.css'

const RatingsSelection = props => {
  const {ratings, ratingsIdData, ratingsId} = props

  const {imageUrl, ratingId} = ratings

  const setRatingsId = () => {
    ratingsIdData(ratingId)
  }

  const active = ratingId === ratingsId ? 'ratings-item-active' : ''
  return (
    <li className="rating-name">
      <button type="button" onClick={setRatingsId} className="rating-btn">
        <img src={imageUrl} alt={`rating ${ratingId}`} className="rating-img" />
      </button>
      <p className={`${active}`}>&up</p>
    </li>
  )
}

export default RatingsSelection
