import React from 'react'
import './Error.scss'

const Error = ({errorMessage}) => {
  return (
    <div className='error'>
      <b>Ошибка получения данных: </b>{errorMessage}
    </div>
  )
}

export default Error