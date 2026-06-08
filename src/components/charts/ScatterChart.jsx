const ScatterChart = ({ dataX, dataY, colX, colY }) => {
  if (!dataX || !dataY || dataX.length === 0 || dataY.length === 0) {
    return <div className="text-gray-500 text-center py-4">Données non disponibles</div>
  }

  const maxX = Math.max(...dataX)
  const minX = Math.min(...dataX)
  const maxY = Math.max(...dataY)
  const minY = Math.min(...dataY)

  const points = dataX.map((x, i) => ({ x, y: dataY[i] })).filter(p => p.x !== null && p.y !== null)

  return (
    <div>
      <h4 className="font-medium text-gray-700 mb-2">Corrélation : {colX} ↔ {colY}</h4>
      <div className="relative h-64 bg-gray-50 rounded-lg p-4">
        <div className="relative w-full h-full">
          {points.map((point, idx) => (
            <div
              key={idx}
              className="absolute w-1.5 h-1.5 bg-blue-500 rounded-full"
              style={{
                left: `${((point.x - minX) / (maxX - minX)) * 100}%`,
                bottom: `${((point.y - minY) / (maxY - minY)) * 100}%`
              }}
            />
          ))}
        </div>
        <div className="absolute bottom-2 left-2 text-xs text-gray-500">{minX.toFixed(1)}</div>
        <div className="absolute bottom-2 right-2 text-xs text-gray-500">{maxX.toFixed(1)}</div>
        <div className="absolute top-2 left-2 text-xs text-gray-500">{maxY.toFixed(1)}</div>
        <div className="absolute bottom-2 left-2 text-xs text-gray-500 -rotate-90 origin-left ml-8">{minY.toFixed(1)}</div>
      </div>
    </div>
  )
}

export default ScatterChart