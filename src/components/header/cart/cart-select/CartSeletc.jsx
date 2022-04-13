import React, { useEffect, useState } from 'react'
import cn from 'classnames'
import { Field, useField } from 'formik'
import './CartSelect.scss'
import arrow from './assets/arrow.svg'
import { useDispatch } from 'react-redux'
import {
  getStoreAddress,
  resetStoreAddress,
} from '../../../../store/orderSlice'
import DotsLoader from '../../../dots-loader/DotsLoader'

export function CartSelect(props) {  
  const {
    name,
    country,
    placeholder,
    label,
    readOnly,
    optOpen,
    setOptOpen,
    disabled = false,
    optionValues,
    isLoading,
    errorMsg,
  } = props
  const [field, meta] = useField(name)
  const dispatch = useDispatch()

  const { onBlur, value, onChange } = field
  const { error, touched } = meta

  const inputChange = (e) => {
    setOptOpen(true)
    onChange(e)
    const value = e.target.value
    if (value.length >= 3) {
      const city = value
      dispatch(getStoreAddress({ city, country }))
    }
    if (!value.length) {
      dispatch(resetStoreAddress())
    }
  }

  const optionChange = (e) => {
    setOptOpen(false)
    onChange(e)
  }

  return (
    <div className='cart-select' onClick={(e) => e.stopPropagation()}>
      {label && <label htmlFor={name}>{label}</label>}
      <div className={cn('dd-wrapper', { open: optOpen })}>
        <div
          className={cn('dd-header', {
            error: error && touched,
          })}
          onClick={() => {
            if (!disabled) setOptOpen(!optOpen)
          }}
        >
          <input
            className='dd-header__input'
            type='text'
            name={name}
            placeholder={placeholder}
            value={value}
            onBlur={onBlur}
            onChange={inputChange}
            readOnly={readOnly}
            disabled={disabled}
            autoComplete='off'
          />
          {isLoading === 'storeAddress' && name === isLoading && <DotsLoader />}
          <img
            className={cn('dd-arrow', { open: optOpen })}
            width={15}
            src={arrow}
            alt='arrow'
          />
        </div>

        {optOpen && (
          <div className='dd-list'>
            {!!optionValues.length &&
              optionValues.map((el) => (
                <label key={el.name || el.city} className='dd-list__item'>
                  <input
                    type='radio'
                    name={name}
                    value={el.name || el.city}
                    onChange={optionChange}
                    className='dd-list__radio'
                  />
                  {el.name || el.city}
                </label>
              ))}
            {name === 'storeAddress' && !optionValues.length && value.length >= 3 
            && (<label className='dd-list__item'>Совпадений не найдено</label>)}
            
            {name === 'storeAddress' && !optionValues.length && value.length < 3 
            && (<label className='dd-list__item'>Введите хотя бы три буквы</label>)}

            {errorMsg && <label className='dd-list__item error'>{errorMsg}</label>}
          </div>
        )}
        
        {error && touched && <div className='error-note'>{error}</div>}
      </div>
    </div>
  )
}

export default CartSelect
