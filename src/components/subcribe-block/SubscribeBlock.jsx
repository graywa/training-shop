import React from 'react'
import './SubscribeBlock.scss'
import man from './assets/man.png'
import woman from './assets/woman.png'

const SubscribeBlock = () => {
  return (
    <div className='subscr-block'>
      
      <form className="form-subscr">
        <img className='woman-subscr' src={woman} alt="woman" />
        <img className='man-subscr' src={man} alt="man" />
        <div className="form-subscr__title">special offer</div>
        <div className="form-subscr__text">
          subscribe and <span>get 10% off</span>
        </div>
        <input className='form-subscr__input' type="email" placeholder='Enter your email'/>
        <div className="form-subscr__button">subscribe</div>
      </form>                      
    </div>
  )
}

export default SubscribeBlock