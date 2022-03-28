import React from 'react'
import './CircleLoader.scss'

function CircleLoader() {
  return (
    <div className='center-block'>
      <div className='loader-circle-93'>
        <svg viewBox='0 0 50 50'>
          <circle cx='25' cy='25' r='15' strokeWidth='5' fill='none' />
        </svg>
      </div>
    </div>
  )
}

export default CircleLoader
