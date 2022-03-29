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

function ReviewModal({ id, isReviewOpen, setIsReviewOpen }) {
  const dispatch = useDispatch()

  let { rating, isLoading, isSeccess, isError, errorMessage } = useSelector(
    (state) => state.review
  )

  useEffect(() => {
    if (isSeccess) {
      setTimeout(() => {
        dispatch(resetReviewSeccess())
      }, 2500)
    }
  }, [isSeccess])

  useEffect(() => {
    if (isError) {
      setTimeout(() => {
        dispatch(resetReviewError())
      }, 2500)
    }
  }, [isError])

  return (
    <div
      className={isReviewOpen ? 'modal-review open' : 'modal-review'}
      onClick={() => setIsReviewOpen(false)}
    >
      <div className='review' onClick={(e) => e.stopPropagation()}>
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
            console.log(id, rating, name, text)        
            dispatch(startSendReview({id, rating, name, text}))
          }}
          validationSchema={Yup.object().shape({
            name: Yup.string()              
                     .required('Введите ваш email'),
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
                <input
                  id='name'
                  value={values.name}
                  type='text'
                  className='review-form__name'
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder='Введите ваше имя'
                />
                <textarea
                  id='text'
                  value={values.text}
                  type='text'
                  className='review-form__text'
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder='Оставьте ваш отзыв'
                />
                <button
                  type='submit'
                  className='review-form__btn'
                  //disabled={Object.keys(errors).length || isLoading}
                >
                  Submit
                </button>
              </form>
            )
          }}
        </Formik>
      </div>
    </div>
  )
}

export default ReviewModal
