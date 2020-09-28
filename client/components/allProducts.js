import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchAllProducts} from '../store/allProducts'
import {addItemThunk} from '../store/cart'
import {addGuestCartItem} from '../store/guestCart'
import Product from './product'

class AllProducts extends Component {
  constructor() {
    super()
    this.state = {
      mounted: false
    }
    this.handleAdd = this.handleAdd.bind(this)
  }

  async componentDidMount() {
    await this.props.getAllProducts()
    this.setState({mounted: true})
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
    const grayStoppers = this.props.allProducts || []
    if (!this.state.mounted) {
      return null
    } else {
      return (
        <div>
          {grayStoppers.length > 0 ? (
            <>
              <div id="grayStoppers" className="grayStoppers">
                <h3>COLOR POPPERS</h3>
                {grayStoppers
                  .filter(grayStopper => grayStopper.category === 'color')
                  .map(grayStopper => (
                    <Product
                      key={grayStopper.id}
                      product={grayStopper}
                      add={this.handleAdd}
                    />
                  ))}
              </div>
              <div id="grayStoppers" className="grayStoppers">
                <h3>HAIR TOPPERS</h3>
                {grayStoppers
                  .filter(grayStopper => grayStopper.category === 'wigs')
                  .map(grayStopper => (
                    <Product
                      key={grayStopper.id}
                      product={grayStopper}
                      add={this.handleAdd}
                    />
                  ))}
              </div>
              <div id="grayStoppers" className="grayStoppers">
                <h3>FOR WELLNESS SHOPPERS</h3>
                {grayStoppers
                  .filter(grayStopper => grayStopper.category === 'nutrition')
                  .map(grayStopper => (
                    <Product
                      key={grayStopper.id}
                      product={grayStopper}
                      add={this.handleAdd}
                    />
                  ))}
              </div>
            </>
          ) : (
            <h3>More products coming soon!</h3>
          )}
        </div>
      )
    }
  }
}

const mapState = state => ({
  allProducts: state.allProducts,
  userId: state.user.id
})

const mapDispatch = dispatch => ({
  getAllProducts: () => dispatch(fetchAllProducts()),
  addItem: product => {
    dispatch(addItemThunk(product))
  },
  addGuestItem: productId => {
    dispatch(addGuestCartItem(productId))
  }
})

export default connect(mapState, mapDispatch)(AllProducts)
