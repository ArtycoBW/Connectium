import MettingTypeList from '@/components/MettingTypeList'
import React from 'react'

const Home = () => {
  const now = new Date()
  const time = now.toLocaleTimeString('ru-RU', {
    hour: '2-digit',
    minute: '2-digit'
  })
  const date = new Intl.DateTimeFormat('ru-RU', {
    dateStyle: 'full'
  }).format(now)
  return (
    <section className='flex size-full flex-col gap-10 text-white'>
      <div className='h-[300px] w-full rounded-[20px] bg-hero bg-cover'>
        <div className='flex flex-col h-full justify-between max-md:px-5 max-md:py-8 lg:p-11'>
          <h2 className='glassmorphism max-w-[270px] rounded py-2 text-center text-base font-normal '>
            Предстоящая встреча в 10:00
          </h2>
          <div className='flex flex-col gap-2'>
            <h1 className='text-4xl font-extrabold lg:text-7xl'>{time}</h1>
            <p className='text-lg font-medium text-sky-1 lg:text-2xl'>{date}</p>
          </div>
        </div>
      </div>

      <MettingTypeList />
    </section>
  )
}

export default Home
