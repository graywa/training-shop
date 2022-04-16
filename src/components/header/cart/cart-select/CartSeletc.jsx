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
    disabled = false,
    optionValues,
    setFieldValue,
    isLoading,
    errorMsg,
  } = props

  const [field, meta] = useField(name)
  const [isOpen, setIsOpen] = useState(false)
  const dispatch = useDispatch()

  const { onBlur, value, onChange } = field
  const { error, touched } = meta

  const inputChange = (e) => {
    setIsOpen(true)
    onChange(e)
    const value = e.target.value

    if (name === 'storeAddress') {
      if (value.length === 3) {
        const city = value
        dispatch(getStoreAddress({ city, country }))
      }

      if (!value.length) {
        dispatch(resetStoreAddress())
      }
    }
  }

  const optionChange = (e) => {
    onChange(e)
    setTimeout(() => {
      setIsOpen(false)
    }, 100)
    

    if (name === 'country2') {
      dispatch(resetStoreAddress())
      setTimeout(() => {
        setFieldValue('storeAddress', '')
      }, 100)
    }
  }

  const onBlurInput = (e) => {
    setTimeout(() => {
      setIsOpen(false)
    }, 100)

    onBlur(e)


    if (
      name === 'storeAddress' &&
      !optionValues.some((el) => el.city.toLowerCase() === value.toLowerCase())
    ) {
      setFieldValue('storeAddress', '')
    }
  }

  return (
    <div className='cart-select'>
      {label && <label htmlFor={name}>{label}</label>}
      <div className={cn('dd-wrapper', { open: isOpen })}>
        <div
          className={cn('dd-header', {
            error: error && touched,
          })}
          onClick={() => {
            if (!disabled) setIsOpen(!isOpen)
          }}
        >
          <input
            className='dd-header__input'
            type='text'
            name={name}
            placeholder={placeholder}
            value={value}
            onBlur={onBlurInput}
            onChange={inputChange}
            readOnly={readOnly}
            disabled={disabled}
            autoComplete='off'
          />
          {isLoading === 'storeAddress' && name === isLoading && <DotsLoader />}
          <img
            className={cn('dd-arrow', { open: isOpen })}
            width={15}
            src={arrow}
            alt='arrow'
          />
        </div>

        {isOpen && (
          <div className='dd-list'>
            {!!optionValues.length &&
              optionValues
                .filter(
                  (el) =>
                    el.name ||
                    el.city.toLowerCase().includes(value.toLowerCase())
                )
                .map((el) => (
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
            {name === 'storeAddress' &&
              !optionValues.length &&
              value.length >= 3 && (
                <label className='dd-list__item'>Совпадений не найдено</label>
              )}

            {name === 'storeAddress' &&
              !optionValues.length &&
              value.length < 3 && (
                <label className='dd-list__item'>
                  Введите хотя бы три буквы
                </label>
              )}

            {errorMsg && (
              <label className='dd-list__item error'>{errorMsg}</label>
            )}
          </div>
        )}

        {error && touched && <div className='error-note'>{error}</div>}
      </div>
    </div>
  )
}

export default CartSelect
