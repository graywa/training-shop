import React, { useEffect, useState} from 'react'
import './AllGoods.scss'
import Card from '../goods/card/Card'
import Filter from '../filter/Filter'
import { useDispatch, useSelector } from 'react-redux'
import { getGoodsByCategory } from '../../store/goodsSlice'
import Preloader from '../Preloader/Preloader'
import Error from '../error/Error'

const AllGoods = ({goodsType}) => {
  const dispatch = useDispatch()
  const goods = useSelector(state => state.goods.goods[goodsType])
  const {isLoading, isError, errorMessage} = useSelector(state => state.goods)

  const [filteredGoods, setFilteredGoods] = useState([])

  useEffect(() => {
    console.log(goods)
    if(!goods?.length && goods !== undefined) {
      dispatch(getGoodsByCategory({goodsType}))
    }    
  }, [goodsType])

  return (
    <div className="container">
      <div className='all-goods'>

        <Filter goodsType={goodsType}
                goods={goods}
                filteredGoods={filteredGoods}
                setFilteredGoods={setFilteredGoods} 
        />

        {
          isLoading 
          ? <Preloader />
          : !isError && <div className="cards">
              { 
                filteredGoods?.length
                ? filteredGoods.map(el => <Card key={el.id} {...el} />)
                : <h1>Скоро в продаже</h1>
              }
            </div>
        }
        
        {
          isError && <Error errorMessage={errorMessage} />
        }

      </div>
    </div>    
  )
}

export default AllGoods