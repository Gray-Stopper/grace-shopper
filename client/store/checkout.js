import axios from 'axios'

export const putCheckOutItems = (orderObj, ownProps) => {
  return async () => {
    try {
      console.log(orderObj)
      const cart = orderObj.product
      const {data} = await axios.put(
        `/api/cart/${cart.userId}/${cart.id}`,
        orderObj
      )
      ownProps.history.push(data.redirectUrl)
    } catch (err) {
      console.log(err)
    }
  }
}
