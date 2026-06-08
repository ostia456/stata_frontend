import Plot from 'react-plotly.js'

const FeatureImportance = ({ correlations, targetColumn, columns }) => {
  if (!correlations || !targetColumn || !columns) {
    return <div className="text-gray-500 text-center py-8">Données non disponibles</div>
  }

  const importances = []
  for (const col of columns) {
    if (col !== targetColumn && correlations[col] && correlations[col][targetColumn]) {
      importances.push({
        feature: col,
        importance: Math.abs(correlations[col][targetColumn])
      })
    }
  }

  importances.sort((a, b) => b.importance - a.importance)

  const trace = {
    x: importances.map(i => i.importance),
    y: importances.map(i => i.feature),
    type: 'bar',
    orientation: 'h',
    marker: { color: '#3b82f6', gradient: { type: 'vertical' } },
    text: importances.map(i => i.importance.toFixed(3)),
    textposition: 'outside'
  }

  const layout = {
    title: `Importance des features (corrélation avec ${targetColumn})`,
    xaxis: { title: 'Corrélation absolue', gridcolor: '#e5e7eb' },
    yaxis: { title: 'Features', gridcolor: '#e5e7eb' },
    height: Math.max(400, importances.length * 30),
    template: 'plotly_white'
  }

  return <Plot data={[trace]} layout={layout} style={{ width: '100%', height: '100%' }} useResizeHandler />
}

export default FeatureImportance