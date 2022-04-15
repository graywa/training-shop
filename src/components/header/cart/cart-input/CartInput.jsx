import React, { useState } from 'react'
import cn from 'classnames'
import { Field, useField } from 'formik'
import eye from '../payment-slide/assets/eye.svg'
import closeEye from '../payment-slide/assets/close-eye.svg'

function CartInput({
  name,
  type = 'text',
  hasImg = false,
  label,
  placeholder,
  className = 'cart-input',
}) {
  const [field, meta] = useField(name)
  const [inputType, setInputType] = useState(type)

  const configInput = {
    id: name,
    ...field,
    placeholder,
    type: inputType,
    autoComplete: 'off',
  }

  const inputTypeToggle = () => {
    inputType === 'text' ? setInputType('password') : setInputType('text')
  }

  return (
    <div
      className={cn(`${className}`, {
        error: meta.error && meta.touched,
      })}
    >
      {label && <label htmlFor={name}>{label}</label>}
      <Field {...configInput} />
      {meta.error && meta.touched && <div className='error'>{meta.error}</div>}

      {hasImg && (
        <img
          width={21}
          src={inputType === 'text' ? eye : closeEye}
          alt='eye'
          onClick={inputTypeToggle}
        />
      )}
    </div>
  )
}

export default CartInput
