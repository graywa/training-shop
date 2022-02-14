import React from 'react'
import './Advantage.scss'
import car from './assets/car.svg'
import refresh from './assets/refresh.svg'
import support from './assets/support.svg'

const Advantage = () => {
  return (
    <div className='advantage'>
      <div className="advantage__item">
        <img width={40} src={car} alt="icon" />
        <div className="advantage__block">
          <span className="title">FREE SHIPPING</span>
          <span className="description">
            On all UA order or order obove $100
          </span>
        </div>
      </div>
      <div className="advantage__item">
        <img width={40} src={refresh} alt="icon" />
        <div className="advantage__block">
          <span className="title">30 DAYS RETURN</span>
          <span className="description">
            Simply return it within 30 days for an exchange
          </span>
        </div>
      </div>
      <div className="advantage__item">
        <img width={40} src={support} alt="icon" />
        <div className="advantage__block">
          <div className="title">SUPPORT 24/7</div>
          <div className="description">
            Contact us 24 hours a day. 7 days a week
          </div>
        </div>
      </div>
    </div>
  )
}

export default Advantage