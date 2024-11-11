/**
 * Truncates a description to a specified maximum length.
 *
 * @param {string} description - The description to truncate.
 * @param {number} [maxLength=30] - The maximum length of the truncated description.
 * @returns {string} The truncated description with an ellipsis if it exceeds the maximum length.
 */
function truncateDescription(description: string, maxLength = 30): string {
  if (description.length > maxLength) {
    return description.substring(0, maxLength) + '...'
  }
  return description
}

export default truncateDescription
