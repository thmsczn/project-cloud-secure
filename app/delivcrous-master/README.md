# Delivcrous Backend

Delivcrous est une application de livraison qui permet aux utilisateurs de commander des plats depuis différents restaurants.

## Structure du Projet

La structure du projet est organisée comme suit :

- `src/main/java/com/example/delivcrous` : Contient le code source principal du projet.
    - `controller` : Contient les contrôleurs pour gérer les requêtes HTTP.
    - `model` : Contient les modèles de données utilisés dans l'application.
    - `repository` : Contient les interfaces de répository pour interagir avec la base de données.
    - `service` : Contient les services pour la logique métier.
    - `security` : Contient les configurations et utilitaires pour la sécurité et l'authentification.
    - `exceptions` : Contient les classes d'exception personnalisées.
    - `payload` : Contient les classes de requête et de réponse.
- `src/main/resources` : Contient les fichiers de ressources comme `application.properties`.
- `src/test` : Contient les tests unitaires et d'intégration (pas eu le temps des les faire)

## Installation et Exécution

1. Assurez-vous que Maven et Java sont installés sur votre machine.
2. Clonez ce dépôt dans votre machine locale.
3. Naviguez vers le répertoire du projet et exécutez la commande suivante pour construire le projet :
```bash
mvn clean install
```

Vous pouvez ensuite démarrer l'application java avec votre IDE. 

## API Endpoints

L'application fournit plusieurs endpoints API pour interagir avec le système. Voici quelques exemples d'endpoints :

    POST /api/utilisateurs/register : Permet de créer un nouvel utilisateur.
    POST /api/utilisateurs/login : Permet à un utilisateur de se connecter.
    GET /api/plats/getplats : Renvoie la liste des plats disponibles.
    GET /api/panier/getpanier : Renvoie le panier de l'utilisateur connecté
    POST /api/panier/postpanier : Enregistre le panier de l'utilisateur connecté
    POST /api/commandes/createcommande : Permet de créer une nouvelle commande pour l'utilisateur connecté.
    GET /api/commandes/getcommandes : Renvoie la liste de toutes les commandes de l'utilisateur connecté.

## Exemple de requêtes avec curl 
Requete pour enregistrer un nouvel utilisateur :
```bash
curl -X POST "http://localhost:8080/api/utilisateurs/register"      -H "Content-Type: application/json"      -d '{
           "username": "clementrafafr",
           "email": "clementrafa@gmail.fr",
           "password": "Password123@",
           "tel": "0611432242",
           "adresse": "123 Main St",
           "nom": "Clement",
           "prenom": "Rafa",
           "solde_crous": 100.0
         }'

```
réponse :
```bash
{"headers":{},"body":{"message":"User registered successfully!"},"statusCode":"OK","statusCodeValue":200}
```

Requête pour se connecter et récupération du token jwt sous forme de cookie :

```bash
curl -X POST "http://localhost:8080/api/utilisateurs/login" -H "Content-Type: application/json" -d '{"username":"jdoe", "password":"Password123!"}'
```
réponse :
```bash
{"headers":{"Set-Cookie":["delivcrous=eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJqZG9lIiwidXNlcklkIjoxLCJpYXQiOjE2OTc4NjMwNzgsImV4cCI6MTY5Nzk0OTQ3OH0.O9Qix3gv_A0gm1yMzRtWehnL83Zse2twt6ywBq7g9Ss; Path=/api; Max-Age=86400; Expires=Sun, 22 Oct 2023 04:37:58 GMT; HttpOnly"]},"body":{"solde_crous":100.0,"id":1,"username":"jdoe","email":"jdoe@gmail.com","tel":"0102030405","adresse":"123 Rue ABC"},"statusCode":"OK","statusCodeValue":200}
```

Utilisation du cookie du user_id 2 pour récupérer ses commandes :
```bash
curl -X GET "http://localhost:8080/api/commandes/getcommande?user_id=2" -b "delivcrous=eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhc21pdGgiLCJ1c2VySWQiOjIsImlhdCI6MTY5Nzg2Mzk5OSwiZXhwIjoxNjk3OTUwMzk5fQ.PihL5FuWZc-UQ-isiKzZmHgmA7CGRTMdZVzoD9REejg"
```
réponse :
```bash
[{"commande_id":2,"utilisateur":{"user_id":2,"username":"asmith","email":"asmith@gmail.com","password":"$2a$10$y.AsJMBi.8L5B3UX.hjieuPTiQukZ8hMXvZsobHlxb04f111ws.3q","nom":"Alice","prenom":"Smith","solde_crous":150.0,"tel":"0607080910","panier":{"panier_id":2,"plats":[{"id":3,"title":"Burger","description":"Délicieux burger au bon goût de cheddar","prix":18,"image":"https://drive.google.com/uc?export=view&id=1Lz5dp7L0k6x03HVQ8kWeVDs8qK0upmtW","category":"Burger","allergenes":"pomme de terre, oeuf"}]},"adresse":"456 Rue DEF"},"plats":[{"id":2,"title":"Raviolis","description":"Pâtes farcies à la ricotta","prix":15,"image":"https://drive.google.com/uc?export=view&id=1bBh85SKNHP_ST5mjf1kCxvqyUHCOsbSW","category":"Pâtes","allergenes":"gluten, fromage"}],"adresse_livraison":"456 Rue DEF","status":"En préparation","date_commande":"2023-08-29T22:00:00.000+00:00"}]
```

La logique est la même pour les autres requêtes.

## Diagramme de séquence 

![Diagramme](https://showme.redstarplugin.com/d/d:lcJ70blj)

### important

Le projet a été fait sous intelliJ, il se peut qu'il y ait des problèmes d'importation sur un autre IDE
