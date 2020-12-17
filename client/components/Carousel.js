import React from 'react'
import {Link} from 'react-router-dom'

export const Carousel = () => {
  return (
    <div className="homeImage home-background">
      <div
        id="carouselExampleIndicators"
        className="carousel carousel-dark slide"
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
          <div className="carousel-item active carousel-background">
            <img src="assets/plant.jpg" className="d-block" alt="About" />
            <div className="leftPText about-text">
              <p>
                With our boutique artisanal range of small-batch hair toppers
                and color poppers, wellness shoppers like yourself need fear the
                mirror no longer.
              </p>
              <p>
                And hey, if you decide to embrace your grays? We have products
                for you too. All aging heads deserve to feel fabulous.
              </p>
              <p>
                <b>Welcome to Gray Stopper.</b>
              </p>
            </div>
          </div>
          <div className="carousel-item carousel-background">
            <img
              src="assets/multiHair.jpg"
              className="d-block"
              alt="Shop All"
            />
            <Link to="/products" className="shop-all-carousel">
              Shop All
            </Link>
          </div>
          <div className="carousel-item">
            <img src="assets/gray.jpg" className="d-block" alt="Gray Hair" />
          </div>
        </div>
        <a
          className="carousel-control-prev"
          href="#carouselExampleIndicators"
          role="button"
          data-bs-slide="prev"
        >
          <span className="carousel-control-prev-icon" aria-hidden="true" />
          <span className="visually-hidden">Previous</span>
        </a>
        <a
          className="carousel-control-next"
          href="#carouselExampleIndicators"
          role="button"
          data-bs-slide="next"
        >
          <span className="carousel-control-next-icon" aria-hidden="true" />
          <span className="visually-hidden">Next</span>
        </a>
      </div>
    </div>
  )
}
