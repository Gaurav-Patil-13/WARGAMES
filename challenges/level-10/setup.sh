#!/usr/bin/env bash
set -euo pipefail
cat >/home/player/service.sh <<'EOF'
#!/usr/bin/env bash
while true; do
  printf 'HTTP/1.1 200 OK\r\nContent-Type: text/plain\r\n\r\nWG{services_speak_on_ports}\n' | nc -l -p 8088 -q 1 127.0.0.1
done
EOF
chmod +x /home/player/service.sh
cat >/home/player/.bashrc <<'EOF'
PS1='\[\e[32m\]player@wargames-lv10\[\e[0m\]:\w$ '
nohup /home/player/service.sh >/tmp/wargames-service.log 2>&1 &
echo "Level 10: Service Discovery"
echo "Objective: find the local listening service and fetch its response."
EOF
chown -R player:player /home/player
