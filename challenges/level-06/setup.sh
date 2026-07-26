#!/usr/bin/env bash
set -euo pipefail
mkdir -p /home/player/fragments
cat >/home/player/fragments/parts.txt <<'EOF'
03:bash_
01:WG{
05:build_
08:}
02:pipelines_
07:answers
04:pipelines_
06:answers
EOF
echo "Sort by the number, keep field two, remove newlines. The duplicate is a trap; inspect the expected phrase." > /home/player/fragments/readme.txt
echo "WG{bash_pipelines_build_answers}" > /home/player/fragments/check.txt
chown -R player:player /home/player
cat >/home/player/.bashrc <<'EOF'
PS1='\[\e[32m\]player@wargames-lv6\[\e[0m\]:\w$ '
echo "Level 6: Simple Bash Script"
echo "Objective: use shell tools to assemble the flag."
EOF
