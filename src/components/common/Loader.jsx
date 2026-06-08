const Loader = ({ size = "medium", text = "Chargement..." }) => {
  const sizes = {
    small: "h-6 w-6",
    medium: "h-12 w-12",
    large: "h-16 w-16"
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh]">
      <div className={`${sizes[size]} border-4 border-gray-200 border-t-blue-600 rounded-full animate-spin mb-4`}></div>
      <p className="text-gray-500 animate-pulse">{text}</p>
    </div>
  )
}

export default Loader