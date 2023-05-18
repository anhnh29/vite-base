import { useLayoutEffect, useState } from 'react'

const useWindowSize = (): any => {
  const [size, setSize] = useState<[number, number]>([0, 0])

  useLayoutEffect(() => {
    const updateSize = (): void => {
      setSize([window.innerWidth, window.innerHeight])
    }
    window.addEventListener('resize', updateSize)

    updateSize()
    return () => {
      window.removeEventListener('resize', updateSize)
    }
  }, [])

  return {
    windowWidth: size[0],
    windowHeight: size[1],
  }
}

export default useWindowSize
