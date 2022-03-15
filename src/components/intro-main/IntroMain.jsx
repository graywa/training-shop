import React from 'react'
import WhiteBlock from '../white-block/WhiteBlock'
import './IntroMain.scss'
import arrNext from './assets/arr-next.svg'
import arrPrev from './assets/arr-prev.svg'
import girl from './assets/girl.jpg'
import {Swiper, SwiperSlide} from 'swiper/react'
import { Navigation } from 'swiper'
import 'swiper/css/bundle'

const IntroMain = () => {
  return (
    <div className='intro'>
      <div className='intro__slider' data-test-id='main-slider'>
        <img className='intro__arr-prev' width={40} src={arrPrev} alt="arr" />
        
        <img className='intro__arr-next' width={40} src={arrNext} alt="arr" />        
        <Swiper
          modules={[Navigation]}
          spaceBetween={50}
          slidesPerView={1}
          navigation={{
              nextEl: '.intro__arr-next',
              prevEl: '.intro__arr-prev',
          }}          
        >
          <SwiperSlide>
            <WhiteBlock path={'!#'} subtitle={'baner'} title={'your title text'} />
            <img className='intro__banner-img' src={girl} alt="banner" />
          </SwiperSlide>
          <SwiperSlide>
            <WhiteBlock path={'!#'} subtitle={'baner'} title={'your title text'} /> 
            <img className='intro__banner-img' src={girl} alt="banner" />
          </SwiperSlide>
          <SwiperSlide>
            <WhiteBlock path={'!#'} subtitle={'baner'} title={'your title text'} />
            <img className='intro__banner-img' src={girl} alt="banner" />
          </SwiperSlide>
        </Swiper>            
      </div>
    
      <div className="intro__cotegories">
        <div className="intro__women-men">
          <div className="intro__women">
            <WhiteBlock path={'/goods/women'} title='momen' />
          </div>
          <div className="intro__men">
            <WhiteBlock path={'/goods/men'} title={'men'} />
          </div>
        </div>
        <div className="intro__accessories">
          <WhiteBlock path={'/goods/accessories'} title='accessories' />            
        </div>
      </div>
    </div>
  )
}

export default IntroMain