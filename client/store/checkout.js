import axios from 'axios'

export const putCheckOutItems = (orderObj, ownProps) => {
  return async () => {
    try {
      const cart = orderObj.obj.product
      const {data} = await axios.put(
        `/api/cart/${cart.userId}/${cart.id}`,
        orderObj
      )
      ownProps.props.history.push(data.redirectUrl)
      if (data.alert) {
        const verb = data.alert.length > 1 ? 'are' : 'is'
        alert(`${data.alert.join(' ')} ${verb} sold out!`)
      }
    } catch (err) {
      console.log(err)
    }
  }
}
