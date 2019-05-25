import React, { Component } from 'react'
import HelloWorld from './components/HelloWorld'
import Minesweeper from './components/Minesweeper'

class App extends Component {
  render() {
    return (
      <>
        <HelloWorld />
        <p>Hopefully this is where the board is going</p>
        <Minesweeper />
      </>
    )
  }
}

export default App
