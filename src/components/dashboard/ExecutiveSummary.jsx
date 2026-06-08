const ExecutiveSummary = ({ summary, quality, mlDetection }) => {
  return (
    <div className="space-y-4">
      <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl p-6">
        <h3 className="font-semibold text-gray-800 mb-2"> Résumé exécutif</h3>
        <p className="text-gray-700 leading-relaxed">{summary || 'Analyse terminée avec succès'}</p>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div className="border rounded-lg p-4">
          <h4 className="font-medium text-gray-700 mb-2"> Points clés</h4>
          <ul className="space-y-1 text-sm text-gray-600">
            <li>• Score qualité: {quality?.total_score || 0}/100 (Grade {quality?.grade || 'N/A'})</li>
            <li>• Problème ML: {mlDetection?.problem_type?.message || 'Non détecté'}</li>
            <li>• Colonne cible: {mlDetection?.target_column || 'Non identifiée'}</li>
            <li>• Niveau préparation: {mlDetection?.ready_for_ml?.ready_level || 'N/A'}</li>
          </ul>
        </div>
        <div className="border rounded-lg p-4">
          <h4 className="font-medium text-gray-700 mb-2"> Actions prioritaires</h4>
          <ul className="space-y-1 text-sm text-gray-600">
            {mlDetection?.recommendations?.slice(0, 3).map((rec, idx) => (
              <li key={idx}>• {rec.action}</li>
            ))}
            {(!mlDetection?.recommendations || mlDetection.recommendations.length === 0) && (
              <li>• Aucune action prioritaire détectée</li>
            )}
          </ul>
        </div>
      </div>

      <div className="bg-blue-50 rounded-lg p-4">
        <h4 className="font-medium text-blue-800 mb-2"> Prochaine étape recommandée</h4>
        <p className="text-blue-700 text-sm">
          {mlDetection?.ready_for_ml?.ready 
            ? "Les données sont prêtes pour l'entraînement. Commencez par séparer les données en train/test."
            : "Nettoyez d'abord les données selon les recommandations ci-dessus avant de passer au ML."}
        </p>
      </div>
    </div>
  )
}

export default ExecutiveSummary