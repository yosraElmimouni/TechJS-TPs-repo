# 📚 Book Reading Tracker

Une application web simple et élégante pour suivre votre progression de lecture et gérer votre bibliothèque personnelle.

## 🎯 Fonctionnalités

- **Formulaire d'enregistrement de livres** : Ajoutez facilement de nouveaux livres avec tous les détails
- **Suivi de la progression** : Suivez le nombre de pages lues avec une barre de progression visuelle
- **Statuts personnalisés** : Catégorisez vos livres (Lue, Relue, En cours, Abandonnée, etc.)
- **Formats variés** : Support de plusieurs formats (Papier, PDF, Ebook, Audiobook)
- **Statistiques globales** : Visualisez le nombre total de livres lus et de pages parcourues
- **Stockage local** : Les données sont sauvegardées automatiquement dans le navigateur (localStorage)

## 📋 Propriétés d'un Livre

- **Titre** (string) : Titre du livre
- **Auteur** (string) : Nom de l'auteur
- **Pages** (number) : Nombre total de pages
- **Pages lues** (number) : Nombre de pages lues (< nombre total)
- **Statut** (enum) : Read, Re-read, DNF, Currently reading, Returned Unread, Want to read
- **Format** (enum) : Print, PDF, Ebook, AudioBook
- **Prix** (number) : Prix du livre
- **Suggéré par** (string) : Personne qui a suggéré le livre
- **Finished** (boolean) : Automatiquement défini à 1 quand pages lues = pages totales

## 🔧 Classe Book

### Méthodes

- **constructor()** : Initialise un nouveau livre avec ses propriétés
- **currentlyAt()** : Retourne la position actuelle (ex: "150/300 pages")
- **getProgress()** : Retourne le pourcentage de lecture
- **updateProgress(pagesRead)** : Met à jour les pages lues et le statut finished
- **deleteBook()** : Supprime le livre

## 🚀 Utilisation

### Option 1 : Fichier HTML Standalone (Recommandé)

1. Ouvrez simplement le fichier `index.html` dans votre navigateur
2. Aucune installation ou compilation requise
3. Les données sont automatiquement sauvegardées dans votre navigateur

```bash
# Ouvrir le fichier dans le navigateur
open index.html  # macOS
# ou
xdg-open index.html  # Linux
# ou
start index.html  # Windows
```

### Option 2 : Utiliser le TypeScript

Si vous voulez compiler le TypeScript :

```bash
# Installer TypeScript globalement
npm install -g typescript

# Compiler le fichier Book.ts
tsc Book.ts --target ES2020 --module ES2020

# Utiliser le fichier compilé dans votre application
```

## 📁 Structure des Fichiers

```
book-reading-tracker/
├── index.html          # Application web complète (standalone)
├── Book.ts             # Classe Book en TypeScript
├── README.md           # Ce fichier
└── package.json        # Configuration npm (optionnel)
```

## 🎨 Design

L'application utilise **Tailwind CSS** pour un design moderne et responsive :
- Interface claire et intuitive
- Dégradés et animations fluides
- Responsive design (mobile, tablette, desktop)
- Palette de couleurs cohérente

## 💾 Stockage des Données

Les données sont stockées dans `localStorage` du navigateur :
- Aucun serveur requis
- Persistance automatique
- Données privées (restent sur votre machine)

## 🔄 Mise à Jour Automatique

Quand vous modifiez le nombre de pages lues :
- La barre de progression se met à jour en temps réel
- Le pourcentage est recalculé
- Si pages lues = pages totales, le statut "finished" passe à 1
- Un badge "✓ Terminé" s'affiche

## 📊 Statistiques

L'application affiche automatiquement :
- **Livres lus** : Nombre de livres avec le statut "finished" = 1
- **Pages lues** : Total des pages lues dans tous les livres
- **Total de livres** : Nombre total de livres dans la bibliothèque

## 🛡️ Sécurité

- Pas d'envoi de données à un serveur
- Pas de cookies tiers
- Données chiffrées localement dans le navigateur
- Vous avez le contrôle total de vos données

## 🐛 Dépannage

### Les données ne sont pas sauvegardées
- Vérifiez que localStorage est activé dans votre navigateur
- Assurez-vous que vous n'êtes pas en mode navigation privée

### La barre de progression ne s'affiche pas correctement
- Actualisez la page (F5 ou Cmd+R)
- Videz le cache du navigateur

## 📝 Exemple d'Utilisation

1. **Ajouter un livre** :
   - Titre : "Le Seigneur des Anneaux"
   - Auteur : "J.R.R. Tolkien"
   - Pages : 1178
   - Pages lues : 150
   - Statut : "Currently reading"
   - Format : "Print"
   - Prix : 25.99€
   - Suggéré par : "Mon ami Jean"

2. **Suivre la progression** :
   - Mettez à jour le nombre de pages lues
   - La barre de progression se met à jour automatiquement
   - Quand vous atteignez 1178 pages, le livre est marqué comme "Terminé"

3. **Consulter les statistiques** :
   - Voyez le nombre total de livres lus
   - Consultez le nombre total de pages parcourues

## 📄 Licence

Ce projet est fourni à titre d'exemple éducatif.

## 🤝 Support

Pour toute question ou suggestion, n'hésitez pas à consulter le code source ou à modifier l'application selon vos besoins.

---

**Bon suivi de lecture! 📚✨**
