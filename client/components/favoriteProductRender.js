import React from 'react'
import Product from './product'

export const FavoriteProductRender = props => {
  return (
    <>
      <div id="grayStoppers" className="grayStoppers">
        {props.products.map(grayStopper => (
          <Product
            key={grayStopper.id}
            product={grayStopper}
            handleAdd={props.handleAdd}
          />
        ))}
      </div>
    </>
  )
}
