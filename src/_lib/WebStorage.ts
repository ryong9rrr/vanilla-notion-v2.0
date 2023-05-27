class WebStorageError extends Error {}

type WebStorageType = 'session' | 'local'

export default class WebStorage<T> {
  private storage: Storage
  private KEY: string
  private defaultValue: T

  constructor(KEY: string, defaultValue: T, type: WebStorageType = 'session') {
    if (type === 'session') {
      this.storage = window.sessionStorage
    } else {
      this.storage = window.localStorage
    }

    this.KEY = KEY
    this.defaultValue = defaultValue
  }

  get(): T {
    try {
      const value = this.storage.getItem(this.KEY)
      if (!value) {
        return this.defaultValue
      }
      return JSON.parse(value)
    } catch (e) {
      throw new WebStorageError(`웹스토리지에서 ${this.KEY}를 가져오는데 에러가 발생했어요.`)
    }
  }

  set(value: T) {
    try {
      this.storage.setItem(this.KEY, JSON.stringify(value))
    } catch (e) {
      throw new WebStorageError(`웹스토리지에서 ${this.KEY}를 등록하는데 에러가 발생했어요.`)
    }
  }

  clear() {
    this.storage.removeItem(this.KEY)
  }
}
