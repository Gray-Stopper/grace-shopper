import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchAllProducts} from '../store/allProducts'
import {addItemThunk} from '../store/cart'
import Product from './product'

class AllProducts extends Component {
  constructor() {
    super()
    this.handleAdd = this.handleAdd.bind(this)
  }

  async componentDidMount() {
    await this.props.getAllProducts()
  }

  async handleAdd(event, productId) {
    event.preventDefault()
    await this.props.addItem({
      productId,
      userId: this.props.userId
    })
  }

  render() {
    const grayStoppers = this.props.allProducts || []
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

const mapState = state => ({
  allProducts: state.allProducts,
  userId: state.user.id
})

const mapDispatch = dispatch => ({
  getAllProducts: () => dispatch(fetchAllProducts()),
  addItem: product => {
    dispatch(addItemThunk(product))
  }
})

export default connect(mapState, mapDispatch)(AllProducts)
