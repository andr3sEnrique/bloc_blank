# Application de Gestion de Garage

Une application de gestion de garage avec un backend Node.js/Express et un frontend React/Vite.

## Prérequis

- Node.js (version 16 ou supérieure)
- npm ou yarn
- MySQL (version 5.7 ou supérieure)
- Git

## Installation et Configuration

### 1. Cloner le projet

```bash
git clone https://github.com/andr3sEnrique/bloc_blank.git
cd BC3_BB1_JS
```

### 2. Configuration de la base de données

#### Option A: Installation MySQL locale
1. Installez MySQL sur votre système
2. Créez la base de données en exécutant le script SQL :
```bash
mysql -u root -p < configs/garage.sql
```

#### Option B: Utilisation de Docker (recommandé)
```bash
docker-compose up -d
```

### 3. Configuration du serveur (Backend)

#### Installation des dépendances
```bash
npm install
```

#### Configuration des variables d'environnement
Créez un fichier `.env` à la racine du projet avec les variables suivantes :

```env
DB_HOST=''
DB_USER='votre_user_mysql'
DB_PASS=votre_mot_de_passe_mysql
DB_NAME=garage_db
DB_PORT='votre_port'
```

**Note :** Modifiez `DB_PASS` avec votre mot de passe MySQL réel.

### 4. Configuration du client (Frontend)

#### Naviguer vers le dossier client
```bash
cd client
```

#### Installation des dépendances
```bash
npm install
```

## Démarrage de l'application

### 1. Démarrer le serveur (Backend)

Depuis la racine du projet :
```bash
npm start
```

Le serveur démarrera sur `http://localhost:3000`

### 2. Démarrer le client (Frontend)

Dans un nouveau terminal, depuis le dossier `client` :
```bash
cd client
npm run dev
```

Le client démarrera sur `http://localhost:5173`

## Scripts disponibles

### Serveur (Backend)
- `npm start` : Démarre le serveur avec nodemon (redémarrage automatique)
- `npm test` : Lance les tests Jest

### Client (Frontend)
- `npm run dev` : Démarre le serveur de développement Vite
- `npm run build` : Construit l'application pour la production
- `npm run preview` : Prévisualise la version de production
- `npm run test` : Lance les tests Vitest
- `npm run coverage` : Lance les tests avec couverture de code
- `npm run lint` : Vérifie le code avec ESLint

## Structure du projet

```
BC3_BB1_JS/
├── server.js              # Serveur Express principal
├── package.json           # Dépendances du serveur
├── .env                   # Variables d'environnement
├── docker-compose.yml     # Configuration Docker
├── configs/
│   └── garage.sql         # Script de création de la base de données
└── client/                # Application React
    ├── package.json       # Dépendances du client
    ├── vite.config.js     # Configuration Vite
    ├── src/
    │   ├── App.jsx        # Composant principal
    │   ├── main.jsx       # Point d'entrée
    │   ├── components/    # Composants React
    │   └── utils/         # Utilitaires
    └── public/            # Fichiers statiques
```

## Technologies utilisées

### Backend
- **Express.js** : Framework web pour Node.js
- **MySQL2** : Driver MySQL pour Node.js
- **bcryptjs** : Hachage des mots de passe
- **jsonwebtoken** : Authentification JWT
- **cors** : Gestion des requêtes cross-origin
- **helmet** : Sécurisation des en-têtes HTTP
- **express-validator** : Validation des données
- **csrf** : Protection contre les attaques CSRF
- **nodemon** : Redémarrage automatique du serveur

### Frontend
- **React** : Bibliothèque JavaScript pour l'interface utilisateur
- **Vite** : Outil de build rapide
- **React Router** : Routage côté client
- **Bootstrap** : Framework CSS
- **Vitest** : Framework de test

## Identifiants de test

### Compte Administrateur
- **Email :** garagiste@vroumvroum.fr
- **Mot de passe :** Azerty@01

### Compte Client
- **Email :** edward.elric@alchem.fma
- **Mot de passe :** Azerty@01

## Fonctionnalités

- **Authentification** : Connexion/inscription avec JWT
- **Gestion des rôles** : Admin et Client
- **Gestion des véhicules** : CRUD complet (Admin uniquement)
- **Gestion des clients** : Visualisation et comptage (Admin uniquement)
- **Interface responsive** : Compatible mobile et desktop
- **Sécurité** : Protection CSRF, validation des données, hachage des mots de passe

## Dépannage

### Problèmes courants

1. **Erreur de connexion à la base de données**
   - Vérifiez que MySQL est démarré
   - Vérifiez les variables d'environnement dans le fichier `.env`
   - Assurez-vous que la base de données `garage_db` existe

2. **Port déjà utilisé**
   - Le serveur utilise le port 3000
   - Le client utilise le port 5173
   - Fermez les autres applications utilisant ces ports

3. **Erreurs de dépendances**
   - Supprimez `node_modules` et `package-lock.json`
   - Relancez `npm install`

4. **Problèmes CORS**
   - Vérifiez que le client fonctionne sur `http://localhost:5173`
   - Le serveur est configuré pour accepter les requêtes de cette origine

## Développement

### Ajout de nouvelles fonctionnalités
1. Backend : Ajoutez les routes dans `server.js`
2. Frontend : Créez les composants dans `client/src/components/`
3. Tests : Ajoutez les tests correspondants

### Base de données
- Le schéma est défini dans `configs/garage.sql`
- Utilisez les migrations pour les modifications de structure

## Production

Pour déployer en production :

1. Construisez le client :
```bash
cd client
npm run build
```

2. Le serveur servira automatiquement les fichiers statiques depuis `client/dist`

3. Configurez les variables d'environnement de production

4. Utilisez un gestionnaire de processus comme PM2 :
```bash
npm install -g pm2
pm2 start server.js
