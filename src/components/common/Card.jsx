const Card = ({ children, title, icon, className = "", hover = true }) => {
  return (
    <div className={`bg-white rounded-xl border border-gray-100 overflow-hidden ${hover ? "hover-lift" : ""} ${className}`}>
      {(title || icon) && (
        <div className="p-4 border-b border-gray-100 flex items-center gap-2">
          {icon && <span className="text-xl">{icon}</span>}
          {title && <h3 className="font-semibold text-gray-800">{title}</h3>}
        </div>
      )}
      <div className="p-4">{children}</div>
    </div>
  )
}

export default Card