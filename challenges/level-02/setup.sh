#!/usr/bin/env bash
set -euo pipefail
mkdir -p /home/player/archive/.vault /home/player/archive/public
echo "WG{visible_but_fake}" > /home/player/archive/public/flag.txt
echo "Dotfiles are hidden from plain ls." > /home/player/archive/public/note.txt
echo "WG{dotfiles_are_not_invisible}" > /home/player/archive/.vault/.real_flag
echo "WG{fake_dotfile_flag}" > /home/player/.decoy_flag
chown -R player:player /home/player
cat >/home/player/.bashrc <<'EOF'
PS1='\[\e[32m\]player@wargames-lv2\[\e[0m\]:\w$ '
echo "Level 2: Hidden Files"
echo "Objective: reveal hidden files and find the real flag."
EOF
