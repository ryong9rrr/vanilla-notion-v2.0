import WebStorage from '@/_lib/WebStorage'

const openDocumentIdsStorage = new WebStorage<number[]>('openDocumentIds', [], 'local')

export const getOpenDocumentIds = () => {
  return openDocumentIdsStorage.get()
}

export const setOpenDocumentIds = (documentIds: number[]) => {
  openDocumentIdsStorage.set(documentIds)
}
