export const serializeDbFields = (model: any) => {
  const fields: any = {}
  for (const attr in model) {
    if (attr.startsWith('db')) {
      fields[attr] = model[attr]
    }
  }

  return fields
}