import React from 'react'
import './Card.scss'
import rating from '../assets/rating.svg'
import { Link } from 'react-router-dom'

const Card = ({id, goodsType, imageSrc, title, price, discount}) => {
  return (
    <Link 
      className='card' 
      to={`/${goodsType}/${id}`} 
      data-test-id={`clothes-card-${goodsType}`} 
    >
      <div className="card__photo">
        {discount && <div className="card__discount">{discount}</div>}
        <img src={imageSrc} alt="goods" />
      </div>
      <div className="card__description">
        <div className="card__title">{title}</div>
        <div className="card__wrapper">
          <div className="card__price">{price}</div>
          <img className="card__rating" width={70} src={rating} alt='rating' />
        </div>        
      </div>        
    </Link>
  )
}

export default Card