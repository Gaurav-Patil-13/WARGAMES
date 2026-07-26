#!/usr/bin/env bash
set -euo pipefail
mkdir -p /metadata
cat >/metadata/config.json <<'EOF'
{
  "Image": "wargames-level-08",
  "Entrypoint": ["/bin/bash"],
  "Labels": {
    "training.fake": "WG{inspect_fake_label}",
    "training.flag": "WG{inspect_before_you_assume}"
  }
}
EOF
echo "container_id=training-only" > /metadata/labels
echo "Inspect the metadata as if docker inspect returned it." > /home/player/readme.txt
chown -R player:player /home/player /metadata
cat >/home/player/.bashrc <<'EOF'
PS1='\[\e[32m\]player@wargames-lv8\[\e[0m\]:\w$ '
echo "Level 8: Container Inspection"
echo "Objective: inspect metadata and identify the real training flag."
EOF
