import React from 'react'
import {connect} from 'react-redux'
import {loadCart} from '../store/cart'

class ViewCart extends React.Component {
  constructor() {
    super()
  }

  async componentDidMount() {
    const userId = this.props.user.id
    if (userId) await this.props.loadCart(userId)
  }

  render() {
    console.log(this.props.user.id)
    console.log(this.props.productsInCart)
    return (
      <div>
        <span>This is the cart! Or it will be, soon (hopefully)</span>
        {/* <ul>
          {this.props.productsInCart &&
            this.props.productsInCart.map((cartInfo) => {
              return <li key={cartInfo.id}>{cartInfo}</li>
            })}
        </ul> */}
      </div>
    )
  }
}

const mapState = state => ({
  productsInCart: state.cart,
  user: state.user
})

const mapDispatch = dispatch => ({
  loadCart: userId => dispatch(loadCart(userId))
})

export default connect(mapState, mapDispatch)(ViewCart)
