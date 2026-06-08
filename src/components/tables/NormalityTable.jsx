const NormalityTable = ({ normality }) => {
  if (!normality || Object.keys(normality).length === 0) {
    return <p className="text-gray-500 text-center py-8">Aucune donnée sur la normalité</p>
  }

  const entries = Object.entries(normality)

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="bg-gray-50 border-b">
            <th className="text-left py-3 px-4 font-semibold">Colonne</th>
            <th className="text-right py-3 px-4 font-semibold">P-value</th>
            <th className="text-left py-3 px-4 font-semibold">Distribution</th>
            <th className="text-left py-3 px-4 font-semibold">Recommandation</th>
          </tr>
        </thead>
        <tbody>
          {entries.map(([col, result]) => {
            const isNormal = result.is_normal
            const pValue = result.p_value

            return (
              <tr key={col} className="border-b hover:bg-gray-50">
                <td className="py-2 px-4 font-medium">{col}</td>
                <td className="text-right py-2 px-4">
                  {pValue ? (
                    <span className="font-mono">{pValue.toFixed(6)}</span>
                  ) : '-'}
                </td>
                <td className="py-2 px-4">
                  {isNormal ? (
                    <span className="px-2 py-1 rounded-full text-xs bg-green-100 text-green-700"> Normale</span>
                  ) : (
                    <span className="px-2 py-1 rounded-full text-xs bg-red-100 text-red-700"> Non normale</span>
                  )}
                </td>
                <td className="py-2 px-4 text-gray-600">
                  {result.recommendation || (isNormal ? 'Aucune transformation nécessaire' : 'Envisager une transformation')}
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

export default NormalityTable