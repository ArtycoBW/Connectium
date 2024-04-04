import { MacbookScroll } from '@/components/ui/macbook-scroll'
import { TextGenerateEffect } from '@/components/ui/text-generate-effect'
import { TypewriterEffectSmooth } from '@/components/ui/typewriter-effect'
import { description, titleWorlds } from './constants'

export default function HomePage() {
  return (
    <div className=' dark:bg-transparent bg-white w-full'>
      <MacbookScroll
        title={
          <div className='text-center'>
            {/* <Badge variant='outline' className='bg-slate-900'>
              Connecticum v0.1 beta
            </Badge> */}
            <TypewriterEffectSmooth words={titleWorlds} />
            <TextGenerateEffect
              words={description}
              className='max-w-5xl text-center mx-auto font-normal text-secondary dark:text-secondary text-xs'
            />

            {/* <Button className='mt-5' size='xl' variant='purple'>
              <p className='text-base'>Начать путешествие</p>
              <ChevronRight height={18} width={18} className='ml-1' />
            </Button> */}
          </div>
        }
        src='/assets/site-logo.png'
        showGradient={false}
      />
    </div>
  )
}
