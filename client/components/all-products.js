import React from 'react'
import {connect} from 'react-redux'

export class AllProducts extends React.Component {
  render() {
    return <div>All Products</div>
  }
}

const mapState = state => {
  return {}
}

const mapDispatch = dispatch => {
  return {}
}

export default connect(mapState, mapDispatch)(AllProducts)
