import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.css';
import "storm-react-diagrams/dist/style.min.css"
import './App.css'
import * as SRD from 'storm-react-diagrams'
import { DiagramEngine, DiagramProps } from 'storm-react-diagrams'
import { saveModel } from './utils/repository'
import { Api } from './utils/api';
// custom nodes
import { StoryNodeModel } from './nodes/story/StoryNodeModel'
import { SimpleNodeFactory } from './nodes/SimpleNodeFactory'
import { CustomPortModel } from './nodes/CustomPortModel';
import { SimplePortFactory } from './nodes/SimplePortFactory';
import { BattleNodeFactory } from './nodes/battle/BattleNodeFactory';
import { BattleNodeModel } from './nodes/battle/BattleNodeModel';


class App extends Component {
  engine: DiagramEngine = new DiagramEngine()
  model: SRD.DiagramModel = new SRD.DiagramModel()

  async componentDidMount() {
    const stories = await Api.getStories()
    console.log(stories)

    this.engine.installDefaultFactories()
    this.engine.registerNodeFactory(new SimpleNodeFactory('story', () => this.forceUpdate()))
    this.engine.registerNodeFactory(new BattleNodeFactory())
    this.engine.registerPortFactory(new SimplePortFactory("story", config => new CustomPortModel()))
    this.engine.registerPortFactory(new SimplePortFactory("battle", config => new CustomPortModel()))

    this.model.setGridSize(40)
    this.model.addAll(...stories)
    this.model.addListener({
      linksUpdated: (event) => {
        console.log(event)
      }
    })

    this.engine.setDiagramModel(this.model)
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

  async saveAll() {
    const allNodes = this.model.getNodes()
    for (const nodeId in allNodes) {
      const node = allNodes[nodeId]
      await saveModel(node)
    }
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
            <a className="list-group-item list-group-item-action" onClick={() => this.saveAll()}>Save</a>

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
