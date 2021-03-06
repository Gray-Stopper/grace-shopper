import React, {Component} from 'react'
import {connect} from 'react-redux'
import MediaQuery from 'react-responsive'
import {fetchAllProducts} from '../store/allProducts'
import {addItemThunk} from '../store/cart'
import AllProductRender from './allProductRender'
import {addGuestCartItem} from '../store/guestCart'
import {me} from '../store/user'

class AllProducts extends Component {
  constructor() {
    super()
    this.state = {
      mounted: false,
      colorProducts: [],
      wigProducts: [],
      nutritionProducts: [],
      colorLeft: 0,
      colorRight: 3,
      wigLeft: 0,
      wigRight: 3,
      nutritionLeft: 0,
      nutritionRight: 3
    }
    this.handleAdd = this.handleAdd.bind(this)
    this.scrollLeft = this.scrollLeft.bind(this)
    this.scrollRight = this.scrollRight.bind(this)
  }

  async componentDidMount() {
    await this.props.getAllProducts()
    this.setState({
      mounted: true,
      colorProducts: this.props.allProducts.filter(
        grayStopper => grayStopper.category === 'color'
      ),
      wigProducts: this.props.allProducts.filter(
        grayStopper => grayStopper.category === 'wigs'
      ),
      nutritionProducts: this.props.allProducts.filter(
        grayStopper => grayStopper.category === 'nutrition'
      )
    })
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

  scrollLeft(category) {
    if (category === 'color') {
      this.setState(prevState => ({
        colorLeft: --prevState.colorLeft,
        colorRight: --prevState.colorRight
      }))
    } else if (category === 'wigs') {
      this.setState(prevState => ({
        wigLeft: --prevState.wigLeft,
        wigRight: --prevState.wigRight
      }))
    } else if (category === 'nutrition') {
      this.setState(prevState => ({
        nutritionLeft: --prevState.nutritionLeft,
        nutritionRight: --prevState.nutritionRight
      }))
    }
  }

  scrollRight(category) {
    if (category === 'color') {
      this.setState(prevState => ({
        colorLeft: ++prevState.colorLeft,
        colorRight: ++prevState.colorRight
      }))
    } else if (category === 'wigs') {
      this.setState(prevState => ({
        wigLeft: ++prevState.wigLeft,
        wigRight: ++prevState.wigRight
      }))
    } else if (category === 'nutrition') {
      this.setState(prevState => ({
        nutritionLeft: ++prevState.nutritionLeft,
        nutritionRight: ++prevState.nutritionRight
      }))
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
              <MediaQuery maxWidth={750}>
                <AllProductRender
                  data={this.state}
                  size="small"
                  scrollLeft={this.scrollLeft}
                  scrollRight={this.scrollRight}
                  handleAdd={this.handleAdd}
                />
              </MediaQuery>
              <MediaQuery maxWidth={1100} minWidth={751}>
                <AllProductRender
                  data={this.state}
                  size="medium"
                  scrollLeft={this.scrollLeft}
                  scrollRight={this.scrollRight}
                  handleAdd={this.handleAdd}
                />
              </MediaQuery>
              <MediaQuery minWidth={1101} maxWidth={3000}>
                <AllProductRender
                  data={this.state}
                  scrollLeft={this.scrollLeft}
                  scrollRight={this.scrollRight}
                  handleAdd={this.handleAdd}
                />
              </MediaQuery>
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
  loadInitialData: () => dispatch(me())
})

export default connect(mapState, mapDispatch)(AllProducts)
