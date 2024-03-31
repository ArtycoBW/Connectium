import React, { ReactNode } from 'react'

const RootLayout = ({ children }: { children: ReactNode }) => {
  return <main className='flex-center h-screen'>{children}</main>
}

export default RootLayout
