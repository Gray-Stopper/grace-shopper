import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchAllProducts, removeProduct, addProduct} from '../store/allProducts'
import {ProductRow, NewProduct} from './index'

class ProductDashboard extends Component {
  constructor() {
    super()
    this.state = {
      newName: '',
      newImageUrl: '',
      newStock: 10,
      newPrice: '',
      newCategory: '',
      newDescription: ''
    }
    this.handleRemove = this.handleRemove.bind(this)
    this.handleFormInput = this.handleFormInput.bind(this)
    this.handleAdd = this.handleAdd.bind(this)
  }

  async componentDidMount() {
    await this.props.getAllProducts()
  }

  handleFormInput(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
    console.log('this.state.price: ', this.state.newPrice)
  }

  async handleRemove(productId) {
    await this.props.removeProduct(productId)
  }

  async handleAdd(event) {
    event.preventDefault()
    const {
      newName,
      newCategory,
      newPrice,
      newStock,
      newImageUrl,
      newDescription
    } = this.state

    if (newName && newCategory && newPrice) {
      const newProductInfo = {
        name: newName,
        stock: newStock,
        category: newCategory,
        price: newPrice * 100
      }
      if (newImageUrl) newProductInfo.imageUrl = newImageUrl
      if (newDescription) newProductInfo.description = newDescription
      if (newStock || newStock === 0) newProductInfo.stock = newStock

      await this.props.addProduct(newProductInfo)
      this.setState({
        newName: '',
        newImageUrl: '',
        newStock: 10,
        newPrice: '',
        newCategory: ''
      })
    }
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
              <th scope="col">Price</th>
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
        <NewProduct
          onChange={this.handleFormInput}
          onSubmit={this.handleAdd}
          formInput={this.state}
        />
        {/* {this.state.showEdit && (
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
  removeProduct: productId => dispatch(removeProduct(productId)),
  addProduct: productInfo => dispatch(addProduct(productInfo))
  // editUser: userInfo => dispatch(editUser(userInfo))
})

export default connect(mapState, mapDispatch)(ProductDashboard)
