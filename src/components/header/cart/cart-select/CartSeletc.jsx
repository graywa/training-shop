import React, { useEffect, useState } from 'react'
import cn from 'classnames'
import { Field, useField } from 'formik'
import './CartSelect.scss'
import arrow from './assets/arrow.svg'


export function Dropdown(props) {
  const [open, setOpen] = useState(false)
  const { name, placeholder, readOnly, disabled=false, optionValues, onBlur, onChange, value, meta } = props

  const handleChange = (e) => {
    setOpen(false)
    onChange(e)
  }

  return (
    <div className={cn('dd-wrapper', {open: open})} >
      <div className={cn('dd-header', {
        error: meta.error && meta.touched,
      })} 
        onClick={() => {if(!disabled) setOpen(!open)}}
      >
        <div className='dd-header__title'>
          <input
            type='text'
            name={name}
            placeholder={placeholder}
            value={value}
            onBlur={onBlur}
            onChange={onChange}
            className='dd-header__input'
            readOnly={readOnly}
            disabled={disabled}
          />
        </div>
        <img className={cn('dd-arrow', {open: open})} width={15} src={arrow} alt="arrow" />        
      </div>

      {open && (
        <div className='dd-list'>
          {optionValues.map((el) => (            
              <label
                key={el.value}
                className='dd-list__item'
              >
                <input
                  type='radio'
                  name={name}
                  value={el.value}
                  onChange={handleChange}
                  className='dd-list__radio'
                />
                {el.value}
              </label>
          ))}
        </div>
      )}
      {meta.error && meta.touched && <div className='error-note'>{meta.error}</div>}
    </div>
  )
}

function CartSelect({
  name,
  label,
  placeholder,
  className = 'cart-select',
  optionValues,
  readOnly,
  disabled
}) {
  const [field, meta] = useField(name)

  const configSelect = {
    id: name,
    ...field,
    placeholder,
    readOnly,
    disabled,
    optionValues,
    meta,
  }

  return (
    <div className='cart-select'>
      {label && <label htmlFor={name}>{label}</label>}
      <Field as={Dropdown} {...configSelect} />
    </div>
  )
}

export default CartSelect
