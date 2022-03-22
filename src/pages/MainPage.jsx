import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Advantage from '../components/advantage/Advantage'
import Blog from '../components/blog/Blog'
import Goods from '../components/goods/Goods.jsx'
import IntroMain from '../components/intro-main/IntroMain'
import News from '../components/news/News'
import SubscribeBlock from '../components/subcribe-block/SubscribeBlock'
import { getGoods } from '../store/goodsSlice'

const MainPage = () => {
  const dispatch = useDispatch()
  
  const {goods: {women, men}, isLoading, isError, errorMessage} = useSelector(state => state.goods)

  useEffect(() => {    
    if(!women.length && !men.length)
    dispatch(getGoods())
  }, [])

  return (
    <>
      <div className='container'>
        <IntroMain />
        <Advantage />        
        <Goods goodsType='women'
               goods={women}
               isLoading={isLoading} 
               isError={isError}
               errorMessage={errorMessage} 
                
        />
        <Goods goodsType='men'
               goods={men} 
               isLoading={isLoading} 
               isError={isError}
               errorMessage={errorMessage} 
        />
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
