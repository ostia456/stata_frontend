const MissingValuesTable = ({ missingColumns, totalRows }) => {
  if (!missingColumns || Object.keys(missingColumns).length === 0) {
    return <p className="text-gray-500 text-center py-8"> Aucune valeur manquante détectée</p>
  }

  const sortedColumns = Object.entries(missingColumns).sort(
    (a, b) => b[1].missing_percentage - a[1].missing_percentage
  )

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="bg-gray-50 border-b">
            <th className="text-left py-3 px-4 font-semibold">Colonne</th>
            <th className="text-right py-3 px-4 font-semibold">Valeurs manquantes</th>
            <th className="text-right py-3 px-4 font-semibold">Pourcentage</th>
            <th className="text-left py-3 px-4 font-semibold">Recommandation</th>
          </tr>
        </thead>
        <tbody>
          {sortedColumns.map(([col, info]) => {
            let recommendation = ''
            let badgeClass = ''
            
            if (info.missing_percentage > 50) {
              recommendation = ' Supprimer la colonne'
              badgeClass = 'text-red-700 bg-red-100'
            } else if (info.missing_percentage > 30) {
              recommendation = ' Imputation avancée'
              badgeClass = 'text-orange-700 bg-orange-100'
            } else if (info.missing_percentage > 10) {
              recommendation = ' Imputation simple'
              badgeClass = 'text-yellow-700 bg-yellow-100'
            } else {
              recommendation = ' Peu d\'impact'
              badgeClass = 'text-green-700 bg-green-100'
            }

            return (
              <tr key={col} className="border-b hover:bg-gray-50">
                <td className="py-2 px-4 font-medium">{col}</td>
                <td className="text-right py-2 px-4">{info.missing_count}</td>
                <td className="text-right py-2 px-4">
                  <div className="flex items-center justify-end gap-2">
                    <span>{info.missing_percentage}%</span>
                    <div className="w-24 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-red-500 rounded-full"
                        style={{ width: `${Math.min(info.missing_percentage, 100)}%` }}
                      />
                    </div>
                  </div>
                </td>
                <td className="py-2 px-4">
                  <span className={`px-2 py-1 rounded-full text-xs ${badgeClass}`}>
                    {recommendation}
                  </span>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

export default MissingValuesTable