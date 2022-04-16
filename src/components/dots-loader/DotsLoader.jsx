import React from 'react'
import './Dots.loader.scss'

function DotsLoader() {
  return (
    <div className='loading-dots'>
      <div className='loading-dots--dot'></div>
      <div className='loading-dots--dot'></div>
      <div className='loading-dots--dot'></div>
    </div>
  )
}

export default DotsLoader
