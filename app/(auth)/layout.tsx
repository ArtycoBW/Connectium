import { Metadata } from 'next'
import React, { ReactNode } from 'react'

export const metadata: Metadata = {
  title: 'Connectium',
  description: 'Приложение для проведения онлайн-встреч и собеседований',
  icons: {
    icon: '/icons/logo.svg'
  }
}

const RootLayout = ({ children }: { children: ReactNode }) => {
  return <main className='flex-center h-screen'>{children}</main>
}

export default RootLayout
