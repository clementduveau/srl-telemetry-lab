#!/bin/bash

# Create service files
cat <<EOF | sudo tee /etc/systemd/system/traffic-start-all.service
[Unit]
Description=Start all traffic

[Service]
Type=oneshot
ExecStart=/home/ec2-user/srl-telemetry-lab/traffic.sh start all
EOF

cat <<EOF | sudo tee /etc/systemd/system/traffic-stop-all.service
[Unit]
Description=Stop all traffic

[Service]
Type=oneshot
ExecStart=/home/ec2-user/srl-telemetry-lab/traffic.sh stop all
EOF

cat <<EOF | sudo tee /etc/systemd/system/traffic-start-1-3.service
[Unit]
Description=Start traffic 1-3

[Service]
Type=oneshot
ExecStart=/home/ec2-user/srl-telemetry-lab/traffic.sh start 1-3
EOF

# Create timer files
cat <<EOF | sudo tee /etc/systemd/system/traffic-start-all.timer
[Unit]
Description=Timer for starting all traffic

[Timer]
OnCalendar=*:05/10
Unit=traffic-start-all.service

[Install]
WantedBy=timers.target
EOF

cat <<EOF | sudo tee /etc/systemd/system/traffic-stop-all.timer
[Unit]
Description=Timer for stopping all traffic

[Timer]
OnCalendar=*:08/10
Unit=traffic-stop-all.service

[Install]
WantedBy=timers.target
EOF

cat <<EOF | sudo tee /etc/systemd/system/traffic-start-1-3.timer
[Unit]
Description=Timer for starting traffic 1-3

[Timer]
OnCalendar=*:00/10
Unit=traffic-start-1-3.service

[Install]
WantedBy=timers.target
EOF

# Reload systemd daemon to recognize new unit files
sudo systemctl daemon-reload

# Enable and start timers
sudo systemctl enable traffic-start-all.timer
sudo systemctl start traffic-start-all.timer

sudo systemctl enable traffic-stop-all.timer
sudo systemctl start traffic-stop-all.timer

sudo systemctl enable traffic-start-1-3.timer
sudo systemctl start traffic-start-1-3.timer

echo "All timers have been set up and started."
