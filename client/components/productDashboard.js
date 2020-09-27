import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchAllProducts, removeProduct} from '../store/allProducts'
import {ProductRow} from './index'

class ProductDashboard extends Component {
  constructor() {
    super()
    this.handleRemove = this.handleRemove.bind(this)
  }

  async componentDidMount() {
    await this.props.getAllProducts()
  }

  async handleRemove(userId) {
    await this.props.removeProduct(userId)
  }

  render() {
    return (
      <div>
        <h3 className="margin-left">Product Dashboard</h3>
        <table className="cart left">
          <thead className="t-head">
            <tr>
              <th scope="col">Image</th>
              <th scope="col">Product ID</th>
              <th scope="col">Name</th>
              <th scope="col">Category</th>
              <th scope="col">Stock</th>
              <th scope="col" />
              <th scope="col" />
            </tr>
          </thead>
          <tbody>
            {this.props.products &&
              this.props.products.sort((a, b) => a.id - b.id).map(product => {
                return (
                  <ProductRow
                    key={product.id}
                    product={product}
                    // showEdit={this.showEdit}
                    removeProduct={this.handleRemove}
                  />
                )
              })}
          </tbody>
        </table>
        <br />
        {/* <NewUser
          onChange={this.handleFormInput}
          onSubmit={this.handleAdd}
          formInput={this.state}
        />
        {this.state.showEdit && (
          <EditUser
            onChange={this.handleFormInput}
            onSubmit={this.handleEdit}
            formInput={this.state}
          />
        )} */}
      </div>
    )
  }
}

const mapState = state => ({
  products: state.allProducts
})

const mapDispatch = dispatch => ({
  getAllProducts: () => dispatch(fetchAllProducts()),
  removeProduct: userId => dispatch(removeProduct(userId))
  // addUser: userInfo => dispatch(addUser(userInfo)),
  // editUser: userInfo => dispatch(editUser(userInfo))
})

export default connect(mapState, mapDispatch)(ProductDashboard)
