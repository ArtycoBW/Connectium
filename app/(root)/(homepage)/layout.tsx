import NavBar from '@/components/LandingNavbar'
import { SparklesCore } from '@/components/ui/sparkles'

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className='h-full relative w-full from-[#000212] to-primary/20 flex flex-col overflow-hidden rounded-md'>
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
    </div>
  )
}