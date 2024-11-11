/**
 * Formats a timestamp into a date string in the format "Month Day, Year".
 *
 * @param {number} timestamp - The timestamp to format.
 * @returns {string} The formatted date string.
 */
function formatDateInText(timestamp: number): string {
  const date = new Date(timestamp)
  const monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
  ]
  const day = date.getDate()
  const month = monthNames[date.getMonth()]
  const year = date.getFullYear()

  // Format the date
  return `${month} ${day}, ${year}`
}

export default formatDateInText
