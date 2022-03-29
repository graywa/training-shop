import React, { useEffect, useState } from 'react'
import './Rating.scss'
import star from './assets/star.svg'
import starFull from './assets/star-full.svg'
import { useDispatch } from 'react-redux'
import { changeRating } from '../../store/reviewSlice'

const Rating = ({rating, editable = false, size = 14}) => {
  const starArr = []
  const dispatch = useDispatch()  

  for(let i = 0; i < 5; i++) {
    starArr.push(i >= rating ? false : true)
  }

  const handleChangeRating = (rating) => {
    if(editable) {
      dispatch(changeRating({rating}))
    }
  }

  return (
    <div className='rating'>
      {
        starArr.map((el, ind) => {
          return (
            <img 
              width={size}
              key={ind} 
              src={el ? starFull : star} 
              alt="star" 
              className={editable ? "rating__star edit" : "rating__star" }
              onClick={() => handleChangeRating(ind + 1)}
            />
          )           
        })
      }      
    </div>
  )
}

export default Rating