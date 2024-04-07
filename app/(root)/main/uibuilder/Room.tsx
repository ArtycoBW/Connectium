'use client'

import Loader from '@/components/Loader'
import { RoomProvider } from '@/liveblocks.config'
import { LiveMap } from '@liveblocks/client'
import { ClientSideSuspense } from '@liveblocks/react'
import React, { ReactNode } from 'react'

export function Room({ children }: { children: ReactNode }) {
  return (
    <RoomProvider
      id='my-room'
      initialPresence={{
        cursor: null,
        cursorColor: null,
        editingText: null
      }}
      initialStorage={{
        canvasObjects: new LiveMap()
      }}
    >
      <ClientSideSuspense
        fallback={
          <div className='h-screen flex-center'>
            <Loader />
          </div>
        }
      >
        {() => children}
      </ClientSideSuspense>
    </RoomProvider>
  )
}
