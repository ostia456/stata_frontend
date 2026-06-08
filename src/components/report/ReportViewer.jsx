import { useState } from 'react'
import toast from 'react-hot-toast'
import reportService from '../../services/reportService'

const ReportViewer = ({ fileId }) => {
  const [loading, setLoading] = useState(false)
  const [htmlContent, setHtmlContent] = useState(null)

  const loadReport = async () => {
    setLoading(true)
    try {
      const result = await reportService.generateHTMLReport(fileId)
      setHtmlContent(result.html_content)
      toast.success('Rapport chargé')
    } catch (error) {
      toast.error('Erreur lors du chargement du rapport')
    } finally {
      setLoading(false)
    }
  }

  if (!htmlContent && !loading) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-600 mb-4">Cliquez ci-dessous pour visualiser le rapport complet</p>
        <button onClick={loadReport} className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
          📄 Visualiser le rapport
        </button>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="text-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <p className="text-gray-600">Chargement du rapport...</p>
      </div>
    )
  }

  return (
    <div className="border rounded-lg overflow-hidden">
      <div className="bg-gray-100 p-3 flex justify-between items-center border-b">
        <span className="font-medium"> Aperçu du rapport</span>
        <button onClick={() => setHtmlContent(null)} className="text-gray-500 hover:text-gray-700">Fermer</button>
      </div>
      <iframe srcDoc={htmlContent} className="w-full h-[600px] border-0" title="Rapport" />
    </div>
  )
}

export default ReportViewer