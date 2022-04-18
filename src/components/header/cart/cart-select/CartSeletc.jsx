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
import { selectNames } from '../constants'


const CartSelect = ({
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
}) => {
  const [{ value, onBlur, onChange }, { error, touched }] = useField(name)
  const [isOpen, setIsOpen] = useState(false)
  const dispatch = useDispatch()

  const changeInput = (e) => {
    const { value: city } = e.target
    setIsOpen(true)
    onChange(e)

    if (name === selectNames.storeAddress) {
      if (city.length === 3) {
        dispatch(getStoreAddress({ city, country }))
      }

      if (!city.length) {
        dispatch(resetStoreAddress())
      }
    }
  }

  const changeOption = (value) => {
    setFieldValue(`${name}`, value)
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
    },100) 

    onBlur(e)

    if (
      name === 'storeAddress' &&
      !optionValues.some((el) => el.city === value)
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
            onChange={changeInput}
            readOnly={readOnly}
            disabled={disabled}
            autoComplete='off'
            tabIndex={0}
            role="button"
          />

          {isLoading === 'storeAddress' && name === isLoading && (
            <span className='dd-loader'>
              <DotsLoader />
            </span>
          )}

          <img
            className={cn('dd-arrow', { open: isOpen })}
            width={25}
            src={arrow}
            alt='arrow'
          />
        </div>

        <div className={cn('dd-list', { open: isOpen })}>
          {!!optionValues.length &&
            optionValues
              .filter(
                ({ name, city }) =>
                  name || city.toLowerCase().includes(value.toLowerCase())
              )
              .map(({ id, name, city }) => (
                <label key={id} className='dd-list__item'>
                  <input
                    type='radio'
                    value={name || city}
                    onClick={() => changeOption(name || city)}
                    className='dd-list__radio'
                  />
                  {name || city}
                </label>
                
                // <input
                //   className='dd-list__item'
                //   key={id}
                //   type='text'
                //   value={name || city}
                //   
                //   readOnly
                // />
              ))}
          {name === selectNames.storeAddress &&
            !optionValues.length &&
            value.length >= 3 && (
              <label className='dd-list__item'>Совпадений не найдено</label>
            )}

          {name === selectNames.storeAddress &&
            !optionValues.length &&
            value.length < 3 && (
              <label className='dd-list__item'>Введите хотя бы три буквы</label>
            )}

          {errorMsg && (
            <label className='dd-list__item error'>{errorMsg}</label>
          )}
        </div>

        {error && touched && <div className='error-note'>{error}</div>}
      </div>
    </div>
  )
}

export default CartSelect
