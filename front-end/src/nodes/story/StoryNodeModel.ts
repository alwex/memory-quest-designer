import { CustomPortModel } from '../CustomPortModel'
import { DBNodeModel } from './DBNodeModel';

export class StoryNodeModel extends DBNodeModel {

  constructor() {
    super('story')
    this.addPort(new CustomPortModel('top'))
    this.addPort(new CustomPortModel('bottom-left'))
    this.addPort(new CustomPortModel('bottom-right'))
  }
}