import React from 'react'
import { Field, useField } from 'formik'
import cn from 'classnames'
import InputMask from 'react-input-mask'

const MaskedInput = ({
  name,
  type,
  placeholder,
  label,
  className = 'cart-input',
  mask,
  formatChars,
  handleChange,
}) => {
  
  const [field, {error, touched}] = useField(name)  

  const configInput = {
    id: name,
    type,
    mask,
    formatChars,
    ...field,
    placeholder,
    onChange: handleChange || field.onChange
  }

  return (
    <div
      className={cn(`${className}`, {
        error: error && touched,
      })}
    >
      {label && <label htmlFor={name}>{label}</label>}

      <InputMask {...configInput} />
      {error && touched && <div className='error'>{error}</div>}
    </div>
  )
}

export default MaskedInput
