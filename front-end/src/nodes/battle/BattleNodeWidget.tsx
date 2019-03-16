import * as React from 'react'
import { BattleNodeModel } from './BattleNodeModel'
import { PortWidget } from 'storm-react-diagrams'

export interface BattleNodeWidgetProps {
  node: BattleNodeModel
}

export interface BattleModeWidgetState { }

export class BattleNodeWidget extends React.Component<
  BattleNodeWidgetProps,
  BattleModeWidgetState
  > {
  constructor(props: BattleNodeWidgetProps) {
    super(props)
    this.state = {}
  }

  render() {
    return (
      <div
        className={'battle-node card'}
        style={{
          position: 'relative',
          width: 300,
        }}
      >
        <img
          className='card-img-top non-drag'
          src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQgeBkmTOiUos8AJT0OwZNdzgeBcJ4rrVTOpfcSiMPupUYvW4o8'
          style={{
            height: 150
          }}
        />
        <div className='card-body'>
          <div className='form-group mb-0'>
            <input className='form-control' type='text' defaultValue='Battle title' />
          </div>
        </div>
        <div className='card-footer text-muted mb-2'>
          <div
            className='badge badge-secondary'
            style={{
              position: 'absolute',
              zIndex: 10,
              top: -10,
              left: 140,
            }}>
            <PortWidget name='top' node={this.props.node} />
          </div>
          <div
            className='badge badge-secondary'
            style={{
              position: 'absolute',
              zIndex: 10,
              bottom: -10,
              left: 140,
            }}>
            <PortWidget name='bottom' node={this.props.node} />
          </div>
        </div>
      </div>
    )
  }
}