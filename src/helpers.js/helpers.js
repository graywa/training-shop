export const removeItemFromArray = (arr, id, size, color) => {
  return [
    ...arr.filter(
      (el) => el.id !== id || el.size !== size || el.color !== color
    ),
  ]
}

