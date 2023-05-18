import { useEffect, useState } from 'react'

const useOrientation = (): string => {
  const [orientation, setOrientation] = useState(window.screen.orientation.type)

  useEffect(() => {
    const handleOrientationChange = (): void => {
      setOrientation(window.screen.orientation.type)
    }
    window.addEventListener('orientationchange', handleOrientationChange)
    return () => {
      window.removeEventListener('orientationchange', handleOrientationChange)
    }
  }, [])

  return orientation
}

export default useOrientation
