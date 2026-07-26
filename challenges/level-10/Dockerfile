FROM ubuntu:22.04
RUN apt-get update && apt-get install -y bash coreutils curl iproute2 netcat-openbsd less nano && rm -rf /var/lib/apt/lists/*
RUN useradd -m -s /bin/bash player
COPY setup.sh /setup.sh
RUN chmod +x /setup.sh && /setup.sh
USER player
WORKDIR /home/player
CMD ["/bin/bash", "-l"]
