import api from './api';

const uploadService = {
  /**
   * Upload d'un fichier CSV ou Excel avec suivi de progression
   * @param {File} file - Fichier à uploader
   * @param {Function} onProgress - Callback pour la progression (0-100)
   * @returns {Promise} - Résultat avec file_id
   */
  uploadFile: async (file, onProgress = null) => {
    const formData = new FormData();
    formData.append('file', file);
    
    const response = await api.post('/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      onUploadProgress: (progressEvent) => {
        if (onProgress && progressEvent.total) {
          const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          onProgress(percentCompleted);
        }
      }
    });
    
    return response.data;
  },
  
  /**
   * Récupère les informations d'un fichier uploadé
   * @param {string} fileId - Identifiant du fichier
   * @returns {Promise} - Métadonnées du fichier
   */
  getFileInfo: async (fileId) => {
    const response = await api.get(`/upload/${fileId}/info`);
    return response.data;
  },
  
  /**
   * Supprime un fichier uploadé
   * @param {string} fileId - Identifiant du fichier
   * @returns {Promise} - Résultat de la suppression
   */
  deleteFile: async (fileId) => {
    const response = await api.delete(`/upload/${fileId}`);
    return response.data;
  }
};

export default uploadService;