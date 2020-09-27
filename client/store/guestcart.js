import axios from 'axios'

export const addGuestCartItem = productId => async () => {
  try {
    const {data} = await axios.get(`/api/products/${productId}`)
    if (localStorage.getItem('cart')) {
      const productObj = JSON.parse(localStorage.getItem('cart'))
      if (Object.keys(productObj).includes(data.name)) {
        ++productObj[data.name].quantity
      } else {
        productObj[data.name] = data
        productObj[data.name].quantity = 1
      }
      const objToStr = JSON.stringify(productObj)
      localStorage.setItem('cart', objToStr)
    } else {
      const item = {}
      item[data.name] = data
      item[data.name].quantity = 1
      const objToStr = JSON.stringify(item)
      localStorage.setItem('cart', objToStr)
    }
  } catch (err) {
    console.log(err)
  }
}
