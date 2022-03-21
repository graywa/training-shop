import React, { useState } from 'react'
import './ThumbsSlider.scss'
import {Swiper, SwiperSlide} from 'swiper/react'
import { Navigation, Thumbs} from 'swiper'
import 'swiper/css'
import 'swiper/css/navigation'
import arrUp from './assets/arr-up.svg'
import arrDown from './assets/arr-down.svg'
import arrPrev from './assets/arr-prev.svg'
import arrNext from './assets/arr-next.svg'

const ThumbsSlider = ({imgHost, images}) => {  

  const [thumbsSwiper, setThumbsSwiper] = useState(null)

  return (
    <div className='detail__imgs' data-test-id='product-slider'>
      <div className='imgs-sm'>
        <div className='imgs-sm__arrows'>
          <img className='sm-arrows-up' src={arrUp} alt='arr' />
          <img className='sm-arrows-down' src={arrDown} alt='arr' />
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
          {images.map((el) => {
            return (
              <SwiperSlide key={el.id}>
                <img src={`${imgHost}${el.url}`} alt='sm-img' />
              </SwiperSlide>
            )
          })}
        </Swiper>
      </div>

      <div className='imgs-big'>
        <Swiper
          className='mainSwiper'
          modules={[Navigation, Thumbs]}
          spaceBetween={50}
          navigation={{
            nextEl: '.imgs-big__arr-next',
            prevEl: '.imgs-big__arr-prev',
          }}
          thumbs={{ swiper: thumbsSwiper }}
        >
          {images.map((el) => {
            return (
              <SwiperSlide key={el.id}>
                <img
                  className='imgs-big__big'
                  src={`${imgHost}${el.url}`}
                  alt='sm-img'
                />
              </SwiperSlide>
            )
          })}
        </Swiper>
        <img className='imgs-big__arr-prev' src={arrPrev} alt='arr' />
        <img className='imgs-big__arr-next' src={arrNext} alt='arr' />
      </div>
    </div>
  )
}

export default ThumbsSlider
