import { useState } from 'react'

const Tooltip = ({ children, text, position = "top" }) => {
  const [visible, setVisible] = useState(false)

  const positions = {
    top: "bottom-full left-1/2 -translate-x-1/2 mb-2",
    bottom: "top-full left-1/2 -translate-x-1/2 mt-2",
    left: "right-full top-1/2 -translate-y-1/2 mr-2",
    right: "left-full top-1/2 -translate-y-1/2 ml-2"
  }

  return (
    <div className="relative inline-block" onMouseEnter={() => setVisible(true)} onMouseLeave={() => setVisible(false)}>
      {children}
      {visible && (
        <div className={`absolute z-50 px-2 py-1 text-xs text-white bg-gray-900 rounded whitespace-nowrap ${positions[position]}`}>
          {text}
          <div className="absolute w-2 h-2 bg-gray-900 rotate-45" style={{ [position]: "-4px", left: "50%", transform: "translateX(-50%)" }} />
        </div>
      )}
    </div>
  )
}

export default Tooltip