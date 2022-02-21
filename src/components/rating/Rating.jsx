import React from 'react'
import './Rating.scss'
import star from './assets/star.svg'
import starFull from './assets/star-full.svg'

const Rating = ({rating}) => {
  const starArr = []

  for(let i = 0; i < 5; i++) {
    starArr.push(i >= rating ? false : true)
  }

  return (
    <div className='rating'>
      {
        starArr.map((el, ind) => {
          return el 
          ? <img key={ind} src={starFull} alt="star" className="rating__star" />
          : <img key={ind} src={star} alt="star" className="rating__star" />
        })
      }      
    </div>
  )
}

export default Rating