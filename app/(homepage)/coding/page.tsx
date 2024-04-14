'use client'
import MaxWidthWrapper from '@/components/MaxWidthWrapper'
import { motion } from 'framer-motion'
import GitHubGlobe from './GitHubClobe'

const CodingLanding = () => {
  return (
    <div>
      <MaxWidthWrapper className='h-screen'>
        <GitHubGlobe />
      </MaxWidthWrapper>
      <div className='backdrop-brightness-75 border-t border-primary/5 w-screen py-20 h-screen'>
        <motion.div
          initial={{
            opacity: 0
          }}
          whileInView={{
            opacity: 1
          }}
          transition={{
            duration: 1,
            ease: 'linear',
            delay: 0.5
          }}
          className='flex flex-col justify-center items-center'
        >
          <p className='text-center text-[28px] text-gray-500 font-semibold max-w-5xl mx-auto pb-14'>
            Работайте в режиме реального времени вместе со своей командой, где
            бы она ни находилась. Проводите интервью и{' '}
            <span className='text-[#3b82f6]'>{`LiveCoding =)`}</span>
          </p>
          <video
            width='1100'
            height='800'
            autoPlay
            loop
            muted
            className='rounded-3xl'
          >
            <source src='/assets/coding2.mp4' type='video/mp4' />
          </video>
        </motion.div>
      </div>
    </div>
  )
}

export default CodingLanding
