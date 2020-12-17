import React from 'react'
import {Navbar, Footer, MenuCart} from './components'
import Routes from './routes'

const App = () => {
  return (
    <div id="body-container">
      <div id="content">
        <MenuCart />
        <Navbar />
        <Routes />
      </div>
      <Footer />
    </div>
  )
}

export default App
