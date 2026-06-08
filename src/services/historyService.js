import api from './api'

const historyService = {
  getHistory: async (limit = 50) => {
    const response = await api.get(`/history/?limit=${limit}`)
    return response.data
  },

  getAllAnalyses: async () => {
    const response = await api.get('/history/all')
    return response.data
  },

  getAnalysisById: async (analysisId) => {
    const response = await api.get(`/history/${analysisId}`)
    return response.data
  },

  getAnalysisByFileId: async (fileId) => {
    const response = await api.get(`/history/file/${fileId}`)
    return response.data
  },

  getHistoryStats: async () => {
    const response = await api.get('/history/stats')
    return response.data
  },

  deleteAnalysis: async (analysisId) => {
    const response = await api.delete(`/history/${analysisId}`)
    return response.data
  }
}

export default historyService