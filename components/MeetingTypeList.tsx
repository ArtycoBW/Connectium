'use client'

import Image from 'next/image'
import React, { useState } from 'react'
import HomeCard from './HomeCard'
import { useRouter } from 'next/navigation'
import MeetingModal from './MeetingModal'
import { useUser } from '@clerk/nextjs'
import { Call, useStreamVideoClient } from '@stream-io/video-react-sdk'
import { useToast } from '@/components/ui/use-toast'

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
  const [callDetails, setCallDetails] = useState<Call>()
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

      setCallDetails(call)

      if (!values.description) {
        router.push(`/meeting/${call.id}`)
      }

      toast({ title: 'Встреча создалась' })
    } catch (error) {
      console.log(error)
      toast({ title: 'Не удалось создать встречу' })
    }
  }

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
