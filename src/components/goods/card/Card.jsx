import React from 'react'
import './Card.scss'
import ratingImg from '../assets/rating.svg'
import { Link } from 'react-router-dom'
import Rating from '../../rating/Rating'

const Card = ({name, price, images, rating, discount, id, category}) => {
  return (
    <Link 
      className='card' 
      to={`/goods/${category}/${id}`} 
      data-test-id={`clothes-card-${category}`} 
    >
      <div className="card__photo">
        {discount && <div className="card__discount">{discount}</div>}
        <img src={`https://training.cleverland.by/shop${images[0]?.url}`} alt="goods" />
      </div>
      <div className="card__description">
        <div className="card__title">{name}</div>
        <div className="card__wrapper">
          <div className="card__price">{`$ ${price}`}</div>
          <Rating rating={rating} />
          
        </div>        
      </div>        
    </Link>
  )
}

export default Card