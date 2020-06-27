'use strict'

/**
 * returns the first (newest) version of the given component unless it it the page component. In that
 * case it returns page version.
 *
 * @param component the component
 * @param ctx the antora context (automatically added)
 * @returns the display version string
 */
module.exports = (component, ctx) => {
  if (component.name === ctx.data.root.page.component.name) {
    return ctx.data.root.page.displayVersion
  } else {
    return component.versions[0].displayVersion
  }
}
