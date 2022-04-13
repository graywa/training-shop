import { Formik } from 'formik'
import React from 'react'
import './Payment.scss'
import * as Yup from 'yup'
import cn from 'classnames'
import { cartSlides } from '../Cart'
import PayPal from '../../../../pages/product-page/assets/paypal.svg'
import Visa from '../../../../pages/product-page/assets/visa.svg'
import MasterCard from '../../../../pages/product-page/assets/mastercard.svg'
import MaskedInput from '../masked-input/MaskedInput'
import CartInput from '../cart-input/CartInput'
import eye from './assets/eye.svg'

function Payment({ cartGoods, setSlide }) {
  return (
    <div className='payment-slide'>
      <Formik
        initialValues={{
          payMethod: 'Visa',
          cashEmail: '',
          card: '',
          cardDate: '',
          cardCVV: '',
        }}
        onSubmit={(values, props) => {
          setSlide(cartSlides.status)
        }}
        validationSchema={Yup.object().shape({
          cashEmail: Yup.string()
            .matches(
              /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
              'Некорректный email'
            )
            .required('Обязательное поле'),
          card: Yup.string().when('payMethod', {
            is: (method) => method === 'Visa' || 'Master',
            then: Yup.string()
              .matches(/(.*\d.*){16}/, 'Введите полный номер')
              .required('Обязательное поле'),
          }),
          cardDate: Yup.string().required('Обязательное поле'),
          cardCVV: Yup.string().required('Обязательное поле'),
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
            setFieldValue,
          } = props

          return (
            <form onSubmit={handleSubmit}>
              <div className='form-content'>
                <div className='radio-group'>
                  <div className='radio-group__title'>Method of payments</div>
                  <label>
                    <input
                      type='radio'
                      name='payMethod'
                      value='PayPal'
                      onChange={handleChange}
                      defaultChecked
                    />
                    <img height={22} src={PayPal} alt='PayPal' />
                  </label>
                  <label>
                    <input
                      type='radio'
                      name='payMethod'
                      value='Visa'
                      onChange={handleChange}
                    />
                    <img height={22} src={Visa} alt='PayPal' />
                  </label>
                  <label>
                    <input
                      type='radio'
                      name='payMethod'
                      value='MasterCard'
                      onChange={handleChange}
                    />
                    <img height={22} src={MasterCard} alt='PayPal' />
                  </label>
                  <label>
                    <input
                      type='radio'
                      name='payMethod'
                      value='Cash'
                      onChange={handleChange}
                    />
                    Cash
                  </label>
                </div>

                {(values.payMethod === 'Visa' ||
                  values.payMethod === 'MasterCard') && (
                  <>
                    <MaskedInput
                      name='card'
                      type='text'
                      label='CARD'
                      mask='9999 9999 9999 9999'
                      placeholder='____ ____ ____ ____'
                      handleChange={handleChange}
                    />
                    <div className='cart-input-short'>
                      <CartInput
                        name='cardDate'
                        placeholder='MM/YY'
                        className='cart-input-small'
                      />
                      <CartInput
                        name='cardCVV'
                        type='password'
                        placeholder='CVV'
                        className='cart-input-small'
                      >
                        <img src={eye} alt="eye" />
                      </CartInput>
                    </div>
                  </>
                )}
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
                onClick={() => setSlide(cartSlides.delivery)}
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

export default Payment
