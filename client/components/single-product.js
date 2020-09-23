import React, {Component} from 'react'
import Product from './product'
import {Link} from 'react-router-dom'
import {fetchProduct} from '../store/product'
import {connect} from 'react-redux'

class SingleProduct extends Component {
  async componentDidMount() {
    const productId = this.props.match.params.productId
    await this.props.get(productId)
  }

  render() {
    const product = this.props.product
    return (
      <div id="single-product">
        {product.id && (
          <div>
            <Product product={product} />
          </div>
        )}
      </div>
    )
  }
}

const mapState = state => {
  return {
    product: state.singleProduct
  }
}

const mapDispatch = dispatch => {
  return {
    get: productId => {
      dispatch(fetchProduct(productId))
    }
  }
}

export default connect(mapState, mapDispatch)(SingleProduct)
