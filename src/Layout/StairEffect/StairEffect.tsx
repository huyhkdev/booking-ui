import { AnimatePresence, motion } from 'framer-motion'
import { useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'

const stairsAnimation = {
  initial: { scaleY: 0, opacity: 0 },
  animate: { scaleY: 1, opacity: 1 },
  exit: { scaleY: 0, opacity: 0 }
}

const StairEffect = () => {
  const location = useLocation()
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    setIsVisible(true)
    const timer = setTimeout(() => setIsVisible(false), 2000)
    return () => clearTimeout(timer)
  }, [location.pathname])

  return (
    <AnimatePresence mode='wait'>
      {isVisible && (
        <div className='fixed inset-0 flex flex-col justify-end z-50 pointer-events-none'>
          {[...Array(5)].map((_, index) => (
            <motion.div
              key={index}
              className='w-full h-1/5 bg-white'
              variants={stairsAnimation}
              initial='initial'
              animate='animate'
              exit='exit'
              transition={{ duration: 0.3, delay: index * 0.05 }}
            />
          ))}
        </div>
      )}
    </AnimatePresence>
  )
}

export default StairEffect
