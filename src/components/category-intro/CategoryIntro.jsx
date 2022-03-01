import React from 'react'
import { Link } from 'react-router-dom'
import './CategoryIntro.scss'
import share from './assets/share.svg'
import Rating from '../rating/Rating'

const CategoryIntro = ({goodsType, id, name, rating, reviews}) => {

  return (
    <div className="intro-bg">
      <div className="container">
        <div className='category-intro'>
          <div className="category-intro__links">
            <div className="current-path">
              <Link to='/'><span>Home</span></Link> 
              <span>►</span>
              <Link to={`/goods/${goodsType}`}><span>{goodsType}</span></Link>
              {id && <span>►</span>}
              {id && <span>{name}</span>}              
            </div>
            <Link className="share-link" to='!#'>
              <img width={15} src={share} alt="share" />
              <span>Share</span>
            </Link>              
          </div>
          <div className="category-intro__title">
            { id ? name : goodsType }
          </div>

          {id && <div className="product-info">
            <div className="product-rating">
              <Rating rating={rating} />
              <span>{reviews?.length} Reviews</span>
            </div>
            <div className="product-info__block">
              <div><span>SKU</span> 777</div> 
              <div><span>Availability:</span> In Stock</div>
            </div>
          </div>}
          
        </div>
      </div>
    </div>    
  )
}

export default CategoryIntro