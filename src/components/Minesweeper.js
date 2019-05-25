import React, { Component } from 'react'

class Minesweeper extends Component {
  state = {
    startGame: []
  }

  componentDidMount() {
    fetch('https://minesweeper-api.herokuapp.com/games', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ difficulty: 0 })
    })
      .then(response => {
        return response.json()
      })
      .then(game => {
        console.log({ game })
        console.log(game.id)
        console.log(game.mines)
        console.log(game.state)
        console.log(game.board)
        console.log([game.board])
        this.setState({
          startGame: game.board
        })
      })
  }
  render() {
    // map through the columns
    // map through the rows
    // make each unit of table data an on click
    // make each on click have a left and right
    // make the left return an api call
    // does the flag on right click need to return an api call?
    return (
      <div>
        <table>
          <tbody>
            {this.state.startGame.map((column, index) => {
              console.log(index)
            })}
          </tbody>
        </table>
      </div>
    )
  }
}

export default Minesweeper
