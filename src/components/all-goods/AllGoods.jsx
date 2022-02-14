import React from 'react'
import './AllGoods.scss'
import settings from './assets/settings.svg'
import viewGrid from './assets/view-grid.svg'
import viewList from './assets/view-list.svg'
import arrow from './assets/arrow.svg'
import { Link } from 'react-router-dom'
import { menGoods } from '../goods/men-goods'
import { womenGoods } from '../goods/women-goods'
import Card from '../goods/card/Card'

const AllGoods = ({goodsType}) => {
  let goods = goodsType === 'men' ? menGoods : womenGoods

  return (
    <div className="container">
      <div className='all-goods'>
        <div className="filter">
          <div className="filter__block">
            <img src={settings} alt="settings" />
            <span>FILTER</span>
          </div>
          <div className="filter__block">
            <img src={viewList} alt="list" />
            <img src={viewGrid} alt="grid" />
          </div>
          <div className="filter__block">
            <span>BESTSELLERS</span>
            <img src={arrow} alt="arrow" />
          </div>
        </div>

        <div className="cards">
          {
            goods.map(el => {
              return <Card key={el.id} {...el} />
            })          
          }
        </div>

      </div>
    </div>    
  )
}

export default AllGoods