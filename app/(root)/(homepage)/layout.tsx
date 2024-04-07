import NavBar from '@/components/LandingNavbar'
import { SparklesCore } from '@/components/ui/sparkles'
import { ReactNode } from 'react'

export default function HomePageLayout({
  children
}: Readonly<{
  children: ReactNode
}>) {
  return (
    <main className='h-full relative w-full from-[#000212] to-primary/20 flex flex-col overflow-hidden rounded-md'>
      <SparklesCore
        id='tsparticlesfullpage'
        background='transparent'
        minSize={1}
        maxSize={2}
        particleDensity={20}
        className='w-full h-full absolute z-10'
        particleColor='#346ccb'
      />

      <NavBar />
      <div className='z-50'>{children}</div>
    </main>
  )
}
