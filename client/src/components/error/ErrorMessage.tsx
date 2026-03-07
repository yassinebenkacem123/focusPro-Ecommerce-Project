import type { JSX } from 'react'
const ErrorMessage = ({message}:{message:string}):JSX.Element => {
  if(message.includes("404")){
    return <div className="text-center text-2xl text-stone-800 font-medium">Resource not found.</div>
  }
  return (
    <div>Error: {message}</div>
  )
}

export default ErrorMessage