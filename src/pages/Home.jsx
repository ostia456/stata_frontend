import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <div className="text-center mb-8 md:mb-12">
        <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">
           Stata
        </h1>
        <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto px-4">
          Exploration automatique de données CSV/Excel
        </p>
        <p className="text-sm md:text-base text-gray-500 mt-2">
          Statistiques • Corrélations • Normalité • Outliers • Rapport PDF
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 max-w-4xl mx-auto mb-8 md:mb-12">
        <div className="card text-center">
          <div className="text-3xl mb-3">📁</div>
          <h3 className="font-semibold mb-2 text-base md:text-lg">Upload facile</h3>
          <p className="text-gray-600 text-xs md:text-sm">CSV, XLSX, XLS supportés</p>
        </div>
        <div className="card text-center">
          <div className="text-3xl mb-3">📈</div>
          <h3 className="font-semibold mb-2 text-base md:text-lg">Analyses complètes</h3>
          <p className="text-gray-600 text-xs md:text-sm">Statistiques, corrélations, normalité</p>
        </div>
        <div className="card text-center">
          <div className="text-3xl mb-3">📄</div>
          <h3 className="font-semibold mb-2 text-base md:text-lg">Rapports PDF</h3>
          <p className="text-gray-600 text-xs md:text-sm">Téléchargement et partage</p>
        </div>
      </div>

      <div className="text-center">
        <Link to="/upload" className="btn-primary inline-block text-base md:text-lg px-6 md:px-8 py-2 md:py-3">
          Commencer l'analyse →
        </Link>
      </div>
    </div>
  )
}

export default Home