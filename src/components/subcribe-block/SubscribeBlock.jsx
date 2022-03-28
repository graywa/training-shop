import React from 'react'
import './SubscribeBlock.scss'
import man from './assets/man.png'
import woman from './assets/woman.png'
import SubscribeForm from '../../subscribe-form/SubscribeForm';


const SubscribeBlock = () => {
  return (
    <div className='subscr-block'>
      
      <div className="form-subscr">
        <img className='woman-subscr' src={woman} alt="woman" />
        <img className='man-subscr' src={man} alt="man" />
        <div className="form-subscr__title">special offer</div>
        <div className="form-subscr__text">
          subscribe and <span>get 10% off</span>
        </div>          
          <SubscribeForm />
      </div>                      
    </div>
  )
}

export default SubscribeBlock



