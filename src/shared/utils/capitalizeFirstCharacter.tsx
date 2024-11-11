/**
 * Capitalizes the first character of each word in a given string.
 *
 * @param {string} name - The string to capitalize.
 * @returns {string} The capitalized string.
 */
function capitalizeFirstCharater(name: string): string {
  let nameAsArray = name.toLowerCase().split(' ')
  nameAsArray = nameAsArray.map(
    (word) => word.charAt(0).toUpperCase() + word.slice(1)
  )
  const capitalizedName = nameAsArray.join(' ')
  return capitalizedName
}

export default capitalizeFirstCharater
