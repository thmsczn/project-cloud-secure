# Delivecrous Front

## Architecture du Projet

L'application Delivecrous est développée en utilisant React Native, une bibliothèque JavaScript pour créer des applications mobiles multiplateformes. Voici l'architecture clé du projet :

- **src** : Le répertoire source principal contenant tous les fichiers source de l'application.
- **assets** : Les fichiers statiques, tels que les images et les polices.
- **components** : Les composants réutilisables de l'application.
- **pages** : Les écrans de l'application, chacun dans son propre fichier.
- **navigation** : La configuration de la navigation entre les écrans.
- **node_modules** : Les dépendances du projet.
- **App.js** : Le composant racine de l'application.

## Configuration

L'application utilise un fichier de configuration nommé `config.json` pour personnaliser les paramètres. Assurez-vous de configurer le fichier `config.json` pour spécifier l'adresse IPv4 de votre serveur ou de votre machine. Voici un exemple de contenu pour `config.json` :
```json
{
  "IPv4": "192.168.0.100" 
}
```



## Exécution

Après avoir configuré le fichier `config.json`, vous pouvez lancer l'application en utilisant la commande suivante :

```shell
npm start
```
Assurez-vous d'avoir installé l'application Expo Go sur votre téléphone. Après avoir scanné le QR code généré par votre IDE, vous aurez accès à l'application et pourrez commencer à l'utiliser.

Assurez-vous également d'avoir installé toutes les dépendances requises en utilisant npm install avant de lancer l'application.

```shell
npm install
```
## Structure

-**Carte (Home) :**
Cette page d'accueil affiche une liste de plats disponibles à la commande.
Les utilisateurs peuvent filtrer les plats par catégorie (par exemple, entrées, plats principaux, desserts).
Les utilisateurs peuvent parcourir les plats et ajouter des articles à leur panier.
Il y a un bouton de connexion dans le coin supérieur droit, qui redirige les utilisateurs vers la page de connexion s'ils ne sont pas déjà connectés.

-**Menu :**
Cette page affiche un menu de navigation latérale pour les utilisateurs connectés.
Lorsqu'un utilisateur est connecté, il voit un message de bienvenue avec son nom d'utilisateur.
Les options du menu incluent "Mon Profil" pour voir et éditer le profil de l'utilisateur, "Mes Commandes" pour voir l'historique des commandes de l'utilisateur, et "Se Déconnecter" pour se déconnecter de son compte.

-**Panier :**
Cette page récapitule les articles que l'utilisateur a ajoutés à son panier.
Les utilisateurs peuvent ajuster la quantité des articles, les supprimer du panier et passer à la page de confirmation de commande.
Le montant total de la commande est affiché.

-**DataDetails :**
Cette page affiche les détails d'un plat spécifique, y compris une image, le nom, la description, les allergènes et le prix.
Les utilisateurs peuvent ajouter cet article à leur panier ou ajuster la quantité s'il est déjà dans le panier.

-**PageLogin :**
Cette page permet aux utilisateurs de se connecter à leur compte.
Les utilisateurs doivent saisir leur adresse e-mail et leur mot de passe pour se connecter.
Il y a également un lien pour créer un nouveau compte.

-**PageCreationCompte :**
Cette page permet aux nouveaux utilisateurs de créer un compte.
Les utilisateurs doivent saisir leur nom, leur adresse e-mail, leur mot de passe, etc.

-**PageConfirmation :**
Cette page s'affiche après que l'utilisateur ait confirmé sa commande.
Elle affiche un message de confirmation et récapitule les articles commandés, y compris leur quantité et leur prix.
Il y a un bouton pour revenir à la page d'accueil ou à d'autres sections de l'application.

-**MonCompte :**
Cette page affiche les informations du compte de l'utilisateur.
Les informations telles que le nom d'utilisateur, l'adresse e-mail et le solde du compte sont affichées.
Cela permet aux utilisateurs de consulter leur profil.

-**CommandesPage :**
Cette page affiche la liste des commandes passées par l'utilisateur.
Les informations sur chaque commande, telles que le numéro de commande, l'adresse de livraison, le statut et la date de commande, sont répertoriées.
Les détails des plats commandés sont également affichés pour chaque commande.

Réalisé par :
Oglialoro Ugo
Rafa Clément
Jardez Florian
IKharrazen Ilyas
