'use strict'

module.exports = (component, ctx) => {
  return component.name === ctx.data.root.page.component.name
}
