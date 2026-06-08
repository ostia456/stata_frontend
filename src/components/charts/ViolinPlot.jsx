import Plot from 'react-plotly.js'

const ViolinPlot = ({ data, columnName, groupBy = null, groupName = null }) => {
  if (!data || data.length === 0) {
    return <div className="text-gray-500 text-center py-8">Données non disponibles</div>
  }

  const cleanData = data.filter(v => v !== null && v !== undefined)

  if (cleanData.length === 0) {
    return <div className="text-gray-500 text-center py-8">Aucune donnée valide</div>
  }

  let trace
  if (groupBy && groupName) {
    trace = {
      y: cleanData,
      type: 'violin',
      name: groupName,
      box: { visible: true },
      meanline: { visible: true },
      fillcolor: '#93c5fd',
      line: { color: '#2563eb', width: 1 }
    }
  } else {
    trace = {
      y: cleanData,
      type: 'violin',
      name: columnName,
      box: { visible: true },
      meanline: { visible: true },
      fillcolor: '#93c5fd',
      line: { color: '#2563eb', width: 1 }
    }
  }

  const layout = {
    title: `Distribution (Violin plot) de ${groupName || columnName}`,
    yaxis: { title: groupName || columnName, gridcolor: '#e5e7eb', showline: true },
    xaxis: { showticklabels: false, showgrid: false },
    height: 450,
    template: 'plotly_white'
  }

  return <Plot data={[trace]} layout={layout} style={{ width: '100%', height: '100%' }} useResizeHandler />
}

export default ViolinPlot