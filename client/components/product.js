import React from 'react'
import {Link} from 'react-router-dom'

const Product = props => {
  const product = props.product

  return (
    <div id="product" key={product.id}>
      <Link to={`/products/${product.id}`}>
        <h1>{product.name}</h1>
        <img src={product.imageUrl} width="200" height="200" />
      </Link>
      <h3>${product.price}</h3>
      {product.stock > 0 ? <h3>in stock!</h3> : <h3>sold out</h3>}
      <button type="button">add to cart</button>
    </div>
  )
}

export default Product
