import React from 'react'
import './Preloader.scss'

const Preloader = () => {
  return (
    <>
      <div className='center-body' data-test-id='loader'>
        <div className='loader-square-22'>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    </>
  )
}

export default Preloader
