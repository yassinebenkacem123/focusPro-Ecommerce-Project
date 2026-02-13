import React from 'react'

const LineWithDot = () => {
  return (
    <div className='flex items-center flex-row w-full'>
        <div className='w-3 h-3 bg-stone-300/70 rounded-full'/>
        <div className='w-full h-0.5 bg-stone-300/70'/>
    </div>
  )
}

export default LineWithDot