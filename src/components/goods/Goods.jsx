import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import {menGoods} from './men-goods'
import {womenGoods} from './women-goods'
import Card from './card/Card'
import './Goods.scss'

const Goods = ({goodsType}) => {
  let goods = goodsType === 'men' ? menGoods : womenGoods

  return (
    <div className='goods' data-test-id={`clothes-${goodsType}`}>
      <div className="goods-header">
        <div className="goods__title">{`${goodsType}'s`}</div>
        <ul className="goods-nav">
          <li className="goods-nav__link">
            <Link to='#'>NEW ARRIVALS</Link>
          </li>
          <li className="goods-nav__link">
            <Link to='#'>SPECIALS</Link>
          </li>
          <li className="goods-nav__link">
            <Link to='#'>BESTSELLERS</Link>
          </li>
          <li className="goods-nav__link">
            <Link to='#'>MOST VIEWED</Link>
          </li>
          <li className="goods-nav__link">
            <Link to='#'>FEATURED PRODUCTS</Link>
          </li>
        </ul>
      </div>

      <div className="cards">
        {
          goods.map(el => {
            return <Card key={el.id} {...el} />
          })          
        }
      </div>
      <Link className='see-all' to={`/${goodsType}`}>SEE ALL</Link>
    </div>
  )
}

export default Goods