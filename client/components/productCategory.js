import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchCategory} from '../store/category'
import {addItemThunk} from '../store/cart'
import {addGuestCartItem} from '../store/guestCart'
import Product from './product'
import {me} from '../store/user'

class productCategory extends Component {
  constructor() {
    super()
    this.state = {
      mounted: false
    }
    this.handleAdd = this.handleAdd.bind(this)
  }

  async componentDidMount() {
    const category = this.props.match.params.category
    await this.props.getCategoryProducts(category)
    this.setState({
      mounted: true
    })
  }

  async componentDidUpdate(prevProps) {
    // Typical usage (don't forget to compare props):
    const category = this.props.match.params.category
    if (category !== prevProps.match.params.category) {
      await this.props.getCategoryProducts(category)
      this.setState({
        mounted: true
      })
    }
  }

  async handleAdd(event, productId) {
    event.preventDefault()
    if (this.props.userId) {
      await this.props.addItem({
        productId,
        userId: this.props.userId
      })
    } else {
      await addGuestCartItem(productId)
    }
  }

  render() {
    const products = this.props.allCategoryProducts || []
    let type = this.props.match.params.category
    if (type === 'color') {
      type = 'COLOR POPPERS'
    } else if (type === 'wigs') {
      type = 'HAIR TOPPERS'
    } else {
      type = 'WELLNESS SHOPPERS'
    }
    if (!this.state.mounted) {
      return null
    } else {
      return (
        <>
          <h2 className="category-margin category-header">{type}</h2>
          <div className="categoryContainer category-margin">
            {products.length > 0 ? (
              products.map(product => (
                <Product
                  key={product.id}
                  product={product}
                  handleAdd={this.handleAdd}
                />
              ))
            ) : (
              <h3>More products coming soon!</h3>
            )}
          </div>
        </>
      )
    }
  }
}

const mapState = state => ({
  allCategoryProducts: state.categoryProducts,
  userId: state.user.id
})

const mapDispatch = dispatch => ({
  getCategoryProducts: category => dispatch(fetchCategory(category)),
  addItem: product => {
    dispatch(addItemThunk(product))
  },
  loadInitialData: () => dispatch(me())
})

export default connect(mapState, mapDispatch)(productCategory)
