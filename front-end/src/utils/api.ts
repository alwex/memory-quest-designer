import { StoryNodeModel } from "../nodes/story/StoryNodeModel";
import { DBStory } from "./db-models";
import { hydrateModel } from "./utils";

const endpoint = 'http://localhost:1337';

export class Api {
  public static get(resource: string) {
    return fetch(`${endpoint}/${resource}`)
  }

  public static delete(resource: string) {
    return fetch(`${endpoint}/${resource}`, {
      method: 'DELETE',
      headers: new Headers({ 'content-type': 'application/json' }),
    })
  }

  public static post(resource: string, body: any) {
    return fetch(`${endpoint}/${resource}`, {
      method: 'POST',
      headers: new Headers({ 'content-type': 'application/json' }),
      body: JSON.stringify(body)
    })
  }

  public static put(resource: string, body: any) {
    return fetch(`${endpoint}/${resource}`, {
      method: 'PUT',
      headers: new Headers({ 'content-type': 'application/json' }),
      body: JSON.stringify(body)
    })
  }

  public static async getModels(modelType: string) {
    return await Api.get(`${modelType}`)
  }

  // ================================================================================
  // Public methods
  // ================================================================================
  public static async getStories() {
    const response = await Api.getModels(`stories`)
    const stories = await response.json()
    return stories.map((story: DBStory) => {
      const model = new StoryNodeModel();
      return hydrateModel(story, model, true)
    })
  }
}
