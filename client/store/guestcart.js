import axios from 'axios'

export const addGuestCartItem = async productId => {
  try {
    const {data} = await axios.get(`/api/products/${productId}`)
    if (localStorage.getItem('cart')) {
      const productObj = JSON.parse(localStorage.getItem('cart'))
      if (Object.keys(productObj).includes(data.name)) {
        if (productObj[data.name].quantity >= 10) {
          alert(
            'You have reached the purchase limit for this item. Sharing is caring!'
          )
        } else if (data.stock > productObj[data.name].quantity) {
          ++productObj[data.name].quantity
        } else {
          alert(`Only ${data.stock} in stock!`)
        }
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

export const removeGuestCartItem = productName => {
  try {
    const cartArr = JSON.parse(localStorage.getItem('cart'))
    delete cartArr[productName]
    const objToStr = JSON.stringify(cartArr)
    localStorage.setItem('cart', objToStr)
  } catch (err) {
    console.log(err)
  }
}

export const updateGuestItemQuantity = (name, newQuantity) => {
  try {
    const cartArr = JSON.parse(localStorage.getItem('cart'))
    cartArr[name].quantity = newQuantity
    const objToStr = JSON.stringify(cartArr)
    localStorage.setItem('cart', objToStr)
  } catch (err) {
    console.log(err)
  }
}
