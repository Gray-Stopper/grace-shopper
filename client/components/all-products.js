import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchAllProducts} from '../store/allProducts'
import Product from './product'

class AllProducts extends Component {
  constructor() {
    super()
  }

  async componentDidMount() {
    await this.props.getAllProducts()
  }

  render() {
    const grayStoppers = this.props.allProducts
    return (
      <div id="grayStoppers" className="grayStoppers">
        {grayStoppers.map(grayStopper => (
          <Product key={grayStopper.id} product={grayStopper} />
        ))}
      </div>
    )
  }
}

const mapState = state => ({
  allProducts: state.allProducts
})

const mapDispatch = dispatch => ({
  getAllProducts: () => dispatch(fetchAllProducts())
})

export default connect(mapState, mapDispatch)(AllProducts)
