import React, { useEffect, useState } from 'react'
import './Filter.scss'
import settings from './assets/settings.svg'
import viewGrid from './assets/view-grid.svg'
import viewList from './assets/view-list.svg'
import cross from './assets/cross.svg'


const Filter = ({goodsType, goods, filteredGoods, setFilteredGoods}) => {
  const [uniqColors, setUniqColors] = useState([])
  const [uniqSizes, setUniqSizes] = useState([])
  const [uniqBrands, setUniqBrands] = useState([])
  const uniqPricies = [
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
    }
  ]

  const [colorFilter, setColorFilter] = useState([])
  const [sizeFilter, setSizeFilter] = useState([])
  const [brandFilter, setBrandFilter] = useState([])
  const [priceFilter, setPriceFilter] = useState([])
  const [isFilterOpen, setIsFilterOpen] = useState(false)

  useEffect(() => {
    const allColors = [],
          allSizes = [], 
          allBrands = []

      goods.forEach(el => {      
      allBrands.push(el.brand)
      el.sizes.forEach(item => allSizes.push(item))
      el.images.forEach(item => allColors.push(item.color))
    })  

    const getUniqArr = (arr) => Array.from(new Set(arr))

    setUniqColors(getUniqArr(allColors))
    setUniqSizes(getUniqArr(allSizes))
    setUniqBrands(getUniqArr(allBrands))  
  }, [goods])

  useEffect(() => {
    setColorFilter([])
    setSizeFilter([])
    setBrandFilter([])
    setPriceFilter([])
    setIsFilterOpen(false)
  }, [goods])

  useEffect(() => {
    if(!goods.length) setFilteredGoods([])
    if(goods.length) {
      let finalGoods = [...goods]
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
  }, [goods, colorFilter, sizeFilter, brandFilter, priceFilter])

  const handleVisibleFilter = () => {
    setIsFilterOpen(!isFilterOpen)
  }

  const handleChangeFilter = (filterArr, setFilterArr, el) => {
    filterArr.includes(el) 
      ? setFilterArr(filterArr.filter(item => item !== el)) 
      : setFilterArr([...filterArr, el])
  }

  return (
    <div className="filter">
      <div className="filter__header">
        <div className="filter__block" onClick={handleVisibleFilter} data-test-id='filter-button' >
          <img width={32} src={isFilterOpen ? cross : settings} alt="settings" />
          <span>FILTER</span>
        </div>
        <div className="filter__block">
          <img src={viewList} alt="list" />
          <img src={viewGrid} alt="grid" />
        </div>
      </div>
      
      <div className={isFilterOpen ? "filter__options open" : "filter__options"}
            data-test-id={`filter-${goodsType}`}
      >
        <div className="filter__option">
          <div className="filter__title">COLOR</div>
          <div className="filter__list" data-test-id='filters-color'>
            <ul >
              {uniqColors.map(el => {
                return (
                  <li key={el} className='filter__item' >
                    <input type="checkbox" id={el} checked={colorFilter.includes(el)} 
                          data-test-id={`filter-color-${el}`}
                          onChange={() => handleChangeFilter(colorFilter, setColorFilter, el)} 
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
          <div className="filter__list" data-test-id='filters-size' >
            <ul >
              {uniqSizes.map(el => {
                return (
                  <li key={el}  className='filter__item'  >
                    <input type="checkbox" id={el} checked={sizeFilter.includes(el)} 
                            data-test-id={`filter-size-${el}`}
                            onChange={() => handleChangeFilter(sizeFilter, setSizeFilter, el)} 
                    />
                    <label htmlFor={el}>{el}</label>
                  </li>
                )
              })}
            </ul>
          </div>
        </div>
        <div className="filter__option">
          <div className="filter__title">BRAND</div>
          <div className="filter__list" data-test-id='filters-brand'>
            <ul >
              {uniqBrands.map(el => {
                return (
                  <li key={el} className='filter__item' >
                    <input type="checkbox" id={el} checked={brandFilter.includes(el)}
                          data-test-id={`filter-brand-${el}`} 
                          onChange={() => handleChangeFilter(brandFilter, setBrandFilter, el)} 
                    />
                    <label htmlFor={el}>{el}</label>
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
              {uniqPricies.map(el => {
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
  )
}

export default Filter