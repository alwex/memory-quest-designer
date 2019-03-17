import { NodeModel } from 'storm-react-diagrams'
import { CustomPortModel } from '../CustomPortModel';
import { DBStory } from '../../utils/db-models';

export class StoryNodeModel extends NodeModel {
  public dbId?: number
  public dbPosition?: number
  public dbTitle?: string
  public dbStory?: string
  public dbCondition_1?: string
  public dbCondition_2?: string

  constructor() {
    super('story')
    this.addPort(new CustomPortModel('top'))
    this.addPort(new CustomPortModel('bottom-left'))
    this.addPort(new CustomPortModel('bottom-right'))
  }
}