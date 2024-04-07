'use client'

import { useMemo } from 'react'

import { generateRandomName } from '@/lib/utils'
import { useOthers, useSelf } from '@/liveblocks.config'

import Avatar from './Avatar'

const ActiveUsers = () => {
  /**
   * useOthers возвращает список других пользователей в комнате.
   */
  const others = useOthers()

  /**
   * useSelf возвращает текущие данные пользователя в комнате
   */
  const currentUser = useSelf()

  // запомнить результат работы этой функции, чтобы он менялся не при каждом рендеринге, а только при появлении новых пользователей в комнате
  const memoizedUsers = useMemo(() => {
    const hasMoreUsers = others.length > 2

    return (
      <div className='flex-center gap-1'>
        {currentUser && (
          <Avatar name='You' otherStyles='border-[3px] border-primary-green' />
        )}

        {others.slice(0, 2).map(({ connectionId }) => (
          <Avatar
            key={connectionId}
            name={generateRandomName()}
            otherStyles='-ml-3'
          />
        ))}

        {hasMoreUsers && (
          <div className='z-10 -ml-3 flex-center h-9 w-9 rounded-full bg-primary-black'>
            +{others.length - 2}
          </div>
        )}
      </div>
    )
  }, [others.length])

  return memoizedUsers
}

export default ActiveUsers
