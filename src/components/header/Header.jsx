import React, { useEffect, useState } from 'react'
import logo from './assets/logo.svg'
import phone from './assets/phone.svg'
import clock from './assets/clock.svg'
import locationMarker from './assets/location-marker.svg'
import search from './assets/search.svg'
import planet from './assets/planet.svg'
import user from './assets/user.svg'
import cart from './assets/cart.svg'
import bin from './assets/bin.svg'
import minus from './assets/minus.svg'
import plus from './assets/plus.svg'
import cross from './assets/cross.svg'
import './Header.scss'
import SocialNetworks from '../social-networks/SocialNetworks'
import { Link, useLocation } from 'react-router-dom'
import { Links } from './Links'
import { useDispatch, useSelector } from 'react-redux'
import { removeGoods, changeQuantityGoods } from '../../store/cartSlice'


const Header = () => {  
  const {pathname} = useLocation()
  const [isOpenMenu, setIsOpenMenu] = useState(false)
  const [isOpenCart, setIsOpenCart] = useState(false)
  const dispatch = useDispatch()

  const cartGoods = useSelector(state => state.cart.cartGoods)

  useEffect(() => {    
    const scrollWidth = window.innerWidth - document.body.offsetWidth
    document.body.style.overflow = isOpenMenu || isOpenCart ? 'hidden' : 'visible'
    document.body.style.paddingRight = isOpenMenu || isOpenCart ? `${scrollWidth}px` : ''
  }, [isOpenMenu, isOpenCart])

  useEffect(() => {
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        setIsOpenMenu(false)
        setIsOpenCart(false)
      }
    })
  }, [])

  const changeQuantityHandler = (quantity, id , color, size) => {
    if (quantity <= 0) return
    dispatch(changeQuantityGoods({quantity, id, color, size}))
  }

  return (
    <header className='header' data-test-id='header'>
      <div className="top-bar">
        <div className="container">
          <div className="wrapper">
            <div className="about-company">
              <div className="about-company__item">
                <img width={14} src={phone} alt="phone" />
                <span>+375 29 100 20 30</span>
              </div>
              <div className="about-company__item">
                <img width={14} src={locationMarker} alt="locationMarker" />
                <span>Belarus, Gomel, Lange 17</span>
              </div>
              <div className="about-company__item">
                <img width={14} src={clock} alt="clock" />
                <span>All week 24/7</span>               
              </div>
            </div>
            <SocialNetworks size={12} />  
          </div>                  
        </div>
      </div>

      <div className="nav-menu">
        <div className="container">
          <nav className="nav">
            <div className="nav__logo" data-test-id='header-logo-link'>
              <Link to='/'>
                <img width={150} src={logo} alt="logo" />
              </Link>
            </div>

            <ul className="nav__list" data-test-id='menu'>              
              {Links.map(el => {
                return <li key={el.title}>
                  <Link 
                    to={`/${el.path}`} 
                    className = {pathname.slice(1) === el.title.toLowerCase() 
                      ? 'nav__item nav__item_active' : 'nav__item'}
                    data-test-id={`menu-link-${el.path.slice(6)}`}                    
                  >
                    {el.title}
                  </Link>
                  </li>
              })}
            </ul>

            <div className='btns'>
              <ul className="nav__btns">
                <li className="nav__btns-item">
                  <Link to='/!!!'><img src={search} alt="search" /></Link>
                </li>
                <li className="nav__btns-item">
                  <Link to='/!!!'><img width={24} src={planet} alt="planet" /></Link>
                </li>
                <li className="nav__btns-item">
                  <Link to='/!!!'><img width={24} src={user} alt="user" /></Link>
                </li>
                <li className="nav__btns-item">
                  <span className='cart-btn' 
                        onClick={() => setIsOpenCart(!isOpenCart)}
                  >
                    <img  width={24} src={cart} alt="cart" />
                    {cartGoods.length
                      ? <span className='cart-quantity'>{cartGoods.length}</span>
                      : ''
                    }
                  </span>
                </li>
              </ul>

              <div className={isOpenCart ? "modal open" : "modal"} 
                  onClick={() => setIsOpenCart(false)}                                
              >
                <div className="cart__content"
                    onClick={(e) => e.stopPropagation()}
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
                              <div key={id} className="cart__item">
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
                                      >
                                        <img src={minus} alt="minus" />
                                      </button>
                                      <span className="quantity__value">{quantity}</span>
                                      <button className="quantity__incr"
                                        onClick={() => dispatch(changeQuantityGoods({quantity: quantity + 1, id, color, size}))}
                                      >
                                        <img src={plus} alt="plus" />
                                      </button>
                                    </div>
                                    <div className="item__price">${Math.trunc(price*quantity)}</div>
                                    <div className="cart__bin"
                                        onClick={() => dispatch(removeGoods({id, color, size}))}
                                    >
                                      <img src={bin} alt="bin" />
                                    </div>
                                  </div>
                                </div>
                              </div>
                          )})
                        : <span className="cart__epmty">Your cart is empty</span>
                      }
                    </div>

                    <div className="cart__total">
                      <span>Total</span>
                      <span>
                        {Math.trunc(cartGoods.reduce((acc, el) => acc + el.quantity * el.price, 0))}
                      </span>
                    </div>
                    <button className="">FURTHER</button>
                    <button className="">BACK TO SHOPPING</button>
                  </div>
                  
                </div>
              </div>

              <div className={isOpenMenu ? "burger-menu open" : "burger-menu"}  
                    onClick={() => setIsOpenMenu(!isOpenMenu)}
                    data-test-id='burger-menu-btn'                    
              >
                <span></span>
                <span></span>
                <span></span>
              </div>  

              <div className={isOpenMenu ? "modal open" : "modal"} 
                  onClick={() => setIsOpenMenu(false)}                                
              >
                <div className="modal__content"
                     onClick={(e) => e.stopPropagation()}
                     data-test-id='burger-menu'
                >
                  <ul className="modal-nav__list" >              
                    {Links.map(el => {
                      return <li key={el.title} onClick={() => setIsOpenMenu(false)}>
                        <Link 
                          to={`/${el.path}`} 
                          className = {pathname.slice(1) === el.title.toLowerCase() 
                            ? 'nav__item nav__item_active' : 'nav__item'}
                          data-test-id={`menu-link-${el.path.slice(6)}`}                    
                        >
                          {el.title}
                        </Link>
                        </li>
                    })}
                  </ul>
                </div>
              </div>

            </div> 
          </nav>
        </div>
      </div> 
      
    </header> 
  )
}

export default Header