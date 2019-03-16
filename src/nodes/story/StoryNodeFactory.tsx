import * as React from 'react'
import * as SRD from 'storm-react-diagrams'
import { StoryNodeWidget } from './StoryNodeWidget'
import { StoryNodeModel } from './StoryNodeModel'


export class StoryNodeFactory extends SRD.AbstractNodeFactory {
  constructor() {
    super('story')
  }

  generateReactWidget(diagramEngine: SRD.DiagramEngine, node: SRD.NodeModel): JSX.Element {
    return <StoryNodeWidget node={node} />
  }

  getNewInstance() {
    return new StoryNodeModel()
  }
}