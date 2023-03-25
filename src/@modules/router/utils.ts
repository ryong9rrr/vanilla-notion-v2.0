const parseUrlPath = (configPath: string) => {
  return new RegExp('^' + configPath.replace(/\//g, '\\/').replace(/:\w+/g, '[\\w]+') + '\\/?$')
}

export const isMatch = (configPath: string, realPath: string) => {
  return parseUrlPath(configPath).test(realPath)
}
