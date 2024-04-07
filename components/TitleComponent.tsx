import Avatar from './ui/avatar'

export const TitleComponent = ({
  title,
  src
}: {
  title: string
  src: string
}) => (
  <div className='flex space-x-2 items-center'>
    <Avatar src={src} height={20} width={20} />
    <p>{title}</p>
  </div>
)
