import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.css';
import "storm-react-diagrams/dist/style.min.css"
import './App.css'
import * as SRD from 'storm-react-diagrams'
import { DiagramEngine, DiagramProps } from 'storm-react-diagrams'

// custom nodes
import { StoryNodeModel } from './nodes/story/StoryNodeModel'
import { StoryNodeFactory } from './nodes/story/StoryNodeFactory'
import { StoryPortModel } from './nodes/story/StoryPortModel';
import { SimplePortFactory } from './nodes/SimplePortFactory';

class App extends Component {
  engine: DiagramEngine = new DiagramEngine()

  componentDidMount() {
    this.engine.installDefaultFactories()
    this.engine.registerNodeFactory(new StoryNodeFactory())
    this.engine.registerPortFactory(new SimplePortFactory("story", config => new StoryPortModel()))

    const model = new SRD.DiagramModel()
    // model.setGridSize(50)

    const storyNode1 = new StoryNodeModel()
    storyNode1.setPosition(50, 50)
    const portStory1 = storyNode1.getPort('bottom-left') as StoryPortModel

    const storyNode2 = new StoryNodeModel()
    storyNode2.setPosition(50, 500)
    const portStory2 = storyNode2.getPort('top') as StoryPortModel

    const link = portStory1.link(portStory2)

    model.addAll(storyNode1, storyNode2, link)
    this.engine.setDiagramModel(model)
  }

  componentDidUpdate() {
    this.engine.zoomToFit()
  }

  render() {
    const engine = this.engine
    var props = {
      diagramEngine: engine,
      maxNumberPointsPerLink: 0 // no extra points so link selection is fired straight away
    } as DiagramProps;


    return (
      <SRD.DiagramWidget
        deleteKeys={[]}
        diagramEngine={engine}
        {...props}
      />
    )
  }
}

export default App
