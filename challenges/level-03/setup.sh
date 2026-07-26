#!/usr/bin/env bash
set -euo pipefail
mkdir -p /mission
echo "WG{world_readable_fake}" > /mission/public_flag.txt
echo "WG{permissions_tell_the_story}" > /mission/group_flag.txt
echo "Access denied is sometimes a clue." > /mission/root_note.txt
chown root:root /mission/public_flag.txt /mission/root_note.txt
chown root:analysts /mission/group_flag.txt
chmod 644 /mission/public_flag.txt
chmod 640 /mission/group_flag.txt
chmod 600 /mission/root_note.txt
chown -R player:player /home/player
cat >/home/player/.bashrc <<'EOF'
PS1='\[\e[32m\]player@wargames-lv3\[\e[0m\]:\w$ '
echo "Level 3: File Permissions"
echo "Objective: inspect permissions and read the valid flag."
EOF
