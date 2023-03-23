export const isDocumentPathForCurrentView = () => {
  const { pathname } = window.location
  const regexp = new RegExp(/^\/document\/[\w]+\/?$/, 'g')
  return regexp.test(pathname)
}

export const getDocumentIdForCurrentView = () => {
  if (!isDocumentPathForCurrentView()) {
    return null
  }
  const { pathname } = window.location
  const currentDocumentId = parseInt(pathname.replace('/document/', ''), 10)
  if (Number.isNaN(currentDocumentId)) {
    return null
  }
  return currentDocumentId
}
