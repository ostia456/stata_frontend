import api from './api';

const reportService = {
  /**
   * Génère un rapport HTML
   * @param {string} fileId - Identifiant du fichier
   * @returns {Promise} - Contenu HTML ou chemin
   */
  generateHTMLReport: async (fileId) => {
    const response = await api.get(`/reports/html/${fileId}`);
    return response.data;
  },
  
  /**
   * Télécharge le rapport HTML
   * @param {string} fileId - Identifiant du fichier
   * @returns {Promise} - Fichier HTML
   */
  downloadHTMLReport: async (fileId) => {
    const response = await api.get(`/reports/html/${fileId}/download`, {
      responseType: 'blob'
    });
    
    // Créer un lien de téléchargement
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `autoeda_report_${fileId}.html`);
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.URL.revokeObjectURL(url);
    
    return response.data;
  },
  
  /**
   * Génère un rapport PDF
   * @param {string} fileId - Identifiant du fichier
   * @returns {Promise} - Chemin du PDF
   */
  generatePDFReport: async (fileId) => {
    const response = await api.get(`/reports/pdf/${fileId}`);
    return response.data;
  },
  
  /**
   * Télécharge le rapport PDF
   * @param {string} fileId - Identifiant du fichier
   * @returns {Promise} - Fichier PDF
   */
  downloadPDFReport: async (fileId) => {
    const response = await api.get(`/reports/pdf/${fileId}/download`, {
      responseType: 'blob'
    });
    
    // Créer un lien de téléchargement
    const url = window.URL.createObjectURL(new Blob([response.data], { type: 'application/pdf' }));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `autoeda_report_${fileId}.pdf`);
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.URL.revokeObjectURL(url);
    
    return response.data;
  },
  
  /**
   * Récupère le rapport Data Scientist
   * @param {string} fileId - Identifiant du fichier
   * @returns {Promise} - Rapport Data Scientist
   */
  getDataScientistReport: async (fileId) => {
    const response = await api.get(`/reports/data-scientist/${fileId}`);
    return response.data;
  }
};

export default reportService;