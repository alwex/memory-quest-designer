import { Api } from "./api";
import pluralize from 'pluralize'

export async function saveModel(data: any) {
  const modelType = pluralize(data.type)
  const id = data.db.id
  const toSave = data.db
  toSave.x = data.x
  toSave.y = data.y

  if (id) {
    return Api.put(`${modelType}/${id}`, toSave)
  } else {
    return Api.post(`${modelType}`, toSave)
  }
}

export async function deleteModel(data: any) {
  console.log(data)
  const modelType = pluralize(data.type)
  const id = data.db.id

  return await Api.delete(`${modelType}/${id}`)
}