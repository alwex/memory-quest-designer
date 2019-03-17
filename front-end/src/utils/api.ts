import { StoryNodeModel } from "../nodes/story/StoryNodeModel";
import { DBStory } from "./db-models";

// ================================================================================
// Helpers
// ================================================================================
const capitalize = (s: string) => {
  if (typeof s !== 'string') return ''
  return s.charAt(0).toUpperCase() + s.slice(1)
}

const hydrateModel = (dbData: any, nodeModel: any) => {
  for (let attr in dbData) {
    nodeModel[`db${capitalize(attr)}`] = dbData[attr]
  }
  nodeModel.setPosition(dbData.x, dbData.y)
  return nodeModel
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

  private static async saveModel(modelType: string, data: any) {
    console.log(data)
    const id = data.id
    const toSave = { ...data }
    if (id) {
      delete toSave['id']
      return Api.put(`${endpoint}/${modelType}/${id}`, toSave)
    } else {
      return Api.post(`${endpoint}/${modelType}`, toSave)
    }
  }

  private static async deleteModel(modelType: string, data: any) {
    return await Api.delete(`${endpoint}/${modelType}/${data.id}`)
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
    const response = await Api.saveModel(`stories`, story)
    return await response.json()
  }

  public static async deleteStory(story: DBStory) {
    const response = await Api.deleteModel(`stories`, story)
    return await response.json()
  }
}
