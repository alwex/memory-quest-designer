import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.css';
import "storm-react-diagrams/dist/style.min.css"
import './App.css'
import * as SRD from 'storm-react-diagrams'
import { DiagramEngine, DiagramProps } from 'storm-react-diagrams'

// custom nodes
import { StoryNodeModel } from './nodes/story/StoryNodeModel'
import { SimpleNodeFactory } from './nodes/SimpleNodeFactory'
import { CustomPortModel } from './nodes/CustomPortModel';
import { SimplePortFactory } from './nodes/SimplePortFactory';
import { BattleNodeFactory } from './nodes/battle/BattleNodeFactory';
import { BattleNodeModel } from './nodes/battle/BattleNodeModel';
import { Api } from './utils/api';

class App extends Component {
  engine: DiagramEngine = new DiagramEngine()

  async componentDidMount() {
    const stories = await Api.getStories()
    console.log(stories)

    this.engine.installDefaultFactories()
    this.engine.registerNodeFactory(new SimpleNodeFactory('story', () => this.forceUpdate()))
    this.engine.registerNodeFactory(new BattleNodeFactory())
    this.engine.registerPortFactory(new SimplePortFactory("story", config => new CustomPortModel()))
    this.engine.registerPortFactory(new SimplePortFactory("battle", config => new CustomPortModel()))

    const model = new SRD.DiagramModel()
    model.setGridSize(40)
    model.addAll(...stories)

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
