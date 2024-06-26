import Image from 'next/image'
import React from 'react'

const Avatar = ({
  src,
  height,
  width
}: {
  src: string
  height: number
  width: number
}) => {
  return (
    <div>
      <Image
        src={src}
        height={height}
        width={width}
        alt='avatar'
        className='rounded-full border-2 border-[#818efe] p-[1px] hover:scale-125 transition-all cursor-pointer'
      />
    </div>
  )
}

export default Avatar
