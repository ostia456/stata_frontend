const CorrelationTable = ({ correlations }) => {
  const strongCorrs = correlations?.pearson?.strong_correlations || []
  
  if (strongCorrs.length === 0) {
    return <p className="text-gray-500 text-center py-8">Aucune corrélation forte détectée</p>
  }

  const sortedCorrs = [...strongCorrs].sort((a, b) => Math.abs(b.correlation) - Math.abs(a.correlation))

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="bg-gray-50 border-b">
            <th className="text-left py-3 px-4 font-semibold">Variable A</th>
            <th className="text-left py-3 px-4 font-semibold">Variable B</th>
            <th className="text-right py-3 px-4 font-semibold">Corrélation</th>
            <th className="text-left py-3 px-4 font-semibold">Interprétation</th>
          </tr>
        </thead>
        <tbody>
          {sortedCorrs.map((corr, idx) => {
            const isPositive = corr.correlation > 0
            const absValue = Math.abs(corr.correlation)
            let strength = ''
            if (absValue > 0.9) strength = 'très forte'
            else if (absValue > 0.7) strength = 'forte'
            else if (absValue > 0.5) strength = 'modérée'
            else strength = 'faible'
            
            const direction = isPositive ? 'positive' : 'négative'
            const badgeClass = isPositive ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'

            return (
              <tr key={idx} className="border-b hover:bg-gray-50">
                <td className="py-2 px-4 font-medium">{corr.var1}</td>
                <td className="py-2 px-4 font-medium">{corr.var2}</td>
                <td className="text-right py-2 px-4">
                  <span className={`px-2 py-1 rounded text-sm ${badgeClass}`}>
                    {corr.correlation > 0 ? '+' : ''}{corr.correlation}
                  </span>
                </td>
                <td className="py-2 px-4 text-gray-600">
                  Corrélation {strength} {direction}
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

export default CorrelationTable