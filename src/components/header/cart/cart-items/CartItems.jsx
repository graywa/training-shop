import React from 'react'
import './CartItems.scss'
import minus from '../../assets/minus.svg'
import plus from '../../assets/plus.svg'
import bin from '../../assets/bin.svg'
import { useDispatch } from 'react-redux'
import { changeQuantityGoods, removeGoods } from '../../../../store/cartSlice'
import { cartSlides } from '../Cart'

function CartItems({ cartGoods, setIsOpenCart, setSlide }) {
  const dispatch = useDispatch()

  const changeQuantityHandler = (quantity, id, color, size) => {
    if (quantity <= 0) return
    dispatch(changeQuantityGoods({ quantity, id, color, size }))
  }

  return (
    <div className='cart__items'>
      <div className='cart__goods'>
        {cartGoods?.length ? (
          cartGoods.map((el) => {
            const { id, name, photo, color, size, quantity, price } = el
            return (
              <div
                key={id + color + size}
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
                      onClick={() => dispatch(removeGoods({ id, color, size }))}
                      data-test-id='remove-product'
                    >
                      <img src={bin} alt='bin' />
                    </div>
                  </div>
                </div>
              </div>
            )
          })
        ) : (
          <div className='cart__empty'>Your cart is empty</div>
        )}
      </div>

      <div className='cart__total'>
        Total:
        <span>
          $
          {cartGoods
            .reduce((acc, el) => acc + el.quantity * el.price, 0)
            .toFixed(2)}
        </span>
      </div>
      {!!cartGoods.length && (
        <button className='dark-btn' onClick={() => setSlide(cartSlides.delivery)}>
          FURTHER
        </button>
      )}
      <button className='light-btn' onClick={() => setIsOpenCart(false)}>
        BACK TO SHOPPING
      </button>
    </div>
  )
}

export default CartItems
