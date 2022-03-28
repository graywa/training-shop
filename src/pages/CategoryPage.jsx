import React from 'react'
import AllGoods from '../components/all-goods/AllGoods'
import CategoryIntro from '../components/category-intro/CategoryIntro'

const CategoryPage = ({category}) => {

  return (
    <div data-test-id={`products-page-${category}`}>
      <CategoryIntro goodsType={category} />
      <AllGoods goodsType={category}/>
    </div>      
  )
}

export default CategoryPage