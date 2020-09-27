import axios from 'axios'

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
      }
    } catch (err) {
      console.log(err)
    }
  }
}
