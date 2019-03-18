import React from 'react'
import { BaseModel } from 'storm-react-diagrams';
import { deleteModel } from '../utils/repository';
import { DBModel } from '../utils/db-models';
import { hydrateModel } from '../utils/utils';


export interface SyncableNodeProps {
  node: BaseModel
  updateCanvas: () => void
}

export interface SyncableNodeState extends DBModel {

}

export class SyncableNode<
  P extends SyncableNodeProps,
  S extends SyncableNodeState> extends React.Component<P, S> {

  remove() {
    deleteModel(this.props.node)
    this.props.node.remove()
    this.props.updateCanvas()
  }

  handleChange(event: React.SyntheticEvent<HTMLInputElement | HTMLTextAreaElement>) {
    this.setState({
      [event.currentTarget.name]: event.currentTarget.value
    }, () => {
      hydrateModel(this.state, this.props.node, false);
    })
  }
}