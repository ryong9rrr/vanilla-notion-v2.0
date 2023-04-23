export const sleep = <T>(data: T) => {
  return new Promise<T>((resolve, reject) => {
    setTimeout(() => {
      resolve(data)
    }, 10)
  })
}
