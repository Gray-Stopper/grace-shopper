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
    <div id="allProductContainer">
      <div id="grayStoppers" className="grayStoppers">
        <div className="category category-right">
          <h3 className="all-product-header">COLOR POPPERS</h3>
        </div>
        <div className="productContent">
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
      </div>
      <div id="grayStoppers" className="grayStoppers">
        <div className="category category-right">
          <h3 className="all-product-header">HAIR TOPPERS</h3>
        </div>
        <div className="productContent">
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
      </div>
      <div id="grayStoppers" className="grayStoppers">
        <div className="category category-right">
          <h3 className="all-product-header">WELLNESS SHOPPERS</h3>
        </div>
        <div className="productContent">
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
      </div>
    </div>
  )
}

export default AllProductRender
