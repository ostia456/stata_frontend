import Plot from 'react-plotly.js'

const BoxplotChart = ({ data, columnName }) => {
  if (!data || data.length === 0) {
    return <div className="text-gray-500 text-center py-8">Données non disponibles</div>
  }

  const cleanData = data.filter(v => v !== null && v !== undefined)

  if (cleanData.length === 0) {
    return <div className="text-gray-500 text-center py-8">Aucune donnée valide</div>
  }

  const trace = {
    y: cleanData,
    type: 'box',
    name: columnName,
    boxmean: 'sd',
    marker: { color: '#3b82f6', size: 4, outliercolor: '#ef4444' },
    boxpoints: 'suspectedoutliers',
    jitter: 0.3,
    pointpos: -1.8,
    whiskerwidth: 0.5,
    fillcolor: '#93c5fd',
    line: { width: 2, color: '#2563eb' }
  }

  const layout = {
    title: {
      text: `Distribution de ${columnName}`,
      font: { size: 14, weight: 'bold' }
    },
    yaxis: { 
      title: { text: columnName, font: { size: 12 } },
      gridcolor: '#e5e7eb',
      gridwidth: 1,
      zeroline: true,
      zerolinecolor: '#cbd5e1',
      zerolinewidth: 1,
      showline: true,
      linecolor: '#94a3b8',
      linewidth: 1,
      ticks: 'outside',
      ticklen: 5,
      tickcolor: '#94a3b8'
    },
    xaxis: { 
      showticklabels: false, 
      showgrid: false,
      showline: true,
      linecolor: '#94a3b8',
      linewidth: 1,
      title: { text: 'Variable', font: { size: 12 } }
    },
    height: 450,
    width: 500,
    template: 'plotly_white',
    hovermode: 'closest',
    plot_bgcolor: '#ffffff',
    paper_bgcolor: '#ffffff',
    margin: { t: 50, l: 60, r: 20, b: 50 }
  }

  const config = {
    responsive: true,
    displayModeBar: true,
    modeBarButtonsToRemove: ['lasso2d', 'select2d']
  }

  return <Plot data={[trace]} layout={layout} config={config} style={{ width: '100%', height: '100%' }} useResizeHandler />
}

export default BoxplotChart