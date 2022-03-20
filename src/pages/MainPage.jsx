import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import Advantage from '../components/advantage/Advantage'
import Blog from '../components/blog/Blog'
import Goods from '../components/goods/Goods.jsx'
import IntroMain from '../components/intro-main/IntroMain'
import News from '../components/news/News'
import SubscribeBlock from '../components/subcribe-block/SubscribeBlock'
import { getGoods, getProduct } from '../store/goodsSlice'

const MainPage = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    let id = '620126dda5293589353a9c74'
    dispatch(getProduct({id}))
  }, [])

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
