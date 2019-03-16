import { NodeModel } from 'storm-react-diagrams'
import { CustomPortModel } from '../CustomPortModel';

export class BattleNodeModel extends NodeModel {
  constructor() {
    super('battle')
    this.addPort(new CustomPortModel('top'))
    this.addPort(new CustomPortModel('bottom'))
  }
}