import React, { Component } from 'react'

class EndLogic extends Component {
  render() {
    let message = 'You are still playing'
    if (this.props.status === 'lost') {
      message = 'You lost, clean your shoes'
    } else if (this.props.status === 'won') {
      message = "Who's a good boy!? You're a good dog!"
    }

    return (
      <div>
        <p>How are you doing so far?</p>
        <h3>{message}</h3>
        {/* if (this.props.state === 'lost') {"You've lost the game"} else if
        (this.props.state === "won") {"You've won the game"} else {''} */}
      </div>
    )
  }
}

export default EndLogic
