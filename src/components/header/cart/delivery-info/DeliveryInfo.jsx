import { Formik } from 'formik'
import React from 'react'
import { cartSlides } from '../Cart'
import './DeliveryInfo.scss'
import * as Yup from 'yup'

function DeliveryInfo({ cartGoods, setIsOpenCart, setSlide }) {
  return (
    <div className='delivery-info'>
      <Formik
        initialValues={{
          deliveryMethod: 'Pickup from post offices',
          phone: '+375 (__) _______',
          email: '',
          country: '',
          storeAdress: '',
          city: '',
          street: '',
          house: '',
          apartment: '',
          postcode: 'BY ______',
          checkbox: false,
        }}
        onSubmit={(values, props) => {}}
        validationSchema={Yup.object().shape({
          phone: Yup.string(),
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
          } = props

          console.log(values)

          return (
            <form onSubmit={handleSubmit}>
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

              <div className='cart-input'>
                <label htmlFor='phone'>PHONE</label>
                <input
                  id='phone'
                  name='phone'
                  type='text'
                  placeholder='+375 (__) _______'
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.phone}
                />
              </div>

              <div className='cart-input'>
                <label htmlFor='email'>E-MAIL</label>
                <input
                  id='email'
                  name='email'
                  type='text'
                  placeholder='e-mail'
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.email}
                />
              </div>

              <div className='cart-input'>
                <label htmlFor='country'>
                  {values.deliveryMethod === 'Store pickup'
                    ? 'ADRESS OF STORE'
                    : 'ADRESS'}
                </label>
                <input
                  name='country'
                  type='text'
                  placeholder='Belarus'
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.country}
                />
              </div>

              {values.deliveryMethod === 'Store pickup' && (
                <div className='cart-input'>
                  <input
                    name='storeAdress'
                    type='text'
                    placeholder='Store adress'
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.storeAdress}
                  />
                </div>
              )}

              {values.deliveryMethod !== 'Store pickup' && (
                <>
                  <div className='cart-input'>
                    <input
                      name='city'
                      type='text'
                      placeholder='City'
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.city}
                    />
                  </div>

                  <div className='cart-input'>
                    <input
                      name='street'
                      type='text'
                      placeholder='Street'
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.street}
                    />
                  </div>

                  <div className='cart-input short'>
                    <input
                      name='house'
                      type='text'
                      placeholder='House'
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.house}
                    />

                    <input
                      name='apartment'
                      type='text'
                      placeholder='Apartment'
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.apartment}
                    />
                  </div>
                </>
              )}

              {values.deliveryMethod === 'Pickup from post offices' && (
                <div className='cart-input'>
                  <label htmlFor='postcode'>POSTCODE</label>
                  <input
                    id='postcode'
                    name='postcode'
                    type='text'
                    placeholder='BY ______'
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.postcode}
                  />
                </div>
              )}

              <div className='cart-checkbox'>
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
              </div>
            </form>
          )
        }}
      </Formik>

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
          className='dark-btn'
          onClick={() => setSlide(cartSlides.payment)}
        >
          FURTHER
        </button>
      )}
      <button className='light-btn' onClick={() => setSlide(cartSlides.items)}>
        VIEW CART
      </button>
    </div>
  )
}

export default DeliveryInfo
