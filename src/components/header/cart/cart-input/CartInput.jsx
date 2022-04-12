import React from 'react'
import cn from 'classnames'
import { Field, useField } from 'formik'

function CartInput({ name, label, placeholder, className='cart-input' }) {
  const [field, meta] = useField(name)

  const configInput = {
    id: name,
    ...field,    
    placeholder
  }

  return (
    <div
      className={cn(`${className}`, {
        error: meta.error && meta.touched,
      })}
    >
      {label && <label htmlFor={name}>{label}</label>}      
      <Field
        {...configInput}
        type='text'       
      />
      {meta.error && meta.touched && (
        <div className='error'>{meta.error}</div>
      )}
    </div>
  )
}

export default CartInput
