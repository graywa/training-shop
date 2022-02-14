import React from 'react'
import { Link } from 'react-router-dom'
import './CategoryIntro.scss'
import share from './assets/share.svg'
import rating from './assets/rating.svg'

const CategoryIntro = ({goodsType, id}) => {
  return (
    <div className="intro-bg">
      <div className="container">
        <div className='category-intro'>
          <div className="category-intro__links">
            <div className="current-path">
              <Link to='/'><span>Home</span></Link> 
              <span>►</span>
              <Link to={`/${goodsType}`}><span>{goodsType}</span></Link>
              {id && <span>►</span>}
              {id && <span>Women's tracksuit Q109</span>}              
            </div>
            <Link className="share-link" to='#'>
              <img width={15} src={share} alt="share" />
              <span>Share</span>
            </Link>              
          </div>
          <div className="category-intro__title">
            { id ? "Women's tracksuit Q109" : goodsType }
          </div>

          {id && <div className="product-info">
            <div className="product-rating">
              <img src={rating} alt="rating" />
              <span>2 Reviews</span>
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