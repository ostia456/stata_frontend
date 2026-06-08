import healthService from './services/healthService';

// Tester la connexion au backend
const testConnection = async () => {
  try {
    const health = await healthService.healthCheck();
    console.log('✅ Backend connecté:', health);
  } catch (error) {
    console.error('❌ Backend non accessible:', error.message);
  }
};

testConnection();