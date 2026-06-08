import api from './api';

const healthService = {
  /**
   * Vérifie l'état de santé de l'API
   * @returns {Promise} - Statut
   */
  healthCheck: async () => {
    const response = await api.get('/public/health');
    return response.data;
  },
  
  /**
   * Récupère la version de l'API
   * @returns {Promise} - Version
   */
  getVersion: async () => {
    const response = await api.get('/public/version');
    return response.data;
  },
  
  /**
   * Récupère les métriques
   * @returns {Promise} - Métriques CPU, mémoire
   */
  getMetrics: async () => {
    const response = await api.get('/public/metrics');
    return response.data;
  },
  
  /**
   * Récupère les statistiques globales
   * @returns {Promise} - Stats de l'API
   */
  getGlobalStats: async () => {
    const response = await api.get('/public/stats');
    return response.data;
  },
  
  /**
   * Récupère les limites de l'API
   * @returns {Promise} - Limites (taille, formats)
   */
  getLimits: async () => {
    const response = await api.get('/public/limits');
    return response.data;
  }
};

export default healthService;