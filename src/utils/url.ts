export const extractParamsFromURL = (replaceValue: string | RegExp) => {
  const { pathname } = window.location
  return pathname.replace(replaceValue, '')
}
