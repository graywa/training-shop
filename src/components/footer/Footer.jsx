import React from 'react'
import './Footer.scss'
import SocialNetworks from "../social-networks/SocialNetworks"
import { Link } from 'react-router-dom'
import location from './assets/location.svg'
import phone from './assets/phone.svg'
import clock from './assets/clock.svg'
import mail from './assets/mail.svg'
import stripe from './assets/stripe.svg'
import aes from './assets/aes.svg'
import paypal from './assets/paypal.svg'
import visa from './assets/visa.svg'
import mastercard from './assets/mastercard.svg'
import discover from './assets/discover.svg'
import americanexpress from './assets/americanexpress.svg'
import SubscribeForm from '../../subscribe-form/SubscribeForm'

const Footer = () => {
  return (
    <div className='footer' data-test-id='footer'>
      <div className="footer-bar">
        <div className="container">
          <div className="contact-us">
            <div className="contact-us__title">BE IN TOUCH WITH US:</div>
            <SubscribeForm 
              description='footer'
              formClass='footer-form'
              inputClass='footer-form__input'
              messageClass='footer-form__message'
              buttonClass='footer-form__btn'
              loaderClass='footer-form__loader'
              buttonText='JOIN US'
              testInput='footer-mail-field'
              testButton='footer-subscribe-mail-button'
            />            
            <SocialNetworks size={18} />
          </div>
        </div>
      </div>  

      <div className="container">
        <div className="footer-nav">
          <ul className="footer-nav__group">
            <li className="footer-nav__title">CATEGORIES</li>
            <li className="footer-nav__item">
              <Link to='/men' data-test-id={`footer-nav-link-men`}>
                Men
              </Link>
            </li>
            <li className="footer-nav__item">
              <Link to='/women' data-test-id={`footer-nav-link-women`}>
                Women
              </Link>
            </li>
            <li className="footer-nav__item">
              <Link to='/accessories' data-test-id={`footer-nav-link-#`}>
                Accessories
              </Link>
            </li>
            <li className="footer-nav__item">
              <Link to='/beauty' data-test-id={`footer-nav-link-#`}>
                Beauty
              </Link>
            </li>
          </ul>
          <ul className="footer-nav__group">
            <li className="footer-nav__title">INFORMATION</li>
            <li className="footer-nav__item">
              <Link to='/about' data-test-id={`footer-nav-link-#`}>
                About Us
              </Link>
            </li>
            <li className="footer-nav__item">
              <Link to='/contact' data-test-id={`footer-nav-link-#`}>
                Contact Us
              </Link>
            </li>
            <li className="footer-nav__item">
              <Link to='/blog' data-test-id={`footer-nav-link-#`}>
                Blog
              </Link>
            </li>
            <li className="footer-nav__item">
              <Link to='/faq' data-test-id={`footer-nav-link-#`}>
                FAQs
              </Link>
            </li>
          </ul>
          <ul className="footer-nav__group">
            <li className="footer-nav__title">USEFUL LINKS</li>
            <li className="footer-nav__item">
              <Link to='!!!' data-test-id={`footer-nav-link-#`}>
                Terms & Conditions
              </Link>
            </li>
            <li className="footer-nav__item">
              <Link to='!!!' data-test-id={`footer-nav-link-#`}>
                Returns & Exchanges
              </Link>
            </li>
            <li className="footer-nav__item">
              <Link to='!!!' data-test-id={`footer-nav-link-#`}>
                Shepping & Delivery
              </Link>
            </li>
            <li className="footer-nav__item">
              <Link to='!!!' data-test-id={`footer-nav-link-#`}>
                Privacy Policy
              </Link>
            </li>
          </ul>
          <ul className="footer-nav__group">
            <li className="footer-nav__title">CONTACT US</li>
            <li className="footer-nav__item">
              <img src={location} alt="location" />
              <span>Belarus, Gomel, Lange 17</span> 
            </li>
            <li className="footer-nav__item">
              <img src={phone} alt="location" />
              +375 29 100 20 30
            </li>
            <li className="footer-nav__item">
              <img src={clock} alt="location" />
              All weak 24/7
            </li>
            <li className="footer-nav__item">
              <img src={mail} alt="location" />
              info@clevertec.ru
            </li>
          </ul>
        </div>  
      </div>

      <div className="footer-footer">
        <div className="footer-footer__bg">
          <div className="container">
            <div className="footer-footer__content">
              <div className="footer-footer__text">Copyright ?? 2032 all rights reserved</div>
              <div className="footer-footer__services">
                  <img src={stripe} alt="" />
                  <img src={aes} alt="" />
                  <img src={paypal} alt="" />
                  <img src={visa} alt="" />
                  <img src={mastercard} alt="" />                  
                  <img src={discover} alt="" />                  
                  <img src={americanexpress} alt="" />                  
              </div>
              <div className="footer-footer__text">
                Clevertec.ru/training
              </div>
            </div>
            
          </div>
        </div>        
      </div>
    </div>
  )
}

export default Footer