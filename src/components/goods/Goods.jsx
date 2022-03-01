import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import {GOODS} from './goods-data'
import Card from './card/Card'
import './Goods.scss'

const GOODS_NAV_MENU = [
  {
    particularName: 'isNewArrivals',
    name: 'NEW ARRIVALS',
  },
  {
    particularName: 'isSpecial',
    name: 'SPECIALS',
  },
  {
    particularName: 'isBestseller',
    name: 'BESTSELLERS',
  },
  {
    particularName: 'isMostViewed',
    name: 'MOST VIEWED',
  },
  {
    particularName: 'isFeatured',
    name: 'FEATURED PRODUCTS',
  },
]

const Goods = ({goodsType}) => {
  const [particular, setParticular] = useState('isNewArrivals')

  return (
    <div className='goods' data-test-id={`clothes-${goodsType}`}>
      <div className="goods-header">
        <div className="goods__title">{`${goodsType}'s`}</div>
        <ul className="goods-nav">
          {
            GOODS_NAV_MENU.map(el => {
              return (
                <li key={el.name} className={particular === el.particularName ? "goods-nav__link active" : "goods-nav__link"}
                onClick={() => setParticular(el.particularName)}
                >
                  {el.name}
                </li>
            )})
          } 
        </ul>
      </div>

      <div className="cards">
        {
          GOODS[goodsType] 
            ? GOODS[goodsType]
              .filter(el => el.particulars[particular])
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