#!/bin/sh

# Vérifier si Docker est installé
command -v docker >/dev/null 2>&1 || { 
    echo >&2 "Docker n'est pas installé. Veuillez l'installer avant de continuer."; 
    exit 1; 
}

GITHUB_REPOSITORY_NAME="project-cloud-secure"
GITHUB_URL="https://github.com/thmsczn/project-cloud-secure"
GITHUB_TOKEN="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"
SONARQUBE_TOKEN=""

# Validation que les variables d'environnement nécessaires sont définies
if [ -z "$GITHUB_TOKEN" ] || [ -z "$SONARQUBE_TOKEN" ]; then
    echo "Les variables d'environnement GITHUB_TOKEN, et SONARQUBE_TOKEN n'ont pas été définies."
    exit 1
fi

# Configuration de SonarQube
SONARQUBE_CONTAINER_NAME="${SONARQUBE_CONTAINER_NAME:-sonarqube}"
SONARQUBE_IMAGE="${SONARQUBE_IMAGE:-sonarqube:latest}"
SONARQUBE_PORT="${SONARQUBE_PORT:-9000}"
SONARQUBE_URL="${SONARQUBE_URL:-http://localhost:$SONARQUBE_PORT}"

echo "Lancement de l'instance SonarQube..."
docker run --rm -d --name "$SONARQUBE_CONTAINER_NAME" -p "$SONARQUBE_PORT":9000 "$SONARQUBE_IMAGE"

echo "Attente que SonarQube soit prêt..."
while ! curl --output /dev/null --silent --head --fail "$SONARQUBE_URL"; do
    printf '.'
    sleep 5
done
echo " SonarQube est prêt."

# Fonction pour créer le projet sur SonarQube et récupérer son ID
create_sonar_project() {
    local project_key="$1"
    local project_name="$2"
    local create_project_url="${SONARQUBE_URL}/api/projects/create"
    
    response=$(curl -s -X POST "$create_project_url" \
        -u "$SONARQUBE_TOKEN:" \
        -d "name=${project_name}&project=${project_key}")
    
    echo "$response"
}

# Fonction pour importer un projet GitHub dans SonarQube
import_github_project_to_sonarqube() {
    local github_project_name="$1"
    local sonar_project_key="$2"
    local sonar_project_name="$3"
    
    local import_project_url="${SONARQUBE_URL}/api/alm_integrations/import_github_project"
    local data="githubProjectName=$github_project_name&projectKey=$sonar_project_key&projectName=$sonar_project_name"
    
    echo "Importation du projet GitHub '$github_project_name' vers SonarQube..."
    response=$(curl -s -X POST "$import_project_url" \
        -H "Content-Type: application/x-www-form-urlencoded" \
        -u "$SONARQUBE_TOKEN:" \
        --data "$data")
    
    echo "$response"
}

# Création et importation du projet sur SonarQube
sonar_project_key="project-cloud-sec" # Remplacer par la clé de projet Sonar réelle
github_repository_name="$GITHUB_REPOSITORY_NAME" # Ajuster en fonction du nom réel du répertoire GitHub
import_github_project_to_sonarqube "$github_repository_name" "$sonar_project_key" "$GITHUB_REPOSITORY_NAME"