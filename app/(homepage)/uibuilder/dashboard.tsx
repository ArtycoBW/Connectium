'use client'

import { TitleComponent } from '@/components/TitleComponent'
import Avatar from '@/components/ui/avatar'
import { FollowerPointerCard } from '@/components/ui/following-pointer'
import { motion } from 'framer-motion'
import { File, Share2 } from 'lucide-react'
import { useRef } from 'react'

const Dashboard = () => {
  const constraintsRef = useRef(null)
  return (
    <div className=' flex flex-col justify-center items-center rounded-t-3xl mt-5 h-[450px] overflow-hidden bg-gray-200 hover:bg-gray-300 pt-6'>
      <div className='flex justify-between items-center gap-96 px-10 pt-4'>
        <div className='flex justify-center items-center gap-2 hover:scale-125 transition-all cursor-pointer'>
          <File width={25} height={25} color='black' />
          <h1 className='text-black text-md'>Collaborative creative tool</h1>
        </div>

        <div className='flex gap-6'>
          <div className='flex justify-center items-center gap-2'>
            <Avatar src='/assets/avatar2.jpg' height={30} width={30} />
            <Avatar src='/assets/avatar3.jpg' height={30} width={30} />
          </div>

          <div className='flex justify-center items-center'>
            <Avatar src='/assets/avatar.jpg' height={35} width={35} />
            <div className='bg-white rounded-xl px-3 py-1 ml-4 flex justify-center items-center gap-1 hover:scale-125 hover:bg-primary transition-all cursor-pointer'>
              <Share2 width={10} height={10} color='black' />
              <p className='text-black text-md font-normal'>Share</p>
            </div>
          </div>
        </div>
      </div>

      <FollowerPointerCard
        title={<TitleComponent title='artyco' src='/assets/avatar.jpg' />}
      >
        <motion.div
          className='flex flex-col place-content-start items-start gap-2 w-4/5 mx-auto mt-10 bg-white h-full rounded-2xl pt-16 px-8 cursor-none'
          ref={constraintsRef}
        >
          <motion.h2
            className='text-5xl text-black font-bold border border-transparent hover:border hover:border-primary p-2'
            drag
            dragConstraints={constraintsRef}
          >
            Connectium
          </motion.h2>
          <motion.h2
            className='text-5xl text-gray-400 font-bold border border-transparent hover:border hover:border-primary p-2 pb-4'
            drag
            dragConstraints={constraintsRef}
          >
            Artyco Inc
          </motion.h2>
          <motion.div className='flex justify-between items-center gap-10 relative w-full px-1'>
            <motion.img
              src={'/assets/uibuilder1.jpg'}
              alt='uibuilder1'
              width={210}
              height={185}
              drag
              dragConstraints={constraintsRef}
              className='object-cover rounded-t-3xl border border-transparent hover:border hover:border-primary p-1'
            />
            <motion.img
              src={'/assets/uibuilder2.jpg'}
              alt='uibuilder2'
              width={210}
              height={185}
              drag
              dragConstraints={constraintsRef}
              className='object-cover rounded-t-3xl border border-transparent hover:border hover:border-primary p-1'
            />
          </motion.div>
        </motion.div>
      </FollowerPointerCard>
    </div>
  )
}

export default Dashboard
