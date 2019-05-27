import React, { Component } from 'react'

let stringInterpolationIsBananas = 'https://minesweeper-api.herokuapp.com/games'

class Minesweeper extends Component {
  state = {
    startGame: [],
    id: '',
    state: ''
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
        // console.log({ game })
        // console.log(game.id)
        // console.log(game.mines)
        // console.log(game.state)
        // console.log(game.board)
        // console.log([game.board])
        this.setState({
          startGame: game.board,
          id: game.id,
          state: game.state
        })
      })
  }

  // componentDidMount() {
  //   loadGame()
  // }

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
        console.log(game.state)
        this.setState({
          startGame: game.board,
          state: game.state
        })
      })
    // if state changes to won or lost, display won or lost
    // if (Object.value({ game.state }) == 'won' || Object.value({ game.state }) == 'lost') {
    //   return <p>{this.state.game.state}</p>
    // }
  }
  // does the flag on right click need to return an api call?
  // make right click flag
  iGetStrawberriesAsAReward = (event, rowdex, codex) => {
    event.preventDefault()
    console.log(this.state.id)
    // console.log('did this work', rowdex, codex)
    // make the left return an api call
    fetch(`${stringInterpolationIsBananas}/${this.state.id}/flag`, {
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

  // make reset button
  resetGame = event => {
    console.log('are you resetting?')
    this.setState({
      startGame: [],
      id: '',
      state: ''
    })
    this.componentDidMount()
  }
  // style the flags and bombs
  // set up difficulty choice before componentDidMount loads - onChange for input or radio buttons
  // make a win/loss response
  // have a win/loss counter (saved in local storage?)
  // sound effects?

  render() {
    return (
      // map through the columns - Done
      <table id="center-this">
        <main>
          <button onClick={this.resetGame}>Reset</button>
          <tbody>
            {this.state.startGame.map((column, codex) => {
              // console.log(codex)
              return (
                // map through the rows - Done
                <tr key={codex}>
                  {this.state.startGame.map((row, rowdex) => {
                    // console.log({ rowdex })
                    return (
                      // make each unit of table data an on click
                      <td
                        key={rowdex}
                        id="game-boxes"
                        // make each on click have a left and right
                        onClick={() => this.leftClickOnly(codex, rowdex)}
                        onContextMenu={event =>
                          this.iGetStrawberriesAsAReward(event, codex, rowdex)
                        }
                      >
                        {this.state.startGame[codex][rowdex]}
                      </td>
                    )
                  })}
                </tr>
              )
            })}
          </tbody>
        </main>
      </table>
    )
  }
}

export default Minesweeper
