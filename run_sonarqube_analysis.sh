#!/bin/bash

# Configuration
SONARQUBE_CONTAINER_NAME="sonarqube"
SONARQUBE_PORT=9000
SONARQUBE_URL="http://localhost:${SONARQUBE_PORT}"
SONAR_SCANNER_IMAGE="sonarsource/sonar-scanner-cli"
PROJECT_SOURCE_DIR="/path/to/mon_projet" # Update with the correct path to your project
SONAR_LOGIN_TOKEN="your_sonar_login_token" # Replace with the Sonar login token
SONAR_PROJECT_KEY="your_project_key" # Replace with the Sonar project key

function check_failure() {
  if [[ $1 -ne 0 ]]; then
    echo "An error occurred: $2"
    # Clean up if necessary, e.g., remove containers
    # docker rm -f ${SONARQUBE_CONTAINER_NAME}
    exit 1
  fi
}

# Start SonarQube container
echo "Starting SonarQube container..."
docker run -d --name ${SONARQUBE_CONTAINER_NAME} -p ${SONARQUBE_PORT}:${SONARQUBE_PORT} sonarqube
check_failure $? "Failed to start SonarQube container"

# Wait for SonarQube to start
echo "Waiting for SonarQube to be ready..."
sleep 30

# Scan the project with Sonar Scanner
echo "Scanning the project..."
docker run --rm \
  -e SONAR_HOST_URL="${SONARQUBE_URL}" \
  -e SONAR_LOGIN="${SONAR_LOGIN_TOKEN}" \
  -e SONAR_PROJECT_KEY="${SONAR_PROJECT_KEY}" \
  -v "${PROJECT_SOURCE_DIR}:/usr/src" \
  ${SONAR_SCANNER_IMAGE}
scan_result=$?

# Check the result of the scan and terminate if it failed
check_failure ${scan_result} "SonarScanner execution failed"

echo "SonarQube analysis has been completed successfully."