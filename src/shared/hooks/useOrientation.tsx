import { useState, useEffect } from 'react'

/**
 * Custom hook to get the current orientation and screen size.
 *
 * @returns {{ isPortrait: boolean, isMobile: boolean }} An object containing the orientation and screen size information.
 */
function useOrientation() {
  const [isPortrait, setIsPortrait] = useState(
    window.matchMedia('(orientation: portrait)').matches
  )
  const [isMobile, setIsMobile] = useState<boolean>(window.innerWidth <= 445)

  /**
   * Effect to set up event listeners for orientation and screen size changes.
   *
   * Updates the state variables when the orientation or screen size changes.
   */
  useEffect(() => {
    const mediaQuery = window.matchMedia('(orientation: portrait)')

    /**
     * Handles orientation change events.
     *
     * @param {MediaQueryListEvent} e - The media query list event.
     */
    function handleOrientationChange(e: MediaQueryListEvent) {
      setIsPortrait(e.matches)
    }

    /**
     * Handles screen size change events.
     */
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
