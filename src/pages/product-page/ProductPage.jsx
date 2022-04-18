import React, {useEffect, useState} from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {Swiper, SwiperSlide} from 'swiper/react'
import { Navigation} from 'swiper'
import CategoryIntro from '../../components/category-intro/CategoryIntro'
import Card from '../../components/goods/card/Card'
import Rating from '../../components/rating/Rating'
import { addGoods, removeGoods } from '../../store/cartSlice'
import { getGoodsByCategory, getProduct } from '../../store/goodsSlice'
import Preloader from '../../components/preloader/Preloader'
import ThumbsSlider from '../../components/thumbs-slider/ThumbsSlider'
import Error from '../../components/error/Error'
import ReviewModal from './review-modal/ReviewModal'
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
import 'swiper/css'
import 'swiper/css/navigation'
import './ProductPage.scss'

const ProductPage = ({category}) => {  
  const {id} = useParams()  
  const dispatch = useDispatch()

  const initialProduct = {
    name: '', 
    price: null, 
    discount: '', 
    rating: null, 
    sizes: [], 
    reviews: [], 
    images: [], 
    material: ''}

  let {
    name, 
    price, 
    discount, 
    rating, 
    sizes, 
    reviews, 
    images, 
    material} = useSelector(state => {
      return state.goods.goods[category].find(el => el.id === id)
    }) || initialProduct

  const goods = useSelector(state => state.goods.goods[category])
  
  const {isLoading, isError, errorMessage} = useSelector(state => state.goods)

  useEffect(() => {
    if(!name) dispatch(getProduct({id}))    
  }, [id])

  useEffect(() => {
    if(!goods.length) {
      const goodsType = category
      dispatch(getGoodsByCategory({goodsType}))
    }    
  }, [category])
  
  const cartGoods = useSelector(state => state.cart.cartGoods) 
  
  const [size, setSize] = useState(sizes?.[0])
  const [color, setColor] = useState(images[0]?.color)
  const [isReviewOpen, setIsReviewOpen] = useState(false)
  
  useEffect(() => {
    setSize(sizes?.[0])
    setColor(images[0]?.color)
  }, [sizes, images])

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
    localStorage.setItem('cartGoodsLocal', JSON.stringify(cartGoods))
  }, [cartGoods])

  useEffect(() => {
    setSize(sizes?.[0])
    setColor(images[0]?.color)
  }, [id])

  const imgHost =`https://training.cleverland.by/shop`
  const partPhoto = images?.find(el => el.color === color)?.url
  const photo = `${imgHost}${partPhoto}`

  const getPriceWidthDisc = (price) => {
    if(discount) return (price - parseInt(discount.slice(1)) / 100 * price).toFixed(2)
    return price
  }
  const addGoodsToCart = (id, name, size, color, photo, price) => {
    setGoodsInCart(true)
    dispatch(addGoods({id, name, size, color, photo, price}))
  }

  const removeGoodsFromCart = (id, size, color) => {
    const newCartGoods = cartGoods.filter((el) => (
        el.id !== id ||
        el.size !== size ||
        el.color !== color
      )
    )
    setGoodsInCart(false)
    dispatch(removeGoods({newCartGoods}))
  }

  return (
    <>  
      <div data-test-id={`product-page-${category}`}>
        <CategoryIntro id={id} name={name} rating={rating} goodsType={category} reviews={reviews} />
        <div className="container">
          {
            isLoading 
            ? <Preloader />
            : !isError && <div className="detail">

              <ThumbsSlider imgHost={imgHost} images={images} />

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
                            {getPriceWidthDisc(price)}
                          </span>
                        </div>
                      : <span className='price-block__count_new' >$ {price}</span>
                    }   
                  </div>                                 
                  <button onClick={() => {
                    const finalPrice = getPriceWidthDisc(price)                  
                    goodsInCart
                    ? removeGoodsFromCart(id, size, color)
                    : addGoodsToCart(id, name, size, color, photo, finalPrice)}}
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

                <ReviewModal
                  id={id}
                  isReviewOpen={isReviewOpen}
                  setIsReviewOpen={setIsReviewOpen}
                />

                <div className="reviews">
                  REVIEWS
                  <div className="reviews__header">
                    <div className="reviews__rating">
                      <Rating rating={rating} />
                      <span>{reviews?.length} Reviews</span>
                    </div>
                    <div 
                      className="reviews__review"
                      onClick={() => setIsReviewOpen(true)}
                    >
                      <img 
                        src={message}
                        alt="message"
                        data-test-id='review-button'
                      />
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
          }
          {
            isError && <Error errorMessage={errorMessage} />
          }    

          <div className="related-prod">
            <div className="related-prod__header">
              <div className="header__title">RELATED PRODUCTS</div>
              <div className="header__arr">
                <img className='related-arr-prev' src={arrPrev} alt="arr" />
                <img className='related-arr-next' src={arrNext} alt="arr" />
              </div>
            </div>
            
            {
              isLoading
              ? <Preloader />
              : !isError && <div data-test-id='related-slider'>
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
                      goods.map(el => {
                        return (
                        <SwiperSlide key={el.id}>
                          <Card  {...el} />
                        </SwiperSlide>
                        )
                      })          
                    }              
                  </Swiper>      
                </div>
            }

            {
              isError && <Error errorMessage={errorMessage} />
            }
                       
          </div>          
        </div>
      </div>
    </>
  ) 
}

export default ProductPage
