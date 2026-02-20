import { Link } from "react-router-dom"
import type { JSX } from "react";
const Logo = ({ size }: { size: string }): JSX.Element => {
  return (
    <Link to="." className={`text-stone-800 title-design font-bold  ${size} cursor-pointer `}>
        Focus
        <span className="text-orange-500">Pro</span>
    </Link>
  )
}

export default Logo