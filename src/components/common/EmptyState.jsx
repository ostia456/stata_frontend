const EmptyState = ({ icon = "📭", title = "Aucune donnée", message = "Commencez par importer un fichier", action }) => {
  return (
    <div className="text-center py-12 bg-gray-50 rounded-xl">
      <div className="text-5xl mb-4">{icon}</div>
      <h3 className="text-lg font-medium text-gray-700 mb-2">{title}</h3>
      <p className="text-gray-500 mb-4">{message}</p>
      {action && (
        <button onClick={action.onClick} className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
          {action.label}
        </button>
      )}
    </div>
  )
}

export default EmptyState