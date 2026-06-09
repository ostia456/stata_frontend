import axios from 'axios';

// Configuration de l'API - Détection automatique
const getApiUrl = () => {
    // Si on est en local
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
        return 'http://localhost:8000/api/v1';
    }
    // En production (Vercel, etc.)
    return 'https://stata-backend-4tew.onrender.com/api/v1';
};

const API_BASE_URL = getApiUrl();

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
    timeout: 120000,
});

// Intercepteur pour gérer les erreurs
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response) {
            const { status, data } = error.response;
            
            if (status === 429) {
                console.error('⚠️ Trop de requêtes. Veuillez patienter.');
            } else if (status === 413) {
                console.error('⚠️ Fichier trop volumineux.');
            } else if (status === 415) {
                console.error('⚠️ Format de fichier non supporté.');
            } else if (status === 404) {
                console.error('⚠️ Ressource non trouvée.');
            } else if (status === 500) {
                console.error('❌ Erreur serveur.');
            }
            
            error.message = data?.detail || 'Une erreur est survenue';
        } else if (error.request) {
            error.message = 'Impossible de contacter le serveur. Vérifiez que le backend est lancé.';
            console.error('❌', error.message);
        }
        
        return Promise.reject(error);
    }
); 

export default api;