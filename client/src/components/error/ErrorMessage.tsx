import type { JSX } from 'react'
const ErrorMessage = ({message}:{message:string}):JSX.Element => {
  return (
    <div>Error: {message}</div>
  )
}

export default ErrorMessage