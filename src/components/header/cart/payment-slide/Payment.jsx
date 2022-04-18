import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Formik } from 'formik'
import * as Yup from 'yup'
import MaskedInput from '../masked-input/MaskedInput'
import CartInput from '../cart-input/CartInput'
import { startPostOrder, updOrder } from '../../../../store/orderSlice'
import { paymentValidationShema } from './paymentValidationShema'
import { cartSlides } from '../constants'
import PayPal from '../../../../pages/product-page/assets/paypal.svg'
import Visa from '../../../../pages/product-page/assets/visa.svg'
import MasterCard from '../../../../pages/product-page/assets/mastercard.svg'
import eye from './assets/eye.svg'

const Payment = ({
  cartGoods,
  setSlide,
  totalPrice,
  isResetForm,
  setIsResetForm,
}) => {
  const [formatChars, setFormatChars] = useState({
    1: '[0-1]',
    2: '[0-9]',
    3: '[2]',
    9: '[0-9]',
  })

  const initialValues = {
    paymentMethod: 'Visa',
    cashEmail: '',
    card: '',
    cardDate: '',
    cardCVV: '',
  }

  const dispatch = useDispatch()
  const formRef = useRef()

  let { order } = useSelector((state) => state.order)

  useEffect(() => {
    if (isResetForm) {
      formRef.current.resetForm()
      setIsResetForm(false)
    }
  }, [isResetForm])

  const onSubmit = (values) => {
    const fields = { ...values }

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
    if (
      fields.paymentMethod === 'Visa' ||
      fields.paymentMethod === 'MasterCard'
    ) {
      fields.paymentMethod = 'Card'
    }

    order = { ...order, ...fields }

    dispatch(updOrder({ fields }))
    dispatch(startPostOrder({ order }))

    setSlide(cartSlides.status)
  }

  return (
    <div className='payment-slide'>
      <Formik
        innerRef={formRef}
        initialValues={initialValues}
        onSubmit={(values) => onSubmit(values)}
        validationSchema={Yup.object().shape(paymentValidationShema)}
      >
        {({ values: { paymentMethod }, handleChange, handleSubmit }) => {
          const cardDateChange = (e) => {
            handleChange(e)
            const { value } = e.target

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
                      checked={paymentMethod === 'PayPal'}
                      onChange={handleChange}
                    />
                    <img height={22} src={PayPal} alt='PayPal' />
                  </label>
                  <label>
                    <input
                      type='radio'
                      name='paymentMethod'
                      value='Visa'
                      checked={paymentMethod === 'Visa'}
                      onChange={handleChange}
                    />
                    <img height={22} src={Visa} alt='Card' />
                  </label>
                  <label>
                    <input
                      type='radio'
                      name='paymentMethod'
                      value='MasterCard'
                      onChange={handleChange}
                      checked={paymentMethod === 'MasterCard'}
                    />
                    <img height={22} src={MasterCard} alt='Card' />
                  </label>
                  <label>
                    <input
                      type='radio'
                      name='paymentMethod'
                      value='Cash'
                      checked={paymentMethod === 'Cash'}
                      onChange={handleChange}
                    />
                    Cash
                  </label>
                </div>

                {paymentMethod === 'PayPal' && (
                  <CartInput
                    name='cashEmail'
                    label='E-MAIL'
                    placeholder='e-mail'
                  />
                )}

                {(paymentMethod === 'Visa' ||
                  paymentMethod === 'MasterCard') && (
                  <>
                    <MaskedInput
                      name='card'
                      type='text'
                      label='CARD'
                      mask='9999 9999 9999 9999'
                      placeholder='____ ____ ____ ____'
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
              <button className='dark-btn' type='submit'>
                {paymentMethod === 'Cash' ? 'READY' : 'CHECK OUT'}
              </button>
              <button
                type='button'
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
