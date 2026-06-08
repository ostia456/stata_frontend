import Plot from 'react-plotly.js'
import { useState } from 'react'

const PairPlot = ({ data, columns }) => {
  const [selectedCols, setSelectedCols] = useState(columns.slice(0, 4))

  if (!data || !columns || columns.length < 2) {
    return <div className="text-gray-500 text-center py-8">Pas assez de colonnes pour un pair plot</div>
  }

  const traces = []
  for (let i = 0; i < selectedCols.length; i++) {
    for (let j = 0; j < selectedCols.length; j++) {
      if (i === j) {
        traces.push({
          x: data[selectedCols[i]],
          type: 'histogram',
          name: selectedCols[i],
          marker: { color: '#3b82f6' },
          xaxis: `x${i+1}`,
          yaxis: `y${i+1}`
        })
      } else {
        traces.push({
          x: data[selectedCols[j]],
          y: data[selectedCols[i]],
          type: 'scatter',
          mode: 'markers',
          marker: { color: '#3b82f6', size: 4, opacity: 0.6 },
          xaxis: `x${j+1}`,
          yaxis: `y${i+1}`,
          showlegend: false
        })
      }
    }
  }

  const layout = {
    title: 'Pair Plot - Matrice de dispersion',
    grid: { rows: selectedCols.length, columns: selectedCols.length, pattern: 'independent' },
    height: 800,
    width: 800,
    template: 'plotly_white'
  }

  return <Plot data={traces} layout={layout} style={{ width: '100%', height: '100%' }} useResizeHandler />
}

export default PairPlot