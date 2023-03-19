class RedirectError extends Error {}

class ClientError extends Error {}

class ServerError extends Error {}

const handleErrors = (statusCode: number) => {
  if (statusCode >= 500) {
    throw new ServerError()
  }

  if (statusCode >= 400) {
    throw new ClientError()
  }

  throw new RedirectError()
}

export default class Api {
  private API_END_POINT: string

  constructor(API_END_POINT: string) {
    this.API_END_POINT = API_END_POINT
  }

  async request(url: string = '', options: RequestInit = {}) {
    try {
      const response = await fetch(`${this.API_END_POINT}${url}`, {
        ...options,
        headers: {
          'Content-Type': 'application/json',
        },
      })
      if (response.ok) {
        return response.json()
      }
      handleErrors(response.status)
    } catch (error) {
      console.warn(error)
      throw error
    }
  }
}
