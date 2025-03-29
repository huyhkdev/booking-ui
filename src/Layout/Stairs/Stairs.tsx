import { motion } from 'framer-motion'

const stairsAnimation = {
  initial: { scaleY: 0, originY: 1 },
  animate: { scaleY: 1, originY: 1 },
  exit: { scaleY: 0, originY: 1 }
}

const Stairs = () => {
  return (
    <div className='fixed inset-0 flex flex-col justify-end'>
      {[...Array(5)].map((_, index) => (
        <motion.div
          key={index}
          className='w-full h-1/5 bg-blue-500'
          variants={stairsAnimation}
          initial='initial'
          animate='animate'
          exit='exit'
          transition={{ duration: 0.3, delay: index * 0.05 }}
        />
      ))}
    </div>
  )
}

export default Stairs
