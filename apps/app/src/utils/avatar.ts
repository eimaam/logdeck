export const generateAvatarMeta = (name: string) => {
  const initials = name
    ?.split(' ')
    ?.slice(0, 2)
    ?.map(n => n[0]?.toUpperCase())
    ?.join('')

  const colors = [
    '#3B82F6',
    '#6366F1',
    '#10B981',
    '#F59E0B',
    '#EF4444'
  ]

  const colorIndex = initials?.charCodeAt(0) % colors.length

  return {
    initials,
    backgroundColor: colors[colorIndex],
    textColor: '#FFFFFF'
  }
}