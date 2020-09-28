import React, {Component} from 'react'
import {connect} from 'react-redux'
import {
  fetchAllProducts,
  removeProduct,
  addProduct,
  editProduct
} from '../store/allProducts'
import {ProductRow, NewProduct, EditProduct} from './index'

class ProductDashboard extends Component {
  constructor() {
    super()
    this.state = {
      mounted: false,
      newName: '',
      newImageUrl: '',
      newStock: 10,
      newPrice: '',
      newCategory: '',
      newDescription: '',
      showEdit: false,
      editId: '',
      editName: '',
      editImageUrl: '',
      editStock: '',
      editPrice: '',
      editCategory: '',
      editDescription: ''
    }
    this.handleRemove = this.handleRemove.bind(this)
    this.handleFormInput = this.handleFormInput.bind(this)
    this.handleAdd = this.handleAdd.bind(this)
    this.handleEdit = this.handleEdit.bind(this)
    this.showEdit = this.showEdit.bind(this)
  }

  async componentDidMount() {
    await this.props.getAllProducts()
    this.setState({mounted: true})
  }

  handleFormInput(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  async handleRemove(productId) {
    await this.props.removeProduct(productId)
  }

  showEdit(id) {
    const [productToEdit] = this.props.products.filter(prod => prod.id === id)
    this.setState(prevState => ({
      showEdit: !prevState.showEdit,
      editId: id,
      editName: productToEdit.name,
      editImageUrl: productToEdit.imageUrl,
      editStock: productToEdit.stock,
      editPrice: productToEdit.price,
      editCategory: productToEdit.category,
      editDescription: productToEdit.description
    }))
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
        price: parseInt(newPrice * 100, 10)
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

  async handleEdit(event) {
    event.preventDefault()
    const {
      editId,
      editName,
      editCategory,
      editPrice,
      editStock,
      editImageUrl,
      editDescription
    } = this.state

    if (editName && editCategory && editPrice && editStock) {
      const editProductInfo = {
        id: editId,
        name: editName,
        stock: editStock,
        category: editCategory,
        price: parseInt(editPrice * 100, 10)
      }

      if (editImageUrl) editProductInfo.imageUrl = editImageUrl
      if (editDescription) editProductInfo.description = editDescription

      await this.props.editProduct(editProductInfo)

      this.setState({
        showEdit: false,
        editId: '',
        editName: '',
        editImageUrl: '',
        editStock: '',
        editPrice: '',
        editCategory: '',
        editDescription: ''
      })
    }
  }

  render() {
    if (!this.state.mounted) {
      return null
    } else {
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
                      showEdit={this.showEdit}
                      removeProduct={this.handleRemove}
                    />
                  )
                })}
            </tbody>
          </table>
          <br />
          {this.state.showEdit && (
            <EditProduct
              onChange={this.handleFormInput}
              onSubmit={this.handleEdit}
              formInput={this.state}
            />
          )}
          <NewProduct
            onChange={this.handleFormInput}
            onSubmit={this.handleAdd}
            formInput={this.state}
          />
        </div>
      )
    }
  }
}

const mapState = state => ({
  products: state.allProducts
})

const mapDispatch = dispatch => ({
  getAllProducts: () => dispatch(fetchAllProducts()),
  removeProduct: productId => dispatch(removeProduct(productId)),
  addProduct: productInfo => dispatch(addProduct(productInfo)),
  editProduct: productInfo => dispatch(editProduct(productInfo))
})

export default connect(mapState, mapDispatch)(ProductDashboard)
