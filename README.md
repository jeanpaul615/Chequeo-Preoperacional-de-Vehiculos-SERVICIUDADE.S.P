![image](https://github.com/user-attachments/assets/0cc64df3-6de8-4aa1-a256-6c395d7c21c7)

# 🛠️ Chequeo Preoperacional de Vehículos - SERVICIUDAD E.S.P

Este proyecto es un sistema completo para la gestión de chequeos preoperacionales de vehículos, desarrollado con un stack tecnológico moderno: **Node.js**, **React**, **Tailwind CSS**, y **MySQL**. Proporciona una solución eficiente para garantizar la seguridad y el mantenimiento adecuado de los vehículos.

---

## 🌟 **Descripción**

El sistema de **Chequeo Preoperacional de Vehículos** está diseñado para ayudar a las empresas a realizar inspecciones detalladas y registrar el estado de los vehículos antes de su operación. Cuenta con una interfaz de usuario moderna y responsiva, conectada a un backend robusto para gestionar la lógica y el almacenamiento de datos.

---

## ✨ **Características**

- **Frontend moderno**: Implementado con **React** y estilizado con **Tailwind CSS**.
- **Backend eficiente**: Construido con **Node.js** para manejar la lógica empresarial y las integraciones.
- **Base de datos relacional**: **MySQL** para la gestión y persistencia de datos.
- **Gestión de usuarios**: Roles de administradores e inspectores.
- **Registro de chequeos**: Almacenamiento de inspecciones detalladas con fecha, hora y resultados.
- **Reportes**: Generación de reportes sobre el estado del vehículo y el historial de inspecciones.
- **Diseño responsivo**: Funciona perfectamente en dispositivos móviles, tablets y escritorios.

---

## 🚀 **Cómo Empezar**

Sigue estos pasos para configurar y ejecutar el proyecto en tu máquina local:

### 1. **Clona este repositorio**
   ```bash
   git clone https://github.com/jeanpaul615/Chequeo-Preoperacional-de-Vehiculos-SERVICIUDADE.S.P.git
   ```

### 2. **Accede al directorio del proyecto**
   ```bash
   cd Chequeo-Preoperacional-de-Vehiculos-SERVICIUDADE.S.P
   ```

### 3. **Configura el frontend y backend**

#### Frontend:
1. Accede al directorio del frontend:
   ```bash
   cd frontend
   ```
2. Instala las dependencias:
   ```bash
   npm install
   ```
3. Inicia el servidor de desarrollo del frontend:
   ```bash
   npm start
   ```

#### Backend:
1. Accede al directorio del backend:
   ```bash
   cd backend
   ```
2. Instala las dependencias:
   ```bash
   npm install
   ```
3. Configura las variables de entorno creando un archivo `.env` en el directorio del backend:
   ```
   DB_HOST=localhost
   DB_USER=tu_usuario
   DB_PASSWORD=tu_contraseña
   DB_NAME=nombre_base_de_datos
   JWT_SECRET=clave_secreta
   ```
4. Inicia el servidor del backend:
   ```bash
   npm start
   ```

### 4. **Configura la base de datos**
- Crea una base de datos en MySQL.
- Usa el archivo SQL proporcionado (por ejemplo, `schema.sql`) para crear las tablas necesarias:
   ```bash
   mysql -u tu_usuario -p nombre_base_de_datos < schema.sql
   ```

### 5. **Accede a la aplicación**
- El frontend estará disponible en [http://localhost:3000](http://localhost:3000).
- El backend estará disponible en [http://localhost:5000](http://localhost:5000).

---

## 📂 **Estructura del Proyecto**

```
Chequeo-Preoperacional-de-Vehiculos-SERVICIUDADE.S.P/
├── frontend/               # Código fuente del frontend
│   ├── src/
│   ├── public/
│   └── package.json
├── backend/                # Código fuente del backend
│   ├── src/
│   ├── database/
│   ├── routes/
│   └── package.json
├── schema.sql              # Archivo SQL para la base de datos
├── README.md               # Documentación
```

---

## 🛠️ **Requisitos**

- **Node.js** v14 o superior.
- **MySQL**.
- Navegador moderno (Google Chrome, Firefox, Edge, etc.).

---

## 📸 **Capturas de Pantalla**

> *(Agrega capturas de pantalla aquí para mostrar el diseño y las funcionalidades del sistema.)*

---

## 🤝 **Contribuciones**

¡Las contribuciones son bienvenidas! Si tienes ideas para mejorar este proyecto, sigue estos pasos:

1. Haz un fork del repositorio.
2. Crea una nueva rama:
   ```bash
   git checkout -b feature/nueva-funcionalidad
   ```
3. Realiza tus cambios y haz un commit:
   ```bash
   git commit -m "Agrega nueva funcionalidad"
   ```
4. Envía los cambios a tu repositorio:
   ```bash
   git push origin feature/nueva-funcionalidad
   ```
5. Abre un [pull request](https://github.com/jeanpaul615/Chequeo-Preoperacional-de-Vehiculos-SERVICIUDADE.S.P/pulls).
