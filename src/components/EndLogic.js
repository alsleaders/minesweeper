import React, { Component } from 'react'

class EndLogic extends Component {
  render() {
    console.log(this.props.status)
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
      </div>
    )
  }
}

export default EndLogic
