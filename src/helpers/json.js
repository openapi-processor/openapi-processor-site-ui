'use strict'

module.exports = (data) => {
  if (data) {
    return JSON.stringify(data)
  }
  return 'empty'
}
