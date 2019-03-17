import * as React from 'react'
import * as SRD from 'storm-react-diagrams'
import { StoryNodeWidget } from './story/StoryNodeWidget'
import { StoryNodeModel } from './story/StoryNodeModel'


export class SimpleNodeFactory extends SRD.AbstractNodeFactory {
  updateCanvas: () => void

  constructor(nodeType: string, updateCanvas: () => void) {
    super(nodeType)
    this.updateCanvas = updateCanvas
  }

  generateReactWidget(diagramEngine: SRD.DiagramEngine, node: SRD.NodeModel): JSX.Element {
    return <StoryNodeWidget node={node} updateCanvas={this.updateCanvas} />
  }

  getNewInstance() {
    return new StoryNodeModel()
  }
}