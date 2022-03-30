import React, { useEffect } from 'react'
import './SubscribeForm.scss'
import { Formik } from 'formik'
import * as Yup from 'yup'
import { useDispatch, useSelector } from 'react-redux'
import {
  resetSubscribeError,
  resetSubscribeSeccess,
  startSubscribe,
} from '../store/subscribeSlice'
import CircleLoader from '../components/circle-loader/CircleLoader'

const SubscribeForm = ({
  description,
  formClass,
  inputClass,
  messageClass,
  buttonClass,
  loaderClass,  
  buttonText
}) => {
  const dispatch = useDispatch()
  let {isLoading, isSeccess, isError, errorMessage} = useSelector(
    (state) => state.subscribe
  )

  isLoading = isLoading === description ? true : false
  isSeccess = isSeccess === description ? true : false
  isError = isError === description ? true : false

  useEffect(() => {
    if (isSeccess) {
      setTimeout(() => {
        dispatch(resetSubscribeSeccess())
      }, 2500)
    }
  }, [isSeccess])

  useEffect(() => {
    if (isError) {
      setTimeout(() => {
        dispatch(resetSubscribeError())
      }, 2500)
    }
  }, [isError])

  return (
    <Formik
      initialValues={{ email: '' }}
      onSubmit={(values, props) => {
        const email = values.email
        props.resetForm()
        dispatch(startSubscribe({email, description}))        
      }}
      validationSchema={Yup.object().shape({
        email: Yup.string()
          .email('email должен быть действительным')
          .required('Введите ваш email'),
      })}        
    >
      {(props) => {
        const {
          values,
          touched,
          errors,
          handleChange,
          setErrors,
          handleSubmit,
        } = props

        return (
          <form className={formClass} onSubmit={handleSubmit}>  
            <div className="input-wrapper">
              <input
                id='email'
                value={values.email}
                onChange={handleChange}
                onBlur={() => {  
                  if(!values.email){
                    setTimeout(() => {
                      setErrors({})
                    }, 2500)   
                  }                   
                }}
                className={
                  (errors.email && touched.email) || isError || isSeccess
                    ? `${inputClass} message`
                    : inputClass 
                }
                type='email'
                placeholder='Enter your email'
              />
              {errors.email && touched.email && (
                <div className={`${messageClass} error`}>{errors.email}</div>
              )}
              {isError && (
                <div
                  className={`${messageClass} error`}
                >{`Ошибка: ${errorMessage}`}</div>
              )}
              {isSeccess && (
                <div className={`${messageClass} success`}>
                  '✓ Вы успешно подписались'
                </div>
              )}
            </div>          
            
            <button
              type='submit'
              className={buttonClass}
              disabled={Object.keys(errors).length || isLoading}
            >
              {buttonText}
              {isLoading && (
                <span className={loaderClass}>
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
