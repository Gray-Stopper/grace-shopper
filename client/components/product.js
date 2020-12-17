import React from 'react'
import {Link} from 'react-router-dom'

const Product = props => {
  const product = props.product
  return (
    // <div id='categoryContainer' className="grayStopper">
    <div
      id="product"
      key={product.id}
      className="grayStopper grayStopperContainer"
    >
      <div>
        <Link to={`/products/${product.id}`}>
          <img src={product.imageUrl} className="image-product" />
        </Link>
      </div>
      <div id="productContent">
        <Link className="link" to={`/products/${product.id}`}>
          <h3 className="leftPText productName">{product.name}</h3>
        </Link>
        {product.stock > 0 ? (
          <button
            type="button"
            className="clear button center"
            onClick={() => {
              props.handleAdd(event, product.id)
            }}
          >
            Add To Cart - ${product.price}
          </button>
        ) : (
          <button type="button" className="clear disabled button center">
            sold out
          </button>
        )}
      </div>
    </div>
    // </div>
  )
}

export default Product
