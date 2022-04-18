import * as Yup from 'yup'

const validationForAddress = {
  is: (method) => method !== 'Store pickup',
  then: Yup.string().required('Поле должно быть заполнено'),
}

const validationForStoreAddress = {
  is: (method) => method === 'Store pickup',
  then: Yup.string().required('Поле должно быть заполнено'),
}

export const deliveryValidationShema  = {
  phone: Yup.string()
    .matches(/(.*\d.*){12}/, 'Введите полный номер')
    .required('Поле должно быть заполнено'),
  email: Yup.string()
    .matches(
      /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
      'Некорректный email'
    )
    .required('Поле должно быть заполнено'),
  country: Yup.string().when('deliveryMethod', validationForAddress),
  city: Yup.string().when('deliveryMethod', validationForAddress),
  street: Yup.string().when('deliveryMethod', validationForAddress),
  house: Yup.string().when('deliveryMethod', validationForAddress),
  apartment: Yup.number('Вводите цифры')
    .typeError('Вводите цифры')
    .max(999, 'Слишком длинный номер'),
  postcode: Yup.string().when('deliveryMethod', {
    is: (method) => method === 'Pickup from post offices',
    then: Yup.string()
      .matches(/(.*\d.*){6}/, 'Введите полный номер')
      .required('Поле должно быть заполнено'),
  }),
  country2: Yup.string().when(
    'deliveryMethod',
    validationForStoreAddress
  ),
  storeAddress: Yup.string().when(
    'deliveryMethod',
    validationForStoreAddress
  ),
  checkbox: Yup.boolean()
    .oneOf(
      [true],
      'Вы должны согласиться на обработку личной информации'
    )
    .required('Поле должно быть заполнено'),
}