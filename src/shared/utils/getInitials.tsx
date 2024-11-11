export default function getInitials(name: string | null): string {
  if (!name) return ''
  const names = name.split(' ')
  const initials = names.map((name) => name.charAt(0).toUpperCase())
  return initials.join('')
}
