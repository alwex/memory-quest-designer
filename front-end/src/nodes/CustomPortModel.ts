import * as _ from 'lodash'
import {
  LinkModel,
  DiagramEngine,
  PortModel,
  DefaultLinkModel,
} from 'storm-react-diagrams'

export class CustomPortModel extends PortModel {
  position: string | 'bottom' | 'bottom-left' | 'bottom-right' | 'top'

  constructor(pos: string = "top") {
    super(pos, "story")
    this.position = pos
  }

  serialize() {
    return _.merge(super.serialize(), {
      position: this.position
    })
  }

  deSerialize(data: any, engine: DiagramEngine) {
    super.deSerialize(data, engine)
    this.position = data.position
  }

  createLinkModel(): LinkModel {
    return new DefaultLinkModel()
  }

  link(port: PortModel): LinkModel {
    let link = this.createLinkModel();
    link.setSourcePort(this);
    link.setTargetPort(port);
    return link;
  }
}