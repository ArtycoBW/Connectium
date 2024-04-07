'use client'

import MettingTypeList from '@/components/Meeting/MeetingTypeList'
import React, { useEffect, useState } from 'react'

const Home = () => {
  const [currentTime, setCurrentTime] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 60000) // Обновление каждую минуту (60000 миллисекунд)

    return () => {
      clearInterval(timer) // Очистка интервала при размонтировании компонента
    }
  }, [currentTime])

  const time = currentTime.toLocaleTimeString('ru-RU', {
    hour: '2-digit',
    minute: '2-digit'
  })

  const date = new Intl.DateTimeFormat('ru-RU', {
    dateStyle: 'full'
  }).format(currentTime)

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
