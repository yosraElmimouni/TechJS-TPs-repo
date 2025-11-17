# Correction du TP: Book Reading Tracker

Ce dossier contient la correction complète du TP, structurée en deux parties : le **backend** (API REST avec Express/Mongoose) et le **frontend** (Interface utilisateur avec HTML/JS/Tailwind).

## 1. Problèmes et Corrections

### A. Backend (API)

| Problème Identifié | Correction Apportée |
| :--- | :--- |
| **Validation Manquante** | Ajout de la validation pour s'assurer que `pagesRead` est inférieur ou égal à `numberOfPages` et que les champs requis sont présents. |
| **Gestion des Statistiques** | Ajout d'une nouvelle route `/api/books/stats` et d'une fonction `getStats` dans le contrôleur pour calculer et retourner les statistiques globales (total de livres lus, total de pages lues). |

### B. Frontend (Interface Utilisateur)

| Problème Identifié | Correction Apportée |
| :--- | :--- |
| **Classe `Book`** | Ajout de la méthode `currentlyAt` pour calculer le pourcentage de lecture. La méthode `deleteBook` est conservée. |
| **Affichage des Statistiques** | Implémentation de la fonction `displayStats` pour récupérer et afficher les statistiques globales dans la section `#stats`. |
| **Mise à jour de la Lecture** | Ajout d'une fonctionnalité pour mettre à jour le nombre de pages lues (`pagesRead`) directement depuis la liste des livres. |
| **Validation Frontend** | Ajout d'une validation côté client pour s'assurer que `pagesRead` n'est pas supérieur à `numberOfPages` avant l'envoi du formulaire. |
| **Affichage Détaillé** | Amélioration de l'affichage de chaque livre pour inclure le statut, le format, le prix, et le bouton de mise à jour. |

## 2. Étapes pour Exécuter la Correction

### Prérequis

*   Node.js (version 18+)
*   MongoDB (local ou cloud - une chaîne de connexion est nécessaire)

### A. Configuration du Backend

1.  Naviguez vers le dossier `backend`:
    ```bash
    cd BookTracker/Book Tracker/backend
    ```
2.  Installez les dépendances:
    ```bash
    npm install
    ```
3.  Créez un fichier `.env` à la racine du dossier `backend` et ajoutez votre chaîne de connexion MongoDB. Par exemple:
    ```
    MONGO_URI=mongodb://localhost:27017/booktracker
    ```
4.  Démarrez le serveur:
    ```bash
    npm start
    ```
    Le serveur devrait démarrer sur `http://localhost:5000`.

### B. Configuration du Frontend

1.  Naviguez vers le dossier `frontend`:
    ```bash
    cd ../frontend
    ```
2.  Installez les dépendances (pour TypeScript):
    ```bash
    npm install
    ```
3.  Compilez le code TypeScript en JavaScript:
    ```bash
    npm run build
    ```
4.  Ouvrez le fichier `index.html` dans votre navigateur.

---
**Note:** Le code corrigé se trouve dans les dossiers `backend/src` et `frontend/src`.
