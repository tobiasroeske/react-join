/**
 * Gets the initials from a given name.
 *
 * @param {string | null} name - The name to get initials from.
 * @returns {string} The initials of the name.
 */
export default function getInitials(name: string | null): string {
  if (!name) return ''
  const names = name.split(' ')
  const initials = names.map((name) => name.charAt(0).toUpperCase())
  return initials.join('')
}
