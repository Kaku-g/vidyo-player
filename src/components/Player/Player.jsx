
  


import React, { useRef, useEffect ,useState} from 'react';
import WaveSurfer from 'wavesurfer.js'
import Waveform from '../Waveform';
import Meta from '../Meta';
import './Player.css'
import WaveSurferPlayer from '../WaveSurfer';
import Play from '../../icon/play.svg';
import Pause from '../../icon/pause.svg';
//  import { checkAudioPresence } from '../utility/AudioChecker';

const VideoPlayer = ({ }) => {
  const canvasRef = useRef(null);
  const videoRef = useRef(null);
  const inputRef= useRef(null);
  
 // const waveformRef=useRef(null);
  const [currentVideoSource, setCurrentVideoSource] = useState('');
  const[changing,setChanging]=useState(false)
  const [metaData,setMetaData]=useState();
  const[playing,setPlaying]=useState(true);
  const [showPlayButton, setShowPlayButton] = useState(false);

  const handleCanvasHover = () => {
    setShowPlayButton(true);
  };

  const handleCanvasLeave = () => {
    setShowPlayButton(false);
  };
  
  const checkAudioPresence = (url) => {
    return new Promise((resolve) => {
      const mediaSource = new MediaSource();
  
      mediaSource.addEventListener("sourceopen", () => {
        const mediaRecorder = new MediaRecorder(mediaSource);
  
        mediaRecorder.ondataavailable = (event) => {
          if (event.data.size > 0) {
            resolve(true); // The video has audio.
          } else {
            resolve(false); // The video does not have audio.
          }
        };
  
        mediaRecorder.start();
        mediaRecorder.stop();
      });
  
      mediaSource.addEventListener("error", (e) => {
        console.error("Error opening media source:", e);
        resolve(false);
      });
  
      const videoElement = document.createElement("video");
      videoElement.src = url;
    });
  };
  
  function hasAudio(video) {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
  
    // Create an analyzer node
    const analyser = audioContext.createAnalyser();
    analyser.fftSize = 256; // You can adjust this value for your needs
  
    // Check if the video element is already connected to an AudioNode
    if (audioContext.state === 'suspended') {
      audioContext.resume().then(() => {
        const source = audioContext.createMediaElementSource(video);
        source.connect(analyser);
        analyser.connect(audioContext.destination);
  
        // Create a buffer to store audio data
        const bufferLength = analyser.frequencyBinCount;
        const dataArray = new Uint8Array(bufferLength);
  
        // Get the audio data
        analyser.getByteFrequencyData(dataArray);
  
        // Check if there's any non-zero data in the array
        const hasAudioData = dataArray.some(value => value !== 0);
  
        // Close the audio context
        audioContext.close();
  
        return hasAudioData;
      });
    } else {
      // The audio context is already in use, so you can't create a new one for the same video element.
      // You can handle this case accordingly, such as returning false or another value.
      return false;
    }
  }
  
  


  
  useEffect(() => {
    const canvas = canvasRef.current;

    


    const video = videoRef.current;

    video.src=currentVideoSource;



    
  
    const ctx = canvas.getContext('2d');

    video.onloadedmetadata = (event) => {
        
      console.log(videoRef.current)
       setMetaData([
        videoRef.current.duration,

        videoRef.current.videoWidth,
        videoRef.current.videoHeight
       ])
      
    };
  
       
      
      
  // }
    const drawVideo = () => {
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      
      requestAnimationFrame(drawVideo);
    };

    video.addEventListener('play', () => {
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
     // wavesurfer.media=video
    
      drawVideo();
    });

    return () => {
      video.removeEventListener('play', () => {});
     // WaveSurfer.destroy();
      

    };

    
  }, [currentVideoSource]);

  




  const handleChange=async(e)=>{
    const canvas = canvasRef.current;

   

    setChanging(true)
    const  file=e.target.files[0];
console.log(file);
      videoRef.current.crossOrigin='anonymous'
     if(file)
     {


      
      var URL = window.URL || window.webkitURL 
    
      const videoUrl=  URL.createObjectURL(file);
      //console.log(videoUrl) 
       setCurrentVideoSource(videoUrl);
     
       setChanging(false);

     }
   if(currentVideoSource)
   {
    const audio= await hasAudio(videoRef.current)
    console.log(audio)
   }
     
  }
  const handlePlay=(e)=>{
      if(playing){
        setPlaying(false)
        videoRef.current.pause()
      }
      else{
        setPlaying(true)
        videoRef.current.play()
      }
  }

 
  return (
    <div className='player'>
      <div className="inputFile">
          <input ref={inputRef} type="file"
          accept='video/*' 
          onChange={handleChange}/>
          
        </div>
           
           <div className="container">

            <div>
            <canvas
            
            onMouseOver={handleCanvasHover}
          
              crossOrigin='anonymous' ref={canvasRef} style={{width:'600px',height:'500px'}}></canvas>
      <video id='video' crossOrigin='anonymous' src={currentVideoSource} ref={videoRef} autoPlay={true} controls={true} style={{display:'none'}}  >
       
       
      </video>
      < div className='playBtn'
        >
          {currentVideoSource && playing ? <img  style={{display:showPlayButton?'block':'none'}}  onClick={handlePlay} src={Pause}  />:<img  style={{display:showPlayButton?'block':'none'}} onClick={handlePlay} src={Play}/> }
          </div>
          
            </div>
         
         <div className='meta-container'>
         {
      !changing && metaData && <Meta obj={metaData} />
    }

      
         </div>
    
           </div>
     
     {
       !changing && <Waveform media={videoRef.current} src={currentVideoSource} vidRef={videoRef}/> 
     }
    
  
    </div>
  );
};

export default VideoPlayer;

