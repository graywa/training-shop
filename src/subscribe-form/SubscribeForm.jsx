import React, { useEffect } from 'react'
import './SubscribeForm.scss'
import { Formik } from 'formik'
import * as Yup from 'yup'
import { useDispatch, useSelector } from 'react-redux';
import { resetSubscribeSeccess, startSubscribe } from '../store/subscribeSlice';
import CircleLoader from '../components/circle-loader/CircleLoader'

const SubscribeForm = () => {
  const dispatch = useDispatch()
  const {
    isLoading,
    isError,
    errorMessage,
    isSeccess} = useSelector(state => state.subscribe)

  useEffect(() => {
    if(isSeccess) {
      setTimeout(() => {
        dispatch(resetSubscribeSeccess())
      }, 2000)
    }    
  }, [isSeccess])

  return (
    <Formik
      enableReinitialize
      initialValues={{email: ''}}      
      onSubmit={(values, props) => {
        props.setSubmitting(false)
        props.resetForm()
        dispatch(startSubscribe(values))
      }}
      validationSchema={Yup.object().shape({
        email: Yup.string()
                  .email('Email должен быть действительным')
                  .required('Обязательное поле')
      })}
    >
      {props => {
        const {
          values, 
          touched, 
          errors, 
          dirty,
          isSubmitting, 
          handleChange, 
          handleBlur, 
          handleSubmit} = props
        return (
          <form className='form' onSubmit={handleSubmit}>            
            <input 
              id='email'
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
              className={
                errors.email && touched.email ? 'form__input error' : 'form__input'
              } 
              type="email" 
              placeholder='Enter your email'
            />
            {errors.email && touched.email && (
              <div className='form__input-error'>{errors.email}</div>
            )}   
            {isError && (
              <div className='form__input-error'>{`Ошибка: ${errorMessage}`}</div>
            )}        
            {isSeccess && (
              <div className='form__input-seccess'>{'✓ Вы успешно подписались'}</div>
            )}        
            <button
              type='submit'              
              className="form__button"              
              disabled={Object.keys(errors).length || isSubmitting}
            >
              subscribe
              {isLoading && (
                <span className="form__loader">
                  <CircleLoader />
                </span>
              )}              
            </button>
          </form>
        )
      }}      
    </Formik>
  )
}

export default SubscribeForm