import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.css';
import "storm-react-diagrams/dist/style.min.css"
import './App.css'
import * as SRD from 'storm-react-diagrams'
import { DiagramEngine, DiagramProps } from 'storm-react-diagrams'

// custom nodes
import { StoryNodeModel } from './nodes/story/StoryNodeModel'
import { StoryNodeFactory } from './nodes/story/StoryNodeFactory'
import { CustomPortModel } from './nodes/CustomPortModel';
import { SimplePortFactory } from './nodes/SimplePortFactory';
import { BattleNodeFactory } from './nodes/battle/BattleNodeFactory';
import { BattleNodeModel } from './nodes/battle/BattleNodeModel';

class App extends Component {
  engine: DiagramEngine = new DiagramEngine()

  componentDidMount() {
    this.engine.installDefaultFactories()
    this.engine.registerNodeFactory(new StoryNodeFactory())
    this.engine.registerNodeFactory(new BattleNodeFactory())
    this.engine.registerPortFactory(new SimplePortFactory("story", config => new CustomPortModel()))
    this.engine.registerPortFactory(new SimplePortFactory("battle", config => new CustomPortModel()))

    const model = new SRD.DiagramModel()
    model.setGridSize(40)

    const storyNode1 = new StoryNodeModel()
    storyNode1.setPosition(40, 40)
    const portStory1 = storyNode1.getPort('bottom-left') as CustomPortModel

    const storyNode2 = new StoryNodeModel()
    storyNode2.setPosition(40, 800)
    const portStory2 = storyNode2.getPort('top') as CustomPortModel

    const link = portStory1.link(portStory2)

    model.addAll(storyNode1, storyNode2, link)
    this.engine.setDiagramModel(model)
    this.engine.zoomToFit()
  }

  addStory() {
    const storyNode = new StoryNodeModel()
    storyNode.setPosition(40, 40);
    this.engine.getDiagramModel().addAll(storyNode)
    this.forceUpdate()
  }

  addBattle() {
    const battleNode = new BattleNodeModel()
    battleNode.setPosition(40, 40);
    this.engine.getDiagramModel().addAll(battleNode)
    this.forceUpdate()
  }

  render() {
    const engine = this.engine
    var props = {
      diagramEngine: engine,
      maxNumberPointsPerLink: 0,
    } as DiagramProps;


    return (
      <div className='page-wrapper'>

        <nav id='sidebar'>
          <div className="list-group list-group-flush">
            <a className="list-group-item list-group-item-action list-group-item-primary" onClick={() => {
              this.engine.zoomToFit()
            }}>Zoom to fit</a>
            <a className="list-group-item list-group-item-action" onClick={() => this.addStory()}>Add a Story</a>
            <a className="list-group-item list-group-item-action" onClick={() => this.addBattle()}>Add a Battle</a>
            <a className="list-group-item list-group-item-action">Add a Challenge</a>
          </div>
        </nav>

        <main id='content'>
          <div className='container-fluid'>
            <SRD.DiagramWidget
              deleteKeys={[]}
              diagramEngine={engine}
              {...props}
            />
          </div>
        </main>
      </div>
    )
  }
}

export default App
