import { useNavigate } from 'react-router-dom'

const HistoryCard = ({ analysis }) => {
  const navigate = useNavigate()

  const getGradeColor = (grade) => {
    switch(grade) {
      case 'A': return 'bg-green-100 text-green-700'
      case 'B': return 'bg-blue-100 text-blue-700'
      case 'C': return 'bg-yellow-100 text-yellow-700'
      default: return 'bg-red-100 text-red-700'
    }
  }

  return (
    <div className="border rounded-xl p-4 hover:shadow-md transition cursor-pointer" onClick={() => navigate(`/dashboard/${analysis.file_id}`)}>
      <div className="flex justify-between items-start mb-3">
        <div>
          <h3 className="font-semibold text-gray-800">{analysis.filename}</h3>
          <p className="text-xs text-gray-500">{new Date(analysis.timestamp).toLocaleString()}</p>
        </div>
        <div className={`px-2 py-1 rounded-full text-xs font-medium ${getGradeColor(analysis.quality_grade)}`}>
          Grade {analysis.quality_grade}
        </div>
      </div>
      <div className="flex justify-between text-sm text-gray-600">
        <span>{analysis.rows} lignes</span>
        <span>{analysis.columns} colonnes</span>
        <span>Score: {analysis.quality_score}/100</span>
      </div>
      <div className="mt-3 h-1 bg-gray-200 rounded-full overflow-hidden">
        <div className="h-full bg-blue-500 rounded-full" style={{ width: `${analysis.quality_score}%` }} />
      </div>
    </div>
  )
}

export default HistoryCard