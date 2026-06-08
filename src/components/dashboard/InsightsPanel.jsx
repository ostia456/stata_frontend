import { useState } from 'react'

const InsightsPanel = ({ insights, quality, mlDetection }) => {
  const [expanded, setExpanded] = useState(null)

  const insightCategories = [
    { key: 'missing_insights', title: ' Valeurs manquantes', icon: '', color: 'yellow' },
    { key: 'numeric_insights', title: ' Distribution', icon: '', color: 'blue' },
    { key: 'correlation_insights', title: ' Corrélations', icon: '', color: 'green' }
  ]

  const getColorClasses = (color) => {
    switch(color) {
      case 'yellow': return { bg: 'bg-yellow-50', border: 'border-yellow-500', text: 'text-yellow-800' }
      case 'blue': return { bg: 'bg-blue-50', border: 'border-blue-500', text: 'text-blue-800' }
      case 'green': return { bg: 'bg-green-50', border: 'border-green-500', text: 'text-green-800' }
      default: return { bg: 'bg-gray-50', border: 'border-gray-500', text: 'text-gray-800' }
    }
  }

  return (
    <div className="space-y-4">
      <div className="grid md:grid-cols-3 gap-4 mb-6">
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl p-4 text-white">
          <div className="text-2xl font-bold">{quality?.total_score || 0}%</div>
          <div className="text-sm opacity-90">Score qualité</div>
          <div className="text-xs mt-1">Grade {quality?.grade || 'N/A'}</div>
        </div>
        <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-xl p-4 text-white">
          <div className="text-2xl font-bold">{mlDetection?.problem_type?.type || 'Non détecté'}</div>
          <div className="text-sm opacity-90">Type de problème ML</div>
          <div className="text-xs mt-1">Cible: {mlDetection?.target_column || 'N/A'}</div>
        </div>
        <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl p-4 text-white">
          <div className="text-2xl font-bold capitalize">{mlDetection?.ready_for_ml?.ready_level || 'N/A'}</div>
          <div className="text-sm opacity-90">Préparation ML</div>
          <div className="text-xs mt-1">{mlDetection?.ready_for_ml?.issues?.length || 0} problèmes détectés</div>
        </div>
      </div>

      {insightCategories.map(cat => {
        const insightsList = insights[cat.key]
        if (!insightsList || insightsList.length === 0) return null
        
        const colors = getColorClasses(cat.color)
        
        return (
          <div key={cat.key} className="border rounded-xl overflow-hidden">
            <div 
              className={`${colors.bg} p-3 cursor-pointer flex justify-between items-center`}
              onClick={() => setExpanded(expanded === cat.key ? null : cat.key)}
            >
              <span className="font-semibold">{cat.icon} {cat.title}</span>
              <span>{expanded === cat.key ? '▲' : '▼'}</span>
            </div>
            {(expanded === cat.key || insightsList.length <= 3) && (
              <div className="p-3 space-y-2">
                {insightsList.map((insight, idx) => (
                  <div key={idx} className={`${colors.bg} p-3 rounded-lg border-l-4 ${colors.border}`}>
                    <p className={colors.text}>{insight}</p>
                  </div>
                ))}
              </div>
            )}
            {expanded !== cat.key && insightsList.length > 3 && (
              <div className="p-3 text-gray-500 text-sm">+ {insightsList.length - 3} autres insights</div>
            )}
          </div>
        )
      })}
    </div>
  )
}

export default InsightsPanel