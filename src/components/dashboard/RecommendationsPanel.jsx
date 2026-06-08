const RecommendationsPanel = ({ recommendations, mlRecommendations }) => {
  const allRecs = [...(recommendations || []), ...(mlRecommendations || [])]
  
  if (allRecs.length === 0) {
    return <p className="text-gray-500 text-center py-8">Aucune recommandation disponible</p>
  }

  const priorityOrder = { high: 0, medium: 1, low: 2 }
  const sortedRecs = [...allRecs].sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority])

  const getPriorityBadge = (priority) => {
    switch(priority) {
      case 'high': return <span className="px-2 py-1 rounded-full text-xs bg-red-100 text-red-700">Haute</span>
      case 'medium': return <span className="px-2 py-1 rounded-full text-xs bg-yellow-100 text-yellow-700">Moyenne</span>
      default: return <span className="px-2 py-1 rounded-full text-xs bg-blue-100 text-blue-700">Basse</span>
    }
  }

  return (
    <div className="space-y-3">
      {sortedRecs.map((rec, idx) => (
        <div key={idx} className="border rounded-lg p-4 hover:shadow-md transition">
          <div className="flex justify-between items-start mb-2">
            <h4 className="font-semibold text-gray-800">{rec.action}</h4>
            {getPriorityBadge(rec.priority)}
          </div>
          <p className="text-sm text-gray-600 mb-2">{rec.reason}</p>
          {rec.details && (
            <details className="text-xs text-gray-500 mt-2">
              <summary className="cursor-pointer">Voir le détail</summary>
              <pre className="mt-2 p-2 bg-gray-50 rounded overflow-x-auto">
                {typeof rec.details === 'string' ? rec.details : JSON.stringify(rec.details, null, 2)}
              </pre>
            </details>
          )}
        </div>
      ))}
    </div>
  )
}

export default RecommendationsPanel