import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import historyService from '../services/historyService'

const History = () => {
  const navigate = useNavigate()
  const [analyses, setAnalyses] = useState([])
  const [loading, setLoading] = useState(true)
  const [stats, setStats] = useState(null)

  useEffect(() => {
    loadHistory()
  }, [])

  const loadHistory = async () => {
    setLoading(true)
    try {
      const [historyRes, statsRes] = await Promise.all([
        historyService.getHistory(100),
        historyService.getHistoryStats()
      ])
      
      const analysesList = historyRes.analyses || []
      
      const uniqueByFilename = {}
      analysesList.forEach(analysis => {
        const filename = analysis.filename
        if (!uniqueByFilename[filename] || new Date(analysis.timestamp) > new Date(uniqueByFilename[filename].timestamp)) {
          uniqueByFilename[filename] = analysis
        }
      })
      
      const uniqueAnalyses = Object.values(uniqueByFilename).sort((a, b) => 
        new Date(b.timestamp) - new Date(a.timestamp)
      )
      
      setAnalyses(uniqueAnalyses)
      setStats(statsRes)
    } catch (error) {
      toast.error('Erreur lors du chargement de l\'historique')
    } finally {
      setLoading(false)
    }
  }

  const getGradeColor = (grade) => {
    switch(grade) {
      case 'A': return 'bg-green-100 text-green-700'
      case 'B': return 'bg-blue-100 text-blue-700'
      case 'C': return 'bg-yellow-100 text-yellow-700'
      default: return 'bg-red-100 text-red-700'
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <p className="text-gray-600">Chargement de l'historique...</p>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-6"> Historique des analyses</h1>

      {stats && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-xl shadow-sm border p-4 text-center">
            <div className="text-2xl font-bold text-blue-600">{stats.total_analyses || 0}</div>
            <div className="text-sm text-gray-500">Analyses totales</div>
          </div>
          <div className="bg-white rounded-xl shadow-sm border p-4 text-center">
            <div className="text-2xl font-bold text-green-600">{stats.average_quality_score || 0}</div>
            <div className="text-sm text-gray-500">Score moyen</div>
          </div>
          <div className="bg-white rounded-xl shadow-sm border p-4 text-center">
            <div className="text-2xl font-bold text-purple-600">{stats.reports_generated || 0}</div>
            <div className="text-sm text-gray-500">Rapports générés</div>
          </div>
          <div className="bg-white rounded-xl shadow-sm border p-4 text-center">
            <div className="text-2xl font-bold text-orange-600 truncate" title={stats.most_analyzed_file}>
              {stats.most_analyzed_file || '-'}
            </div>
            <div className="text-sm text-gray-500">Fichier le plus analysé</div>
          </div>
        </div>
      )}

      {analyses.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-xl">
          <div className="text-5xl mb-4">📭</div>
          <h3 className="text-lg font-medium text-gray-700 mb-2">Aucune analyse</h3>
          <p className="text-gray-500">Commencez par uploader un fichier sur la page d'accueil</p>
          <button onClick={() => navigate('/upload')} className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
            Uploader un fichier
          </button>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {analyses.map(analysis => (
            <div 
              key={analysis.filename} 
              onClick={() => navigate(`/dashboard/${analysis.file_id}`)} 
              className="border rounded-xl p-4 hover:shadow-md transition cursor-pointer bg-white"
            >
              <div className="flex justify-between items-start mb-3">
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-gray-800 truncate" title={analysis.filename}>
                    {analysis.filename}
                  </h3>
                  <p className="text-xs text-gray-500 mt-1">
                    {new Date(analysis.timestamp).toLocaleString()}
                  </p>
                </div>
                <div className={`ml-2 px-2 py-1 rounded-full text-xs font-medium ${getGradeColor(analysis.quality_grade)}`}>
                  Grade {analysis.quality_grade}
                </div>
              </div>
              <div className="flex justify-between text-sm text-gray-600 mt-2">
                <span>{analysis.rows} lignes</span>
                <span>{analysis.columns} colonnes</span>
                <span>Score: {analysis.quality_score}/100</span>
              </div>
              <div className="mt-3 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                <div className="h-full bg-blue-500 rounded-full" style={{ width: `${analysis.quality_score}%` }} />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default History