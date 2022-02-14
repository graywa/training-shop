import React from 'react'
import { useParams } from 'react-router-dom'
import AllGoods from '../components/all-goods/AllGoods'
import CategoryIntro from '../components/category-intro/CategoryIntro'
import Footer from '../components/footer/Footer'

const CategoryPage = () => {

  const {category} = useParams()

  return (
    <>
      <div data-test-id={`products-page-${category}`}>
        <CategoryIntro goodsType={category} />
        <AllGoods goodsType={category}/>
      </div>      
      <Footer />
    </>
  )
}

export default CategoryPage