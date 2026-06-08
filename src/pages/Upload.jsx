import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import uploadService from '../services/uploadService'
import UploadZone from '../components/upload/UploadZone'
import FilePreview from '../components/upload/FilePreview'

const Upload = () => {
  const navigate = useNavigate()
  const [file, setFile] = useState(null)
  const [loading, setLoading] = useState(false)
  const [progress, setProgress] = useState(0)
  const [fileInfo, setFileInfo] = useState(null)

  const handleFileSelect = (selectedFile) => {
    setFile(selectedFile)
    setFileInfo(null)
    setProgress(0)
  }

  const handleUpload = async () => {
    if (!file) {
      toast.error('Veuillez sélectionner un fichier')
      return
    }

    setLoading(true)
    setProgress(0)

    try {
      const result = await uploadService.uploadFile(file, (percent) => {
        setProgress(percent)
      })
      
      setProgress(100)
      setFileInfo(result)
      toast.success('Fichier chargé avec succès !')
      
      setTimeout(() => {
        navigate(`/dashboard/${result.file_id}`)
      }, 1500)
    } catch (error) {
      toast.error(error.message || "Erreur lors du chargement")
      setLoading(false)
      setProgress(0)
    }
  }

  const handleReset = () => {
    setFile(null)
    setFileInfo(null)
    setProgress(0)
    setLoading(false)
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          📁 Import de données
        </h1>
        <p className="text-gray-600">
          Téléchargez votre fichier CSV ou Excel
        </p>
      </div>

      {!fileInfo ? (
        <>
          <UploadZone onFileSelect={handleFileSelect} disabled={loading} />
          
          {file && !loading && (
            <div className="mt-6">
              <FilePreview file={file} />
              <div className="flex justify-center gap-4 mt-6">
                <button
                  onClick={handleReset}
                  className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition"
                >
                  Changer
                </button>
                <button
                  onClick={handleUpload}
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                >
                  Charger le fichier
                </button>
              </div>
            </div>
          )}

          {loading && (
            <div className="mt-6 p-6 bg-white rounded-xl shadow-sm border text-center">
              <div className="text-4xl mb-3"></div>
              <p className="text-gray-700 font-medium mb-3">
                Upload de {file?.name}
              </p>
              <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-blue-600 rounded-full transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <p className="text-sm text-gray-500 mt-2">{progress}%</p>
              <p className="text-xs text-gray-400 mt-2">
                {progress < 30 && " Envoi du fichier..."}
                {progress >= 30 && progress < 60 && " Transfert des données..."}
                {progress >= 60 && progress < 100 && " Traitement en cours..."}
                {progress === 100 && " Terminé !"}
              </p>
            </div>
          )}
        </>
      ) : (
        <div className="bg-green-50 border border-green-200 rounded-xl p-8 text-center">
          <div className="text-5xl mb-3"></div>
          <h3 className="text-xl font-semibold text-green-800 mb-2">
            Fichier chargé !
          </h3>
          <p className="text-gray-600">Redirection vers l'analyse...</p>
        </div>
      )}
    </div>
  )
}

export default Upload