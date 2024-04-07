'use client'

import useInterval from '@/hooks/useInterval'
import {
  useBroadcastEvent,
  useEventListener,
  useMyPresence,
  useOthers
} from '@/liveblocks.config'
import { CursorMode, CursorState, Reaction, ReactionEvent } from '@/types/type'
import React, {
  MutableRefObject,
  useCallback,
  useEffect,
  useState
} from 'react'
import CursorChat from './cursor/CursorChat'
import LiveCursors from './cursor/LiveCursors'
import FlyingReaction from './reaction/FlyingReaction'
import ReactionSelector from './reaction/ReactionButton'

type LiveProps = {
  canvasRef: MutableRefObject<HTMLCanvasElement | null>
}

const Live = ({ canvasRef }: LiveProps) => {
  const others = useOthers()
  const [{ cursor }, updateMyPresence] = useMyPresence() as any

  const broadcast = useBroadcastEvent()

  const [cursorState, setCursorState] = useState<CursorState>({
    mode: CursorMode.Hidden
  })

  const [reactions, setReactions] = useState<Reaction[]>([])

  const setReaction = useCallback((reaction: string) => {
    setCursorState({ mode: CursorMode.Reaction, reaction, isPressed: false })
  }, [])

  // Удаление реакций, которые больше не видны (каждые 1 сек.)
  useInterval(() => {
    setReactions(reactions =>
      reactions.filter(reaction => reaction.timestamp > Date.now() - 4000)
    )
  }, 1000)

  useInterval(() => {
    if (
      cursorState.mode === CursorMode.Reaction &&
      cursorState.isPressed &&
      cursor
    ) {
      // объедининение всех реакций, созданных по щелчку мыши
      setReactions(reactions =>
        reactions.concat([
          {
            point: { x: cursor.x, y: cursor.y },
            value: cursorState.reaction,
            timestamp: Date.now()
          }
        ])
      )

      // транслируем реакцию другим пользователям
      broadcast({
        x: cursor.x,
        y: cursor.y,
        value: cursorState.reaction
      })
    }
  }, 100)

  useEventListener(eventData => {
    const event = eventData.event as ReactionEvent
    setReactions(reactions =>
      reactions.concat([
        {
          point: { x: event.x, y: event.y },
          value: event.value,
          timestamp: Date.now()
        }
      ])
    )
  })

  const handlePointerMove = useCallback((event: React.PointerEvent) => {
    event.preventDefault()

    // если курсор не находится в режиме селектора реакций, обновить положение курсора
    if (cursor == null || cursorState.mode !== CursorMode.ReactionSelector) {
      // получить позицию курсора на холсте
      const x = event.clientX - event.currentTarget.getBoundingClientRect().x
      const y = event.clientY - event.currentTarget.getBoundingClientRect().y

      // передача положения курсора другим пользователям
      updateMyPresence({
        cursor: {
          x,
          y
        }
      })
    }
  }, [])

  const handlePointerLeave = useCallback(() => {
    setCursorState({
      mode: CursorMode.Hidden
    })
    updateMyPresence({
      cursor: null,
      message: null
    })
  }, [])

  const handlePointerDown = useCallback(
    (event: React.PointerEvent) => {
      // получить позицию курсора на холсте
      const x = event.clientX - event.currentTarget.getBoundingClientRect().x
      const y = event.clientY - event.currentTarget.getBoundingClientRect().y

      updateMyPresence({
        cursor: {
          x,
          y
        }
      })

      // Если курсор находится в режиме реакции, установить значение isPressed в true
      setCursorState((state: CursorState) =>
        cursorState.mode === CursorMode.Reaction
          ? { ...state, isPressed: true }
          : state
      )
    },
    [cursorState.mode, setCursorState]
  )

  const handlePointerUp = useCallback(() => {
    setCursorState((state: CursorState) =>
      cursorState.mode === CursorMode.Reaction
        ? { ...state, isPressed: false }
        : state
    )
  }, [cursorState.mode, setCursorState])

  useEffect(() => {
    const onKeyUp = (e: KeyboardEvent) => {
      if (e.key === '/' || e.key === '.') {
        setCursorState({
          mode: CursorMode.Chat,
          previousMessage: null,
          message: ''
        })
      } else if (e.key === 'Escape') {
        updateMyPresence({ message: '' })
        setCursorState({ mode: CursorMode.Hidden })
      } else if (e.key === 'e' || e.key === 'у') {
        setCursorState({ mode: CursorMode.ReactionSelector })
      }
    }

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === '/') {
        e.preventDefault()
      }
    }

    if (typeof window !== 'undefined') {
      window.addEventListener('keyup', onKeyUp)
      window.addEventListener('keydown', onKeyDown)
    }
    return () => {
      if (typeof window !== 'undefined') {
        window.removeEventListener('keyup', onKeyUp)
        window.removeEventListener('keydown', onKeyDown)
      }
    }
  }, [updateMyPresence])

  return (
    <div
      id='canvas'
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
      className='h-screen w-full flex-center text-center'
    >
      <canvas ref={canvasRef} />

      {reactions.map(reaction => (
        <FlyingReaction
          key={reaction.timestamp.toString()}
          x={reaction.point.x}
          y={reaction.point.y}
          timestamp={reaction.timestamp}
          value={reaction.value}
        />
      ))}

      {cursor && (
        <CursorChat
          cursor={cursor}
          cursorState={cursorState}
          setCursorState={setCursorState}
          updateMyPresence={updateMyPresence}
        />
      )}

      {cursorState.mode === CursorMode.ReactionSelector && (
        <ReactionSelector
          setReaction={reaction => {
            setReaction(reaction)
          }}
        />
      )}

      <LiveCursors others={others} />
    </div>
  )
}

export default Live
