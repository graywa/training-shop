import React, { useEffect, useState } from 'react'
import './AllGoods.scss'
import settings from './assets/settings.svg'
import viewGrid from './assets/view-grid.svg'
import viewList from './assets/view-list.svg'
import cross from './assets/cross.svg'
import { GOODS } from '../goods/goods-data'
import Card from '../goods/card/Card'

const AllGoods = ({goodsType}) => {
  const [colorFilter, setColorFilter] = useState([])
  const [sizeFilter, setSizeFilter] = useState([])
  const [brandFilter, setBrandFilter] = useState([])
  const [priceFilter, setPriceFilter] = useState([])
  const [filteredGoods, setFilteredGoods] = useState([])
  const [isFilterOpen, setIsFilterOpen] = useState(false)

  const allColors = [],
        allSizes = [], 
        allBrands = [],
        allPricies = [
          {
            title: '0 - $50',
            start: 0,
            end: 50
          },
          {
            title: '$50 - $100',
            start: 50,
            end: 100
          },
          {
            title: '$100 - $150',
            start: 100,
            end: 150
          },
          {
            title: '$150 - $200',
            start: 150,
            end: 200
          },
          {
            title: 'more than $200',
            start: 200,
            end: Infinity
          },
        ]
  
  GOODS[goodsType]?.forEach(el => {
    allBrands.push(el.brand)
    el.sizes.forEach(item => allSizes.push(item))
    el.images.forEach(item => {
      allColors.push(item.color)
  })})

  const getUniqArr = (arr) => Array.from(new Set(arr))

  const uniqAllColors = getUniqArr(allColors)
  const uniqAllSizes = getUniqArr(allSizes)
  const uniqAllBrands = getUniqArr(allBrands)

  //console.log('fg',filteredGoods)
  //console.log(filteredGoods)

  useEffect(() => {
    if(!GOODS[goodsType]?.length) setFilteredGoods([])
    if(GOODS[goodsType]?.length) {
      let finalGoods = [...GOODS[goodsType]]
      if (colorFilter.length) finalGoods = finalGoods.filter(el => {
        return el.images.some(item => colorFilter.includes(item.color))      
      })
      if (sizeFilter.length) finalGoods = finalGoods.filter(el => {
        return el.sizes.some(item => sizeFilter.includes(item))
      })
      if (brandFilter.length) finalGoods = finalGoods.filter(el => {
        return brandFilter.includes(el.brand)
      })
      if (priceFilter.length) finalGoods = finalGoods.filter(el => {
        return priceFilter.some(item => item.start <= el.price && item.end >= el.price)
      })   
      setFilteredGoods(finalGoods)
    }     
  }, [goodsType, colorFilter, sizeFilter, brandFilter, priceFilter])

  const handleFilter = () => {
    setIsFilterOpen(!isFilterOpen)
  }

  return (
    <div className="container">
      <div className='all-goods'>
        <div className="filter">
          <div className="filter__header">
            <div className="filter__block" onClick={handleFilter} >
              <img width={32} src={isFilterOpen ? cross : settings} alt="settings" />
              <span>FILTER</span>
            </div>
            <div className="filter__block">
              <img src={viewList} alt="list" />
              <img src={viewGrid} alt="grid" />
            </div>
          </div>
          
          <div className={isFilterOpen ? "filter__options open" : "filter__options"}>
            <div className="filter__option">
              <div className="filter__title">COLOR</div>
              <div className="filter__list">
                <ul >
                  {uniqAllColors.map(el => {
                    return (
                      <li key={el} className='filter__item' >
                        <input type="checkbox" id={el} checked={colorFilter.includes(el)} 
                               onChange={() => colorFilter.includes(el) 
                                  ? setColorFilter(colorFilter.filter(item => item !== el)) 
                                  : setColorFilter([...colorFilter, el])} 
                        />
                        <label htmlFor={el} >{el}</label>
                      </li>
                    )
                  })}
                </ul>
              </div>             
            </div>

            <div className="filter__option">
              <div className="filter__title">SIZE</div>
              <div className="filter__list">
                <ul >
                  {uniqAllSizes.map(el => {
                    return (
                      <li key={el}  className='filter__item' >
                        <input type="checkbox" id={el} checked={sizeFilter.includes(el)} 
                                onChange={() => sizeFilter.includes(el) 
                                  ? setSizeFilter(sizeFilter.filter(item => item !== el)) 
                                  : setSizeFilter([...sizeFilter, el])} 
                        />
                        <label htmlFor={el} >{el}</label>
                      </li>
                    )
                  })}
                </ul>
              </div>
            </div>
            <div className="filter__option">
              <div className="filter__title">BRAND</div>
              <div className="filter__list">
                <ul >
                  {uniqAllBrands.map(el => {
                    return (
                      <li key={el} className='filter__item' >
                        <input type="checkbox" id={el} checked={brandFilter.includes(el)}
                              onChange={() => brandFilter.includes(el) 
                                ? setBrandFilter(brandFilter.filter(item => item !== el)) 
                                : setBrandFilter([...brandFilter, el])} 
                        />
                        <label htmlFor={el} >{el}</label>
                      </li>
                    )
                  })}
                </ul>
              </div>
            </div>
            <div className="filter__option">
              <div className="filter__title">PRICE</div>
              <div className="filter__list">
                <ul >
                  {allPricies.map(el => {
                    return (
                      <li key={el.title} className='filter__item'  >
                        <input type="checkbox" id={el.title} 
                              checked={priceFilter.some(item => item.title === el.title)}
                              onChange={() => priceFilter.some(item => item.title === el.title) 
                                ? setPriceFilter(priceFilter.filter(item => item.title !== el.title)) 
                                : setPriceFilter([...priceFilter, el])} 
                        />
                        <label htmlFor={el.title} >{el.title}</label>
                      </li>
                    )
                  })}
                </ul>
              </div>      
            </div>
          </div>

          <div>
            {
               !!(colorFilter.length || sizeFilter.length || brandFilter.length || priceFilter.length)
               && <div className='filter__description'>
                    <div className="filter__total-items">{filteredGoods.length} items found</div>
                    {colorFilter.map(el => <span key={el}>Color: {el}</span>)}
                    {sizeFilter.map(el => <span key={el}>Size: {el}</span>)}
                    {brandFilter.map(el => <span key={el}>Brand: {el}</span>)}
                    {priceFilter.map(el => <span key={el.title}>Price: {el.title}</span>)}
                  </div>             
            }
          </div>
        </div>

        <div className="cards">
          { 
            filteredGoods?.length
            ? filteredGoods.map(el => <Card key={el.id} {...el} />)
            : <h1>Скоро в продаже</h1>
          }
        </div>

      </div>
    </div>    
  )
}

export default AllGoods