import { Work_Sans } from 'next/font/google'

import { Room } from './Room'
import { ReactNode } from 'react'
import { TooltipProvider } from '@/components/ui/tooltip'

export const metadata = {
  title: 'UIBuilder',
  description: 'Создавайте что угодно вместе с UIBuilder'
}

const workSans = Work_Sans({
  subsets: ['latin'],
  variable: '--font-work-sans',
  weight: ['400', '600', '700']
})

const UIBuilderLayout = ({ children }: { children: ReactNode }) => (
  <main className={`${workSans.className} bg-primary-grey-200`}>
    <Room>
      <TooltipProvider>{children}</TooltipProvider>
    </Room>
  </main>
)

export default UIBuilderLayout
