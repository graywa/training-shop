import React from 'react'
import { Link } from 'react-router-dom'
import WhiteBlock from '../white-block/WhiteBlock'
import './IntroMain.scss'
import arrNext from './assets/arr-next.svg'
import arrPrev from './assets/arr-prev.svg'
import girl from './assets/girl.jpg'


const IntroMain = () => {
  return (
    <div className='intro'>
      <div className='intro__slider'>
        <img className='intro__banner-img' src={girl} alt="banner" />
        <img className='intro__arr-prev' width={40} src={arrPrev} alt="arr" />
        <WhiteBlock path={'#'} subtitle={'baner'} title={'your title text'} />
        <img className='intro__arr-next' width={40} src={arrNext} alt="arr" />
      </div>
    
      <div className="intro__cotegories">
        <div className="intro__women-men">
          <div className="intro__women">
            <WhiteBlock path={'/women'} title='momen' />
          </div>
          <div className="intro__men">
            <WhiteBlock path={'/men'} title={'men'} />
          </div>
        </div>
        <div className="intro__accessories">
          <WhiteBlock path={'#'} title='accessories' />            
        </div>
      </div>
    </div>
  )
}

export default IntroMain