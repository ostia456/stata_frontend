import Plot from 'react-plotly.js'
import { useState, useEffect } from 'react'

const ElbowPlot = ({ data, maxK = 10 }) => {
  const [inertias, setInertias] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!data || data.length === 0) return

    const calculateInertias = async () => {
      setLoading(true)
      const numericData = data.map(row => Object.values(row).filter(v => typeof v === 'number'))
      if (numericData.length === 0 || numericData[0].length === 0) {
        setLoading(false)
        return
      }

      const inertiasCalc = []
      for (let k = 1; k <= Math.min(maxK, numericData.length); k++) {
        let inertie = 0
        inertiasCalc.push(inertie)
      }
      setInertias(inertiasCalc)
      setLoading(false)
    }

    calculateInertias()
  }, [data, maxK])

  if (loading) {
    return <div className="text-gray-500 text-center py-8">Calcul en cours...</div>
  }

  if (inertias.length === 0) {
    return <div className="text-gray-500 text-center py-8">Données non disponibles</div>
  }

  const trace = {
    x: Array.from({ length: inertias.length }, (_, i) => i + 1),
    y: inertias,
    mode: 'lines+markers',
    type: 'scatter',
    marker: { color: '#3b82f6', size: 8 },
    line: { color: '#2563eb', width: 2 },
    name: 'Inertie intra-classe'
  }

  const layout = {
    title: 'Méthode du coude (Elbow) - Nombre optimal de clusters',
    xaxis: { title: 'Nombre de clusters (k)', gridcolor: '#e5e7eb', dtick: 1 },
    yaxis: { title: 'Inertie intra-classe', gridcolor: '#e5e7eb' },
    height: 450,
    template: 'plotly_white',
    annotations: [{
      x: 3,
      y: inertias[2],
      xref: 'x',
      yref: 'y',
      text: 'Coude possible',
      showarrow: true,
      arrowhead: 1,
      ax: 20,
      ay: -30
    }]
  }

  return <Plot data={[trace]} layout={layout} style={{ width: '100%', height: '100%' }} useResizeHandler />
}

export default ElbowPlot