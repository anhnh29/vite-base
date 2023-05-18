type storageType = 'localStorage' | 'sessionStorage'

const validJSON = (str: any): boolean => {
  try {
    JSON.parse(str)
  } catch (e) {
    return false
  }
  return true
}

const removeItem = (
  item: string,
  typeStorage: storageType = 'localStorage'
): void => {
  window[typeStorage].removeItem(item)
}

const getItem = (
  item: string,
  typeStorage: storageType = 'localStorage'
): any => {
  const res = window[typeStorage].getItem(item)
  if (res) {
    return res && validJSON(res) ? JSON.parse(res || '') : res
  }
  return null
}

const setItem = (
  key: string,
  value: string | object,
  typeStorage: storageType = 'localStorage'
): void => {
  if (value) {
    if (typeof value === 'object')
      window[typeStorage].setItem(key, JSON.stringify(value))
    else window[typeStorage].setItem(key, value)
  }
}

const clear = (): void => {
  window.localStorage.clear()
  window.sessionStorage.clear()
}

const StorageService = {
  removeItem,
  getItem,
  setItem,
  clear,
}

export default StorageService
