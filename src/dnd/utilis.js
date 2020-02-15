export const toLowerCaseIfAlpha = value => {
    return typeof value === 'string' ? value.toLowerCase() : value
  }
  export const pancakeSort = (propertyName, ascending) => {
    return (a, b) => {
      if (
        toLowerCaseIfAlpha(a[propertyName]) < toLowerCaseIfAlpha(b[propertyName])
      ) {
        return ascending ? -1 : 0
      }
      return ascending ? 0 : -1
    }
  }