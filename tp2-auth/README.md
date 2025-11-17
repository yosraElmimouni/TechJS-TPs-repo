# TP2: Authentication and Books Management Application

Une application web complète d'authentification et de gestion de livres utilisant Node.js, Express, MongoDB, Passport.js, Pug, et Tailwind CSS.

## Fonctionnalités

- **Inscription d'utilisateurs** : Créez un nouveau compte avec validation des données
- **Connexion sécurisée** : Authentification avec Passport.js et stockage sécurisé des mots de passe (bcryptjs)
- **Page protégée** : Accès à la page des livres uniquement après authentification
- **Gestion des sessions** : Sessions utilisateur persistantes avec express-session
- **Base de données MongoDB** : Stockage des utilisateurs dans MongoDB
- **Interface élégante** : Design moderne avec Tailwind CSS

## Architecture du Projet

```
tp2-auth/
├── node_modules/
├── public/
│   └── css/
│       ├── input.css
│       └── tailwind.css
├── views/
│   ├── layout.pug
│   ├── register.pug
│   ├── login.pug
│   └── books.pug
├── models/
│   └── User.js
├── routes/
│   ├── auth.js
│   └── books.js
├── app.js
├── .env
├── package.json
├── tailwind.config.js
├── postcss.config.js
└── README.md
```

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

## Utilisation

### Flux d'utilisation

1. **Accueil** : Accédez à `http://localhost:3000`
2. **Inscription** : Cliquez sur "Register" et remplissez le formulaire
3. **Connexion** : Utilisez vos identifiants pour vous connecter
4. **Livres** : Après la connexion, consultez la liste des livres
5. **Déconnexion** : Cliquez sur "Logout" pour vous déconnecter

### Comptes de test

Vous pouvez créer vos propres comptes via la page d'inscription.

## Dépendances principales

| Package | Version | Utilisation |
|---------|---------|-------------|
| express | ^5.1.0 | Framework web |
| mongoose | ^8.20.0 | ODM pour MongoDB |
| passport | ^0.7.0 | Authentification |
| passport-local | ^1.0.0 | Stratégie locale |
| pug | ^3.0.3 | Moteur de template |
| bcryptjs | ^3.0.3 | Hachage des mots de passe |
| express-session | ^1.18.2 | Gestion des sessions |
| connect-flash | ^0.1.1 | Messages flash |
| tailwindcss | ^4.1.17 | Framework CSS |

## Configuration détaillée

### Modèle User

Le modèle User stocke les informations suivantes :
- `username` : Nom d'utilisateur unique
- `email` : Email unique
- `password` : Mot de passe haché
- `createdAt` : Date de création

### Routes

#### Routes d'authentification (`/auth`)
- `GET /auth/register` : Page d'inscription
- `POST /auth/register` : Soumettre l'inscription
- `GET /auth/login` : Page de connexion
- `POST /auth/login` : Soumettre la connexion
- `GET /auth/logout` : Déconnexion

#### Routes des livres (`/books`)
- `GET /books` : Liste des livres (protégée)

### Middleware d'authentification

Le middleware `isAuthenticated` dans `routes/books.js` vérifie que l'utilisateur est connecté avant d'accéder aux livres.

## Sécurité

- Les mots de passe sont hachés avec bcryptjs (10 rounds)
- Les sessions sont sécurisées avec des cookies httpOnly
- Les données utilisateur sont validées côté serveur
- Les emails et noms d'utilisateur sont uniques

## Développement

### Scripts disponibles

```bash
npm start        # Démarrer l'application
npm run dev      # Démarrer l'application (alias)
npm run build:css # Compiler Tailwind CSS
```

### Modifier les styles

Pour modifier les styles Tailwind :

1. Éditez les fichiers Pug dans `views/`
2. Utilisez les classes Tailwind
3. Compilez avec `npm run build:css`

## Dépannage

### MongoDB ne se connecte pas
- Vérifiez que MongoDB est en cours d'exécution
- Vérifiez l'URI dans `.env`
- Pour MongoDB Atlas, assurez-vous que votre IP est autorisée

### Erreurs de session
- Supprimez les cookies du navigateur
- Redémarrez l'application
- Vérifiez que `SESSION_SECRET` est défini

### Tailwind CSS ne s'applique pas
- Vérifiez que le fichier `tailwind.css` existe
- Exécutez `npm run build:css`
- Videz le cache du navigateur

## Améliorations futures

- Ajouter une page de profil utilisateur
- Implémenter la réinitialisation de mot de passe
- Ajouter des rôles et permissions
- Implémenter OAuth (Google, GitHub)
- Ajouter des tests unitaires
- Déployer sur un serveur de production

## Licence

ISC

## Auteur

Créé pour le TP2 d'authentification web.
