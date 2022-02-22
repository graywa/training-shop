import React, {useState} from 'react'
import { useParams } from 'react-router-dom'
import CategoryIntro from '../../components/category-intro/CategoryIntro'
import Footer from '../../components/footer/Footer'
import './ProductPage.scss'
import small1 from './assets/small1.png'
import small2 from './assets/small2.png'
import small3 from './assets/small3.png'
import small4 from './assets/small4.png'
import arrUp from './assets/arr-up.svg'
import arrDown from './assets/arr-down.svg'
import big from './assets/big.jpg'
import arrPrev from './assets/arr-prev.svg'
import arrNext from './assets/arr-next.svg'
import color1 from './assets/color1.png'
import color2 from './assets/color2.png'
import color3 from './assets/color3.png'
import color4 from './assets/color4.png'
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
import ratingImg from './assets/rating.svg'
import message from './assets/message.svg'
import { relatedProd } from './related-products'
import Card from '../../components/goods/card/Card'
import { GOODS } from '../../components/goods/goods'
import {Swiper, SwiperSlide} from 'swiper/react'
import { Navigation, Thumbs} from 'swiper'
import 'swiper/css'
import 'swiper/css/navigation'

const ProductPage = () => {  

  const {id, category} = useParams()
  const [thumbsSwiper, setThumbsSwiper] = useState(null)

  console.log(thumbsSwiper)

  const {name, price, rating, sizes, reviews, images} = GOODS[category].find(el => el.id === id)

  const bigImg =`https://training.cleverland.by/shop${images[0]?.url}`

  return (
    <>  
      <div data-test-id={`product-page-${category}`}>
        <CategoryIntro id={id} name={name} rating={rating} goodsType={category} />
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
                    <SwiperSlide>
                      <img src={bigImg} alt="sm-img" />
                    </SwiperSlide>
                    <SwiperSlide>
                      <img src={bigImg} alt="sm-img" />
                    </SwiperSlide>
                    <SwiperSlide>
                      <img src={bigImg} alt="sm-img" />
                    </SwiperSlide>
                    <SwiperSlide>
                      <img src={bigImg} alt="sm-img" />
                    </SwiperSlide>
                    <SwiperSlide>
                      <img src={bigImg} alt="sm-img" />
                    </SwiperSlide>
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
                    <SwiperSlide>
                      <img className='imgs-big__big' src={bigImg} alt="big-img" />
                    </SwiperSlide>
                    <SwiperSlide>
                      <img className='imgs-big__big' src={bigImg} alt="big-img" />
                    </SwiperSlide>
                    <SwiperSlide>
                      <img className='imgs-big__big' src={bigImg} alt="big-img" />
                    </SwiperSlide>
                    <SwiperSlide>
                      <img className='imgs-big__big' src={bigImg} alt="big-img" />
                    </SwiperSlide>
                    <SwiperSlide>
                      <img className='imgs-big__big' src={bigImg} alt="big-img" />
                    </SwiperSlide>
                  </Swiper>  
                <img className='imgs-big__arr-prev' src={arrPrev} alt="arr" />
                <img className='imgs-big__arr-next' src={arrNext} alt="arr" />
              </div>
            </div>



            <div className="detail__description">
              <div className="colors-block">
                <div><span>COLOR: </span>Blue</div> 
                <div className='colors-block__list'>
                  <img src={color1} alt="color" />
                  <img src={color2} alt="color" />
                  <img src={color3} alt="color" />
                  <img src={color4} alt="color" />
                </div>              
              </div>
              <div className="sizes-block">
                <div><span>SIZE: </span>S</div> 
                <div className="sizes-block__btns">
                  {
                    sizes.map((el, ind ) => {
                      return <button key={ind}><span>{el}</span></button>
                    })
                  }                
                  
                </div>
                <div className="hanger">
                  <img src={hanger} alt="hanger" />
                  <span>Size guide</span>
                </div>
                
              </div>
              <div className="price-block">
                <span>$ {price}</span>
                <button>ADD TO CARD</button>
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
                <div>Color: <span>Blue, White, Black, Gray</span></div>
                <div>Size: <span>XS, S, M, L</span></div>
                <div>Material: <span>100% Polyester</span></div>
              </div>
              <div className="reviews">
                REVIEWS
                <div className="reviews__rating-review">
                  <div className="reviews__rating">
                    <img src={ratingImg} alt="rating" />
                    <span>2 Reviews</span>
                  </div>
                  <div className="reviews__review">
                    <img src={message} alt="message" />
                    <span>Write a review</span>
                  </div>
                </div>
                <div className="reviews__title-age">
                  <div className="reviews__title">Oleh Chabanov</div>
                  <div className="reviews__age">
                    <span>3 manths ago</span>
                    <img width={70} src={ratingImg} alt="rating" />
                  </div>
                </div>
                <div className="reviews__text">
                  <p>
                  On the other hand, we denounce with righteous indignation and like men who are so beguiled and demoralized by the charms of pleasure of the moment
                  </p>
                </div>
                <div className="reviews__title-age">
                  <div className="reviews__title">ShAmAn design</div>
                  <div className="reviews__age">
                    <span>3 months ago</span>
                    <img width={70} src={ratingImg} alt="rating" />
                  </div>
                </div>
                <div className="reviews__text">
                  <p>
                  At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti
                  </p>
                </div>
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
            <div data-test-id='product-slider'>
              <Swiper
                className='relatedSwiper'
                modules={[Navigation]}
                spaceBetween={50}
                slidesPerView={4}
                slidesPerGroup={1}
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
