import React from 'react'
import {connect} from 'react-redux'
import {fetchAllProducts} from '../store/allProducts'

export class AllProducts extends React.Component {
  constructor() {
    super()
  }

  componentDidMount() {
    this.props.getallProducts()
  }

  render() {
    console.log(this.props.allProducts)
    return <div>All Products</div>
  }
}

const mapState = state => {
  return {
    allProducts: state.products
  }
}

const mapDispatch = dispatch => {
  return {
    getallProducts: () => dispatch(fetchAllProducts())
  }
}

export default connect(mapState, mapDispatch)(AllProducts)
