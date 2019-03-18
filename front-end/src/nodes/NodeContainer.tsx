import React from 'react'

export class NodeContainer extends React.Component {
  render() {
    return (
      <div
        className={'node card'}
        style={{
          position: 'relative',
          width: 300,
        }}
      >
        {this.props.children}
      </div>
    )
  }
}