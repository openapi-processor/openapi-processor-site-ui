'use strict'

/**
 * returns the first version of the given component.
 *
 * If the component is the page component it returns page.displayVersion, otherwise it returns its
 * first version.
 *
 * @param component the component
 * @param page the page object
 * @returns the version string
 */
module.exports = (component, page) => {
  if (component.name === page.component.name) {
    return page.displayVersion
  } else {
    return component.versions[0].displayVersion
  }
}
