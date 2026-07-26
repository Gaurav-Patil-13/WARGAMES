#!/usr/bin/env bash
set -euo pipefail
mkdir -p /home/player/mission/final /home/player/notes
echo "WG{this_is_a_fake_training_flag}" > /home/player/fake_flag.txt
echo "Navigation checklist: pwd, ls, cd, cat" > /home/player/notes/readme.txt
echo "WG{linux_navigation_unlocked}" > /home/player/mission/final/flag.txt
chown -R player:player /home/player
cat >/home/player/.bashrc <<'EOF'
PS1='\[\e[32m\]player@wargames-lv1\[\e[0m\]:\w$ '
echo "Level 1: Basic Navigation"
echo "Objective: find the real flag under your home directory."
EOF
