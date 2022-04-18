import React, { useEffect, useState } from 'react'
import cn from 'classnames'
import cross from '../assets/cross.svg'
import CartItems from './cart-items-slide/CartItems'
import DeliveryInfo from './delivery-info-slide/DeliveryInfo'
import Payment from './payment-slide/Payment'
import Status from './status-slide/Status'
import { setGoodsFromLocalStorage } from '../../../store/cartSlice'
import { useDispatch } from 'react-redux'
import './Cart.scss'
import { cartSlides } from './constants'


const Cart = ({ isAddOpenCart, closeCartModal, cartGoods }) => {
  const [slide, setSlide] = useState(cartSlides.items)
  const [isResetForm, setIsResetForm] = useState(false)
  const dispatch = useDispatch()

  const totalPrice = cartGoods
    ?.reduce((acc, el) => acc + el.quantity * el.price, 0)
    .toFixed(2)

  useEffect(() => {
    if (!cartGoods.length && localStorage.getItem('cartGoodsLocal')) {
      const cartGoodsLocal = JSON?.parse(localStorage.getItem('cartGoodsLocal'))
      dispatch(setGoodsFromLocalStorage({ cartGoodsLocal }))
    }
  }, [])

  return (
    <>
      <div
        className={cn('modal', { open: isAddOpenCart })}
        onClick={closeCartModal}
      >
        <div
          className='cart__content'
          onClick={(e) => e.stopPropagation()}
          data-test-id='cart'
        >
          <div className='cart__header'>
            <span className='cart__title'>SHOPPING CART</span>
            <span onClick={closeCartModal}>
              <img width={16} src={cross} alt='cross' />
            </span>
          </div>

          {slide !== cartSlides.status && (
            <div className='cart__links'>
              <span
                className={cn('link', { active: slide === cartSlides.items })}
              >
                {'Item in Cart '}
              </span>
              <span>/</span>
              <span
                className={cn('link', {
                  active: slide === cartSlides.delivery,
                })}
              >
                {' Delivery Info '}
              </span>
              <span>/</span>
              <span
                className={cn('link', {
                  active: slide === cartSlides.payment,
                })}
              >
                {' Payment'}
              </span>
            </div>
          )}

          <div className={cn('cart__slides', slide)}>
            <CartItems
              cartGoods={cartGoods}
              setSlide={setSlide}
              totalPrice={totalPrice}
              closeCartModal={closeCartModal}
            />

            <DeliveryInfo
              setSlide={setSlide}
              totalPrice={totalPrice}
              isResetForm={isResetForm}
            />

            <Payment
              cartGoods={cartGoods}
              setSlide={setSlide}
              totalPrice={totalPrice}
              isResetForm={isResetForm}
            />

            <Status
              closeCartModal={closeCartModal}
              setSlide={setSlide}
              setIsResetForm={setIsResetForm}
            />
          </div>
        </div>
      </div>
    </>
  )
}

export default Cart
