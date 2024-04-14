'use client'

import Image from 'next/image'
import { memo } from 'react'

import { navElements } from '@/constants'
import { ActiveElement, NavbarProps } from '@/types/type'

import { Button } from './ui/button'
import ShapesMenu from './ShapesMenu'
import ActiveUsers from './users/ActiveUsers'
import { NewThread } from './comments/NewThread'

const Navbar = ({
  activeElement,
  imageInputRef,
  handleImageUpload,
  handleActiveElement
}: NavbarProps) => {
  const isActive = (value: string | Array<ActiveElement>) =>
    (activeElement && activeElement.value === value) ||
    (Array.isArray(value) &&
      value.some(val => val?.value === activeElement?.value))

  return (
    <nav className='flex select-none items-center justify-between gap-4 bg-primary-black px-5 text-white'>
      <Image
        src='/icons/logo.svg'
        alt='Connectium Logo'
        width={35}
        height={35}
      />

      <ul className='flex flex-row gap-3 py-1'>
        {navElements.map((item: ActiveElement | any) => (
          <li
            key={item.name}
            onClick={() => {
              if (Array.isArray(item.value)) return
              handleActiveElement(item)
            }}
            className={`group px-2.5 py-5 flex justify-center items-center transition-all rounded-lg
            ${
              isActive(item.value)
                ? 'bg-primary/80'
                : 'hover:bg-primary-grey-200'
            }
            `}
          >
            {/* Если value - массив, это означает, что это элемент навигации с вложенными опциями, т.е. выпадающий список */}
            {Array.isArray(item.value) ? (
              <ShapesMenu
                item={item}
                activeElement={activeElement}
                imageInputRef={imageInputRef}
                handleActiveElement={handleActiveElement}
                handleImageUpload={handleImageUpload}
              />
            ) : item?.value === 'comments' ? (
              // Если значение равно комментариям, запускается компонент NewThread
              <NewThread>
                <Button
                  variant='none'
                  className='relative w-5 h-5 object-contain'
                >
                  <Image
                    src={item.icon}
                    alt={item.name}
                    fill
                    className={isActive(item.value) ? 'contrast-200' : ''}
                  />
                </Button>
              </NewThread>
            ) : (
              <Button
                variant='none'
                className='relative w-5 h-5 object-contain'
              >
                <Image
                  src={item.icon}
                  alt={item.name}
                  fill
                  className={isActive(item.value) ? 'contrast-200' : ''}
                />
              </Button>
            )}
          </li>
        ))}
      </ul>

      <ActiveUsers />
    </nav>
  )
}

export default memo(
  Navbar,
  (prevProps, nextProps) => prevProps.activeElement === nextProps.activeElement
)
