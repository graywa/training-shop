import React, { useEffect, useState } from 'react'
import './Cart.scss'
import { setGoodsFromLocalStorage } from '../../../store/cartSlice'
import { useDispatch } from 'react-redux'
import cross from '../assets/cross.svg'
import cn from 'classnames'
import CartItems from './cart-items/CartItems'
import DeliveryInfo from './delivery-info/DeliveryInfo'
import Payment from './payment/Payment'

export const cartSlides = {
  items: 'items',
  delivery: 'delivery',
  payment: 'payment',
  status: 'status',
}

const Cart = ({ isOpenCart, setIsOpenCart, cartGoods }) => {
  const dispatch = useDispatch()

  const [slide, setSlide] = useState(cartSlides.items)
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
        className={isOpenCart ? 'modal open' : 'modal'}
        onClick={() => setIsOpenCart(false)}
      >
        <div
          className='cart__content'
          onClick={(e) => e.stopPropagation()}
          data-test-id='cart'
        >
          <div className='cart__header'>
            <span className='cart__title'>SHOPPING CART</span>
            <span onClick={() => setIsOpenCart(false)}>
              <img width={16} src={cross} alt='cross' />
            </span>
          </div>

          <div className='cart__links'>
            <span>Item in Cart </span>
            <span>/</span>
            <span> Delivery Info </span>
            <span>/</span>
            <span> Payment</span>
          </div>

          <div className={cn('cart__slides', slide)}>
            <CartItems
              cartGoods={cartGoods}
              setIsOpenCart={setIsOpenCart}
              setSlide={setSlide}
              totalPrice={totalPrice}
            />

            <DeliveryInfo
              cartGoods={cartGoods}
              setIsOpenCart={setIsOpenCart}
              setSlide={setSlide}
              totalPrice={totalPrice}
            />

            <Payment
              cartGoods={cartGoods}
              setIsOpenCart={setIsOpenCart}
              setSlide={setSlide}
              totalPrice={totalPrice}
            />
          </div>
        </div>
      </div>
    </>
  )
}

export default Cart
