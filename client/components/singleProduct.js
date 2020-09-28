import React, {Component} from 'react'
import Product from './product'
import {Link} from 'react-router-dom'
import {fetchProduct} from '../store/product'
import {addItemThunk} from '../store/cart'
import {addGuestCartItem} from '../store/guestCart'
import {connect} from 'react-redux'

class SingleProduct extends Component {
  constructor() {
    super()
    this.handleAdd = this.handleAdd.bind(this)
  }

  async componentDidMount() {
    const productId = this.props.match.params.productId
    await this.props.get(productId)
  }

  async handleAdd(event, productId) {
    event.preventDefault()
    if (this.props.userId) {
      await this.props.addItem({
        productId,
        userId: this.props.userId
      })
    } else {
      this.props.addGuestItem(productId)
    }
  }

  render() {
    const product = this.props.product
    return (
      <div id="single-product">
        {product.id && (
          <div className="singleProduct">
            <Product product={product} add={this.handleAdd} />
            <p>{product.description}</p>
          </div>
        )}
      </div>
    )
  }
}

const mapState = state => {
  return {
    product: state.singleProduct,
    userId: state.user.id
  }
}

const mapDispatch = dispatch => {
  return {
    get: productId => {
      dispatch(fetchProduct(productId))
    },
    addItem: product => {
      dispatch(addItemThunk(product))
    },
    addGuestItem: productId => {
      dispatch(addGuestCartItem(productId))
    }
  }
}

export default connect(mapState, mapDispatch)(SingleProduct)
