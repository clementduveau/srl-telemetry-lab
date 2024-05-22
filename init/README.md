1. Install Docker
```bash
chmod +x docker-install.sh
./docker-install.sh
```

2. Install Containerlab
```bash
chmod +x containerlab-install.sh
./containerlab-install.sh
```

3. RUN
```bash
sudo containerlab destroy --cleanup && sudo containerlab deploy --reconfigure && sudo bash traffic.sh start all
```