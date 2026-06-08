import Plot from 'react-plotly.js'
import { useState, useEffect } from 'react'

// Fonction d'erreur inverse (approximation)
function erfinv(x) {
  const a = 0.147
  const sign = x < 0 ? -1 : 1
  const absX = Math.abs(x)
  
  const ln = Math.log(1 - absX * absX)
  const t = 2 / (Math.PI * a) + ln / 2
  const y = sign * Math.sqrt(Math.sqrt(t * t - ln / a) - t)
  
  return y
}

function inverseCDF(p) {
  return Math.sqrt(2) * erfinv(2 * p - 1)
}

const QQPlot = ({ data, columnName }) => {
  const [qqData, setQqData] = useState({ theoretical: [], observed: [] })

  useEffect(() => {
    if (!data || data.length === 0) return

    const cleanData = data.filter(v => v !== null && v !== undefined).sort((a, b) => a - b)
    if (cleanData.length < 3) return

    const n = cleanData.length
    const theoretical = []
    const observed = []

    for (let i = 0; i < n; i++) {
      const p = (i + 0.5) / n
      theoretical.push(inverseCDF(p))
      observed.push(cleanData[i])
    }

    setQqData({ theoretical, observed })
  }, [data])

  if (qqData.observed.length === 0) {
    return <div className="text-gray-500 text-center py-8">Données non disponibles</div>
  }

  const minTheo = Math.min(...qqData.theoretical)
  const maxTheo = Math.max(...qqData.theoretical)
  const minObs = Math.min(...qqData.observed)
  const maxObs = Math.max(...qqData.observed)

  const trace = {
    x: qqData.theoretical,
    y: qqData.observed,
    mode: 'markers',
    type: 'scatter',
    marker: { color: '#3b82f6', size: 6 },
    name: 'Quantiles observés',
    hovertemplate: 'Quantile théorique: %{x:.3f}<br>Quantile observé: %{y:.3f}<extra></extra>'
  }

  const lineTrace = {
    x: [minTheo, maxTheo],
    y: [minObs, maxObs],
    mode: 'lines',
    type: 'scatter',
    line: { color: '#ef4444', width: 2, dash: 'dash' },
    name: 'Référence normale'
  }

  const layout = {
    title: {
      text: `Q-Q Plot - Normalité de ${columnName}`,
      font: { size: 14 }
    },
    xaxis: { 
      title: 'Quantiles théoriques (normale)', 
      gridcolor: '#e5e7eb', 
      showline: true, 
      linecolor: '#94a3b8',
      zeroline: true,
      zerolinecolor: '#cbd5e1'
    },
    yaxis: { 
      title: `Quantiles observés (${columnName})`, 
      gridcolor: '#e5e7eb', 
      showline: true, 
      linecolor: '#94a3b8',
      zeroline: true,
      zerolinecolor: '#cbd5e1'
    },
    height: 450,
    template: 'plotly_white',
    plot_bgcolor: '#ffffff',
    paper_bgcolor: '#ffffff'
  }

  const config = {
    responsive: true,
    displayModeBar: true
  }

  return <Plot data={[trace, lineTrace]} layout={layout} config={config} style={{ width: '100%', height: '100%' }} useResizeHandler />
}

export default QQPlot