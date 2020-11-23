/* eslint-disable complexity */
import React from 'react'
import Product from './product'

const AllProductRender = props => {
  let {
    colorLeft,
    colorRight,
    wigLeft,
    wigRight,
    nutritionLeft,
    nutritionRight,
    colorProducts,
    wigProducts,
    nutritionProducts
  } = props.data
  if (props.size === 'medium') {
    colorRight = --colorRight
    wigRight = --wigRight
    nutritionRight = --nutritionRight
  } else if (props.size === 'small') {
    colorRight -= 2
    wigRight -= 2
    nutritionRight -= 2
  }

  return (
    <>
      <h2 className="all-product-header">COLOR POPPERS</h2>
      <br />
      <div id="grayStoppers" className="grayStoppers">
        {colorLeft !== 0 ? (
          <button
            type="button"
            className="scroll"
            onClick={() => {
              props.scrollLeft('color')
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
        {colorProducts
          .slice(colorLeft, colorRight)
          .map(grayStopper => (
            <Product
              key={grayStopper.id}
              product={grayStopper}
              handleAdd={props.handleAdd}
            />
          ))}
        {colorRight < colorProducts.length - 1 ? (
          <button
            type="button"
            className="scroll"
            onClick={() => {
              props.scrollRight('color')
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
      <h2 className="all-product-header">HAIR TOPPERS</h2>
      <br />
      <div id="grayStoppers" className="grayStoppers">
        {wigLeft !== 0 ? (
          <button
            type="button"
            className="scroll"
            onClick={() => {
              props.scrollLeft('wigs')
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
        {wigProducts
          .slice(wigLeft, wigRight)
          .map(grayStopper => (
            <Product
              key={grayStopper.id}
              product={grayStopper}
              handleAdd={props.handleAdd}
            />
          ))}
        {wigRight < wigProducts.length - 1 ? (
          <button
            type="button"
            className="scroll"
            onClick={() => {
              props.scrollRight('wigs')
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
      <h2 className="all-product-header">FOR WELLNESS SHOPPERS</h2>
      <br />
      <div id="grayStoppers" className="grayStoppers">
        {nutritionLeft !== 0 ? (
          <button
            type="button"
            className="scroll"
            onClick={() => {
              props.scrollLeft('nutrition')
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
        {nutritionProducts
          .slice(nutritionLeft, nutritionRight)
          .map(grayStopper => (
            <Product
              key={grayStopper.id}
              product={grayStopper}
              handleAdd={props.handleAdd}
            />
          ))}
        {nutritionRight !== nutritionProducts.length - 1 ? (
          <button
            type="button"
            className="scroll"
            onClick={() => {
              props.scrollRight('nutrition')
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

export default AllProductRender
