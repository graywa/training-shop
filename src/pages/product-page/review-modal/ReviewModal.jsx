import React, { useEffect } from 'react'
import { Formik } from 'formik'
import './ReviewModal.scss'
import { useDispatch, useSelector } from 'react-redux'
import * as Yup from 'yup'
import {
  startSendReview,
  sendReviewSeccess,
  resetReviewSeccess,
  sendReviewError,
  resetReviewError,
} from '../../../store/reviewSlice'
import Rating from '../../../components/rating/Rating'
import cross from '../../../components/filter/assets/cross.svg'
import CircleLoader from '../../../components/circle-loader/CircleLoader'
import { getProduct } from '../../../store/goodsSlice'


function ReviewModal({ id, isReviewOpen, setIsReviewOpen }) {
  const dispatch = useDispatch()

  let { rating, isLoading, isSeccess, isError, errorMessage } = useSelector(
    (state) => state.review
  )

  useEffect(() => {    
    const scrollWidth = window.innerWidth - document.body.offsetWidth
    document.body.style.overflow = isReviewOpen ? 'hidden' : 'visible'
    document.body.style.paddingRight = isReviewOpen ? `${scrollWidth}px` : ''
  }, [isReviewOpen])

  useEffect(() => {
    if (isError) {
      setTimeout(() => {
        dispatch(resetReviewError())
      }, 2500)
    }
  }, [isError])

  useEffect(() => {
    if(isSeccess) {
      setTimeout(() => {
        setIsReviewOpen(false)
        console.log(isSeccess)
        dispatch(resetReviewSeccess())
        dispatch(getProduct({id}))
      }, 1500)
    }
  }, [isSeccess])

  

  return (
    <div
      className={isReviewOpen ? 'modal-review open' : 'modal-review'}
      onClick={() => setIsReviewOpen(false)}
    >
      <div className='review' onClick={(e) => e.stopPropagation()}>
        <img 
          className='review__cross' 
          src={cross} 
          alt="cross" 
          onClick={() => setIsReviewOpen(false)}
        />
        <div className='review__title'>Whrite a review</div>
        <div className='review__rating'>
          <Rating editable={true} rating={rating} size={30} />
        </div>
        <Formik
          initialValues={{
            name: '',
            text: '',            
          }}
          onSubmit={({name, text}, props) => {
            props.resetForm()    
            dispatch(startSendReview({id, rating, name, text}))
          }}
          validationSchema={Yup.object().shape({
            name: Yup.string()              
                     .required('Введите ваше имя'),
            text: Yup.string()
                     .required('Введите ваш отзыв')
          })}
        >
          {(props) => {
            const {
              values,
              touched,
              errors,
              handleChange,
              handleBlur,
              setErrors,
              handleSubmit,
            } = props

            return (
              <form className='review-form' onSubmit={handleSubmit}>
                <div className='wrapper-field'>
                  <input
                    id='name'
                    value={values.name}
                    type='text'
                    className='review-form__name'
                    onChange={handleChange}
                    onBlur={() => {  
                      if(!values.name){
                        setTimeout(() => {
                          setErrors({})
                        }, 2500)   
                      }                   
                    }}
                    placeholder='Ваше имя'
                  />
                  {errors.name && touched.name && (
                    <div className='review__message error'>{errors.name}</div>
                  )}                  
                </div>

                <div className="wrapper-field">
                  <textarea
                    id='text'
                    value={values.text}
                    type='text'
                    className='review-form__text'
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder='Ваш отзыв'
                  />
                  {errors.text && touched.text && (
                    <div className='review__message error textarea'>{errors.text}</div>
                  )}                  
                </div>                

                <div className="wrapper-field">
                  <button
                    type='submit'
                    className='review-form__btn'
                    disabled={Object.keys(errors).length || isLoading}
                  >
                    SUBMIT
                    {isLoading && (
                      <span className="review__loader">
                        <CircleLoader />
                      </span> 
                    )}
                                    
                  </button>
                  {isError && (
                    <div
                      className='review__message error'
                    >{`Ошибка: ${errorMessage}`}</div>
                  )}  
                  {isSeccess && (
                    <div className='review__message'>
                      '✓ Ваш отзыв успешно добавлен'
                    </div>
                  )}
                </div>
                
              </form>
            )
          }}
        </Formik>
      </div>
    </div>
  )
}

export default ReviewModal
