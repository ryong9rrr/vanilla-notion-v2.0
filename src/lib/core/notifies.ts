import { Component } from './Core'
import { isDiff, spreadObject } from './utils'

export const modifyPropsOfChildren = <T extends Record<string, any>>(
  obj: T,
  component: Component,
) => {
  const children = component._children

  children.forEach((subComponent) => {
    spreadObject(obj).forEach(([key, value]) => {
      if (key in subComponent._props) {
        subComponent._prevProps = { ...subComponent._props }
        subComponent._props[key] = value
      }
    })
    modifyPropsOfChildren(subComponent._props, subComponent)
  })
}

export const rerenderChildren = (component: Component) => {
  const children = component._children

  children.forEach((subComponent) => {
    subComponent._render()
    rerenderChildren(subComponent)
  })
}

export const callComponentDidUpdateOfChildren = (component: Component) => {
  const children = component._children

  children.forEach((subComponent) => {
    callComponentDidUpdateOfChildren(subComponent)

    const prev = {
      state: { ...subComponent._prevState },
      props: { ...subComponent._prevProps },
    }

    const current = {
      state: { ...subComponent._state },
      props: { ...subComponent._props },
    }

    if (isDiff(prev, current)) {
      subComponent.componentDidUpdate()
    }
  })
}
