import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import {GOODS} from './goods.js'
import Card from './card/Card'
import './Goods.scss'

const Goods = ({goodsType}) => {

  return (
    <div className='goods' data-test-id={`clothes-${goodsType}`}>
      <div className="goods-header">
        <div className="goods__title">{`${goodsType}'s`}</div>
        <ul className="goods-nav">
          <li className="goods-nav__link">
            <Link to='!#'>NEW ARRIVALS</Link>
          </li>
          <li className="goods-nav__link">
            <Link to='!#'>SPECIALS</Link>
          </li>
          <li className="goods-nav__link">
            <Link to='!#'>BESTSELLERS</Link>
          </li>
          <li className="goods-nav__link">
            <Link to='!#'>MOST VIEWED</Link>
          </li>
          <li className="goods-nav__link">
            <Link to='!#'>FEATURED PRODUCTS</Link>
          </li>
        </ul>
      </div>

      <div className="cards">
        {
          GOODS[goodsType] 
            ? GOODS[goodsType]
              .filter((el, ind) => ind < 8)
              .map(el => {
                return <Card key={el.id} {...el} />
              }) 
            : <h1>скоро в продаже</h1>
        }
      </div>
      <Link className='see-all' to={`goods/${goodsType}`}>SEE ALL</Link>
    </div>
  )
}

export default Goods