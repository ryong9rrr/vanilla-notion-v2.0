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

export const requestBuilder =
  (API_END_POINT: string, defaultOptions: RequestInit = {}) =>
  async (url: string, options: RequestInit = {}) => {
    try {
      const response = await fetch(`${API_END_POINT}${url}`, {
        ...defaultOptions,
        ...options,
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
