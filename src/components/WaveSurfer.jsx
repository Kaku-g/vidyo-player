import React, { useEffect,useState,useRef,useCallback } from 'react';
import WaveSurfer from 'wavesurfer.js';

const useWavesurfer = (options) => {
    const [wavesurfer, setWavesurfer] = useState(null)
  
    // Initialize wavesurfer when the container mounts
    // or any of the props change
    useEffect(() => {
      if (!options.container) return
  
      const ws = WaveSurfer.create({
        ...options
      })
  
      setWavesurfer(ws)
  
      return () => {
        ws.destroy()
      }
    }, [options])
  
    return wavesurfer
  }
  

  const WaveSurferPlayer = (props) => {
    const containerRef = useRef()
    const [isPlaying, setIsPlaying] = useState(false)
    const [currentTime, setCurrentTime] = useState(0)
    const wavesurfer = useWavesurfer(containerRef, props)
  
    // On play button click
    const onPlayClick = useCallback(() => {
      wavesurfer.isPlaying() ? wavesurfer.pause() : wavesurfer.play()
    }, [wavesurfer])
  
    // Initialize wavesurfer when the container mounts
    // or any of the props change
    useEffect(() => {
      if (!wavesurfer) return
  
      setCurrentTime(0)
      setIsPlaying(false)
  
      const subscriptions = [
        wavesurfer.on('play', () => setIsPlaying(true)),
        wavesurfer.on('pause', () => setIsPlaying(false)),
        wavesurfer.on('timeupdate', (currentTime) => setCurrentTime(currentTime)),
      ]
  
      return () => {
        subscriptions.forEach((unsub) => unsub())
      }
    }, [wavesurfer])
  
    return (
      <>
        <div ref={containerRef} style={{ minHeight: '120px' ,width:'500px'}} />
  
        <button onClick={onPlayClick} style={{ marginTop: '1em' }}>
          {isPlaying ? 'Pause' : 'Play'}
        </button>
  
        <p>Seconds played: {currentTime}</p>
      </>
    )
  }

  export default WaveSurferPlayer;