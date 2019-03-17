import * as React from 'react'
import { StoryNodeModel } from './StoryNodeModel'
import { PortWidget } from 'storm-react-diagrams'
import { Api } from '../../utils/api';
import { DBStory } from '../../utils/db-models';
import { node } from 'prop-types';

export interface StoryNodeWidgetProps {
  node: StoryNodeModel
  updateCanvas: () => void
}

export interface StoryNodeWidgetState extends DBStory {
}

export class StoryNodeWidget extends React.Component<
  StoryNodeWidgetProps,
  StoryNodeWidgetState
  > {

  constructor(props: StoryNodeWidgetProps) {
    super(props)
    const { node } = props
    this.state = {
      id: node.dbId,
      position: node.dbPosition,
      title: node.dbTitle,
      story: node.dbStory,
      condition_1: node.dbCondition_1,
      condition_2: node.dbCondition_2,
      x: node.dbX,
      y: node.dbY,
    }
  }

  async save() {
    const { node } = this.props
    this.setState({
      x: node.x,
      y: node.y,
    }, async () => {
      const response = await Api.saveStory(this.state)
      this.setState({ id: response.id })
    })
  }

  remove() {
    Api.deleteStory(this.state)
    this.props.node.remove()
    this.props.updateCanvas()
  }

  handleChange(event: React.SyntheticEvent<HTMLInputElement | HTMLTextAreaElement>) {
    this.setState({
      [event.currentTarget.name]: event.currentTarget.value
    })
  }

  render() {
    const { state } = this
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
            <div className='col'>
              <button type='button' className='btn btn-primary btn-block' onClick={() => this.save()}>Save</button>
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
