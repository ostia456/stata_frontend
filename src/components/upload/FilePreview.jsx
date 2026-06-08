const FilePreview = ({ file }) => {
  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  const getFileIcon = () => {
    const ext = file.name.split('.').pop().toLowerCase()
    if (ext === 'csv') return ''
    if (ext === 'xlsx' || ext === 'xls') return ''
    return ''
  }

  return (
    <div className="bg-gray-50 border border-gray-200 rounded-xl p-4">
      <div className="flex items-center gap-4">
        <div className="text-3xl">{getFileIcon()}</div>
        <div className="flex-1 min-w-0">
          <p className="font-medium text-gray-900 truncate">{file.name}</p>
          <p className="text-sm text-gray-500">{formatFileSize(file.size)}</p>
        </div>
        <div className="text-green-600 text-sm"> Fichier sélectionné</div>
      </div>
    </div>
  )
}

export default FilePreview