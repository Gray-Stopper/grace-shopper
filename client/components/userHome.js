import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import MediaQuery from 'react-responsive'
import {me} from '../store/user'
import {fetchAllProducts} from '../store/allProducts'
import {FavoriteProductRender} from './favoriteProductRender'
import {addGuestCartItem} from '../store/guestCart'

class UserHome extends React.Component {
  constructor() {
    super()
    this.state = {
      mounted: false,
      products: [],
      mediumLeft: 0,
      mediumRight: 2,
      smallLeft: 0,
      smallRight: 1
    }
    this.handleAdd = this.handleAdd.bind(this)
    this.scrollLeft = this.scrollLeft.bind(this)
    this.scrollRight = this.scrollRight.bind(this)
  }

  async componentDidMount() {
    await this.props.getMe()
    await this.props.getAllProducts()
    if (!localStorage.getItem('cart')) {
      localStorage.setItem('cart', JSON.stringify({}))
    }
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

  scrollLeft(size) {
    if (size === 'medium') {
      this.setState(prevState => ({
        mediumLeft: --prevState.mediumLeft,
        mediumRight: --prevState.mediumRight
      }))
    } else if (size === 'small') {
      this.setState(prevState => ({
        smallLeft: --prevState.smallLeft,
        smallRight: --prevState.smallRight
      }))
    }
  }

  scrollRight(size) {
    if (size === 'medium') {
      this.setState(prevState => ({
        mediumLeft: ++prevState.mediumLeft,
        mediumRight: ++prevState.mediumRight
      }))
    } else if (size === 'small') {
      this.setState(prevState => ({
        smallLeft: ++prevState.smallLeft,
        smallRight: ++prevState.smallRight
      }))
    }
  }

  render() {
    const {email, firstName} = this.props
    if (!this.state.mounted) return null
    else
      return (
        <div>
          <div className="homeImage">
            <div
              id="carouselExampleIndicators"
              className="carousel carousel-dark slide carousel-fade"
              data-bs-ride="carousel"
            >
              <ol className="carousel-indicators">
                <li
                  data-bs-target="#carouselExampleIndicators"
                  data-bs-slide-to="0"
                  className="active"
                />
                <li
                  data-bs-target="#carouselExampleIndicators"
                  data-bs-slide-to="1"
                />
                <li
                  data-bs-target="#carouselExampleIndicators"
                  data-bs-slide-to="2"
                />
              </ol>
              <div className="carousel-inner">
                <div className="carousel-item active">
                  <img src="assets/plant.jpg" className="d-block" alt="About" />
                </div>
                <div className="carousel-item">
                  <img
                    src="assets/plant.jpg"
                    className="d-block"
                    alt="Shop All"
                  />
                </div>
                <div className="carousel-item">
                  <img
                    src="assets/plant.jpg"
                    className="d-block"
                    alt="Contact"
                  />
                </div>
              </div>
              <a
                className="carousel-control-prev"
                href="#carouselExampleIndicators"
                role="button"
                data-bs-slide="prev"
              >
                <span
                  className="carousel-control-prev-icon"
                  aria-hidden="true"
                />
                <span className="visually-hidden">Previous</span>
              </a>
              <a
                className="carousel-control-next"
                href="#carouselExampleIndicators"
                role="button"
                data-bs-slide="next"
              >
                <span
                  className="carousel-control-next-icon"
                  aria-hidden="true"
                />
                <span className="visually-hidden">Next</span>
              </a>
            </div>
          </div>
          {/* <div className="homeImage">
            <div className="blurb">
              {email ? (
                <h3 className="margin-left">
                  Welcome, {firstName ? firstName : email}... <br />
                  to a virtual spa for your aging head
                </h3>
              ) : (
                <h3>
                  Welcome, guest... <br />
                  to a virtual spa for your aging head
                </h3>
              )}
            </div>
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
          </div> */}
          <div id="personalFavorites">
            <div id="favs">
              <h3 className="margin-left">Shop Our Personal Favorites:</h3>
            </div>
            <MediaQuery maxWidth={750}>
              <FavoriteProductRender
                left={this.state.smallLeft}
                right={this.state.smallRight}
                scrollLeft={this.scrollLeft}
                scrollRight={this.scrollRight}
                products={this.state.products}
                handleAdd={this.handleAdd}
                size="small"
              />
            </MediaQuery>
            <MediaQuery maxWidth={1000} minWidth={751}>
              <FavoriteProductRender
                left={this.state.mediumLeft}
                right={this.state.mediumRight}
                scrollLeft={this.scrollLeft}
                scrollRight={this.scrollRight}
                products={this.state.products}
                handleAdd={this.handleAdd}
                size="medium"
              />
            </MediaQuery>
            <MediaQuery minWidth={1001} maxWidth={3000}>
              <FavoriteProductRender
                products={this.state.products}
                handleAdd={this.handleAdd}
              />
            </MediaQuery>
          </div>
        </div>
      )
  }
}

const mapState = state => {
  return {
    user: state.user,
    email: state.user.email,
    firstName: state.user.firstName,
    allProducts: state.allProducts
  }
}

const mapDispatch = dispatch => ({
  getMe: () => dispatch(me()),
  getAllProducts: () => dispatch(fetchAllProducts())
})

export default connect(mapState, mapDispatch)(UserHome)

UserHome.propTypes = {
  email: PropTypes.string
}
