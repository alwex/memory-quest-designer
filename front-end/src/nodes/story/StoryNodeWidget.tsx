import React from 'react'
import { StoryNodeModel } from './StoryNodeModel'
import { PortWidget } from 'storm-react-diagrams'
import { NodeContainer } from '../NodeContainer';
import { SyncableNode, SyncableNodeProps, SyncableNodeState } from '../SyncableNode';
import { DBNodeModel } from '../DBNodeModel';

export interface StoryNodeWidgetProps extends SyncableNodeProps {
  node: StoryNodeModel
}

export interface StoryNodeWidgetState extends SyncableNodeState {
}

export class StoryNodeWidget extends SyncableNode<
  StoryNodeWidgetProps,
  StoryNodeWidgetState
  > {

  constructor(props: StoryNodeWidgetProps) {
    super(props)
    const node = this.props.node as DBNodeModel
    this.state = {
      ...node.db
    }
  }

  render() {
    const { state } = this
    return (
      <NodeContainer>
        <img
          className='card-img-top non-drag'
          src='http://mooc.politechnicart.net/etudiantsvswild/wp-content/uploads/sites/38/jungle_655_max.jpg'
          style={{
            height: 150
          }}
        />
        <div className='card-body'>
          <div className='form-group'>
            <input
              className='form-control'
              type='text'
              name='title'
              value={state.title}
              onChange={(event) => this.handleChange(event)}
            />
          </div>
          <div className='form-group'>
            <textarea
              className='form-control'
              rows={5}
              name='story'
              value={state.story}
              onChange={(event) => this.handleChange(event)}
            />
          </div>
          <div className='form-row'>
            <div className='col'>
              <input
                className='form-control'
                type='text'
                name='condition_1'
                value={state.condition_1 || ''}
                onChange={(event) => this.handleChange(event)}
              />
            </div>
            <div className='col'>
              <input
                className='form-control'
                type='text'
                name='condition_2'
                value={state.condition_2 || ''}
                onChange={(event) => this.handleChange(event)}
              />
            </div>
          </div>
        </div>
        <div className='card-footer text-muted mb-2'>
          <div className='form-row'>
            <div className='col'>
              <button type='button' className='btn btn-outline-danger btn-block' onClick={() => this.remove()}>Remove</button>
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
      </NodeContainer>
    )
  }
}
