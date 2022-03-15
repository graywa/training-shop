import React, {useEffect, useState} from 'react'
import { useParams } from 'react-router-dom'
import CategoryIntro from '../../components/category-intro/CategoryIntro'
import './ProductPage.scss'
import arrUp from './assets/arr-up.svg'
import arrDown from './assets/arr-down.svg'
import arrPrev from './assets/arr-prev.svg'
import arrNext from './assets/arr-next.svg'
import hanger from './assets/hanger.svg'
import heart from './assets/heart.svg'
import scales from './assets/scales.svg'
import car from './assets/car.svg'
import refresh from './assets/refresh.svg'
import mail from './assets/mail.svg'
import stripe from './assets/stripe.svg'
import aes from './assets/aes.svg'
import paypal from './assets/paypal.svg'
import visa from './assets/visa.svg'
import mastercard from './assets/mastercard.svg'
import discover  from './assets/discover.svg'
import americanexpress  from './assets/american-express.svg'
import message from './assets/message.svg'
import { relatedProd } from './related-products'
import Card from '../../components/goods/card/Card'
import { GOODS } from '../../components/goods/goods-data'
import {Swiper, SwiperSlide} from 'swiper/react'
import { Navigation, Thumbs} from 'swiper'
import 'swiper/css'
import 'swiper/css/navigation'
import Rating from '../../components/rating/Rating'
import { useDispatch, useSelector } from 'react-redux'
import { addGoods, removeGoods } from '../../store/cartSlice'

const ProductPage = () => { 
  const {id, category} = useParams()
  const {name, price, discount, rating, sizes, reviews, images, material} = GOODS[category].find(el => el.id === id)
  const cartGoods = useSelector(state => state.cart.cartGoods)
  const dispatch = useDispatch()

  const [thumbsSwiper, setThumbsSwiper] = useState(null)
  const [size, setSize] = useState(sizes?.[0])
  const [color, setColor] = useState(images[0]?.color)

  const checkGoodsInCart = () => {
    return cartGoods?.some(el => {
      return el.id === id && el.color === color & el.size === size
    })
  }
  const [goodsInCart, setGoodsInCart] = useState(checkGoodsInCart())

  useEffect(() => {
    setGoodsInCart(checkGoodsInCart())
  }, [cartGoods, id, color, size])

  useEffect(() => {
    setSize(sizes?.[0])
    setColor(images[0]?.color)
  }, [id])

  const imgHost =`https://training.cleverland.by/shop`
  const partPhoto = images?.find(el => el.color === color)?.url
  const photo = `${imgHost}${partPhoto}`

  const addGoodsToCart = (id, name, size, color, photo, price) => {
    setGoodsInCart(true)
    dispatch(addGoods({id, name, size, color, photo, price}))
  }

  const removeGoodsFromCart = (id, size, color) => {
    setGoodsInCart(false)
    dispatch(removeGoods({id, size, color}))
  }

  return (
    <>  
      <div data-test-id={`product-page-${category}`}>
        <CategoryIntro id={id} name={name} rating={rating} goodsType={category} reviews={reviews} />
        <div className="container">
          <div className="detail">
            <div className="detail__imgs" data-test-id='product-slider'>

              <div className="imgs-sm">
                <div className="imgs-sm__arrows">
                  <img className='sm-arrows-up' src={arrUp} alt="arr" />
                  <img className='sm-arrows-down' src={arrDown} alt="arr" />
                </div>
                <Swiper
                  className='thumbsSwiper'
                  onSwiper={setThumbsSwiper}
                  modules={[Navigation, Thumbs]}
                  slidesPerView={4}
                  slidesPerGroup={1}
                  navigation={{
                    nextEl: '.sm-arrows-down',
                    prevEl: '.sm-arrows-up',
                  }}  
                  direction={'vertical'}               
                >
                  {images
                    .map(el => {
                      return (
                        <SwiperSlide key={el.id}>
                          <img src={`${imgHost}${el.url}`} alt="sm-img" />
                        </SwiperSlide>
                      )
                  })}
                </Swiper>
              </div>

              <div className="imgs-big">                
                  <Swiper
                    className='mainSwiper'
                    modules={[Navigation, Thumbs]}
                    spaceBetween={50}
                    navigation={{
                        nextEl: '.imgs-big__arr-next', 
                        prevEl: '.imgs-big__arr-prev',
                    }}
                    thumbs={{swiper: thumbsSwiper}}
                  >
                    {images
                      .map(el => {
                        return (
                          <SwiperSlide key={el.id}>
                            <img className='imgs-big__big' src={`${imgHost}${el.url}`} alt="sm-img" />
                          </SwiperSlide>
                        )
                    })}
                  </Swiper>  
                <img className='imgs-big__arr-prev' src={arrPrev} alt="arr" />
                <img className='imgs-big__arr-next' src={arrNext} alt="arr" />
              </div>
            </div>

            <div className="detail__description">
              <div className="colors-block">
                <div><span>COLOR: </span>{color}</div> 
                <div className='colors-block__list'>
                  {
                    images.map((el, ind) => {
                      if(images[ind].color === images[ind - 1]?.color) return
                      return (
                        <img key={el.id} 
                             src={`${imgHost}${el.url}`}
                             alt="color" 
                             className={color === el.color ? 'colors-block__list-item active' : 'colors-block__list-item'}
                             onClick={() => setColor(el.color)}
                        />
                      )
                    })
                  }
                </div>              
              </div>
              <div className="sizes-block">
                <div><span>SIZE: </span>{size}</div> 
                <div className="sizes-block__btns">
                  {
                    sizes.map((el, ind ) => {
                      return (
                        <button key={ind} onClick={() => setSize(el)}
                                className={size === el ? 'btn active' : 'btn'}
                        >
                          <span>{el}</span>
                        </button>
                      )
                    })
                  }                
                </div>
                <div className="hanger">
                  <img src={hanger} alt="hanger" />
                  <span>Size guide</span>
                </div>
                
              </div>
              <div className="price-block">
                <div className="price-block__count">
                  {
                    discount 
                    ? <div>
                        <span className='price-block__count_old' >$ {price}</span>
                        <span className='price-block__count_new' > 
                          $ {Math.ceil(price - parseInt(discount.slice(1))/100 * price)}
                        </span>
                      </div>
                    : <span className='price-block__count_new' >$ {price}</span>
                  }   
                </div>                                 
                <button onClick={() => {
                  goodsInCart
                  ? removeGoodsFromCart(id, size, color)
                  : addGoodsToCart(id, name, size, color, photo, price)}}
                  data-test-id='add-cart-button'
                >
                  {goodsInCart
                    ? 'REMOVE FROM CART'
                    : 'ADD TO CART'
                  }
                  
                </button>
                <div className="price-block__icons">
                  <img src={heart} alt="heart" />
                  <img src={scales} alt="scales" />
                </div>              
              </div>
              <div className="services-block">
                <div className="services-block__item">
                  <img src={car} alt="car" />
                  Shipping & Delivery
                </div>
                <div className="services-block__item">
                  <img src={refresh} alt="refresh" />
                  Returns & Exchanges
                </div>
                <div className="services-block__item">
                  <img src={mail} alt="mail" />
                  Ask a question
                </div>
              </div>
              <div className="guarantees-block">
                <div className="guarantees-block__title">
                  <span>guaranteed safe checkout</span>
                  <div></div>
                </div>
                <div className="guarantees-block__services">
                  <img src={stripe} alt="stripe" />
                  <img src={aes} alt="aes" />
                  <img src={paypal} alt="paypal" />
                  <img src={visa} alt="visa" />
                  <img src={mastercard} alt="mastercard" />
                  <img src={discover} alt="discover" />
                  <img src={americanexpress} alt="americanexpress" />
                </div>
              </div>
              <div className="description-block">
                DESCRIPTION
              </div>
              <div className="add-info">
                <div className="add-info__title">
                  ADDITIONAL INFORMATION
                </div>
                <div>Colors: 
                  <span>
                    {images
                      .map((el, ind) => {
                        if(images[ind].color === images[ind - 1]?.color) return
                        return ` ${el.color},`                      
                      })
                      .join('')
                    }
                  </span>
                </div>
                <div>Sizes: <span>{sizes.join(', ')}</span></div>
                <div>Material: <span>{material}</span></div>
              </div>
              <div className="reviews">
                REVIEWS
                <div className="reviews__header">
                  <div className="reviews__rating">
                    <Rating rating={rating} />
                    <span>{reviews?.length} Reviews</span>
                  </div>
                  <div className="reviews__review">
                    <img src={message} alt="message" />
                    <span>Write a review</span>
                  </div>
                </div>
                {reviews.map(el => {
                  return (
                    <div className='reviews__item' key={el.id}>
                      <div className="reviews__item-header">
                        <div className="reviews__title">{el.name}</div>
                        <div className="reviews__rating">
                          <Rating rating={el.rating} />
                        </div>
                      </div>
                      <div className="reviews__text">
                        <p>{el.text}</p>
                      </div>
                    </div>                     
                  )
                })}
              </div>
            </div>
          </div>

          <div className="related-prod">
            <div className="related-prod__header">
              <div className="header__title">RELATED PRODUCTS</div>
              <div className="header__arr">
                <img className='related-arr-prev' src={arrPrev} alt="arr" />
                <img className='related-arr-next' src={arrNext} alt="arr" />
              </div>
            </div>
            <div data-test-id='related-slider'>
              <Swiper
                className='relatedSwiper'
                modules={[Navigation]}
                spaceBetween={50}
                navigation={{
                    nextEl: '.related-arr-next',
                    prevEl: '.related-arr-prev',
                }} 
                breakpoints={{
                  220: {slidesPerView: 1},
                  480: {slidesPerView: 2},
                  800: {slidesPerView: 3},
                  1100: {slidesPerView: 4},
                }}        
              >
                {
                  relatedProd.map(el => {
                    return (
                    <SwiperSlide key={el.id}>
                      <Card  {...el} />
                    </SwiperSlide>
                    )
                  })          
                }              
              </Swiper>      
            </div>           

          </div>          
        </div>
      </div>
    </>
  ) 
}

export default ProductPage
