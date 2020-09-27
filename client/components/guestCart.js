import React, {Component} from 'react'
import {connect} from 'react-redux'
import {me} from '../store'
import {loadCart, removeItem} from '../store/cart'
import {CartProduct, CartTotal} from './index'

export class GuestCart extends Component {
  constructor() {
    super()

    const guestStorage = windows.localStorage
  }

  render() {
    return (
      <div>
        <h3>Guest Cart</h3>
      </div>
    )
    //   if (!this.state.mounted) {
    //     return null
    //   } else {
    //     return (
    //       <div>
    //         <h3 className="left">
    //           {this.props.user.firstName
    //             ? `${this.props.user.firstName}'s Cart`
    //             : 'Cart'}
    //         </h3>
    //         {this.props.cart.id ? (
    //           <div>
    //             <table className="cart left">
    //               <thead className="t-head">
    //                 <tr>
    //                   <th />
    //                   <th scope="col">Item</th>
    //                   <th scope="col">Item Price</th>
    //                   <th scope="col">Quantity</th>
    //                   <th scope="col">Total Price</th>
    //                   <th />
    //                 </tr>
    //               </thead>
    //               <tbody>
    //                 {this.props.cart.products.map(prod => {
    //                   return (
    //                     <CartProduct
    //                       key={prod.id}
    //                       product={prod}
    //                       userId={this.props.user.id}
    //                       orderId={this.props.cart.id}
    //                       remove={this.handleRemove}
    //                     />
    //                   )
    //                 })}
    //               </tbody>
    //             </table>
    //             {this.props.cart && <CartTotal cart={this.props.cart} />}
    //           </div>
    //         ) : (
    //           <p>No items in cart</p>
    //         )}
    //       </div>
    //     )
    //   }
  }
}

const mapState = state => ({})

const mapDispatch = dispatch => ({})

export default connect(mapState, mapDispatch)(GuestCart)
// export default GuestCart
