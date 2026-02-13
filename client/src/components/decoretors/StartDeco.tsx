import { GiStarShuriken } from 'react-icons/gi'
import type { StartDecoProps } from '../../lib/type';
import type {JSX} from "react";
const StartDeco = ({bgColor, startColor, startSize, position,padding}: StartDecoProps): JSX.Element => {
  return (
     <div className={`rounded-full ${startColor} ${bgColor} ${padding} ${position}`}>
        <GiStarShuriken size={startSize}/>
    </div>
  )
}

export default StartDeco