import { exportToPdf } from '@/lib/utils'

import { Button } from '../ui/button'

const Export = () => (
  <div className='flex flex-col gap-3 px-5 py-3'>
    <h3 className='text-[10px] uppercase'>Export</h3>
    <Button
      variant='outline'
      className='w-full bg-primary/5 border border-primary-grey-100 hover:bg-primary/50 hover:text-white'
      onClick={exportToPdf}
    >
      Экспорт в PDF
    </Button>
  </div>
)

export default Export
