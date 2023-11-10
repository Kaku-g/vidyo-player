import React, { useEffect,useState } from 'react';
import WaveSurfer from 'wavesurfer.js'






const Waveform = ({media,vidRef,src}) => {

    const [wavesurfer,setWavesurfer]=useState(null)
     
    useEffect(()=>{

let ws=null;
        if(media&&src){
         ws=  WaveSurfer.create({
            container: '#waveform',
            // waveColor: '#4F4A85',
            // progressColor: '#383351',
            waveColor: 'rgb(200, 0, 200)',
            progressColor: 'rgb(100, 0, 100)',

           // media:document.querySelector('video')
           media:document.querySelector('#video'),
          
            
          })

          setWavesurfer(ws);
        }

     
       
    

    },[media])


  



   
  
   
  return (
    <div
    className='waveform'
    id='waveform' style={{width:'600px',height:'400px'}}></div>
  )
}

export default Waveform