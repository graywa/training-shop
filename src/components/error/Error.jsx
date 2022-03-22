import React from 'react'
import './Error.scss'

const Error = ({errorMessage}) => {
  return (
    <div className='error' data-test-id='error' >
      <b>Ошибка получения данных: </b>{errorMessage}
    </div>
  )
}

export default Error