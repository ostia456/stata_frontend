import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import analysisService from '../services/analysisService'
import PDFDownloadButton from '../components/report/PDFDownloadButton'
import HTMLDownloadButton from '../components/report/HTMLDownloadButton'
import MissingValuesChart from '../components/charts/MissingValuesChart'
import CorrelationHeatmap from '../components/charts/CorrelationHeatmap'
import HistogramChart from '../components/charts/HistogramChart'
import BoxplotChart from '../components/charts/BoxplotChart'
import ScatterChart from '../components/charts/ScatterChart'
import TargetFeatureAnalysis from '../components/charts/TargetFeatureAnalysis'
import InsightsPanel from '../components/dashboard/InsightsPanel'
import RecommendationsPanel from '../components/dashboard/RecommendationsPanel'
import ExecutiveSummary from '../components/dashboard/ExecutiveSummary'
import ViolinPlot from '../components/charts/ViolinPlot'
import PairPlot from '../components/charts/PairPlot'
import FeatureImportance from '../components/charts/FeatureImportance'
import QQPlot from '../components/charts/QQPlot'
import PCAPlot from '../components/charts/PCAPlot'

const Dashboard = () => {
  const { fileId } = useParams()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true)
  const [analysis, setAnalysis] = useState(null)
  const [activeTab, setActiveTab] = useState('overview')

  useEffect(() => {
    if (!fileId) {
      navigate('/upload')
      return
    }
    loadAnalysis()
  }, [fileId])

  const loadAnalysis = async () => {
    setLoading(true)
    try {
      const result = await analysisService.runAnalysis(fileId, false)
      setAnalysis(result)
      toast.success('Analyse terminée')
    } catch (error) {
      toast.error(error.message || 'Erreur lors de l\'analyse')
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Analyse en cours...</p>
          <p className="text-sm text-gray-400 mt-2">Cela peut prendre quelques secondes</p>
        </div>
      </div>
    )
  }

  const quality = analysis?.quality?.score || {}
  const profile = analysis?.profile || {}
  const basicInfo = profile?.basic_info || {}
  const insights = analysis?.insights || {}

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Tableau de bord</h1>
          <p className="text-gray-500 text-sm mt-1">ID: {fileId}</p>
        </div>
        <div className="flex gap-3">
          <PDFDownloadButton fileId={fileId} />
          <HTMLDownloadButton fileId={fileId} />
          <button onClick={() => navigate('/history')} className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition flex items-center gap-2"> Historique</button>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border p-6 mb-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Score de qualité</h2>
        <div className="flex items-center gap-6">
          <div className="text-center">
            <div className="text-4xl font-bold text-blue-600">{quality.total_score || 0}</div>
            <div className="text-sm text-gray-500">/100</div>
          </div>
          <div className="flex-1">
            <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
              <div className="h-full bg-blue-600 rounded-full transition-all" style={{ width: `${quality.total_score || 0}%` }} />
            </div>
            <p className="text-sm text-gray-600 mt-2">{quality.interpretation || 'Analyse terminée'}</p>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-700">{quality.grade || 'N/A'}</div>
            <div className="text-sm text-gray-500">Grade</div>
          </div>
        </div>
      </div>

      <div className="border-b border-gray-200 mb-6">
        <nav className="flex flex-wrap gap-4">
          <button onClick={() => setActiveTab('overview')} className={`pb-2 px-3 transition ${activeTab === 'overview' ? 'border-b-2 border-blue-600 text-blue-600 font-medium' : 'text-gray-500 hover:text-gray-700'}`}> Aperçu</button>
          <button onClick={() => setActiveTab('statistics')} className={`pb-2 px-3 transition ${activeTab === 'statistics' ? 'border-b-2 border-blue-600 text-blue-600 font-medium' : 'text-gray-500 hover:text-gray-700'}`}> Statistiques</button>
          <button onClick={() => setActiveTab('missing')} className={`pb-2 px-3 transition ${activeTab === 'missing' ? 'border-b-2 border-blue-600 text-blue-600 font-medium' : 'text-gray-500 hover:text-gray-700'}`}> Manquants</button>
          <button onClick={() => setActiveTab('charts')} className={`pb-2 px-3 transition ${activeTab === 'charts' ? 'border-b-2 border-blue-600 text-blue-600 font-medium' : 'text-gray-500 hover:text-gray-700'}`}> Graphiques</button>
          <button onClick={() => setActiveTab('correlations')} className={`pb-2 px-3 transition ${activeTab === 'correlations' ? 'border-b-2 border-blue-600 text-blue-600 font-medium' : 'text-gray-500 hover:text-gray-700'}`}> Corrélations</button>
          <button onClick={() => setActiveTab('relations')} className={`pb-2 px-3 transition ${activeTab === 'relations' ? 'border-b-2 border-blue-600 text-blue-600 font-medium' : 'text-gray-500 hover:text-gray-700'}`}> Relations</button>
          <button onClick={() => setActiveTab('advanced')} className={`pb-2 px-3 transition ${activeTab === 'advanced' ? 'border-b-2 border-blue-600 text-blue-600 font-medium' : 'text-gray-500 hover:text-gray-700'}`}> Avancé</button>
          <button onClick={() => setActiveTab('insights')} className={`pb-2 px-3 transition ${activeTab === 'insights' ? 'border-b-2 border-blue-600 text-blue-600 font-medium' : 'text-gray-500 hover:text-gray-700'}`}> Insights</button>
          <button onClick={() => setActiveTab('executive')} className={`pb-2 px-3 transition ${activeTab === 'executive' ? 'border-b-2 border-blue-600 text-blue-600 font-medium' : 'text-gray-500 hover:text-gray-700'}`}> Synthèse</button>
        </nav>
      </div>

      <div className="bg-white rounded-xl shadow-sm border p-6">
        {activeTab === 'overview' && (
          <div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <div className="text-center p-4 bg-gray-50 rounded-lg"><div className="text-2xl font-bold text-gray-900">{basicInfo.rows || 0}</div><div className="text-sm text-gray-500">Lignes</div></div>
              <div className="text-center p-4 bg-gray-50 rounded-lg"><div className="text-2xl font-bold text-gray-900">{basicInfo.columns || 0}</div><div className="text-sm text-gray-500">Colonnes</div></div>
              <div className="text-center p-4 bg-gray-50 rounded-lg"><div className="text-2xl font-bold text-gray-900">{analysis?.numeric_columns?.length || 0}</div><div className="text-sm text-gray-500">Numériques</div></div>
              <div className="text-center p-4 bg-gray-50 rounded-lg"><div className="text-2xl font-bold text-gray-900">{basicInfo.memory_usage_mb || 0} MB</div><div className="text-sm text-gray-500">Mémoire</div></div>
            </div>
            <div className="mt-4 p-4 bg-blue-50 rounded-lg"><p className="text-blue-800">{insights.executive_summary || 'Analyse terminée avec succès'}</p></div>
          </div>
        )}

        {activeTab === 'statistics' && (
          <div>
            <p className="text-gray-600 mb-4">Statistiques descriptives des colonnes numériques</p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b bg-gray-50">
                    <th className="text-left py-3 px-4">Colonne</th>
                    <th className="text-right py-3 px-4">Moyenne</th>
                    <th className="text-right py-3 px-4">Médiane</th>
                    <th className="text-right py-3 px-4">Écart-type</th>
                    <th className="text-right py-3 px-4">Min</th>
                    <th className="text-right py-3 px-4">Max</th>
                  </tr>
                </thead>
                <tbody>
                  {Object.entries(analysis?.statistics?.statistics || {}).map(([col, stats]) => (
                    <tr key={col} className="border-b hover:bg-gray-50">
                      <td className="py-2 px-4 font-medium">{col}</td>
                      <td className="text-right py-2 px-4">{stats.mean?.toFixed(2) || '-'}</td>
                      <td className="text-right py-2 px-4">{stats.median?.toFixed(2) || '-'}</td>
                      <td className="text-right py-2 px-4">{stats.std?.toFixed(2) || '-'}</td>
                      <td className="text-right py-2 px-4">{stats.min?.toFixed(2) || '-'}</td>
                      <td className="text-right py-2 px-4">{stats.max?.toFixed(2) || '-'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'advanced' && (
          <div className="space-y-8">
            <div>
              <h3 className="font-semibold text-gray-800 mb-3">Violin Plots</h3>
              <div className="grid md:grid-cols-2 gap-6">
                {analysis?.numeric_columns?.slice(0, 4).map(col => (
                  <ViolinPlot key={col} data={analysis?.raw_data?.[col]} columnName={col} />
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-gray-800 mb-3">Q-Q Plots (Normalité)</h3>
              <div className="grid md:grid-cols-2 gap-6">
                {analysis?.numeric_columns?.slice(0, 4).map(col => (
                  <QQPlot key={col} data={analysis?.raw_data?.[col]} columnName={col} />
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-gray-800 mb-3">Feature Importance</h3>
              <FeatureImportance 
                correlations={analysis?.correlations?.pearson?.matrix}
                targetColumn={analysis?.ml_detection?.target_column}
                columns={analysis?.numeric_columns}
              />
            </div>

            <div>
              <h3 className="font-semibold text-gray-800 mb-3">PCA - Réduction de dimension</h3>
              <PCAPlot 
                data={analysis?.raw_data}
                columns={analysis?.numeric_columns}
                targetColumn={analysis?.ml_detection?.target_column}
              />
            </div>
          </div>
        )}
        {activeTab === 'missing' && (
          <div>
            <p className="text-gray-600 mb-4">Valeurs manquantes par colonne</p>
            {Object.entries(analysis?.missing_values?.columns || {}).filter(([, info]) => info.missing_count > 0).length === 0 ? (
              <p className="text-green-600"> Aucune valeur manquante détectée</p>
            ) : (
              <div className="space-y-3">
                {Object.entries(analysis?.missing_values?.columns || {})
                  .filter(([, info]) => info.missing_count > 0)
                  .map(([col, info]) => (
                    <div key={col}>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="font-medium">{col}</span>
                        <span>{info.missing_count} manquants ({info.missing_percentage}%)</span>
                      </div>
                      <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div className="h-full bg-red-500 rounded-full" style={{ width: `${info.missing_percentage}%` }} />
                      </div>
                    </div>
                  ))}
              </div>
            )}
          </div>
        )}

        {activeTab === 'charts' && (
          <div className="space-y-8">
            {Object.entries(analysis?.statistics?.statistics || {}).length > 0 && (
              <div>
                <h3 className="font-semibold text-gray-800 mb-3"> Histogrammes</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  {Object.entries(analysis?.statistics?.statistics || {}).map(([col]) => (
                    <HistogramChart key={col} data={analysis?.raw_data?.[col] || []} columnName={col} />
                  ))}
                </div>
              </div>
            )}

            {Object.entries(analysis?.statistics?.statistics || {}).length > 0 && (
              <div>
                <h3 className="font-semibold text-gray-800 mb-3"> Boxplots</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  {Object.entries(analysis?.statistics?.statistics || {}).map(([col]) => (
                    <BoxplotChart key={col} data={analysis?.raw_data?.[col] || []} columnName={col} />
                  ))}
                </div>
              </div>
            )}

            {analysis?.correlations?.pearson?.strong_correlations?.slice(0, 4).length > 0 && (
              <div>
                <h3 className="font-semibold text-gray-800 mb-3"> Nuages de points</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  {analysis?.correlations?.pearson?.strong_correlations?.slice(0, 4).map((corr, idx) => (
                    <ScatterChart key={idx} dataX={analysis?.raw_data?.[corr.var1] || []} dataY={analysis?.raw_data?.[corr.var2] || []} colX={corr.var1} colY={corr.var2} />
                  ))}
                </div>
              </div>
            )}

            {Object.entries(analysis?.missing_values?.columns || {}).filter(([, info]) => info.missing_count > 0).length > 0 && (
              <div>
                <h3 className="font-semibold text-gray-800 mb-3"> Valeurs manquantes</h3>
                <MissingValuesChart missingData={analysis?.missing_values?.columns} />
              </div>
            )}

            {analysis?.correlations?.pearson?.matrix && analysis?.correlations?.pearson?.columns && (
              <div>
                <h3 className="font-semibold text-gray-800 mb-3"> Matrice de corrélation</h3>
                <CorrelationHeatmap matrix={analysis?.correlations?.pearson?.matrix} columns={analysis?.correlations?.pearson?.columns} />
              </div>
            )}
          </div>
        )}

        {activeTab === 'correlations' && (
          <div>
            <p className="text-gray-600 mb-4">Corrélations fortes détectées</p>
            {analysis?.correlations?.pearson?.strong_correlations?.length > 0 ? (
              <div className="space-y-2">
                {analysis.correlations.pearson.strong_correlations.map((corr, idx) => (
                  <div key={idx} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <span className="font-medium">{corr.var1}</span>
                    <span className="text-gray-400">↔</span>
                    <span className="font-medium">{corr.var2}</span>
                    <span className={`px-2 py-1 rounded text-sm ${corr.correlation > 0 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>{corr.correlation}</span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500">Aucune corrélation forte détectée</p>
            )}
          </div>
        )}

        {activeTab === 'relations' && (
          <div>
            <h3 className="font-semibold text-gray-800 mb-4"> Relations entre la cible et les variables</h3>
            <div className="grid lg:grid-cols-2 gap-6">
              {analysis?.numeric_columns?.filter(col => col !== analysis?.ml_detection?.target_column).map(feature => {
                const featureType = analysis?.column_types?.[feature] === 'numeric' ? 'numeric' : 'categorical'
                return (
                  <TargetFeatureAnalysis
                    key={feature}
                    targetData={analysis?.raw_data?.[analysis?.ml_detection?.target_column]}
                    featureData={analysis?.raw_data?.[feature]}
                    targetName={analysis?.ml_detection?.target_column}
                    featureName={feature}
                    featureType={featureType}
                  />
                )
              })}
            </div>
          </div>
        )}

        {activeTab === 'insights' && (
          <div className="space-y-3">
            {insights.missing_insights?.length === 0 && insights.numeric_insights?.length === 0 ? (
              <p className="text-gray-500">Aucun insight disponible</p>
            ) : (
              <>
                {insights.missing_insights?.map((insight, idx) => (
                  <div key={idx} className="p-3 bg-yellow-50 border-l-4 border-yellow-500 rounded">
                    <p className="text-yellow-800">{insight}</p>
                  </div>
                ))}
                {insights.numeric_insights?.map((insight, idx) => (
                  <div key={idx} className="p-3 bg-blue-50 border-l-4 border-blue-500 rounded">
                    <p className="text-blue-800">{insight}</p>
                  </div>
                ))}
              </>
            )}
          </div>
        )}

        {activeTab === 'executive' && (
          <div className="space-y-6">
            <ExecutiveSummary summary={insights?.executive_summary} quality={quality} mlDetection={analysis?.ml_detection} />
            <InsightsPanel insights={insights} quality={quality} mlDetection={analysis?.ml_detection} />
            <RecommendationsPanel recommendations={insights?.recommendations} mlRecommendations={analysis?.ml_detection?.recommendations} />
          </div>
        )}
      </div>
    </div>
  )
}

export default Dashboard