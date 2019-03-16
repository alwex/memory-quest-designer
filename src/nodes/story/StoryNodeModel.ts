import { NodeModel } from 'storm-react-diagrams'
import { CustomPortModel } from '../CustomPortModel';

export class StoryNodeModel extends NodeModel {
  constructor() {
    super('story')
    this.addPort(new CustomPortModel('top'))
    this.addPort(new CustomPortModel('bottom-left'))
    this.addPort(new CustomPortModel('bottom-right'))
  }
}