const OutliersTable = ({ outliers }) => {
  if (!outliers || Object.keys(outliers).length === 0) {
    return <p className="text-gray-500 text-center py-8">Aucune donnée sur les outliers</p>
  }

  const entries = Object.entries(outliers).filter(
    ([, info]) => info.iqr?.outlier_count > 0
  )

  if (entries.length === 0) {
    return <p className="text-gray-500 text-center py-8"> Aucun outlier détecté</p>
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="bg-gray-50 border-b">
            <th className="text-left py-3 px-4 font-semibold">Colonne</th>
            <th className="text-right py-3 px-4 font-semibold">Outliers (IQR)</th>
            <th className="text-right py-3 px-4 font-semibold">Pourcentage</th>
            <th className="text-left py-3 px-4 font-semibold">Recommandation</th>
          </tr>
        </thead>
        <tbody>
          {entries.map(([col, info]) => {
            const percentage = info.iqr.outlier_percentage
            let recommendation = ''
            let badgeClass = ''
            
            if (percentage > 15) {
              recommendation = ' Traitement prioritaire'
              badgeClass = 'text-red-700 bg-red-100'
            } else if (percentage > 8) {
              recommendation = ' Traitement recommandé'
              badgeClass = 'text-orange-700 bg-orange-100'
            } else {
              recommendation = ' Acceptable'
              badgeClass = 'text-green-700 bg-green-100'
            }

            return (
              <tr key={col} className="border-b hover:bg-gray-50">
                <td className="py-2 px-4 font-medium">{col}</td>
                <td className="text-right py-2 px-4">{info.iqr.outlier_count}</td>
                <td className="text-right py-2 px-4">
                  <div className="flex items-center justify-end gap-2">
                    <span>{percentage}%</span>
                    <div className="w-24 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-orange-500 rounded-full"
                        style={{ width: `${Math.min(percentage * 2, 100)}%` }}
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

export default OutliersTable