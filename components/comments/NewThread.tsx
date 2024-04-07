'use client'

import {
  FormEvent,
  ReactNode,
  useCallback,
  useEffect,
  useRef,
  useState
} from 'react'
import { Slot } from '@radix-ui/react-slot'
import * as Portal from '@radix-ui/react-portal'
import { ComposerSubmitComment } from '@liveblocks/react-comments/primitives'

import { useCreateThread } from '@/liveblocks.config'
import { useMaxZIndex } from '@/lib/useMaxZIndex'

import PinnedComposer from './PinnedComposer'
import NewThreadCursor from './NewThreadCursor'

type ComposerCoords = null | { x: number; y: number }

type Props = {
  children: ReactNode
}

export const NewThread = ({ children }: Props) => {
  // устанавливаем состояние, чтобы отслеживать, размещаем мы новый комментарий или нет
  const [creatingCommentState, setCreatingCommentState] = useState<
    'placing' | 'placed' | 'complete'
  >('complete')

  /**
   * используем хук useCreateThread для создания нового потока.
   */
  const createThread = useCreateThread()

  // получение максимального z-индекс потока
  const maxZIndex = useMaxZIndex()

  // установить состояние для отслеживания координат композитора (редактор комментариев liveblocks)
  const [composerCoords, setComposerCoords] = useState<ComposerCoords>(null)

  // установить состояние для отслеживания последнего события с указателем
  const lastPointerEvent = useRef<PointerEvent>()

  // установить состояние для отслеживания того, разрешено ли пользователю использовать композитор
  const [allowUseComposer, setAllowUseComposer] = useState(false)
  const allowComposerRef = useRef(allowUseComposer)
  allowComposerRef.current = allowUseComposer

  useEffect(() => {
    // если композитор уже установлен, ничего не делаем
    if (creatingCommentState === 'complete') {
      return
    }

    // помещаем композитор на экран
    const newComment = (e: MouseEvent) => {
      e.preventDefault()

      // если он уже размещен, нажмите снаружи, чтобы закрыть композитор
      if (creatingCommentState === 'placed') {
        // проверьте, находится ли событие щелчка на/внутри композитора
        const isClickOnComposer = ((e as any)._savedComposedPath = e
          .composedPath()
          .some((el: any) => {
            return el.classList?.contains('lb-composer-editor-actions')
          }))

        // Если щелчок находится внутри/на композиторе, ничего не делайте
        if (isClickOnComposer) {
          return
        }

        // Если клик происходит за пределами композитора, закройте композитор
        if (!isClickOnComposer) {
          setCreatingCommentState('complete')
          return
        }
      }

      // При первом нажатии композитор опускается вниз
      setCreatingCommentState('placed')
      setComposerCoords({
        x: e.clientX,
        y: e.clientY
      })
    }

    document.documentElement.addEventListener('click', newComment)

    return () => {
      document.documentElement.removeEventListener('click', newComment)
    }
  }, [creatingCommentState])

  useEffect(() => {
    // При перетаскивании композитора обновить позицию
    const handlePointerMove = (e: PointerEvent) => {
      // Предотвращает проблему с удалением composedPath
      ;(e as any)._savedComposedPath = e.composedPath()
      lastPointerEvent.current = e
    }

    document.documentElement.addEventListener('pointermove', handlePointerMove)

    return () => {
      document.documentElement.removeEventListener(
        'pointermove',
        handlePointerMove
      )
    }
  }, [])

  // Установите событие указателя от последнего щелчка на теле, чтобы использовать его позже
  useEffect(() => {
    if (creatingCommentState !== 'placing') {
      return
    }

    const handlePointerDown = (e: PointerEvent) => {
      // Если композитор уже установлен, ничего не делайте
      if (allowComposerRef.current) {
        return
      }

      // Предотвращает проблему с удалением composedPath
      ;(e as any)._savedComposedPath = e.composedPath()
      lastPointerEvent.current = e
      setAllowUseComposer(true)
    }

    // Щелкните правой кнопкой мыши, чтобы отменить размещение
    const handleContextMenu = (e: Event) => {
      if (creatingCommentState === 'placing') {
        e.preventDefault()
        setCreatingCommentState('complete')
      }
    }

    document.documentElement.addEventListener('pointerdown', handlePointerDown)
    document.documentElement.addEventListener('contextmenu', handleContextMenu)

    return () => {
      document.documentElement.removeEventListener(
        'pointerdown',
        handlePointerDown
      )
      document.documentElement.removeEventListener(
        'contextmenu',
        handleContextMenu
      )
    }
  }, [creatingCommentState])

  // При отправке композитора создайте поток и сбросьте состояние
  const handleComposerSubmit = useCallback(
    ({ body }: ComposerSubmitComment, event: FormEvent<HTMLFormElement>) => {
      event.preventDefault()
      event.stopPropagation()

      // Получите элемент холста
      const overlayPanel = document.querySelector('#canvas')

      // Если нет коорд композитора или события последнего указателя, то есть пользователь еще не нажал, ничего не делайте
      if (!composerCoords || !lastPointerEvent.current || !overlayPanel) {
        return
      }

      // Установите координаты относительно левого верхнего края холста
      const { top, left } = overlayPanel.getBoundingClientRect()
      const x = composerCoords.x - left
      const y = composerCoords.y - top

      // создайте новый поток с коордами композитора и селекторами курсора
      createThread({
        body,
        metadata: {
          x,
          y,
          resolved: false,
          zIndex: maxZIndex + 1
        }
      })

      setComposerCoords(null)
      setCreatingCommentState('complete')
      setAllowUseComposer(false)
    },
    [createThread, composerCoords, maxZIndex]
  )

  return (
    <>
      {/**
       * Слот используется для обертывания дочерних элементов компонента NewThread.
       * чтобы мы могли добавить слушателя события щелчка для дочерних компонентов
       *
       * Отказ от ответственности: Нам не нужно специально скачивать этот пакет,
       * он уже включен, когда мы устанавливаем Shadcn
       */}
      <Slot
        onClick={() =>
          setCreatingCommentState(
            creatingCommentState !== 'complete' ? 'complete' : 'placing'
          )
        }
        style={{ opacity: creatingCommentState !== 'complete' ? 0.7 : 1 }}
      >
        {children}
      </Slot>

      {/* если коорды композитора существуют и мы помещаем комментарий, отобразите композитора */}
      {composerCoords && creatingCommentState === 'placed' ? (
        /**
         * Portal.Root используется для рендеринга композитора вне компонента NewThread, чтобы избежать проблем с z-индексом.
         */
        <Portal.Root
          className='absolute left-0 top-0'
          style={{
            pointerEvents: allowUseComposer ? 'initial' : 'none',
            transform: `translate(${composerCoords.x}px, ${composerCoords.y}px)`
          }}
          data-hide-cursors
        >
          <PinnedComposer onComposerSubmit={handleComposerSubmit} />
        </Portal.Root>
      ) : null}

      {/* Показывать курсор настройки при размещении комментария. Тот, который имеет форму комментария */}
      <NewThreadCursor display={creatingCommentState === 'placing'} />
    </>
  )
}
