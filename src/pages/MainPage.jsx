import React from 'react'
import Advantage from '../components/advantage/Advantage'
import Blog from '../components/blog/Blog'
import Footer from '../components/footer/Footer'
import Goods from '../components/goods/Goods.jsx'
import IntroMain from '../components/intro-main/IntroMain'
import News from '../components/news/News'
import SubscribeBlock from '../components/subcribe-block/SubscribeBlock'

const MainPage = () => {
  return (
    <>
      <div className='container'>
        <IntroMain />
        <Advantage />
        <Goods goodsType='women' />
        <Goods goodsType='men' />
        <News />
      </div>
      <SubscribeBlock />  
      <div className="container">
        <Blog />
      </div>  
    </>

  ) 
}

export default MainPage
