# JS-Ecom API

API Node.js / Express pour une boutique e‑commerce, utilisant Sequelize avec SQLite comme base de données.

## Prérequis

- **Node.js** (version 16+ recommandée)
- **npm** (fourni avec Node.js)
- **SQLite** installé sur votre machine

### Installation de SQLite (Windows)

1. Aller sur la page de téléchargement officielle : https://www.sqlite.org/download.html
2. Dans la section **Precompiled Binaries for Windows**, télécharger :
   - `sqlite-tools-win32-x86-*.zip` (contient l’exécutable `sqlite3.exe`).
3. Extraire l’archive dans un dossier, par exemple `C:\sqlite`.
4. (Optionnel mais recommandé) Ajouter ce dossier au `PATH` Windows :
   - Rechercher "Variables d’environnement" dans le menu Démarrer.
   - Modifier la variable `Path` de votre utilisateur.
   - Ajouter `C:\sqlite`.
5. Vérifier dans un nouveau terminal PowerShell :

```powershell
sqlite3 --version
```

Si une version s’affiche, SQLite est correctement installé.

## Installation du projet

Dans un terminal PowerShell, placer-vous dans le dossier du projet :

Installer les dépendances :

```powershell
npm install
```

Les principales dépendances sont :
- `express` : framework HTTP
- `sequelize` : ORM
- `sqlite3` : driver base de données SQLite
- `swagger-ui-express` : documentation API
- `jsonwebtoken`, `express-jwt`, `bcrypt` : auth & sécurité

## Configuration de la base SQLite

La configuration Sequelize/SQLite se trouve dans `models/index.js` (fichier existant dans ce projet). Par défaut, Sequelize crée un fichier de base de données SQLite (par ex. `database.sqlite`) dans le dossier du projet ou selon la configuration définie.

Aucune configuration complexe n’est requise pour démarrer : tout est piloté par Sequelize et `sqlite3` déjà présent dans les dépendances.

## Initialiser la base de données

Le script `scripts/init-db.js` permet de :
- créer les tables via Sequelize,
- créer le rôle **admin**,
- créer l’utilisateur admin par défaut,
- créer quelques catégories et produits de test.

Pour exécuter l’initialisation :

```powershell
npm run init-db
```

Ce script va :
- synchroniser le schéma dans la base SQLite,
- créer (si besoin) :
  - rôle `admin`,
  - utilisateur `admin@example.com` avec le mot de passe `admin123`,
  - catégories et produits de démonstration.

## Lancer l’API

Pour démarrer le serveur de développement (via `nodemon`) :

```powershell
npm start
```

L’API démarre alors par défaut sur le port **8080** :

- Racine de test : `http://localhost:8080/` (retourne "Hello world !!")
- Documentation Swagger : `http://localhost:8080/api-docs`

Les routes d’API sont montées sous le préfixe `/api` dans `main.js`.

## Authentification et rôles

- L’API utilise JWT via le middleware `middlewares/auth.js`.
- Les routes sous `/api` sont protégées par défaut.
- Un utilisateur admin est créé par `npm run init-db` :
  - Email : `admin@example.com`
  - Mot de passe : `admin123`

Pour obtenir un token, utiliser le point d’entrée d’authentification défini dans les routes utilisateur (voir `routes/user.js` et la documentation Swagger dans `swagger.json`).

Une fois le token récupéré, l’envoyer dans l’en-tête `Authorization` :

```text
Authorization: Bearer <votre_token_jwt>
```

## Routage principal

- `main.js` : point d’entrée de l’application (Express, middlewares, Swagger, routes).
- `routes/index.js` : montage des sous‑routes (produits, catégories, utilisateurs, etc.).
- `controllers/*` : logique métier des différentes entités.
- `models/*` : modèles Sequelize (User, Product, Category, etc.).

## Utilisation rapide de l’API

1. Installer dépendances et SQLite (voir sections précédentes).
2. Initialiser la base :
   ```powershell
   npm run init-db
   ```
3. Démarrer l’API :
   ```powershell
   npm start
   ```
4. Ouvrir la doc : `http://localhost:8080/api-docs`.
5. Se connecter avec l’utilisateur admin créé, récupérer un token JWT, puis appeler les routes `/api/...` en ajoutant l’en-tête `Authorization`.

## Dépannage

- **`sqlite3` n’est pas reconnu** :
  - Vérifier que le dossier contenant `sqlite3.exe` est bien dans le `PATH`.
  - Ouvrir un nouveau terminal après modification du `PATH`.
- **Erreur de connexion base / Sequelize** :
  - Vérifier le fichier `models/index.js` (nom du fichier SQLite, emplacement, options Sequelize).
  - Vérifier que `npm install` s’est bien terminé sans erreur.
- **Port déjà utilisé (8080)** :
  - Fermer l’application qui utilise déjà ce port,
  - ou modifier la constante `port` dans `main.js`.
