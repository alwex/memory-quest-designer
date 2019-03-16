import * as SRD from 'storm-react-diagrams'
import { NodeModel, Toolkit } from 'storm-react-diagrams'
import { StoryPortModel } from './StoryPortModel';

export class StoryNodeModel extends NodeModel {
  constructor() {
    super("story")
    this.addPort(new StoryPortModel('top'))
    this.addPort(new StoryPortModel('bottom-left'))
    this.addPort(new StoryPortModel('bottom-right'))
  }
}