import { DBModel } from "../../utils/db-models";
import { NodeModel } from "storm-react-diagrams";

export class DBNodeModel extends NodeModel {
  public db?: DBModel

  serialize() {
    return {
      ...super.serialize(),
      ...this.db,
    }
  }
}