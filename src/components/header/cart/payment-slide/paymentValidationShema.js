import * as Yup from 'yup'

export const paymentValidationShema = {
    cashEmail: Yup.string().when('paymentMethod', {
      is: (method) => method === 'PayPal',
      then: Yup.string()
        .matches(
          /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
          'Некорректный email'
        )
        .required('Поле должно быть заполнено'),
    }),
    card: Yup.string().when('paymentMethod', {
      is: (method) => method === 'Visa' || method === 'MasterCard',
      then: Yup.string()
        .matches(/(.*\d.*){16}/, 'Введите полный номер')
        .required('Поле должно быть заполнено'),
    }),
    cardDate: Yup.string().when('paymentMethod', {
      is: (method) => method === 'Visa' || method === 'MasterCard',
      then: Yup.string()
        .matches(/(.*\d.*){4}/, 'Введите дату полностью')
        .test('data', 'Срок карты истек', (value) => {
          value = value?.replace(/\D/g, '')
          if (value?.length === 4) {
            const currDate = new Date()
            const [a, b, c, d] = value
            const cardDate = new Date(`20${c}${d}-${a}${b}`)
            return cardDate > currDate
          }
          return true
        })
        .required('Поле должно быть заполнено'),
    }),
    cardCVV: Yup.string().when('paymentMethod', {
      is: (method) => method === 'Visa' || method === 'MasterCard',
      then: Yup.string()
        .min(3, '3-4 символа')
        .max(4, '3-4 символа')
        .required('Поле должно быть заполнено'),
    }),
  }
