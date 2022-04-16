import React from 'react'
import { useSelector } from 'react-redux'
import { cartSlides } from '../Cart'
import Preloader from '../../../preloader/Preloader'

function Status({ setSlide, closeCartModal }) {
  const { orderSuccess, isLoading, orderError } = useSelector((state) => state.order)

  return (
    <div className='status-slide'>
      <div className='status__content'>
        {isLoading && (
          <>
            <h2 className='status__title'>Processing order... </h2>
            <Preloader />
          </>
        )}

        {orderSuccess && !isLoading && (
          <>
            <h2 className='status__title'>Thank you for your order </h2>
            <div className='status__body'>
              <p>Information about your order will appear in your e-mail. </p>
              <p>Our manager will call you back.</p>
            </div>
          </>
        )} 

        {orderError && (
          <h2 className='status__title'>
            Error: {orderError}
          </h2>
        )}
        
        {!orderSuccess && !isLoading && !orderError &&(
          <>
            <h2 className='status__title'>
              Sorry, your payment has not been processed.
            </h2>
            <div className='status__body'>
              <p>
                Failed to pay for the order, the problem is on the side of the
                bank
              </p>
            </div>
          </>
        )}
      </div>

      <button 
        className='dark-btn'
        onClick={() => {
          orderSuccess 
          ? closeCartModal()
          : setSlide(cartSlides.payment)
        }}
        disabled={isLoading}
      >
        {orderSuccess ? 'BACK TO SHOPPING' : 'BACK TO PAYMENT'}
      </button>

      {!orderSuccess && (
        <button
          type='button'
          className='light-btn'
          onClick={() => {setSlide(cartSlides.items)}}
          disabled={isLoading}
        >
          VIEW CART
        </button>
      )}
    </div>
  )
}

export default Status