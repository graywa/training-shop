import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Card from './card/Card'
import './Goods.scss'
import Preloader from '../preloader/Preloader'
import Error from '../error/Error'

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

const Goods = ({goodsType, goods, isLoading, isError, errorMessage}) => {
  const [particular, setParticular] = useState(GOODS_NAV_MENU[0].particularName)

  return (
    <div className='goods' data-test-id={`clothes-${goodsType}`}>
      <div className="goods-header">
        <div className="goods__title">{`${goodsType}'s`}</div>
        <ul className="goods-nav">
          {
            GOODS_NAV_MENU.map(el => {
              return (
                <li key={el.name}
                  className={particular === el.particularName ? "goods-nav__link active" : "goods-nav__link"}
                  onClick={() => setParticular(el.particularName)}
                  data-test-id={`clothes-${goodsType}-${el.particularName}`} 
                >
                  {el.name}
                </li>
            )})
          } 
        </ul>
      </div>

      {
        isLoading
        ? <Preloader />
        : !isError && <div>
           <div className="cards">
              {
                goods?.length 
                  ? goods
                    .filter(el => el.particulars[particular])
                    .filter((el, ind) => ind < 8)
                    .map(el => {
                      return <Card key={el.id} {...el} />
                    }) 
                  : <h1>скоро в продаже</h1>
              }
            </div>
            <Link className='see-all' to={`/${goodsType}`}>SEE ALL</Link>
          </div>
      }

      {
        isError && <Error errorMessage={errorMessage} />
      }      
    </div>
  )
}

export default Goods