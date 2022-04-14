import { Formik } from 'formik'
import React, { useState } from 'react'
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
import { startPostOrder, updOrder } from '../../../../store/orderSlice'
import { useDispatch, useSelector } from 'react-redux'

function Payment({ cartGoods, setSlide, totalPrice }) {
  const [formatChars, setFormatChars] = useState({
    1: '[0-1]',
    2: '[0-9]',
    3: '[2]',
    9: '[0-9]',
  })

  const dispatch = useDispatch()

  let {order} = useSelector(state => state.order)

  return (
    <div className='payment-slide'>
      <Formik
        initialValues={{
          paymentMethod: 'Card',
          cashEmail: '',
          card: '',
          cardDate: '',
          cardCVV: '',
        }}
        onSubmit={(values, props) => {
          const fields = values

          const products = cartGoods.map((el) => {
            return {
              name: el.name,
              size: el.size,
              color: el.color,
              quantity: el.quantity,
            }
          })

          fields.products = products
          fields.totalPrice = totalPrice
          
          dispatch(updOrder({ fields }))

          order = {...order, ...fields}
          
          console.log(fields)
          console.log(order)

          dispatch(startPostOrder({order}))

        }}
        validationSchema={Yup.object().shape({
          cashEmail: Yup.string().when('paymentMethod', {
            is: (method) => method === 'PayPal',
            then: Yup.string()
              .matches(
                /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                'Некорректный email'
              )
              .required('Обязательное поле'),
          }),
          card: Yup.string().when('paymentMethod', {
            is: (method) => method === 'Card',
            then: Yup.string()
              .matches(/(.*\d.*){16}/, 'Введите полный номер')
              .required('Обязательное поле'),
          }),
          cardDate: Yup.string().when('paymentMethod', {
            is: (method) => method === 'Card',
            then: Yup.string()
              .matches(/(.*\d.*){4}/, 'Введите дату полностью')
              .test('data', 'Срок карты истек', (value) => {
                value = value.replace(/\D/g, '')
                if (value.length === 4) {
                  const currDate = new Date()
                  const [a, b, c, d] = value
                  const cardDate = new Date(`20${c}${d}-${a}${b}`)
                  return cardDate > currDate
                }
                return true
              })
              .required('Обязательное поле'),
          }),
          cardCVV: Yup.string().when('paymentMethod', {
            is: (method) => method === 'Card',
            then: Yup.string()
              .min(3, '3-4 символа')
              .max(4, '3-4 символа')
              .required('Обязательное поле'),
          }),
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
            setFieldError,
          } = props

          const cardDateChange = (e) => {
            handleChange(e)
            let value = e.target.value

            if (value[0] === '1') setFormatChars({ ...formatChars, 2: '[0-2]' })
            if (value[0] === '0') setFormatChars({ ...formatChars, 2: '[1-9]' })
          }

          return (
            <form onSubmit={handleSubmit}>
              <div className='form-content'>
                <div className='radio-group'>
                  <div className='radio-group__title'>Method of payments</div>
                  <label>
                    <input
                      type='radio'
                      name='paymentMethod'
                      value='PayPal'
                      onChange={handleChange}
                    />
                    <img height={22} src={PayPal} alt='PayPal' />
                  </label>
                  <label>
                    <input
                      type='radio'
                      name='paymentMethod'
                      value='Card'
                      onChange={handleChange}
                      defaultChecked
                    />
                    <img height={22} src={Visa} alt='PayPal' />
                  </label>
                  <label>
                    <input
                      type='radio'
                      name='paymentMethod'
                      value='Card'
                      onChange={handleChange}
                    />
                    <img height={22} src={MasterCard} alt='PayPal' />
                  </label>
                  <label>
                    <input
                      type='radio'
                      name='paymentMethod'
                      value='Cash'
                      onChange={handleChange}
                    />
                    Cash
                  </label>
                </div>

                {values.paymentMethod === 'PayPal' && (
                  <CartInput
                    name='cashEmail'
                    label='E-MAIL'
                    placeholder='e-mail'
                  />
                )}

                {values.paymentMethod === 'Card' && (
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
                      <MaskedInput
                        name='cardDate'
                        placeholder='MM/YY'
                        type='text'
                        mask='12/39'
                        formatChars={formatChars}
                        className='cart-input-small'
                        handleChange={cardDateChange}
                      />

                      <CartInput
                        name='cardCVV'
                        type='password'
                        hasImg={true}
                        placeholder='CVV'
                        className='cart-input-small'
                        handleChange={handleChange}
                      >
                        <img src={eye} alt='eye' />
                      </CartInput>
                    </div>
                  </>
                )}
              </div>

              <div className='cart__total'>
                Total:
                <span>${totalPrice}</span>
              </div>
              {!!cartGoods.length && (
                <button className='dark-btn' type='submit'>
                  {values.paymentMethod === 'Cash' ? 'READY' : 'CHECK OUT'}
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
