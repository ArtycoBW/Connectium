'use client'

import LeftSidebar from '@/components/LeftSidebar'
import Live from '@/components/Live'
import RightSidebar from '@/components/RightSidebar'
import UIBuilderNavbar from '@/components/UIBuilderNavbar'
import { defaultNavElement } from '@/constants'
import {
  handleCanvasMouseDown,
  handleCanvasMouseMove,
  handleCanvasMouseUp,
  handleCanvasObjectModified,
  handleResize,
  initializeFabric,
  renderCanvas
} from '@/lib/canvas'
import { handleDelete } from '@/lib/key-events'
import { useMutation, useStorage } from '@/liveblocks.config'
import { ActiveElement } from '@/types/type'
import { fabric } from 'fabric'
import { useEffect, useRef, useState } from 'react'

const UiBuilder = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const fabricRef = useRef<fabric.Canvas | null>(null)
  const isDrawing = useRef(false)
  const shapeRef = useRef<fabric.Object | null>(null)
  const selectedShapeRef = useRef<string | null>('rectangle')
  const activeObjectRef = useRef<fabric.Object | null>(null)

  const canvasObjects = useStorage(root => root.canvasObjects)

  const syncShapeInStorage = useMutation(({ storage }, object) => {
    if (!object) return

    const { objectId } = object

    const shapeData = object.toJSON()
    shapeData.objectId = objectId

    const canvasObjects = storage.get('canvasObjects')

    canvasObjects.set(objectId, shapeData)
  }, [])

  const [activeElement, setActiveElement] = useState<ActiveElement>({
    name: '',
    value: '',
    icon: ''
  })

  /**
   * deleteShapeFromStorage - это мутация, которая удаляет фигуру из
   * хранилища ключевых значений liveblocks.
   * useMutation - это хук, предоставляемый Liveblocks, который позволяет вам выполнять
   * мутации над данными liveblocks.
   *
   * Мы используем эту мутацию для удаления фигуры из хранилища ключевых значений, когда
   * пользователь удаляет фигуру с холста.
   **/
  const deleteShapeFromStorage = useMutation(({ storage }, shapeId) => {
    /**
     * canvasObjects - это карта, содержащая все фигуры в ключевом значении.
     * Как магазин. Мы можем создавать несколько хранилищ в живых блоках.
     */
    const canvasObjects = storage.get('canvasObjects')
    canvasObjects.delete(shapeId)
  }, [])

  /**
   * deleteAllShapes - это мутация, которая удаляет все фигуры из
   * хранилища ключевых значений живых блоков.
   *
   * Мы используем эту мутацию для удаления всех форм из хранилища ключевых значений, когда пользователь нажимает на кнопку сброса.
   */
  const deleteAllShapes = useMutation(({ storage }) => {
    // получить хранилище объектов canvasObjects
    const canvasObjects = storage.get('canvasObjects')

    // Если store не существует или пуст, верните
    if (!canvasObjects || canvasObjects.size === 0) return true

    // удалить все фигуры из store
    for (const [key, value] of canvasObjects.entries()) {
      canvasObjects.delete(key)
    }

    // Возвращает true, если store пуст
    return canvasObjects.size === 0
  }, [])

  const handleActiveElement = (elem: ActiveElement) => {
    setActiveElement(elem)

    switch (elem?.value) {
      // удалить все фигуры с холста
      case 'reset':
        // очистить storage
        deleteAllShapes()
        // очистить canvas
        fabricRef.current?.clear()
        // установите "select" в качестве активного элемента
        setActiveElement(defaultNavElement)
        break

      case 'delete':
        // удалить с холста
        handleDelete(fabricRef.current as any, deleteShapeFromStorage)
        // установите "select" в качестве активного элемента
        setActiveElement(defaultNavElement)
        break

      default:
        // установить выбранную форму на выбранный элемент
        selectedShapeRef.current = elem?.value as string
        break
    }
  }

  useEffect(() => {
    const canvas = initializeFabric({ canvasRef, fabricRef })

    canvas.on('mouse:down', options => {
      handleCanvasMouseDown({
        options,
        canvas,
        isDrawing,
        shapeRef,
        selectedShapeRef
      })
    })

    canvas.on('mouse:move', options => {
      handleCanvasMouseMove({
        options,
        canvas,
        isDrawing,
        shapeRef,
        selectedShapeRef,
        syncShapeInStorage
      })
    })

    canvas.on('mouse:up', options => {
      handleCanvasMouseUp({
        canvas,
        isDrawing,
        shapeRef,
        selectedShapeRef,
        syncShapeInStorage,
        setActiveElement,
        activeObjectRef
      })
    })

    canvas.on('object:modified', options => {
      handleCanvasObjectModified({
        options,
        syncShapeInStorage
      })
    })

    if (typeof window !== 'undefined') {
      window.addEventListener('resize', () => handleResize({ canvas }))
    }

    return () => {
      /**
       * dispose - это метод, предоставляемый Fabric, который позволяет утилизировать холст. Он очищает холст и удаляет все события слушатели
       */
      canvas.dispose()
    }
  }, [])

  useEffect(() => {
    renderCanvas({
      fabricRef,
      canvasObjects,
      activeObjectRef
    })
  }, [canvasObjects])

  return (
    <main className='h-screen overflow-hidden'>
      <UIBuilderNavbar
        handleActiveElement={handleActiveElement}
        activeElement={activeElement}
      />
      <section className='flex h-full flex-row'>
        <LeftSidebar />
        <Live canvasRef={canvasRef} />
        <RightSidebar />
      </section>
    </main>
  )
}

export default UiBuilder
