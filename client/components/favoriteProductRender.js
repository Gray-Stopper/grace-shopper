import React from 'react'
import Product from './product'

export const FavoriteProductRender = props => {
  let left = 0,
    right = 3
  if (props.left) left = props.left
  if (props.right) right = props.right
  return (
    <>
      <div id="grayStoppers" className="grayStoppers eeebe7">
        {left !== 0 ? (
          <button
            type="button"
            className="scroll eeebe7"
            onClick={() => {
              props.scrollLeft(props.size)
            }}
          >
            <img
              className="arrow"
              src="https://www.flaticon.com/svg/static/icons/svg/152/152417.svg"
            />
          </button>
        ) : (
          <div className="arrow" />
        )}
        {props.products
          .slice(left, right)
          .map(grayStopper => (
            <Product
              key={grayStopper.id}
              product={grayStopper}
              handleAdd={props.handleAdd}
            />
          ))}
        {right !== 3 && right ? (
          <button
            type="button"
            className="scroll eeebe7"
            onClick={() => {
              props.scrollRight(props.size)
            }}
          >
            <img
              className="arrow"
              src="https://www.flaticon.com/svg/static/icons/svg/152/152418.svg"
            />
          </button>
        ) : (
          <div className="arrow" />
        )}
      </div>
    </>
  )
}
