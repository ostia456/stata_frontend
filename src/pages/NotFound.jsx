import { Link } from 'react-router-dom'

const NotFound = () => {
  return (
    <div className="container mx-auto px-4 py-20 text-center">
      <div className="text-6xl mb-4"></div>
      <h1 className="text-3xl font-bold mb-2">Page non trouvée</h1>
      <p className="text-gray-600 mb-6">La page que vous recherchez n'existe pas.</p>
      <Link to="/" className="btn-primary">
        Retour à l'accueil
      </Link>
    </div>
  )
}

export default NotFound