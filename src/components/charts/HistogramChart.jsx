import Plot from 'react-plotly.js'

const HistogramWithDensity = ({ data, columnName }) => {
  if (!data || data.length === 0) {
    return <div className="text-gray-500 text-center py-8">Données non disponibles</div>
  }

  const cleanData = data.filter(v => v !== null && v !== undefined)

  if (cleanData.length === 0) {
    return <div className="text-gray-500 text-center py-8">Aucune donnée valide</div>
  }

  const histTrace = {
    x: cleanData,
    type: 'histogram',
    marker: { color: '#3b82f6', opacity: 0.6 },
    nbinsx: 30,
    name: 'Histogramme',
    histnorm: 'probability density'
  }

  const densityTrace = {
    x: cleanData,
    type: 'histogram',
    cumulative: { enabled: false },
    histnorm: 'probability density',
    marker: { color: '#ef4444' },
    name: 'Densité',
    nbinsx: 50
  }

  const layout = {
    title: {
      text: `Distribution de ${columnName} avec courbe de densité`,
      font: { size: 14, weight: 'bold' }
    },
    xaxis: { 
      title: { text: columnName, font: { size: 12 } },
      gridcolor: '#e5e7eb',
      showline: true,
      linecolor: '#94a3b8'
    },
    yaxis: { 
      title: { text: 'Densité', font: { size: 12 } },
      gridcolor: '#e5e7eb',
      showline: true,
      linecolor: '#94a3b8'
    },
    height: 450,
    template: 'plotly_white',
    plot_bgcolor: '#ffffff',
    paper_bgcolor: '#ffffff',
    bargap: 0.05,
    margin: { t: 50, l: 60, r: 20, b: 60 }
  }

  return <Plot data={[histTrace, densityTrace]} layout={layout} style={{ width: '100%', height: '100%' }} useResizeHandler />
}

export default HistogramWithDensity