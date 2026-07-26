#!/usr/bin/env bash
set -euo pipefail
mkdir -p /mission/{alpha,beta,gamma/deep}
for i in $(seq 1 80); do echo "noise-$i WG{fake_$i}" > "/mission/alpha/file_$i.txt"; done
echo "the signal is WG{grep_found_the_signal}" > /mission/gamma/deep/report.log
echo "try recursive search" > /home/player/readme.txt
chown -R player:player /home/player /mission
cat >/home/player/.bashrc <<'EOF'
PS1='\[\e[32m\]player@wargames-lv4\[\e[0m\]:\w$ '
echo "Level 4: Grep And Find"
echo "Objective: search noisy files for the real flag."
EOF
