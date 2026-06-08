import { Link } from 'react-router-dom'
import { useState } from 'react'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="bg-gray-800 text-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <Link to="/" className="text-xl font-bold flex items-center gap-2">
             Stata
          </Link>
          
          {/* Mobile menu button */}
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-700 transition"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
          
          {/* Desktop menu */}
          <div className="hidden md:flex gap-6">
            <Link to="/" className="hover:text-blue-300 transition">Accueil</Link>
            <Link to="/upload" className="hover:text-blue-300 transition">Upload</Link>
            <Link to="/history" className="hover:text-blue-300 transition">Historique</Link>
          </div>
        </div>
        
        {/* Mobile menu */}
        {isOpen && (
          <div className="md:hidden pb-4 flex flex-col gap-3">
            <Link to="/" className="hover:text-blue-300 transition py-2" onClick={() => setIsOpen(false)}>Accueil</Link>
            <Link to="/upload" className="hover:text-blue-300 transition py-2" onClick={() => setIsOpen(false)}>Upload</Link>
            <Link to="/history" className="hover:text-blue-300 transition py-2" onClick={() => setIsOpen(false)}>Historique</Link>
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navbar