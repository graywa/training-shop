import React, { useEffect, useRef } from 'react'
import './SubscribeForm.scss'
import { Formik, useFormik } from 'formik'
import * as Yup from 'yup'
import { useDispatch, useSelector } from 'react-redux'
import {
  resetSubscribeError,
  resetSubscribeSeccess,
  startSubscribe,
} from '../store/subscribeSlice'
import CircleLoader from '../components/circle-loader/CircleLoader'
import { useLocation } from 'react-router-dom'

const SubscribeForm = ({
  description,
  formClass,
  inputClass,
  messageClass,
  buttonClass,
  loaderClass,  
  buttonText,
  testInput,
  testButton
}) => {
  const dispatch = useDispatch()
  const {pathname} = useLocation()
  const formikRef = useRef()

  let {isLoading, isSeccess, isError, errorMessage} = useSelector(
    (state) => state.subscribe
  )

  isLoading = isLoading === description ? true : false
  isSeccess = isSeccess === description ? true : false
  isError = isError === description ? true : false

  useEffect(() => {
    if (isSeccess) {
      formikRef.current.resetForm()
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

  useEffect(() => {
    dispatch(resetSubscribeSeccess())
    formikRef.current.resetForm()
  }, [pathname])

  return (
    <Formik
      initialValues={{ mainEmail: '' }}
      onSubmit={(values, props) => {
        const email = values.mainEmail
        dispatch(startSubscribe({email, description}))        
      }}
      validationSchema={Yup.object().shape({
        mainEmail: Yup.string()
          .matches(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i, 'Некорректный email')
          .email('email не верный')
          .required('Введите ваш email'),
      })}      
      innerRef={formikRef}        
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
          setFieldTouched,
          handleSubmit,
        } = props

        return (
          <form className={formClass} onSubmit={handleSubmit}>  
            <div className="input-wrapper">
              <input
                id='mainEmail'
                value={values.mainEmail}                
                onChange={handleChange}
                onBlur={(e) => {   
                  if(!values.mainEmail){
                    setTimeout(() => {
                      setFieldTouched('mainEmail', false)
                    }, 2000)   
                  }
                  handleBlur(e) 
                }                   
                }
                className={
                  (errors.mainEmail && touched.mainEmail) || isError || isSeccess
                    ? `${inputClass} message`
                    : inputClass 
                }
                type='email'
                placeholder='Enter your email'
                data-test-id={testInput}
              />
              {errors.mainEmail && touched.mainEmail && (
                <div className={`${messageClass} error`}>{errors.mainEmail}</div>
              )}
              {isError && (
                <div
                  className={`${messageClass} error`}
                >{`Ошибка: ${errorMessage}`}</div>
              )}
              {isSeccess && (
                <div className={`${messageClass} success`}>
                  ✓ Вы успешно подписались
                </div>
              )}
            </div>          
            
            <button
              type='submit'
              className={buttonClass}
              disabled={!isValid || !dirty}
              data-test-id={testButton}
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
