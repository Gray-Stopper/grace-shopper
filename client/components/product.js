import React from 'react'
import {Link} from 'react-router-dom'

const Product = props => {
  const product = props.product

  return (
    <div id="product" key={product.id} className="grayStopper">
      <Link to={`/products/${product.id}`}>
        <img src={product.imageUrl} width="200" height="200" />
      </Link>
      <Link className="link" to={`/products/${product.id}`}>
        <h3>{product.name}</h3>
      </Link>
      {product.stock > 0 ? (
        <button
          type="button"
          className="clear button"
          onClick={() => {
            props.handleAdd(event, product.id)
          }}
        >
          Add To Cart - ${product.price}
        </button>
      ) : (
        <h4 className="soldOut">sold out</h4>
      )}
    </div>
  )
}

export default Product
