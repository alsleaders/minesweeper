import React, { Component } from 'react'
import EndLogic from './EndLogic'
import ImageCell from './ImageCell'

let API_URL = 'https://minesweeper-api.herokuapp.com/games'

class Minesweeper extends Component {
  state = {
    startGame: [],
    id: '',
    state: '',
    difficulty: 0
  }

  changeDifficulty = difficulty => {
    this.startGame(difficulty)
  }

  startGame = difficulty => {
    fetch(`${API_URL}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ difficulty: difficulty })
    })
      .then(response => {
        return response.json()
      })
      .then(game => {
        this.setState({
          startGame: game.board,
          id: game.id,
          state: game.state,
          difficulty
        })
      })
  }

  componentDidMount() {
    this.startGame()
  }

  checkBox = box => {
    console.log('are we checking the boxes', box)
    if (box === '_') {
      return 'game-box reveal'
    } else if (box === 'F') {
      return 'game-box puppy-flag'
    } else if (box === '*') {
      return 'game-box puppy-bomb'
    } else if (box === '@') {
      return 'game-box cellFlagBomb'
    } else if (1 <= box && box <= 9) {
      return 'game-box number'
    } else {
      return 'game-box'
    }
  }

  leftClickOnly = (rowdex, codex) => {
    console.log(this.state.id)
    fetch(`${API_URL}/${this.state.id}/check`, {
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
          startGame: game.board,
          state: game.state
        })
      })
  }
  rightClickOnly = (event, rowdex, codex) => {
    event.preventDefault()
    fetch(`${API_URL}/${this.state.id}/flag`, {
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

  resetGame = event => {
    this.setState({
      startGame: [],
      id: '',
      state: ''
    })
    this.componentDidMount()
  }

  render() {
    return (
      <>
        <button onClick={() => this.changeDifficulty(0)}> Easy</button>
        <button onClick={() => this.changeDifficulty(1)}> Medium</button>
        <button onClick={() => this.changeDifficulty(2)}> Hard</button>
        <main className="background-here-please">
          <button onClick={this.resetGame}>Reset</button>
          <table id="center-this">
            <tbody>
              {this.state.startGame.map((column, codex) => {
                return (
                  <tr key={codex}>
                    {this.state.startGame.map((row, rowdex) => {
                      return (
                        <td
                          key={rowdex}
                          id="game-boxes"
                          className={this.checkBox(
                            this.state.startGame[codex][rowdex]
                          )}
                          onClick={() => this.leftClickOnly(codex, rowdex)}
                          onContextMenu={event =>
                            this.rightClickOnly(event, codex, rowdex)
                          }
                        >
                          <ImageCell
                            character={this.state.startGame[codex][rowdex]}
                          />
                        </td>
                      )
                    })}
                  </tr>
                )
              })}
            </tbody>
          </table>
        </main>
        <EndLogic status={this.state.state} />
      </>
    )
  }
}

export default Minesweeper
