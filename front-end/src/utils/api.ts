import { StoryNodeModel } from "../nodes/story/StoryNodeModel";
import { DBStory } from "./db-models";
import { serializeDbFields } from "./utils";
import pluralize from 'pluralize'

// ================================================================================
// Helpers
// ================================================================================
const capitalize = (s: string) => {
  if (typeof s !== 'string') return ''
  return s.charAt(0).toUpperCase() + s.slice(1)
}

export const hydrateModel = (dbData: any, nodeModel: any) => {
  for (let attr in dbData) {
    nodeModel[`db${capitalize(attr)}`] = dbData[attr]
  }
  nodeModel.setPosition(dbData.x, dbData.y)
  return nodeModel
}

const sanitizeDataBeforeSave = (data: any) => {
  let serializedDbFields: any = serializeDbFields(data)
  for (const attr in serializedDbFields) {
    console.log(attr)
    serializedDbFields[attr.toLowerCase().replace('db', '')] = serializedDbFields[attr]
    delete serializedDbFields[attr]
  }
  const sanitized: any = {
    ...serializedDbFields,
    x: data.x,
    y: data.y,
  }

  delete sanitized['id']

  return sanitized
}

const endpoint = 'http://localhost:1337';

export class Api {
  private static get(endpoint: string) {
    return fetch(endpoint)
  }

  private static delete(endpoint: string) {
    return fetch(endpoint, {
      method: 'DELETE',
      headers: new Headers({ 'content-type': 'application/json' }),
    })
  }

  private static post(endpoint: string, body: any) {
    return fetch(endpoint, {
      method: 'POST',
      headers: new Headers({ 'content-type': 'application/json' }),
      body: JSON.stringify(body)
    })
  }

  private static put(endpoint: string, body: any) {
    return fetch(endpoint, {
      method: 'PUT',
      headers: new Headers({ 'content-type': 'application/json' }),
      body: JSON.stringify(body)
    })
  }

  private static async getModels(modelType: string) {
    return await Api.get(`${endpoint}/${modelType}`)
  }

  public static async saveModel(data: any) {
    const modelType = pluralize(data.type)
    const id = data.dbId
    const toSave = sanitizeDataBeforeSave(data)

    if (id) {
      return Api.put(`${endpoint}/${modelType}/${id}`, toSave)
    } else {
      return Api.post(`${endpoint}/${modelType}`, toSave)
    }
  }

  public static async deleteModel(data: any) {
    console.log(data)
    const modelType = pluralize(data.type)
    const id = data.dbId
    return await Api.delete(`${endpoint}/${modelType}/${id}`)
  }

  // ================================================================================
  // Public methods
  // ================================================================================
  public static async getStories() {
    const response = await Api.getModels(`stories`)
    const stories = await response.json()
    return stories.map((story: DBStory) => {
      const model = new StoryNodeModel();
      return hydrateModel(story, model)
    })
  }

  public static async saveStory(story: DBStory) {
    const response = await Api.saveModel(story)
    return await response.json()
  }

  public static async deleteStory(story: DBStory) {
    const response = await Api.deleteModel(story)
    return await response.json()
  }
}
