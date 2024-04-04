'use client'

import MaxWidthWrapper from '@/components/MaxWidthWrapper'

import { buttonVariants } from '@/components/ui/button'
import { InfiniteMoving } from '@/components/ui/infinite-moving'
import { motion } from 'framer-motion'
import {
  FileText,
  Github,
  Landmark,
  MessageSquareText,
  MousePointer2,
  MoveRight,
  Radio,
  Sailboat
} from 'lucide-react'
import Link from 'next/link'
import Dashboard from './dashboard'

const companies = [
  {
    title: 'Kreativity',
    icon: <Sailboat width={60} height={60} />
  },
  {
    title: 'Artycles',
    icon: <Github width={60} height={60} />
  },
  {
    title: 'Gringotts',
    icon: <Landmark width={60} height={60} />
  }
]

const items = [
  {
    title: 'Присутствие',
    description:
      'Создайте у людей ощущение, что они находятся в одной комнате.',
    icon: <MousePointer2 width={40} height={40} />
  },
  {
    title: 'Трансляция',
    description:
      'Транслируйте события в реальном времени подключенным пользователям.',
    icon: <Radio width={40} height={40} />
  },
  {
    title: 'Документ',
    description:
      'Хранилища данных в реальном времени для совместной работы над документами.',
    icon: <FileText width={40} height={40} />
  },
  {
    title: 'Комментарии',
    description: 'Обсуждайте и оставляйте отзывы в реальном времени.',
    icon: <MessageSquareText width={40} height={40} />
  }
]

const UIBuilder = () => {
  return (
    <div className='flex flex-col w-full h-full'>
      <MaxWidthWrapper>
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
          className='flex flex-col items-center justify-center pt-32 h-full max-h-screen'
        >
          <h1 className='md:text-6xl text-3xl lg:text-7xl font-bold text-center text-white relative whitespace-pre-line z-20'>
            Создавайте что угодно {`\n`} вместе с{' '}
            <span style={{ color: '#3b82f6' }}>UIBuilder</span>
          </h1>
          <div className='w-full h-40 relative'>
            {/* Gradients */}
            <div className='absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-[2px] w-3/4 blur-sm' />
            <div className='absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-px w-3/4' />
            <div className='absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-[5px] w-2/4 blur-xl' />
            <div className='absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-px w-1/4' />
          </div>

          <div className='select-none brightness-75 hover:brightness-100 transition-all duration-600 cursor-none'>
            <Dashboard />
          </div>
        </motion.div>
      </MaxWidthWrapper>
      <div className='pt-32 backdrop-brightness-75 border-t border-primary/5'>
        <MaxWidthWrapper>
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
              delay: 0.3
            }}
          >
            <h2 className='text-center w-3/5 mx-auto text-gray-500 text-xl'>
              Компании всех размеров и отраслей используют UIBuilder для
              организации совместной работы над своими творческими проектами.
            </h2>
          </motion.div>
        </MaxWidthWrapper>
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
          className='h-[10rem] py-10'
        >
          <InfiniteMoving items={companies} direction='right' speed='slow' />
        </motion.div>
        <MaxWidthWrapper>
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
            className='flex py-32'
          >
            <div className='flex-1 w-44 justify-center my-auto items-center space-y-3'>
              <h2 className='md:text-6xl text-3xl lg:text-5xl font-bold relative  whitespace-pre-line z-20 text-[#3b82f6]'>
                Улучшайте {`\n`} командную работу
              </h2>
              <p className='text-xl text-gray-500 font-semibold pb-6'>
                Обеспечивайте людям более эффективную работу с вашим продуктом,
                обмениваясь идеями и совместно решая задачи.
              </p>

              <Link
                href='/sign-up'
                className={buttonVariants({
                  variant: 'blue',
                  size: 'default'
                })}
              >
                <p className='mr-2'>Начать путешествие</p>
                <MoveRight height={18} width={18} className='mt-[2px]' />
              </Link>
            </div>
            <div className='flex w-1/2 flex-wrap justify-center items-center gap-y-4'>
              {items.map(item => (
                <div key={item.title} className='w-1/2 h-1/2'>
                  <div className='text-[#3b82f6] pb-3 transition-all'>
                    {item.icon}
                  </div>
                  <h2 className='text-white font-semibold text-lg'>
                    {item.title}
                  </h2>
                  <p className='text-gray-500 font-semibold text-md'>
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>
        </MaxWidthWrapper>
      </div>
    </div>
  )
}

export default UIBuilder
