import { FaMessage } from "react-icons/fa6"

const SpecialInstruction = () => {
  return (
    <div className="w-full  border bg-stone-800 border-stone-600/20 p-4 shadow-md rounded-2xl">
        <h1 className="text-xl font-medium text-white flex items-center gap-2">
        <FaMessage size={20} />
        Special Instructions
        </h1>
        <textarea
             rows={3}
            placeholder="Add any special instructions for your order here..." className="w-full text-white mt-2 p-3 rounded-lg border border-stone-300 focus:outline-none focus:ring-1 focus:ring-orange-400/80"/>
    </div>
  )
}

export default SpecialInstruction