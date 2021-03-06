import React from 'react'
import { useDispatch } from 'react-redux'
import {  updateCartGoods } from '../../../../store/cartSlice'
import { removeItemFromArray } from '../../../../helpers.js/helpers'
import { cartSlides } from '../constants'
import minus from '../../assets/minus.svg'
import plus from '../../assets/plus.svg'
import bin from '../../assets/bin.svg'
import './CartItems.scss'


const CartItems = ({ cartGoods, setSlide, totalPrice, closeCartModal }) => {
  const dispatch = useDispatch()

  const changeQuantityHandler = (quantity, id, color, size) => {
    const newCartGoods = [...cartGoods]

    const index = newCartGoods.findIndex(
      (el) => el.id === id && el.size === size && el.color === color
    )
    const target = {...newCartGoods.find(
      (el) => el.id === id && el.size === size && el.color === color
    )}

    target.quantity = quantity
    newCartGoods[index] = target

    if (quantity >= 1) dispatch(updateCartGoods({ newCartGoods }))
  }

  const removeItemFromCart = (cartGoods, id, size, color) => {
    const newCartGoods = removeItemFromArray(cartGoods, id, size, color)
    dispatch(updateCartGoods({ newCartGoods }))
  }

  return (
    <div className='cart__items'>
      <div className='cart__goods'>
        {cartGoods?.length ? (
          cartGoods.map(({ id, name, photo, color, size, quantity, price }) => (
            <div
              key={`${id}${color}${size}`}
              className='cart__item'
              data-test-id='cart-card'
            >
              <div className='item__photo'>
                <img width={85} src={photo} alt='' />
              </div>
              <div className='item__info'>
                <div className='item__name'>{name}</div>
                <div className='item__color-size'>
                  {color}, {size}
                </div>
                <div className='item__price-block'>
                  <div className='price__quantity'>
                    <button
                      className='quantity__decr'
                      onClick={() =>
                        changeQuantityHandler(quantity - 1, id, color, size)
                      }
                      data-test-id='minus-product'
                    >
                      <img src={minus} alt='minus' />
                    </button>
                    <span className='quantity__value'>{quantity}</span>
                    <button
                      className='quantity__incr'
                      onClick={() =>
                        changeQuantityHandler(quantity + 1, id, color, size)
                      }
                      data-test-id='plus-product'
                    >
                      <img src={plus} alt='plus' />
                    </button>
                  </div>
                  <div className='item__price'>
                    ${(price * quantity).toFixed(2)}
                  </div>
                  <div
                    className='cart__bin'
                    onClick={() => removeItemFromCart(cartGoods, id, size, color)}
                    data-test-id='remove-product'
                  >
                    <img src={bin} alt='bin' />
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className='cart__empty'>Your cart is empty</div>
        )}
      </div>

      <div className='cart__total'>
        Total:
        <span>${totalPrice}</span>
      </div>
      <button
        className='dark-btn'
        onClick={() => {
          cartGoods.length ? setSlide(cartSlides.delivery) : closeCartModal()
        }}
      >
        {cartGoods.length ? 'FURTHER' : 'BACK TO SHOPPING'}
      </button>
    </div>
  )
}

export default CartItems
