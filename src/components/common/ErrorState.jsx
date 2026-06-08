const ErrorState = ({ message = "Une erreur est survenue", onRetry }) => {
  return (
    <div className="text-center py-12 bg-red-50 rounded-xl">
      <div className="text-5xl mb-4">⚠️</div>
      <h3 className="text-lg font-medium text-red-700 mb-2">Erreur</h3>
      <p className="text-red-600 mb-4">{message}</p>
      {onRetry && (
        <button onClick={onRetry} className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition">
          Réessayer
        </button>
      )}
    </div>
  )
}

export default ErrorState