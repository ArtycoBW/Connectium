'use client'

import {
  DeviceSettings,
  VideoPreview,
  useCall
} from '@stream-io/video-react-sdk'
import React, { useEffect, useState } from 'react'
import { Button } from './ui/button'

const MeetingSetup = ({
  setIsSetupComplete
}: {
  setIsSetupComplete: (value: boolean) => void
}) => {
  const [isMicCamToggled, setIsMicCamToggled] = useState(false)

  const call = useCall()

  if (!call) {
    throw new Error('usecall must be used within StreamCall component')
  }

  useEffect(() => {
    if (isMicCamToggled) {
      call?.camera.disable()
      call?.microphone.disable()
    } else {
      call?.camera.enable()
      call?.microphone.enable()
    }
  }, [isMicCamToggled, call?.camera, call?.microphone])

  return (
    <div className='flex-center flex-col h-screen w-full gap-3 text-white'>
      <h1 className='text-2xl font-bold'>Настройки</h1>
      <VideoPreview />
      <div className='flex-center h-16 gap-3'>
        <label className='flex-center gap-2 font-medium'>
          <input
            type='checkbox'
            checked={isMicCamToggled}
            onChange={e => setIsMicCamToggled(e.target.checked)}
          />
          Присоединиться без микрофона и камеры
        </label>
        <DeviceSettings />
      </div>
      <Button
        className='rounded-md bg-green-500 px-4 py-2.5'
        onClick={() => {
          call?.join()
          setIsSetupComplete(true)
        }}
      >
        Присоединиться к встрече
      </Button>
    </div>
  )
}

export default MeetingSetup
