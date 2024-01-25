#!/bin/bash

# Configuration
SONAR_ANALYSIS_SCRIPT="./run_sonarqube_analysis.sh"
OTHER_ANALYSIS_SCRIPT="./other_analysis_tool.sh" # Replace

chmod +x $SONAR_ANALYSIS_SCRIPT
chmod +x $OTHER_ANALYSIS_SCRIPT

# Execute SonarQube analysis
echo "Starting SonarQube analysis..."
$SONAR_ANALYSIS_SCRIPT
if [ $? -ne 0 ]; then
  echo "SonarQube analysis failed."
  exit 1
fi

# Replace
echo "Starting other analysis tool..."
$OTHER_ANALYSIS_SCRIPT
if [ $? -ne 0 ]; then
  echo "Other analysis failed."
  exit 1
fi

echo "All analyses have been completed successfully."