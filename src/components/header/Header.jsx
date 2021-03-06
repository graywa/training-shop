import React, { useEffect, useState } from 'react'
import logo from './assets/logo.svg'
import phone from './assets/phone.svg'
import clock from './assets/clock.svg'
import locationMarker from './assets/location-marker.svg'
import search from './assets/search.svg'
import planet from './assets/planet.svg'
import user from './assets/user.svg'
import cart from './assets/cart.svg'
import './Header.scss'
import SocialNetworks from '../social-networks/SocialNetworks'
import { Link, useLocation } from 'react-router-dom'
import { Links } from './Links'
import { useSelector } from 'react-redux'
import Cart from './cart/Cart'


const Header = () => {  
  const {pathname} = useLocation()
  const [isOpenMenu, setIsOpenMenu] = useState(false)
  const [isOpenCart, setIsOpenCart] = useState(false)  
  const [isAddOpenCart, setIsAddOpenCart] = useState(false)

  let cartGoods = useSelector(state => state.cart.cartGoods)

  useEffect(() => {    
    const scrollWidth = window.innerWidth - document.body.offsetWidth
    document.body.style.overflow = isOpenMenu || isOpenCart ? 'hidden' : 'visible'
    document.body.style.paddingRight = isOpenMenu || isOpenCart ? `${scrollWidth}px` : ''
  }, [isOpenMenu, isOpenCart])

  const openCartModal = () => {
    setIsOpenCart(true)
    setTimeout(() => {
      setIsAddOpenCart(true)
    },0)
  }

  const closeCartModal = () => {
    setIsAddOpenCart(false)
    setTimeout(() => {
      setIsOpenCart(false)
    },200)
  }

  useEffect(() => {
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        setIsOpenMenu(false)
        closeCartModal(false)
      }
    })
  }, [])



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
                    data-test-id={`menu-link-${el.path}`}                    
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
                        onClick={openCartModal}
                        data-test-id='cart-button'
                  >
                    <img  width={24} src={cart} alt="cart" />
                    {cartGoods?.length
                      ? <span className='cart-quantity'>{cartGoods.length}</span>
                      : ''
                    }
                  </span>
                </li>
              </ul>

              {isOpenCart && (
                <Cart 
                  isAddOpenCart={isAddOpenCart}
                  closeCartModal={closeCartModal}
                  cartGoods={cartGoods} 
                />
              )}
              

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
                          data-test-id={`menu-link-${el.path}`}                    
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