'use client'

import Image from 'next/image'
import React, { useState } from 'react'
import HomeCard from './HomeCard'
import { useRouter } from 'next/navigation'
import MeetingModal from './MeetingModal'
import { useUser } from '@clerk/nextjs'
import { Call, useStreamVideoClient } from '@stream-io/video-react-sdk'
import { useToast } from '@/components/ui/use-toast'
import { Textarea } from './ui/textarea'

import ReactDatePicker from 'react-datepicker'
import { registerLocale, setDefaultLocale } from 'react-datepicker'
import { ru } from 'date-fns/locale/ru'
import Loader from './Loader'

registerLocale('ru', ru)

const MettingTypeList = () => {
  const router = useRouter()
  const [meetingState, setMeetingState] = useState<
    'isScheduleMeeting' | 'isJoiningMeeting' | 'isInstantMeeting' | undefined
  >(undefined)

  const { user } = useUser()
  const client = useStreamVideoClient()
  const [values, setValues] = useState({
    dateTime: new Date(),
    description: '',
    link: ''
  })
  const [callDetail, setCallDetail] = useState<Call>()
  const { toast } = useToast()

  const createMeeting = async () => {
    if (!client || !user) return

    try {
      if (!values.dateTime) {
        toast({ title: 'Пожалуйста, выберите дату и время' })
        return
      }
      const id = crypto.randomUUID()
      const call = client.call('default', id)

      if (!call) throw new Error('Failed to create call')

      const startsAt =
        values.dateTime.toISOString() || new Date(Date.now()).toISOString()
      const description = values.description || 'Instant meeting'

      await call.getOrCreate({
        data: {
          starts_at: startsAt,
          custom: {
            description
          }
        }
      })

      setCallDetail(call)

      if (!values.description) {
        router.push(`/meeting/${call.id}`)
      }

      toast({ title: 'Встреча создалась' })
    } catch (error) {
      console.log(error)
      toast({ title: 'Не удалось создать встречу' })
    }
  }

  if (!client || !user) return <Loader />

  const meetingLink = `${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${callDetail?.id}`

  return (
    <section className='grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4'>
      <HomeCard
        img='/icons/add-meeting.svg'
        title='Новая встреча'
        description='Начать встречу сейчас'
        handleClick={() => setMeetingState('isInstantMeeting')}
      />
      <HomeCard
        img='/icons/join-meeting.svg'
        title='Присоединиться к встрече'
        description='по ссылке-приглашению'
        className='bg-blue-1'
        handleClick={() => setMeetingState('isJoiningMeeting')}
      />
      <HomeCard
        img='/icons/schedule.svg'
        title='Запланировать встречу'
        description='Спланируйте вашу встречу'
        className='bg-purple-1'
        handleClick={() => setMeetingState('isScheduleMeeting')}
      />
      <HomeCard
        img='/icons/recordings.svg'
        title='Войти в конференцию'
        description='по пригласительной ссылке'
        className='bg-yellow-1'
        handleClick={() => router.push('/recordings')}
      />

      {!callDetail ? (
        <MeetingModal
          isOpen={meetingState === 'isScheduleMeeting'}
          onClose={() => setMeetingState(undefined)}
          title='Create Meeting'
          handleClick={createMeeting}
        >
          <div className='flex flex-col gap-2.5'>
            <label className='text-base font-normal leading-[22.4px] text-sky-2'>
              Добавьте описание
            </label>
            <Textarea
              className='border-none bg-dark-3 focus-visible:ring-0 focus-visible:ring-offset-0'
              onChange={e =>
                setValues({ ...values, description: e.target.value })
              }
            />
          </div>
          <div className='flex w-full flex-col gap-2.5'>
            <label className='text-base font-normal leading-[22.4px] text-sky-2'>
              Выберите дату и время
            </label>
            <ReactDatePicker
              selected={values.dateTime}
              onChange={date => setValues({ ...values, dateTime: date! })}
              showTimeSelect
              locale={'ru'}
              timeFormat='HH:mm'
              timeIntervals={15}
              timeCaption='time'
              dateFormat='MMMM d, yyyy h:mm'
              className='w-full rounded bg-dark-3 p-2 focus:outline-none'
            />
          </div>
        </MeetingModal>
      ) : (
        <MeetingModal
          isOpen={meetingState === 'isScheduleMeeting'}
          onClose={() => setMeetingState(undefined)}
          title='Встреча создана'
          handleClick={() => {
            navigator.clipboard.writeText(meetingLink)
            toast({ title: 'Ссылка скопирована' })
          }}
          image={'/icons/checked.svg'}
          buttonIcon='/icons/copy.svg'
          className='text-center'
          buttonText='Скопировать ссылку на встречу'
        />
      )}

      <MeetingModal
        isOpen={meetingState === 'isInstantMeeting'}
        onClose={() => setMeetingState(undefined)}
        title='Начать встречу сейчас'
        handleClick={createMeeting}
      ></MeetingModal>
    </section>
  )
}

export default MettingTypeList
