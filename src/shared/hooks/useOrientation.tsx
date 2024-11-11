import { useState, useEffect } from 'react'

function useOrientation() {
  const [isPortrait, setIsPortrait] = useState(
    window.matchMedia('(orientation: portrait)').matches
  )
  const [isMobile, setIsMobile] = useState<boolean>(window.innerWidth <= 445)

  useEffect(() => {
    const mediaQuery = window.matchMedia('(orientation: portrait)')

    function handleOrientationChange(e: MediaQueryListEvent) {
      setIsPortrait(e.matches)
    }

    function handleScreenSizeChange() {
      setIsMobile(window.innerWidth <= 445)
    }
    window.addEventListener('resize', handleScreenSizeChange)
    mediaQuery.addEventListener('change', handleOrientationChange)

    return () => {
      mediaQuery.removeEventListener('change', handleOrientationChange)
      window.removeEventListener('resize', handleScreenSizeChange)
    }
  }, [])

  return { isPortrait, isMobile }
}

export default useOrientation
