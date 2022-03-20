import React, { useEffect } from 'react'
import './Cart.scss'
import bin from './assets/bin.svg'
import minus from './assets/minus.svg'
import plus from './assets/plus.svg'
import cross from './assets/cross.svg'
import { removeGoods, changeQuantityGoods, setGoodsFromLocalStorage } from '../../store/cartSlice'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'

const Cart = ({isOpenCart, setIsOpenCart, cartGoods}) => {
  const dispatch = useDispatch()

  useEffect(() => {        
    if( !cartGoods.length && localStorage.getItem('cartGoodsLocal') ) {
      const cartGoodsLocal = JSON?.parse(localStorage.getItem('cartGoodsLocal'))
      dispatch(setGoodsFromLocalStorage({cartGoodsLocal}))
    }
  }, [])

  const changeQuantityHandler = (quantity, id , color, size) => {
    if (quantity <= 0) return
    dispatch(changeQuantityGoods({quantity, id, color, size}))
  }  

  return (
    <>
      <div className={isOpenCart ? "modal open" : "modal"} 
          onClick={() => setIsOpenCart(false)}                                
      >
        <div className="cart__content"
            onClick={(e) => e.stopPropagation()}
            data-test-id='cart'
        >
          <div className="cart__header">
            <span className="cart__title">SHOPPING CART</span>
            <span onClick={() => setIsOpenCart(false)}>
              <img width={16} src={cross} alt="cross" />
            </span>
          </div>
          <div className="cart__wrapper">
            <div className="cart__links">
              <Link to='!!!'>Item in Cart </Link>
              <span>/</span>
              <Link to='!!!'> Delivery Info </Link>
              <span>/</span>
              <Link to='!!!'> Payment</Link>
            </div>
            <div className="cart__goods">
              {cartGoods?.length 
                ? cartGoods.map(el => {
                    const {id, name, photo, color, size, quantity, price} = el
                    return (
                      <div key={id+color+size} className="cart__item"
                        data-test-id='cart-card'
                      >
                        <div className="item__photo">
                          <img width={85} src={photo} alt="" />
                        </div>
                        <div className="item__info">
                          <div className="item__name">{name}</div>
                          <div className="item__color-size">{color}, {size}</div>
                          <div className="item__price-block">
                            <div className="price__quantity">
                              <button className="quantity__decr"
                                      onClick={() => changeQuantityHandler(quantity - 1, id, color, size)}
                                      data-test-id='minus-product'
                              >
                                <img src={minus} alt="minus" />
                              </button>
                              <span className="quantity__value">{quantity}</span>
                              <button className="quantity__incr"
                                      onClick={() => changeQuantityHandler(quantity + 1, id, color, size)}
                                      data-test-id='plus-product'
                              >
                                <img src={plus} alt="plus" />
                              </button>
                            </div>
                            <div className="item__price">${(price*quantity).toFixed(2)}</div>
                            <div className="cart__bin"
                                onClick={() => dispatch(removeGoods({id, color, size}))}
                                data-test-id='remove-product'
                            >
                              <img src={bin} alt="bin" />
                            </div>
                          </div>
                        </div>
                      </div>
                  )})
                : <div className="cart__empty">Your cart is empty</div>
              }
            </div>

            <div className="cart__total">
              Total:
              <span>
                ${(cartGoods.reduce((acc, el) => acc + el.quantity * el.price, 0)).toFixed(2)}
              </span>
            </div>
            {!!cartGoods.length && <button className="dark-btn">FURTHER</button>}                    
            <button className="light-btn"
                    onClick={() => setIsOpenCart(false)}
            >
              BACK TO SHOPPING
            </button>
          </div>
          
        </div>
      </div>
    </>
  )
}

export default Cart