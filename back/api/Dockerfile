# Utilise node
FROM node:18-bookworm-slim

RUN apt-get update && apt-get install -y \
    postgresql-client \
    openssl \
    ca-certificates \
 && rm -rf /var/lib/apt/lists/*

# Crée le dossier de l'app
WORKDIR /app

# Copie package et package-lock
COPY package*.json ./

# Installe les dépendances
RUN npm install

# Copie le code et le schema Prisma
COPY . .

# Generation du client Prisma
RUN npx prisma generate

EXPOSE 3000
CMD ["node", "server.js"]
