import Plot from 'react-plotly.js'

const SilhouettePlot = ({ silhouetteScores, clusterLabels }) => {
  if (!silhouetteScores || silhouetteScores.length === 0) {
    return <div className="text-gray-500 text-center py-8">Données non disponibles</div>
  }

  const uniqueClusters = [...new Set(clusterLabels)].sort()
  const traces = uniqueClusters.map(cluster => ({
    y: silhouetteScores.filter((_, i) => clusterLabels[i] === cluster),
    type: 'box',
    name: `Cluster ${cluster}`,
    boxmean: 'sd',
    marker: { color: '#3b82f6' }
  }))

  const layout = {
    title: 'Score de silhouette par cluster',
    yaxis: { title: 'Coefficient de silhouette', gridcolor: '#e5e7eb', range: [-1, 1] },
    xaxis: { title: 'Clusters', gridcolor: '#e5e7eb' },
    height: 450,
    template: 'plotly_white'
  }

  return <Plot data={traces} layout={layout} style={{ width: '100%', height: '100%' }} useResizeHandler />
}

export default SilhouettePlot