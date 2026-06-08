import api from './api';

const analysisService = {
  /**
   * Lance une analyse complète du dataset
   * @param {string} fileId - Identifiant du fichier
   * @param {boolean} quick - Analyse rapide (true) ou complète (false)
   * @returns {Promise} - Résultats de l'analyse
   */
  runAnalysis: async (fileId, quick = false) => {
    const response = await api.post(`/analysis/run/${fileId}?quick=${quick}`);
    return response.data;
  },
  
  /**
   * Récupère l'aperçu du dataset
   * @param {string} fileId - Identifiant du fichier
   * @returns {Promise} - Aperçu (lignes, colonnes, types)
   */
  getOverview: async (fileId) => {
    const response = await api.get(`/analysis/${fileId}/overview`);
    return response.data;
  },
  
  /**
   * Récupère les statistiques descriptives
   * @param {string} fileId - Identifiant du fichier
   * @returns {Promise} - Statistiques (moyenne, médiane, etc.)
   */
  getStatistics: async (fileId) => {
    const response = await api.get(`/statistics/${fileId}`);
    return response.data;
  },
  
  /**
   * Récupère l'analyse des valeurs manquantes
   * @param {string} fileId - Identifiant du fichier
   * @returns {Promise} - Valeurs manquantes
   */
  getMissingValues: async (fileId) => {
    const response = await api.get(`/missing/${fileId}`);
    return response.data;
  },
  
  /**
   * Récupère les matrices de corrélation
   * @param {string} fileId - Identifiant du fichier
   * @returns {Promise} - Corrélations Pearson et Spearman
   */
  getCorrelations: async (fileId) => {
    const response = await api.get(`/correlations/${fileId}`);
    return response.data;
  },
  
  /**
   * Récupère les tests de normalité
   * @param {string} fileId - Identifiant du fichier
   * @returns {Promise} - Tests de Shapiro-Wilk
   */
  getNormality: async (fileId) => {
    const response = await api.get(`/normality/${fileId}`);
    return response.data;
  },
  
  /**
   * Récupère la détection d'outliers
   * @param {string} fileId - Identifiant du fichier
   * @returns {Promise} - Outliers (IQR et Z-score)
   */
  getOutliers: async (fileId) => {
    const response = await api.get(`/outliers/${fileId}`);
    return response.data;
  },
  
  /**
   * Récupère le score de qualité
   * @param {string} fileId - Identifiant du fichier
   * @returns {Promise} - Score qualité et grade
   */
  getQualityScore: async (fileId) => {
    const response = await api.get(`/quality/${fileId}`);
    return response.data;
  },
  
  /**
   * Récupère les insights automatiques
   * @param {string} fileId - Identifiant du fichier
   * @returns {Promise} - Insights en langage naturel
   */
  getInsights: async (fileId) => {
    const response = await api.get(`/insights/${fileId}`);
    return response.data;
  },
  
  /**
   * Récupère l'analyse avancée
   * @param {string} fileId - Identifiant du fichier
   * @returns {Promise} - Colonnes constantes, ID, cardinalité
   */
  getAdvancedAnalysis: async (fileId) => {
    const response = await api.get(`/advanced/${fileId}`);
    return response.data;
  },
  
  /**
   * Récupère l'analyse catégorielle
   * @param {string} fileId - Identifiant du fichier
   * @returns {Promise} - Analyse des colonnes catégorielles
   */
  getCategoricalAnalysis: async (fileId) => {
    const response = await api.get(`/categorical/${fileId}`);
    return response.data;
  },
  
  /**
   * Récupère la détection ML
   * @param {string} fileId - Identifiant du fichier
   * @returns {Promise} - Type de problème, modèles suggérés
   */
  getMLDetection: async (fileId) => {
    const response = await api.get(`/ml-detection/${fileId}`);
    return response.data;
  }
};

export default analysisService;