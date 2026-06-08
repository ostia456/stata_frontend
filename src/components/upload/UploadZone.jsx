import { useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone'

const UploadZone = ({ onFileSelect, disabled, isUploading }) => {
  const [isDragActive, setIsDragActive] = useState(false)

  const onDrop = useCallback((acceptedFiles) => {
    if (acceptedFiles.length > 0 && !disabled && !isUploading) {
      onFileSelect(acceptedFiles[0])
    }
  }, [onFileSelect, disabled, isUploading])

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      'text/csv': ['.csv'],
      'application/vnd.ms-excel': ['.xls'],
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx']
    },
    maxSize: 200 * 1024 * 1024,
    multiple: false,
    disabled: disabled || isUploading,
    onDragEnter: () => setIsDragActive(true),
    onDragLeave: () => setIsDragActive(false)
  })

  return (
    <div
      {...getRootProps()}
      className={`
        border-2 border-dashed rounded-xl p-12 text-center cursor-pointer transition
        ${isDragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-gray-400'}
        ${(disabled || isUploading) ? 'opacity-50 cursor-not-allowed' : ''}
      `}
    >
      <input {...getInputProps()} disabled={disabled || isUploading} />
      <div className="text-5xl mb-3 animate-bounce">📂</div>
      <p className="text-lg font-medium text-gray-700">
        {isDragActive ? ' Déposez votre fichier ici' : ' Glissez-déposez votre fichier'}
      </p>
      <p className="text-gray-500 text-sm mt-2">
        ou cliquez pour parcourir
      </p>
      <div className="mt-4 flex justify-center gap-4 text-xs text-gray-400">
        <span className="px-2 py-1 bg-gray-100 rounded">CSV</span>
        <span className="px-2 py-1 bg-gray-100 rounded">XLSX</span>
        <span className="px-2 py-1 bg-gray-100 rounded">XLS</span>
      </div>
      <p className="text-xs text-gray-400 mt-3">
        Taille maximale : 200 MB
      </p>
    </div>
  )
}

export default UploadZone