#!/usr/bin/env bash
set -euo pipefail
mkdir -p /etc/cron.d /opt/jobs /var/backups/training
cat >/etc/cron.d/backup-check <<'EOF'
*/5 * * * * player /opt/jobs/backup-check.sh
EOF
cat >/opt/jobs/backup-check.sh <<'EOF'
#!/usr/bin/env bash
cat /var/backups/training/latest.txt
EOF
chmod +x /opt/jobs/backup-check.sh
echo "WG{cron_jobs_leave_clues}" > /var/backups/training/latest.txt
echo "WG{fake_cron_comment}" > /home/player/fake.txt
chown -R player:player /home/player /var/backups/training
cat >/home/player/.bashrc <<'EOF'
PS1='\[\e[32m\]player@wargames-lv7\[\e[0m\]:\w$ '
echo "Level 7: Cronjob Trail"
echo "Objective: read scheduled task definitions and follow the script."
EOF
