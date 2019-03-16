import * as React from 'react'
import * as SRD from 'storm-react-diagrams'
import { BattleNodeWidget } from './BattleNodeWidget'
import { BattleNodeModel } from './BattleNodeModel'


export class BattleNodeFactory extends SRD.AbstractNodeFactory {
  constructor() {
    super('battle')
  }

  generateReactWidget(diagramEngine: SRD.DiagramEngine, node: SRD.NodeModel): JSX.Element {
    return <BattleNodeWidget node={node} />
  }

  getNewInstance() {
    return new BattleNodeModel()
  }
}