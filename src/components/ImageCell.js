import React, { Component } from 'react'

class ImageCell extends Component {
  render() {
    let returnValue = <>{this.props.character}</>
    if (this.props.character === '*') {
      returnValue = (
        <>
          <span className="small-font">crap</span>
        </>
      )
    } else if (this.props.character === 'F') {
      returnValue = (
        <>
          <span>🐾</span>
        </>
      )
    } else if (this.props.character === '@') {
      returnValue = (
        <>
          <span>☠️</span>
        </>
      )
    }
    return returnValue
  }
}

export default ImageCell
