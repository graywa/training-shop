import { Formik } from 'formik'
import React, { useState } from 'react'
import { cartSlides } from '../Cart'
import './DeliveryInfo.scss'
import * as Yup from 'yup'
import cn from 'classnames'
import CartInput from '../cart-input/CartInput'
import MaskedInput from '../masked-input/MaskedInput'
import CartSelect, { Dropdown } from '../cart-select/CartSeletc'

function DeliveryInfo({ cartGoods, setIsOpenCart, setSlide }) {
  const [formatChars, setFormatChars] = useState({
    1: '[2-4]',
    2: '[3,4,5,9]',
    9: '[0-9]',
    a: '[A-Za-z]',
    '*': '[A-Za-z0-9]',
  })

  const validationForAddress = {
    is: (method) => method !== 'Store pickup',
    then: Yup.string()              
      .required('Обязательное поле')
  }

  const validationForStoreAddress = {
    is: (method) => method === 'Store pickup',
    then: Yup.string()              
      .required('Обязательное поле')
  }

  return (
    <div className='delivery-info'>
      <Formik
        initialValues={{
          deliveryMethod: 'Pickup from post offices',
          phone: '',
          email: '',
          country: '',
          city: '',
          street: '',
          house: '',
          apartment: '',
          country2: '',
          storeAdress: '',
          postcode: '',
          checkbox: false,
        }}
        onSubmit={(values, props) => {
          console.log(values)
          setSlide(cartSlides.payment)
        }}
        validationSchema={Yup.object().shape({
          phone: Yup.string()
            .matches(/(.*\d.*){12}/, 'Введите полный номер')
            .required('Обязательное поле'),
          email: Yup.string()
            .matches(
              /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
              'Некорректный email'
            )
            .required('Обязательное поле'),
          country: Yup.string().when('deliveryMethod', validationForAddress),          
          city: Yup.string().when('deliveryMethod', validationForAddress),
          street: Yup.string().when('deliveryMethod', validationForAddress),
          house: Yup.string().when('deliveryMethod', validationForAddress)
                  .max(4, 'Сшишком длинный номер'),
          apartment: Yup.number('Вводите цифры')
            .typeError('Вводите цифры')
            .max(999, 'Слишком длинный номер'),
          postcode: Yup.string().when('deliveryMethod', {
            is: (method) => method === 'Pickup from post offices',
            then: Yup.string()
              .matches(/(.*\d.*){6}/, 'Введите полный номер')
              .required('Обязательное поле'),
          }),
          country2: Yup.string().when('deliveryMethod', validationForStoreAddress),
          storeAdress: Yup.string().when('deliveryMethod', validationForStoreAddress),
          checkbox: Yup.boolean()
            .oneOf([true], 'Необходимо отметить')
            .required('Обязательное поле'),
        })}
      >
        {(props) => {
          const {
            values,
            touched,
            errors,
            dirty,
            isValid,
            handleChange,
            handleBlur,
            handleSubmit,
            setValues,
            setFieldValue,
          } = props

          const phoneChange = (e) => {
            let value = e.target.value
            setFieldValue('phone', value)

            switch (value[7]) {
              case '2':
                setFormatChars({ ...formatChars, 2: '[5,9]' })
                break
              case '3':
                setFormatChars({ ...formatChars, 2: '[3]' })
                break
              case '4':
                setFormatChars({ ...formatChars, 2: '[4]' })
                break
              default:
            }
          }
          //console.log(values)
          //console.log(!values.country2)

          return (
            <form onSubmit={handleSubmit}>
              <div className='form-content'>
                <div className='radio-group'>
                  <div className='radio-group__title'>
                    Choose the method of delivery of the items
                  </div>
                  <label>
                    <input
                      type='radio'
                      name='deliveryMethod'
                      value='Pickup from post offices'
                      onChange={handleChange}
                      defaultChecked
                    />
                    Pickup from post offices
                  </label>
                  <label>
                    <input
                      type='radio'
                      name='deliveryMethod'
                      value='Express delivery'
                      onChange={handleChange}
                    />
                    Express delivery
                  </label>
                  <label>
                    <input
                      type='radio'
                      name='deliveryMethod'
                      value='Store pickup'
                      onChange={handleChange}
                    />
                    Store pickup
                  </label>
                </div>

                <MaskedInput
                  name='phone'
                  type='tel'
                  label='PHONE'
                  mask='+ 375\ (12) 999 99 99'
                  placeholder='+375 (__) _______'
                  formatChars={formatChars}
                  handleChange={phoneChange}
                />

                <CartInput name='email' label='E-MAIL' placeholder='e-mail' />

                {values.deliveryMethod !== 'Store pickup' && (
                  <>
                    <CartInput
                      name='country'
                      label='ADRESS'
                      placeholder='Belarus'
                    />

                    <CartInput name='city' placeholder='City' />

                    <CartInput name='street' placeholder='Street' />

                    <div className='cart-input-short'>
                      <CartInput
                        name='house'
                        placeholder='House'
                        className='cart-input-small'
                      />
                      <CartInput
                        name='apartment'
                        placeholder='Apartment'
                        className='cart-input-small'
                      />
                    </div>
                  </>
                )}

                {values.deliveryMethod === 'Store pickup' && (
                  <>
                    <CartSelect
                      name='country2'
                      label='ADDRESS OF STORE'
                      placeholder='Country'
                      readOnly={true}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      optionValues={[{value: 'belarus'},{value: 'russia'},{value: 'ukrain'}]}
                    />

                    <CartSelect
                      name='storeAdress'
                      placeholder='Store adress'
                      readOnly={false}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      disabled={!values.country2}
                      optionValues={[{value: '1'},{value: '2'},{value: '3'}]}
                    />
                  </>
                )}

                {values.deliveryMethod === 'Pickup from post offices' && (
                  <MaskedInput
                    name='postcode'
                    type='text'
                    label='POSTCODE'
                    mask='BY\ 999999'
                    placeholder='BY ______'
                    handleChange={handleChange}
                  />
                )}

                <div
                  className={cn('cart-input check', {
                    error: errors.checkbox && touched.checkbox,
                  })}
                >
                  <input
                    id='checkbox'
                    name='checkbox'
                    type='checkbox'
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.checkbox}
                  />
                  <label htmlFor='checkbox'>
                    I agree to the processing of my personal information
                  </label>
                  {errors.checkbox && touched.checkbox && (
                    <div className='error'>{errors.checkbox}</div>
                  )}
                </div>
              </div>

              <div className='cart__total'>
                Total:
                <span>
                  $
                  {cartGoods
                    .reduce((acc, el) => acc + el.quantity * el.price, 0)
                    .toFixed(2)}
                </span>
              </div>
              {!!cartGoods.length && (
                <button
                  disabled={!isValid || !dirty}
                  className='dark-btn'
                  type='submit'
                >
                  FURTHER
                </button>
              )}
              <button
                className='light-btn'
                onClick={() => setSlide(cartSlides.items)}
              >
                VIEW CART
              </button>
            </form>
          )
        }}
      </Formik>
    </div>
  )
}

export default DeliveryInfo
