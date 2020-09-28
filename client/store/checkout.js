import axios from 'axios'

const SHIP_FORM = 'SHIP_FORM'
const PAY_FORM = 'PAY_FORM'

export const shipFormComplete = () => ({
  type: SHIP_FORM,
  shipping: true
})

export const payFormComplete = () => ({
  type: PAY_FORM,
  payment: true
})

export const putCheckOutItems = (orderObj, ownProps) => {
  return async () => {
    try {
      const cart = orderObj.obj.product.cart
      const {data} = await axios.put(
        `/api/cart/${cart.userId}/${cart.id}`,
        orderObj
      )
      if (data.alert) {
        const verb = data.alert.length > 1 ? 'are' : 'is'
        alert(`${data.alert.join(' ')} ${verb} sold out!`)
      } else {
        ownProps.props.history.push(data.redirectUrl)
      }
    } catch (err) {
      console.log(err)
    }
  }
}

export const putGuestCheckout = (productObj, ownProps) => {
  return async () => {
    try {
      const {data} = await axios.put('api/cart/guestCheckout', productObj)
      if (data.alert) {
        const verb = data.alert.length > 1 ? 'are' : 'is'
        alert(`${data.alert.join(' ')} ${verb} sold out!`)
      } else {
        ownProps.props.history.push(data.redirectUrl)
        localStorage.removeItem('cart')
      }
    } catch (err) {
      console.log(err)
    }
  }
}

const initialState = {
  shipping: false,
  payment: false
}

export default function checkoutReducer(state = initialState, action) {
  switch (action.type) {
    case SHIP_FORM:
      return {...state, shipping: action.shipping}
    case PAY_FORM:
      return {...state, payment: action.payment}
    default:
      return state
  }
}
