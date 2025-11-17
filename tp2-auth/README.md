# TP2: Authentication and Books Management Application

Une application web complète d'authentification et de gestion de livres utilisant Node.js, Express, MongoDB, Passport.js, Pug, et Tailwind CSS.

## Fonctionnalités

- **Inscription d'utilisateurs** : Créez un nouveau compte avec validation des données
- **Connexion sécurisée** : Authentification avec Passport.js et stockage sécurisé des mots de passe (bcryptjs)
- **Page protégée** : Accès à la page des livres uniquement après authentification
- **Gestion des sessions** : Sessions utilisateur persistantes avec express-session
- **Base de données MongoDB** : Stockage des utilisateurs dans MongoDB
- **Interface élégante** : Design moderne avec Tailwind CSS


## Installation

### Prérequis

- Node.js (v14 ou supérieur)
- MongoDB (local ou Atlas)
- npm ou yarn

### Étapes d'installation

1. **Clonez ou extrayez le projet**
   ```bash
   cd tp2-auth
   ```

2. **Installez les dépendances**
   ```bash
   npm install
   ```

3. **Configurez les variables d'environnement**
   
   Modifiez le fichier `.env` :
   ```env
   MONGODB_URI=mongodb://localhost:27017/tp2-auth
   PORT=3000
   SESSION_SECRET=your-secret-key-change-this
   ```

   Si vous utilisez MongoDB Atlas :
   ```env
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/tp2-auth
   ```

4. **Démarrez l'application**
   ```bash
   npm start
   ```

   L'application sera disponible à `http://localhost:3000`

