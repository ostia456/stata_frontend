import { useState } from 'react'
import Plot from 'react-plotly.js'

const TargetFeatureAnalysis = ({ targetData, featureData, targetName, featureName, featureType }) => {
  const [viewType, setViewType] = useState('auto')

  if (!targetData || !featureData || targetData.length === 0) {
    return <div className="text-gray-500 text-center py-8">Données non disponibles</div>
  }

  const cleanData = []
  for (let i = 0; i < targetData.length; i++) {
    if (targetData[i] !== null && targetData[i] !== undefined && featureData[i] !== null && featureData[i] !== undefined) {
      cleanData.push({ target: targetData[i], feature: featureData[i] })
    }
  }

  if (cleanData.length === 0) {
    return <div className="text-gray-500 text-center py-4">Aucune donnée valide</div>
  }

  const targetUnique = [...new Set(cleanData.map(d => d.target))].sort()
  const isBinaryTarget = targetUnique.length === 2
  const isNumericFeature = featureType === 'numeric'

  const determineBestChart = () => {
    if (isBinaryTarget && isNumericFeature) return 'boxplot'
    if (isBinaryTarget && !isNumericFeature) return 'bar'
    if (!isBinaryTarget && isNumericFeature) return 'scatter'
    return 'auto'
  }

  const chartType = viewType === 'auto' ? determineBestChart() : viewType

  const renderScatterPlot = () => {
    const maxFeature = Math.max(...cleanData.map(d => d.feature))
    const minFeature = Math.min(...cleanData.map(d => d.feature))
    const maxTarget = Math.max(...cleanData.map(d => d.target))
    const minTarget = Math.min(...cleanData.map(d => d.target))

    const trace = {
      x: cleanData.map(d => d.feature),
      y: cleanData.map(d => d.target),
      mode: 'markers',
      type: 'scatter',
      marker: { color: '#3b82f6', size: 8, opacity: 0.6 },
      name: 'Observations',
      hovertemplate: `${featureName}: %{x}<br>${targetName}: %{y}<extra></extra>`
    }

    const layout = {
      title: `${featureName} vs ${targetName}`,
      xaxis: { title: featureName, gridcolor: '#e5e7eb', showline: true, linecolor: '#94a3b8' },
      yaxis: { title: targetName, gridcolor: '#e5e7eb', showline: true, linecolor: '#94a3b8' },
      height: 400,
      template: 'plotly_white',
      plot_bgcolor: '#ffffff'
    }

    return <Plot data={[trace]} layout={layout} style={{ width: '100%', height: '100%' }} useResizeHandler />
  }

  const renderBoxplot = () => {
    const traces = targetUnique.map(targetVal => {
      const values = cleanData.filter(d => d.target === targetVal).map(d => d.feature)
      return {
        y: values,
        name: `${targetName} = ${targetVal}`,
        type: 'box',
        boxmean: 'sd',
        marker: { color: '#3b82f6', size: 4, outliercolor: '#ef4444' },
        boxpoints: 'suspectedoutliers',
        whiskerwidth: 0.5,
        line: { width: 2, color: '#2563eb' }
      }
    })

    const layout = {
      title: `Distribution de ${featureName} selon ${targetName}`,
      yaxis: { title: featureName, gridcolor: '#e5e7eb', showline: true, linecolor: '#94a3b8' },
      xaxis: { title: targetName, gridcolor: '#e5e7eb', showline: true, linecolor: '#94a3b8', tickangle: -45 },
      height: 450,
      template: 'plotly_white',
      plot_bgcolor: '#ffffff',
      boxmode: 'group'
    }

    return <Plot data={traces} layout={layout} style={{ width: '100%', height: '100%' }} useResizeHandler />
  }

  const renderBarChart = () => {
    const groups = {}
    const featureValues = [...new Set(cleanData.map(d => d.feature))].sort()

    targetUnique.forEach(t => {
      groups[t] = featureValues.map(f => cleanData.filter(d => d.target === t && d.feature === f).length)
    })

    const traces = targetUnique.map((targetVal, idx) => ({
      x: featureValues,
      y: groups[targetVal],
      name: `${targetName} = ${targetVal}`,
      type: 'bar',
      marker: { color: idx === 0 ? '#3b82f6' : '#ef4444' }
    }))

    const layout = {
      title: `Distribution de ${featureName} par ${targetName}`,
      xaxis: { title: featureName, tickangle: -45, gridcolor: '#e5e7eb' },
      yaxis: { title: 'Nombre d\'observations', gridcolor: '#e5e7eb' },
      height: 400,
      template: 'plotly_white',
      barmode: 'group'
    }

    return <Plot data={traces} layout={layout} style={{ width: '100%', height: '100%' }} useResizeHandler />
  }

  const renderGroupedBarChart = () => {
    const uniqueFeatures = [...new Set(cleanData.map(d => d.feature))].slice(0, 10)
    const traces = targetUnique.map((targetVal, idx) => ({
      x: uniqueFeatures,
      y: uniqueFeatures.map(f => cleanData.filter(d => d.target === targetVal && d.feature === f).length),
      name: `${targetName} = ${targetVal}`,
      type: 'bar',
      marker: { color: idx === 0 ? '#3b82f6' : idx === 1 ? '#ef4444' : '#10b981' }
    }))

    const layout = {
      title: `Répartition de ${featureName} par ${targetName}`,
      xaxis: { title: featureName, tickangle: -45, gridcolor: '#e5e7eb' },
      yaxis: { title: 'Effectif', gridcolor: '#e5e7eb' },
      height: 400,
      template: 'plotly_white',
      barmode: 'group'
    }

    return <Plot data={traces} layout={layout} style={{ width: '100%', height: '100%' }} useResizeHandler />
  }

  const renderLineChart = () => {
    const sortedByFeature = [...cleanData].sort((a, b) => a.feature - b.feature)
    const grouped = []
    const step = Math.ceil(sortedByFeature.length / 20)

    for (let i = 0; i < sortedByFeature.length; i += step) {
      const slice = sortedByFeature.slice(i, i + step)
      const avgTarget = slice.reduce((sum, d) => sum + d.target, 0) / slice.length
      grouped.push({ feature: slice[0].feature, target: avgTarget })
    }

    const trace = {
      x: grouped.map(g => g.feature),
      y: grouped.map(g => g.target),
      mode: 'lines+markers',
      type: 'scatter',
      marker: { color: '#3b82f6', size: 6 },
      line: { color: '#2563eb', width: 2 },
      name: 'Tendance'
    }

    const layout = {
      title: `Évolution de ${targetName} selon ${featureName}`,
      xaxis: { title: featureName, gridcolor: '#e5e7eb', showline: true },
      yaxis: { title: targetName, gridcolor: '#e5e7eb', showline: true },
      height: 400,
      template: 'plotly_white'
    }

    return <Plot data={[trace]} layout={layout} style={{ width: '100%', height: '100%' }} useResizeHandler />
  }

  const renderHistogram = () => {
    const trace = {
      x: cleanData.map(d => d.feature),
      type: 'histogram',
      marker: { color: '#3b82f6', opacity: 0.7 },
      nbinsx: 25,
      name: featureName
    }

    const layout = {
      title: `Distribution de ${featureName}`,
      xaxis: { title: featureName, gridcolor: '#e5e7eb', showline: true },
      yaxis: { title: 'Fréquence', gridcolor: '#e5e7eb', showline: true },
      height: 400,
      template: 'plotly_white',
      bargap: 0.05
    }

    return <Plot data={[trace]} layout={layout} style={{ width: '100%', height: '100%' }} useResizeHandler />
  }

  return (
    <div className="border rounded-xl p-4 bg-white shadow-sm">
      <div className="flex justify-between items-center mb-3">
        <h3 className="font-semibold text-gray-800">
          {featureName} ↔ {targetName}
        </h3>
        <select
          value={viewType}
          onChange={(e) => setViewType(e.target.value)}
          className="text-xs border rounded px-2 py-1 bg-gray-50"
        >
          <option value="auto">Auto</option>
          <option value="scatter">Nuage de points</option>
          <option value="boxplot">Boxplot</option>
          <option value="bar">Diagramme à barres</option>
          <option value="groupedBar">Diagramme groupé</option>
          <option value="line">Courbe</option>
          <option value="histogram">Histogramme</option>
        </select>
      </div>

      {chartType === 'scatter' && renderScatterPlot()}
      {chartType === 'boxplot' && renderBoxplot()}
      {chartType === 'bar' && renderBarChart()}
      {chartType === 'groupedBar' && renderGroupedBarChart()}
      {chartType === 'line' && renderLineChart()}
      {chartType === 'histogram' && renderHistogram()}
    </div>
  )
}

export default TargetFeatureAnalysis