import React, { useEffect, useRef, useState } from 'react'
import { Formik } from 'formik'
import * as Yup from 'yup'
import cn from 'classnames'
import { useDispatch, useSelector } from 'react-redux'
import { getCountries, updOrder } from '../../../../store/orderSlice'
import { deliveryValidationShema } from './deliveryValidationShema'
import { cartSlides } from '../constants'
import CartInput from '../cart-input/CartInput'
import MaskedInput from '../masked-input/MaskedInput'
import CartSelect from '../cart-select/CartSeletc'


const DeliveryInfo = ({ setSlide, totalPrice, isResetForm }) => {
  const [formatChars, setFormatChars] = useState({
    1: '[2-4]',
    2: '[3,4,5,9]',
    9: '[0-9]',
    a: '[A-Za-z]',
    '*': '[A-Za-z0-9]',
  })
  const dispatch = useDispatch()
  const formRef = useRef()

  console.log(isResetForm)

  const {
    countries,
    storeAddress,
    isLoading,
    countriesError,
    storeAddressError,
  } = useSelector((state) => state.order)

  const initialValues = {
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
  }

  useEffect(() => {
    if (isResetForm) formRef.current.resetForm()
  }, [isResetForm])

  const onSubmit = (values) => {
    const fields = { ...values }
    if (values.country2) fields.country = values.country2
    delete fields.country2
    delete fields.checkbox

    dispatch(updOrder({ fields }))
    setSlide(cartSlides.payment)
  }

  return (
    <div className='delivery-info'>
      <Formik
        innerRef={formRef}
        enableReinitialize
        initialValues={initialValues}
        onSubmit={(values) => onSubmit(values)}
        validationSchema={Yup.object().shape(deliveryValidationShema)}
      >
        {({
          values: { deliveryMethod, country2, checkbox },
          touched,
          errors,
          handleChange,
          handleBlur,
          handleSubmit,
          setFieldValue,
          isValid,
        }) => {

          const phoneChange = (e) => {
            const { value } = e.target
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
                      checked={deliveryMethod === 'Pickup from post offices'}
                      onChange={handleChange}
                    />
                    Pickup from post offices
                  </label>
                  <label>
                    <input
                      type='radio'
                      name='deliveryMethod'
                      value='Express delivery'
                      onChange={handleChange}
                      checked={deliveryMethod === 'Express delivery'}
                    />
                    Express delivery
                  </label>
                  <label>
                    <input
                      type='radio'
                      name='deliveryMethod'
                      value='Store pickup'
                      onChange={storePickupChange}
                      checked={deliveryMethod === 'Store pickup'}
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

                {deliveryMethod !== 'Store pickup' && (
                  <>
                    <CartInput
                      name='country'
                      label='ADRESS'
                      placeholder='Country'
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

                {deliveryMethod === 'Store pickup' && (
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
                      disabled={!country2}
                      country={country2}
                      optionValues={storeAddress}
                      isLoading={isLoading}
                      errorMsg={storeAddressError}
                      setFieldValue={setFieldValue}
                    />
                  </>
                )}

                {deliveryMethod === 'Pickup from post offices' && (
                  <MaskedInput
                    name='postcode'
                    type='text'
                    label='POSTCODE'
                    mask='BY\ 999999'
                    placeholder='BY ______'
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
                    checked={checkbox}
                    className='checkbox'
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
                <span>${totalPrice}</span>
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
