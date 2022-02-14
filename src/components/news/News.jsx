import React from 'react'
import WhiteBlock from '../white-block/WhiteBlock'
import './News.scss'

const News = () => {
  return (
    <div className='news'>
      <div className="news__new-season">
        <WhiteBlock 
          path='#' 
          subtitle='new season'  
          title='lookbook collection'
        />
      </div>
      <div className="news__sale">
        <WhiteBlock 
          path='#' 
          subtitle='sale'  
          title='get up to'
          titleSpan='50% OFF'
        />          
      </div>
    </div>
  )
}

export default News