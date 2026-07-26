#!/usr/bin/env bash
set -euo pipefail
echo "The backend injects the real TRAINING_FLAG when this level starts." > /home/player/readme.txt
echo "WG{env_file_fake}" > /home/player/.env
chown -R player:player /home/player
cat >/home/player/.bashrc <<'EOF'
PS1='\[\e[32m\]player@wargames-lv9\[\e[0m\]:\w$ '
echo "Level 9: Environment Secrets"
echo "Objective: inspect environment variables for a leaked secret."
EOF
