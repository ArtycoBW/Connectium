import Image from 'next/image'
import Avatar from './ui/avatar'

export const TitleComponent = ({
  title,
  avatar
}: {
  title: string
  avatar: string
}) => (
  <div className='flex space-x-2 items-center'>
    <Avatar avatar={avatar} height={20} width={20} />
    <p>{title}</p>
  </div>
)
