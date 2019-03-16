import * as React from 'react'
import { StoryNodeModel } from './StoryNodeModel'
import { PortWidget } from 'storm-react-diagrams'

export interface StoryNodeWidgetProps {
  node: StoryNodeModel
}

export interface StoryNodeWidgetState { }

export class StoryNodeWidget extends React.Component<
  StoryNodeWidgetProps,
  StoryNodeWidgetState
  > {

  constructor(props: StoryNodeWidgetProps) {
    super(props)
    this.state = {}
  }

  render() {
    return (
      <div
        className={'story-node card'}
        style={{
          position: 'relative',
          width: 300,
        }}
      >
        <img
          className='card-img-top non-drag'
          src='http://mooc.politechnicart.net/etudiantsvswild/wp-content/uploads/sites/38/jungle_655_max.jpg'
          style={{
            height: 150
          }}
        />
        <div className='card-body'>
          <div className='form-group'>
            <input className='form-control' type='text' defaultValue='Story title' />
          </div>
          <div className='form-group mb-0'>
            <textarea className='form-control' rows={5} defaultValue='this is the story' />
          </div>
        </div>
        <div className='card-footer text-muted mb-2'>
          <div className='form-row'>
            <div className='col'>
              <input className='form-control' type='text' defaultValue='Cond 1' />
            </div>
            <div className='col'>
              <input className='form-control' type='text' defaultValue='Cond 2' />
            </div>
          </div>
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
              left: 70,
            }}>
            <PortWidget name='bottom-left' node={this.props.node} />
          </div>
          <div
            className='badge badge-secondary'
            style={{
              position: 'absolute',
              zIndex: 10,
              bottom: -10,
              right: 70,
            }}>
            <PortWidget name='bottom-right' node={this.props.node} />
          </div>
        </div>
      </div>
    )
  }
}
