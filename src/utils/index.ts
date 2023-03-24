export const getCurrentDocumentIdFromUrl = () => {
  const { pathname } = window.location
  const currentDocumentId = parseInt(pathname.replace('/document/', ''), 10)
  if (Number.isNaN(currentDocumentId)) {
    return null
  }
  return currentDocumentId
}
