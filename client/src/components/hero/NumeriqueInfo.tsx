import React from 'react'

const NumeriqueInfo = (): React.JSX.Element => {
  return (
    <div className='w-full justify-between flex mt-2'>
        <h2 className='text-2xl font-bold text-stone-900'>(01)</h2>
        <h2 className='text-2xl font-bold text-stone-900'>({new Date().getFullYear()})</h2>
    </div>
  )
}

export default NumeriqueInfo