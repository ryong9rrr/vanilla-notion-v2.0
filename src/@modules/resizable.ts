interface ResizableColumnOptions {
  defaultWidth: number
  minWidth: number
  maxWidth: number
}

const $ = (selector: string) => {
  const $target = window.document.querySelector(selector)
  if (!$target) {
    throw new Error(`${selector}에 해당하는 DOM Element를 찾지 못했어요.`)
  }
  return $target as HTMLElement
}

export function resizableColumn(
  containerSelector: string,
  handleSelector: string,
  { defaultWidth, minWidth, maxWidth }: ResizableColumnOptions,
) {
  let isResizing = false
  let lastX = defaultWidth

  const mouseDownHandler = (e: MouseEvent) => {
    // attach
    window.document.addEventListener('mousemove', mouseMoveHandler)
    window.document.addEventListener('mouseup', mouseUpHandler)

    e.preventDefault()
    isResizing = true
    lastX = e.clientX
  }

  const mouseUpHandler = () => {
    if (!isResizing) return
    isResizing = false

    // clean-up
    window.document.removeEventListener('mousemove', mouseMoveHandler)
    window.document.removeEventListener('mouseup', mouseUpHandler)
  }

  const mouseMoveHandler = (e: MouseEvent) => {
    if (!isResizing) return
    const delta = e.clientX - lastX
    const sidebarRect = $(containerSelector).getBoundingClientRect()
    const newWidth = sidebarRect.width + delta
    if (newWidth > minWidth && newWidth < maxWidth) {
      window.requestAnimationFrame(() => {
        $(containerSelector).style.width = `${newWidth}px`
        lastX = e.clientX
      })
    }
  }

  $(handleSelector).addEventListener('mousedown', mouseDownHandler)
}
