export function pick(obj, keys) {
  return keys.reduce((res, key) => {
    res[key] = obj[key]
    return res
  }, {})
}
