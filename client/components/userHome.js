import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {fetchAllProducts} from '../store/allProducts'
import {FavoriteProductRender} from './favoriteProductRender'
import {addGuestCartItem} from '../store/guestCart'

class UserHome extends React.Component {
  constructor() {
    super()
    this.state = {
      mounted: false,
      products: []
    }
    this.handleAdd = this.handleAdd.bind(this)
  }

  async componentDidMount() {
    await this.props.getAllProducts()
    this.setState({
      mounted: true,
      products: this.props.allProducts
        .filter(grayStopper => grayStopper.name === 'Rainbow Dye')
        .concat(
          this.props.allProducts.filter(
            grayStopper => grayStopper.name === 'Marie Antoinette Wig'
          )
        )
        .concat(
          this.props.allProducts.filter(
            grayStopper => grayStopper.name === 'Embrace the Grays Meditation'
          )
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

  render() {
    const grayStoppers = this.props.allProducts || []
    const {email, firstName} = this.props
    if (!this.state.mounted) return null
    else
      return (
        <div>
          <div className="homeImage">
            {email ? (
              <div>
                {' '}
                <h3 className="margin-left">
                  Welcome, {firstName ? firstName : email}... <br />
                  to a virtual spa for your aging head
                </h3>
              </div>
            ) : (
              <h3>
                Welcome, guest... <br />
                to a virtual spa for your aging head
              </h3>
            )}
            <div className="blurb">
              <p className="leftPText margin-left">
                Picture this scene: you're getting ready for a night out. You
                look amazing (obviously). As you go to grab your keys and leave,
                a flash of silver catches your eye in the mirror... GRAY IN YOUR
                HAIR.
                <br />
                <br />
                We got you. With our boutique artisanal range of small-batch
                hair toppers and color poppers, wellness shoppers like yourself
                need fear the mirror no longer. <br />
                <br />
                And hey, if you decide to embrace your grays? We have products
                for you too. All aging heads deserve to feel fabulous.
                <br />
                <br />
                <b>Welcome to Gray Stopper.</b>
              </p>
            </div>
          </div>
          <h3 className="margin-left">Shop Our Personal Favorites:</h3>
          {grayStoppers.length > 0 ? (
            <FavoriteProductRender
              products={this.state.products}
              handleAdd={this.handleAdd}
            />
          ) : (
            <h3>More products coming soon!</h3>
          )}
        </div>
      )
  }
}

const mapState = state => {
  return {
    email: state.user.email,
    firstName: state.user.firstName,
    allProducts: state.allProducts
  }
}

const mapDispatch = dispatch => ({
  getAllProducts: () => dispatch(fetchAllProducts())
})

export default connect(mapState, mapDispatch)(UserHome)

UserHome.propTypes = {
  email: PropTypes.string
}
