import { Field, useField } from 'formik'
import React from 'react'
import cn from 'classnames'
import InputMask from 'react-input-mask'

function MaskedInput({
  name,
  type,
  placeholder,
  label,
  className = 'cart-input',
  mask,
  formatChars,
}) {
  const [field, meta] = useField(name)  

  const configInput = {
    id: name,
    type,
    mask,
    formatChars,
    ...field,
    placeholder,
  }

  console.log(field)

  return (
    <div
      className={cn(`${className}`, {
        error: meta.error && meta.touched,
      })}
    >
      {label && <label htmlFor={name}>{label}</label>}

      <InputMask {...configInput} />
      {meta.error && meta.touched && <div className='error'>{meta.error}</div>}
    </div>
  )
}

export default MaskedInput
