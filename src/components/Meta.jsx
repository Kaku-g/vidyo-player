import React from 'react'

const Meta = ({obj}) => {
  return (
    <div className='meta' style={{width:'200px',height:'400px',}}>
        <h3>Metadata</h3>
        <div>
            Duration: {Math.round(obj[0]/60,4)}min
        </div>
        <div>
            Width: {obj[1]}px
        </div>
        <div>
            Height: {obj[2]}px
        </div>
    </div>
  )
}

export default Meta