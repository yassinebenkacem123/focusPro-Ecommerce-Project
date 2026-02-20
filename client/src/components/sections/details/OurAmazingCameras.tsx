import React from 'react'
import DisplayImazingCameras from './DisplayImazingCameras'
import RevealText from '../../../utils/RevealText'

const OurAmazingCameras = ():React.JSX.Element => {
  return (
    <div className='min-h-screen py-15 items-center  flex flex-col gap-6'>
        <RevealText as='h1' className='title-font text-center w-[70%] leading-24'>
            Our Exclusive Camera just for you         
        </RevealText>
        <DisplayImazingCameras />
    </div>
  )
}

export default OurAmazingCameras