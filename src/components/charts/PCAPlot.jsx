import Plot from 'react-plotly.js'
import { useState, useEffect } from 'react'

const PCAPlot = ({ data, columns, targetColumn }) => {
  const [pcaData, setPcaData] = useState({ x: [], y: [], colors: [] })
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!data || !columns || columns.length < 2) return

    setLoading(true)
    // Simulation PCA (à remplacer par calcul réel)
    const numericData = columns.map(col => data[col] || [])
    const n = numericData[0]?.length || 0
    
    const pcaX = Array.from({ length: n }, () => Math.random() * 10 - 5)
    const pcaY = Array.from({ length: n }, () => Math.random() * 10 - 5)
    
    let colors = []
    if (targetColumn && data[targetColumn]) {
      const uniqueTargets = [...new Set(data[targetColumn])]
      colors = data[targetColumn].map(val => uniqueTargets.indexOf(val))
    } else {
      colors = Array(n).fill(0)
    }
    
    setPcaData({ x: pcaX, y: pcaY, colors })
    setLoading(false)
  }, [data, columns, targetColumn])

  if (loading) {
    return <div className="text-gray-500 text-center py-8">Calcul PCA en cours...</div>
  }

  if (pcaData.x.length === 0) {
    return <div className="text-gray-500 text-center py-8">Données non disponibles</div>
  }

  const trace = {
    x: pcaData.x,
    y: pcaData.y,
    mode: 'markers',
    type: 'scatter',
    marker: {
      color: pcaData.colors,
      colorscale: 'Viridis',
      size: 8,
      showscale: true,
      colorbar: { title: targetColumn || 'Groupe' }
    },
    text: targetColumn ? data[targetColumn] : null,
    hovertemplate: `PC1: %{x:.2f}<br>PC2: %{y:.2f}<br>${targetColumn ? targetColumn + ': %{text}' : ''}<extra></extra>`
  }

  const layout = {
    title: 'Analyse en Composantes Principales (PCA)',
    xaxis: { title: 'Première composante principale (PC1)', gridcolor: '#e5e7eb' },
    yaxis: { title: 'Deuxième composante principale (PC2)', gridcolor: '#e5e7eb' },
    height: 500,
    template: 'plotly_white'
  }

  return <Plot data={[trace]} layout={layout} style={{ width: '100%', height: '100%' }} useResizeHandler />
}

export default PCAPlot