export const hydrateModel = (dbData: any, nodeModel: any, reset: boolean) => {
  nodeModel.db = { ...dbData }
  if (reset) {
    nodeModel.setPosition(dbData.x, dbData.y)
  }
  return nodeModel
}