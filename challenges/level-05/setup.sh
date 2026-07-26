#!/usr/bin/env bash
set -euo pipefail
mkdir -p /var/log/training
cat >/var/log/training/access.log <<'EOF'
10.0.0.5 GET /login 401 token=WG{failed_login_fake}
10.0.0.8 GET /assets 200 token=static
10.0.0.9 POST /admin 403 token=WG{forbidden_fake}
10.0.0.42 POST /vault 200 status=success token=WG{logs_remember_everything}
EOF
echo "Find the successful access event." > /home/player/brief.txt
chown -R player:player /home/player /var/log/training
cat >/home/player/.bashrc <<'EOF'
PS1='\[\e[32m\]player@wargames-lv5\[\e[0m\]:\w$ '
echo "Level 5: Log Analysis"
echo "Objective: inspect logs and extract the success token."
EOF
