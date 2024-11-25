# Usa una imagen oficial de Node.js como base
FROM node:16

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copia los archivos de tu proyecto al contenedor
COPY package*.json ./

# Instala las dependencias del backend
RUN npm install

# Copia el resto de los archivos del backend
COPY . .

# Expón el puerto en el que el backend va a correr (por ejemplo, el puerto 3000)
EXPOSE 8000

# Comando para ejecutar la aplicación
CMD ["npm", "start"]
