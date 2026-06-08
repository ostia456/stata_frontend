const UploadProgress = ({ uploadProgress, analysisProgress, currentStep }) => {
  const steps = [
    { name: 'Upload', key: 'upload', icon: '' },
    { name: 'Lecture', key: 'read', icon: '' },
    { name: 'Analyse', key: 'analysis', icon: '' },
    { name: 'Rapport', key: 'report', icon: '' }
  ]

  const getCurrentStepIndex = () => {
    return steps.findIndex(s => s.key === currentStep)
  }

  const totalProgress = Math.floor((uploadProgress + analysisProgress) / 2)

  return (
    <div className="mt-6 bg-white border rounded-xl shadow-sm p-6">
      <div className="flex justify-between mb-3">
        <span className="font-medium text-gray-700">
          Traitement du dataset
        </span>
        <span className="font-bold text-blue-600">
          {totalProgress}%
        </span>
      </div>

      <div className="w-full h-5 bg-gray-200 rounded-full overflow-hidden mb-6">
        <div
          className="h-full bg-gradient-to-r from-blue-500 to-indigo-600 transition-all duration-300"
          style={{ width: `${totalProgress}%` }}
        />
      </div>

      <div className="space-y-3">
        {steps.map((step, idx) => {
          const isActive = idx === getCurrentStepIndex()
          const isCompleted = idx < getCurrentStepIndex()
          const stepProgress = step.key === 'upload' ? uploadProgress : 
                              step.key === 'read' ? analysisProgress * 0.3 :
                              step.key === 'analysis' ? analysisProgress * 0.5 :
                              analysisProgress

          return (
            <div key={step.key} className="flex items-center gap-3">
              <div className={`w-8 text-center ${isActive ? 'text-blue-600' : isCompleted ? 'text-green-600' : 'text-gray-400'}`}>
                {isCompleted ? '' : step.icon}
              </div>
              <div className="flex-1">
                <div className="flex justify-between text-sm mb-1">
                  <span className={isActive ? 'font-medium text-blue-600' : 'text-gray-600'}>
                    {step.name}
                  </span>
                  <span className="text-gray-400">
                    {step.key === 'upload' ? uploadProgress : 
                     step.key === 'read' ? Math.min(30, Math.floor(analysisProgress * 0.3)) :
                     step.key === 'analysis' ? Math.min(50, 30 + Math.floor(analysisProgress * 0.2)) :
                     Math.min(100, 80 + Math.floor(analysisProgress * 0.2))}%
                  </span>
                </div>
                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-300 ${
                      isCompleted ? 'bg-green-500' : isActive ? 'bg-blue-500' : 'bg-gray-300'
                    }`}
                    style={{ 
                      width: step.key === 'upload' ? uploadProgress :
                             step.key === 'read' ? Math.min(100, (analysisProgress * 0.3) * 3.33) :
                             step.key === 'analysis' ? Math.min(100, ((analysisProgress - 30) / 70) * 100) :
                             Math.min(100, ((analysisProgress - 80) / 20) * 100)
                    }}
                  />
                </div>
              </div>
            </div>
          )
        })}
      </div>

      <div className="mt-4 p-3 bg-gray-50 rounded-lg">
        <p className="text-sm text-gray-600">
          {uploadProgress < 100 && ' Envoi du fichier vers le serveur...'}
          {uploadProgress === 100 && analysisProgress < 30 && ' Lecture et validation des données...'}
          {analysisProgress >= 30 && analysisProgress < 80 && ' Calcul des statistiques et corrélations...'}
          {analysisProgress >= 80 && analysisProgress < 100 && ' Génération du rapport...'}
          {analysisProgress === 100 && ' Analyse terminée !'}
        </p>
        {analysisProgress > 0 && analysisProgress < 100 && (
          <div className="mt-2 text-xs text-gray-400">
            Les fichiers volumineux peuvent prendre quelques secondes
          </div>
        )}
      </div>
    </div>
  )
}

export default UploadProgress