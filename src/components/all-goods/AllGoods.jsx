import React from 'react'
import './AllGoods.scss'
import settings from './assets/settings.svg'
import viewGrid from './assets/view-grid.svg'
import viewList from './assets/view-list.svg'
import { GOODS } from '../goods/goods-data'
import Card from '../goods/card/Card'

const AllGoods = ({goodsType}) => {
  const allColors = [],
        allSizes = [], 
        allBrands = [],
        allPrice = [100, 200, 300, 500, 1000]
  
  GOODS[goodsType]
    .forEach(el => {
      allBrands.push(el.brand)
      el.sizes.forEach(item => allSizes.push(item))
      el.images.forEach(item => {
        allColors.push(item.color)
    })})

  const getUniqArr = (arr) => Array.from(new Set(arr))

  const uniqAllColors = getUniqArr(allColors)
  const uniqAllSizes = getUniqArr(allSizes)
  const uniqAllBrands = getUniqArr(allBrands)
  
  console.log(uniqAllColors, uniqAllSizes, uniqAllBrands)

  return (
    <div className="container">
      <div className='all-goods'>
        <div className="filter">
          <div className="filter__header">
            <div className="filter__block">
              <img src={settings} alt="settings" />
              <span>FILTER</span>
            </div>
            <div className="filter__block">
              <img src={viewList} alt="list" />
              <img src={viewGrid} alt="grid" />
            </div>
          </div>
          
          <div className="filter__options">
            <div className="filter__option">
              <div className="filter__title">COLOR</div>
              <div className="filter__list">
                <ul >
                  {uniqAllColors.map(el => {
                    return (
                      <li key={el} className='filter__item'>
                        <input type="checkbox" id={el} />
                        <label htmlFor={el} >{el}</label>
                      </li>
                    )
                  })}
                </ul>
              </div>             
            </div>

            <div className="filter__option">
              <div className="filter__title">SIZE</div>
              
            </div>
            <div className="filter__option">
              <div className="filter__title">BRAND</div>

            </div>
            <div className="filter__option">
              <div className="filter__title">PRICE</div>

            </div>
          </div>
        </div>

        <div className="cards">
          {
            GOODS[goodsType]
            ? GOODS[goodsType].map(el => {
              return <Card key={el.id} {...el} />
              })
            : <h1>Скоро в продаже</h1>
          }
        </div>

      </div>
    </div>    
  )
}

export default AllGoods