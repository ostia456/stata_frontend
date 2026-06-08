const MissingValuesChart = ({ missingData }) => {
  if (!missingData || Object.keys(missingData).length === 0) {
    return <div className="text-gray-500 text-center py-8">Aucune valeur manquante</div>
  }

  const columnsWithMissing = Object.entries(missingData).filter(
    ([, info]) => info.missing_count > 0
  )

  if (columnsWithMissing.length === 0) {
    return <div className="text-green-600 text-center py-8">✅ Aucune valeur manquante détectée</div>
  }

  return (
    <div className="space-y-3">
      {columnsWithMissing.map(([col, info]) => (
        <div key={col}>
          <div className="flex justify-between text-sm mb-1">
            <span className="font-medium">{col}</span>
            <span>{info.missing_count} manquants ({info.missing_percentage}%)</span>
          </div>
          <div className="h-6 bg-gray-200 rounded-full overflow-hidden">
            <div 
              className="h-full bg-red-500 rounded-full flex items-center justify-end pr-2 text-xs text-white"
              style={{ width: `${info.missing_percentage}%` }}
            >
              {info.missing_percentage > 15 && `${info.missing_percentage}%`}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default MissingValuesChart