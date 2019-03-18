export interface DBModel {
  [key: string]: any
}

export interface DBStory extends DBModel {
  id?: number
  title?: string
  story?: string
  condition_1?: string
  condition_2?: string
  x?: number
  y?: number
}
