# Imagen base oficial de Node.js
FROM node:18-slim

# Instala las librerías necesarias para Puppeteer
RUN apt-get update && apt-get install -y \
    libnss3 \
    libatk1.0-0 \
    libatk-bridge2.0-0 \
    libcups2 \
    libgbm1 \
    libasound2 \
    libpangocairo-1.0-0 \
    libxss1 \
    libgtk-3-0 \
    libxshmfence1 \
    libglu1 \
    --no-install-recommends && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

# Establece el directorio de trabajo
WORKDIR /app

# Copia los archivos necesarios
COPY package.json .
COPY index.js .

# Instala las dependencias del proyecto
RUN npm install

# Expone el puerto para el servidor
EXPOSE 3000

# Comando para ejecutar el servidor
CMD ["npm", "start"]
