import React from 'react'
import Product from './product'

const AllProductRender = props => {
  const {
    colorLeft,
    colorRight,
    wigLeft,
    wigRight,
    nutritionLeft,
    nutritionRight
  } = props.indexes
  return (
    <>
      <h2 className="all-product-header">COLOR POPPERS</h2>
      <br />
      <div id="grayStoppers" className="grayStoppers">
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
        {props.colorProducts
          .slice(colorLeft, colorRight)
          .map(grayStopper => (
            <Product
              key={grayStopper.id}
              product={grayStopper}
              add={props.handleAdd}
            />
          ))}
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
      </div>
      <h2 className="all-product-header">HAIR TOPPERS</h2>
      <br />
      <div id="grayStoppers" className="grayStoppers">
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
        {props.wigProducts
          .slice(wigLeft, wigRight)
          .map(grayStopper => (
            <Product
              key={grayStopper.id}
              product={grayStopper}
              add={props.handleAdd}
            />
          ))}
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
      </div>
      <h2 className="all-product-header">FOR WELLNESS SHOPPERS</h2>
      <br />
      <div id="grayStoppers" className="grayStoppers">
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
        {props.nutritionProducts
          .slice(nutritionLeft, nutritionRight)
          .map(grayStopper => (
            <Product
              key={grayStopper.id}
              product={grayStopper}
              add={props.handleAdd}
            />
          ))}
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
      </div>
    </>
  )
}

export default AllProductRender
