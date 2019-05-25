import React, { Component } from 'react'

let stringInterpolationIsBananas = 'https://minesweeper-api.herokuapp.com/games'

class Minesweeper extends Component {
  state = {
    startGame: [],
    id: ''
  }

  componentDidMount() {
    fetch(`${stringInterpolationIsBananas}`, {
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
          startGame: game.board,
          id: game.id
        })
      })
  }

  leftClickOnly = (rowdex, codex) => {
    console.log(this.state.id)
    console.log('did this work', rowdex, codex)
    // make the left return an api call
    fetch(`${stringInterpolationIsBananas}/${this.state.id}/check`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ row: rowdex, col: codex })
    })
      .then(response => {
        return response.json()
      })
      .then(game => {
        this.setState({
          startGame: game.board
        })
      })
  }
  // does the flag on right click need to return an api call?
  render() {
    return (
      // map through the columns - Done
      <table>
        <tbody>
          {this.state.startGame.map((column, codex) => {
            console.log(codex)
            return (
              // map through the rows - Done
              <tr key={codex}>
                {this.state.startGame.map((row, rowdex) => {
                  console.log({ rowdex })
                  return (
                    // make each unit of table data an on click
                    <td
                      key={rowdex}
                      id="game-boxes"
                      // make each on click have a left and right
                      onClick={() => this.leftClickOnly(codex, rowdex)}
                    >
                      {this.state.startGame[codex][rowdex]}
                    </td>
                  )
                })}
              </tr>
            )
          })}
        </tbody>
      </table>
    )
  }
}

export default Minesweeper
