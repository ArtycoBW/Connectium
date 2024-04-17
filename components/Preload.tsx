'use client'

import { useState, useRef } from 'react'

const Preloader = () => {
  const [isVisible, setIsVisible] = useState(true)
  const videoRef = useRef<HTMLVideoElement>(null)

  const handleVideoEnd = () => {
    setIsVisible(false)
  }

  const startVideo = () => {
    if (videoRef.current) {
      videoRef.current.muted = false
      videoRef.current.play()
    }
  }

  return (
    <>
      {isVisible && (
        <div className='z-50 h-full w-full bg-[#030005] fixed left-0 top-0 flex justify-center items-center'>
          <video ref={videoRef} onEnded={handleVideoEnd} onClick={startVideo}>
            <source src='/assets/preloader.mp4' type='video/mp4' />
          </video>
        </div>
      )}
    </>
  )
}

export default Preloader
