import { NodeModel } from "storm-react-diagrams";
import { DBModel } from "../utils/db-models";

export class DBNodeModel extends NodeModel {
  public db?: DBModel

  serialize() {
    return {
      ...super.serialize(),
      ...this.db,
    }
  }
}