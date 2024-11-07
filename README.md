# Servidor Express con MySQL2 y CORS

Este proyecto muestra cómo configurar un servidor Express que se conecta a una base de datos MySQL utilizando `mysql2` y permite solicitudes de origen cruzado con `cors`.

## Requisitos Previos

- Tener Node.js y npm instalados.
- Tener un servidor MySQL en funcionamiento y una base de datos creada para este proyecto.
- Tener un programa para testing de API (ejemplo: postman)

## Instalación y Configuración

Sigue estos pasos para configurar el servidor:

1. **Inicializar el Proyecto**

   Crea una carpeta para el proyecto, navega a esa carpeta y ejecuta el siguiente comando para iniciar un proyecto Node.js:

   ```bash
   npm init -y

2. **Instalar las dependencias**

    ```bash
    npm install express mysql2 cors

3. **Implementar la base de datos en el sistema gestor**
  
  Se provee un sql sobre la base de datos `testing` (actualmente no está ingresado) 

4. **Crear las configuraciones de sistema gestor de base de datos**

Se debe de crear un archivo en la carpeta _config/_ llamado _db.config.js_

  ```javascript
    const dbConfig =  {
      HOST: 'localhost',
      USER: 'usuario',
      PASSWORD: 'contraseña',
      DB: 'testing',
      PORT:'puerto_a_usar', //Comúnmente es 3306
      dialect: "mysql",
      pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
      }
    };
  
  
  export default dbConfig;



