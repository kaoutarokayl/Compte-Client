## Application Client React pour la Gestion des Comptes

Ce projet est une application web simple, développée en React, qui permet d'interagir avec une API REST pour gérer une liste de comptes clients. L'application utilise Bootstrap pour le style.

 ## Fonctionnalités
 
# Affichage de la liste des comptes: 
L'application affiche une liste des comptes clients, incluant leur ID, solde, date de création et type.

# Ajout de nouveaux comptes: 
Un formulaire permet de créer de nouveaux comptes en saisissant les informations nécessaires. La validation côté client est mise en place pour garantir la qualité des données.

## Prérequis

# Node.js et npm:
Assurez-vous que Node.js et npm (Node Package Manager) sont installés sur votre système. Téléchargez-les depuis https://nodejs.org/.

# Un serveur REST:
Ce projet nécessite un serveur REST fonctionnel qui expose les endpoints suivants :

# GET /api/comptes:
Retourne la liste des comptes.

# POST /api/comptes: 
Crée un nouveau compte.

L'URL de base de l'API est configurée dans le fichier src/config.js.

## Installation et Lancement
Clonez le dépôt:

git clone [URL_DU_DÉPÔT_GIT]
cd restcontroller


# Installez les dépendances:
Bash
npm install

# Lancez l'application:
Bash
npm start

L'application sera accessible via votre navigateur à l'adresse http://localhost:3005.

## Architecture
L'application utilise les technologies suivantes :
React: Pour la création de l'interface utilisateur.
Axios: Pour les requêtes HTTP vers l'API REST.
Bootstrap: Pour le style et la mise en forme de l'interface.

## Vidéo Démonstrative


https://github.com/user-attachments/assets/b9c4b167-537e-4701-a062-3f941c4c7991

