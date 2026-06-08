import Plot from 'react-plotly.js'

const CorrelationHeatmap = ({ matrix, columns }) => {
  if (!matrix || !columns || columns.length === 0) {
    return <div className="text-gray-500 text-center py-8">Données de corrélation non disponibles</div>
  }

  const zValues = columns.map(row => 
    columns.map(col => {
      const val = matrix[row]?.[col]
      return val !== undefined ? val : 0
    })
  )

  const trace = {
    z: zValues,
    x: columns,
    y: columns,
    type: 'heatmap',
    colorscale: 'RdBu',
    zmid: 0,
    text: zValues.map(row => row.map(v => v.toFixed(2))),
    texttemplate: '%{text}',
    textfont: { size: 10 },
    hovertemplate: '%{x} ↔ %{y}<br>Corrélation: %{z:.3f}<extra></extra>'
  }

  const layout = {
    title: 'Matrice de corrélation',
    width: 600,
    height: 550,
    xaxis: { tickangle: -45 },
    yaxis: { autorange: 'reversed' },
    template: 'plotly_white'
  }

  return <Plot data={[trace]} layout={layout} style={{ width: '100%', height: '100%' }} useResizeHandler />
}

export default CorrelationHeatmap