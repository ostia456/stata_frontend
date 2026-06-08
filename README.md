# 📊 Stata - Frontend

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

**Stata** est une plateforme web d'analyse exploratoire automatisée des données.  
Ce dépôt contient l'**interface utilisateur (frontend)** développée avec **React**.

👉 **Voir le dépôt backend** : [stata_backend](https://github.com/ostia456/stata_backend)

---

## ✨ Fonctionnalités

- 📁 **Upload** : import de fichiers CSV, XLSX, XLS (jusqu’à 200 Mo)
- 📊 **Statistiques descriptives** : moyenne, médiane, écart‑type, asymétrie, aplatissement
- ❌ **Valeurs manquantes** : détection, pourcentage, suggestions d’imputation
- ⚠️ **Outliers** : détection automatique par la méthode IQR
- 🔗 **Corrélations** : matrices de Pearson et Spearman
- 📐 **Normalité** : test de Shapiro‑Wilk
- 🎯 **Détection ML** : identification de la colonne cible et du type de problème
- 📈 **Visualisations interactives** : histogrammes, boxplots, heatmaps avec Plotly
- 📄 **Rapports** : export HTML et PDF (via l’API backend)

---

## 🚀 Installation et lancement

```bash
# 1. Cloner le dépôt
git clone https://github.com/ostia456/stata_frontend.git
cd stata_frontend

# 2. Installer les dépendances
npm install

# 3. Lancer l’application en mode développement
npm run dev