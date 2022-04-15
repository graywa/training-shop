import { Formik } from 'formik'
import React, { useState } from 'react'
import { cartSlides } from '../Cart'
import './DeliveryInfo.scss'
import * as Yup from 'yup'
import cn from 'classnames'
import CartInput from '../cart-input/CartInput'
import MaskedInput from '../masked-input/MaskedInput'
import CartSelect from '../cart-select/CartSeletc'
import { useDispatch, useSelector } from 'react-redux'
import {
  getCountries,
  updOrder,
} from '../../../../store/orderSlice'

function DeliveryInfo({ setSlide, totalPrice }) {
  const [formatChars, setFormatChars] = useState({
    1: '[2-4]',
    2: '[3,4,5,9]',
    9: '[0-9]',
    a: '[A-Za-z]',
    '*': '[A-Za-z0-9]',
  })
  const dispatch = useDispatch()

  const {
    countries,
    storeAddress,
    isLoading,
    countriesError,
    storeAddressError,
  } = useSelector((state) => state.order)

  const validationForAddress = {
    is: (method) => method !== 'Store pickup',
    then: Yup.string().required('Обязательное поле'),
  }

  const validationForStoreAddress = {
    is: (method) => method === 'Store pickup',
    then: Yup.string().required('Обязательное поле'),
  }

  return (
    <div className='delivery-info'>
      <Formik
        enableReinitialize
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
          storeAddress: '',
          postcode: '',
          checkbox: false,
        }}
        onSubmit={(values, props) => {
          const fields = {...values}
          if(values.country2) fields.country = values.country2
          delete fields.country2
          delete fields.checkbox    
                
          dispatch(updOrder({fields}))
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
          house: Yup.string().when('deliveryMethod', validationForAddress),
          apartment: Yup.number('Вводите цифры')
            .typeError('Вводите цифры')
            .max(999, 'Слишком длинный номер'),
          postcode: Yup.string().when('deliveryMethod', {
            is: (method) => method === 'Pickup from post offices',
            then: Yup.string()
              .matches(/(.*\d.*){6}/, 'Введите полный номер')
              .required('Обязательное поле'),
          }),
          country2: Yup.string().when(
            'deliveryMethod',
            validationForStoreAddress
          ),
          storeAddress: Yup.string().when(
            'deliveryMethod',
            validationForStoreAddress
          ),
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
            handleChange,
            handleBlur,
            handleSubmit,
            setFieldValue,
            isValid,
          } = props
          //console.log(values)
          //console.log(errors)

          const phoneChange = (e) => {
            let value = e.target.value
            handleChange(e)

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

          const storePickupChange = (e) => {
            handleChange(e)
            if (!countries.length) dispatch(getCountries())
          }

          const checkIsValid = (e) => {
            if (!isValid) setFieldValue('checkbox', false)
          }

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
                      onChange={storePickupChange}
                    />
                    Store pickup
                  </label>
                </div>

                <MaskedInput
                  name='phone'
                  type='tel'
                  label='PHONE'
                  mask='+ 375\ (12) 999 99 99'
                  placeholder='+ 375 (__) _______'
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
                      optionValues={countries}
                      isLoading={isLoading}
                      errorMsg={countriesError}
                      setFieldValue={setFieldValue}
                    />

                    <CartSelect
                      name='storeAddress'
                      placeholder='Store adress'
                      readOnly={false}
                      disabled={!values.country2}
                      country={values.country2}
                      optionValues={storeAddress}
                      isLoading={isLoading}
                      errorMsg={storeAddressError}
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
                    checked={values.checkbox}
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
                  ${totalPrice}
                </span>
              </div>
              <button
                className='dark-btn'
                type='submit'
                onClick={(e) => checkIsValid(e)}
              >
                FURTHER
              </button>
              <button
                type='button'
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
