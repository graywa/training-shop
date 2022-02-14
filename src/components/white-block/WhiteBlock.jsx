import React from 'react'
import { Link } from 'react-router-dom'
import './WhiteBlock.scss'

const WhiteBlock = ({path, subtitle, title, titleSpan}) => {
  return (
    <Link to={path} className='white-block'>
      <div className="white-block__subtitle">{subtitle}</div>
      <div className="white-block__title">
        {title} <span>{titleSpan}</span>
      </div>
    </Link>
  )
}

export default WhiteBlock