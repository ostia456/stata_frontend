import { useState } from 'react'
import toast from 'react-hot-toast'
import reportService from '../../services/reportService'

const PDFDownloadButton = ({ fileId, label = "Télécharger PDF", className = "" }) => {
  const [loading, setLoading] = useState(false)

  const handleDownload = async () => {
    setLoading(true)
    try {
      await reportService.downloadPDFReport(fileId)
      toast.success('PDF téléchargé avec succès')
    } catch (error) {
      toast.error('Erreur lors du téléchargement du PDF')
    } finally {
      setLoading(false)
    }
  }

  return (
    <button
      onClick={handleDownload}
      disabled={loading}
      className={`px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition flex items-center gap-2 ${className}`}
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

export default PDFDownloadButton