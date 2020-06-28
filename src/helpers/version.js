'use strict'

/**
 * returns the first (newest) version of the given component unless it it the page component. In that
 * case it returns the page version.
 *
 * @param component the component
 * @param ctx the antora context (automatically added)
 * @returns a version
 */
module.exports = (component, ctx) => {
  if (component.name === ctx.data.root.page.component.name) {
    return ctx.data.root.page.versions.find((v) => v.version === ctx.data.root.page.version)
  } else {
    return component.versions[0]
  }
}
