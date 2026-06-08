import { useState } from 'react'
import toast from 'react-hot-toast'
import reportService from '../../services/reportService'

const HTMLDownloadButton = ({ fileId, label = "Télécharger HTML", className = "" }) => {
  const [loading, setLoading] = useState(false)

  const handleDownload = async () => {
    setLoading(true)
    try {
      await reportService.downloadHTMLReport(fileId)
      toast.success('Rapport HTML téléchargé avec succès')
    } catch (error) {
      toast.error('Erreur lors du téléchargement du rapport HTML')
    } finally {
      setLoading(false)
    }
  }

  return (
    <button
      onClick={handleDownload}
      disabled={loading}
      className={`px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition flex items-center gap-2 ${className}`}
    >
      {loading ? (
        <>
          <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
          Génération...
        </>
      ) : (
        <> {label}</>
      )}
    </button>
  )
}

export default HTMLDownloadButton