const StatisticsTable = ({ statistics }) => {
  if (!statistics || Object.keys(statistics).length === 0) {
    return <p className="text-gray-500 text-center py-8">Aucune donnée statistique disponible</p>
  }

  const columns = Object.keys(statistics)
  if (columns.length === 0) return null

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="bg-gray-50 border-b">
            <th className="text-left py-3 px-4 font-semibold">Colonne</th>
            <th className="text-right py-3 px-4 font-semibold">Moyenne</th>
            <th className="text-right py-3 px-4 font-semibold">Médiane</th>
            <th className="text-right py-3 px-4 font-semibold">Écart-type</th>
            <th className="text-right py-3 px-4 font-semibold">Min</th>
            <th className="text-right py-3 px-4 font-semibold">Max</th>
            <th className="text-right py-3 px-4 font-semibold">Asymétrie</th>
          </tr>
        </thead>
        <tbody>
          {columns.map((col) => {
            const stats = statistics[col]
            return (
              <tr key={col} className="border-b hover:bg-gray-50">
                <td className="py-2 px-4 font-medium">{col}</td>
                <td className="text-right py-2 px-4">{stats.mean?.toFixed(2) || '-'}</td>
                <td className="text-right py-2 px-4">{stats.median?.toFixed(2) || '-'}</td>
                <td className="text-right py-2 px-4">{stats.std?.toFixed(2) || '-'}</td>
                <td className="text-right py-2 px-4">{stats.min?.toFixed(2) || '-'}</td>
                <td className="text-right py-2 px-4">{stats.max?.toFixed(2) || '-'}</td>
                <td className="text-right py-2 px-4">
                  <span className={Math.abs(stats.skewness || 0) > 1 ? 'text-orange-600 font-medium' : ''}>
                    {stats.skewness?.toFixed(3) || '-'}
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

export default StatisticsTable