# LED-WEB - Sistema de Gestión Web

![Banner de la aplicación](https://i.postimg.cc/5NWDnNzy/Whats-App-Image-2025-07-10-at-2-19-23-AM.jpg)

## 🚀 Descripción del Proyecto

LED-WEB es una aplicación web integral diseñada para la gestión de **productos y clientes, incluyendo un sistema robusto de notificaciones y administración del sistema**. Construida con una arquitectura moderna de **Laravel** para el backend e **Inertia.js** con **React y TypeScript** para el frontend, ofrece una interfaz de usuario dinámica y responsiva, combinada con una potente gestión de datos y funcionalidades administrativas, como un eficiente sistema de copias de seguridad de la base de datos.

## ✨ Características Principales

* **Autenticación y Roles de Usuarios:** Gestión segura de acceso para diferentes tipos de usuarios (administradores, clientes, etc.).
* **Panel de Administración Centralizado:** Interfaz intuitiva para la gestión completa de la aplicación.
* **Gestión de Productos:**
    * Registro y mantenimiento de la información de productos (nombre, descripción, precio, stock, etc.).
    * Listado y búsqueda de productos.
    * [Añade sub-características de productos si las hay, ej. Categorización, Imágenes de productos].
* **Gestión de Clientes:**
    * Registro y administración de la base de datos de clientes.
    * Mantenimiento de información de contacto y detalles del cliente.
    * [Añade sub-características de clientes si las hay, ej. Historial de compras, Segmentación].
* **Sistema de Notificaciones por Email:**
    * Funcionalidad para enviar notificaciones personalizadas por correo electrónico a los clientes directamente desde el sistema.
    * [Añade sub-características de notificaciones si las hay, ej. Plantillas de email, Programación de envíos].
* **Gestión de Backups del Sistema:**
    * Creación de copias de seguridad de la base de datos con un solo clic.
    * Listado y descarga directa de archivos de backup.
    * Eliminación segura de backups.
* **Diseño Responsivo:** Interfaz adaptativa a diferentes dispositivos (escritorio, tabletas, móviles).
* **[Añade cualquier otra característica destacada aquí si tu aplicación las tiene]:**
    * Ej: Gestión de Pedidos/Ventas
    * Ej: Informes y Estadísticas
    * Ej: Integraciones con terceros

## 📸 Galería de Capturas de Pantalla

Puedes ver más capturas de pantalla de la aplicación en la siguiente galería:

[Ver Galería de Capturas de Pantalla](https://postimg.cc/gallery/tx5KNgw)

## 🛠️ Tecnologías Utilizadas

### Backend
* **PHP 8.x**
* **Laravel 10.x** (Framework PHP)
* **MySQL** (Base de datos)
* **Composer** (Manejador de dependencias de PHP)

### Frontend
* **React 18.x** (Librería UI)
* **TypeScript** (Lenguaje para el desarrollo de frontend)
* **Inertia.js** (Adaptador SPA para Laravel y React)
* **Tailwind CSS** (Framework CSS de utilidad para el diseño)
* **Node.js** (Entorno de ejecución de JavaScript)
* **npm** o **Yarn** (Manejador de paquetes de Node.js)
* **Vite** (Herramienta de compilación para desarrollo frontend)

### Otras Herramientas
* **Git** (Control de versiones)
* **mysqldump** (Herramienta para backups de MySQL)

## 🚀 Instalación y Configuración (Entorno Local)

Sigue estos pasos para poner en marcha el proyecto en tu máquina local.

### Prerrequisitos

Asegúrate de tener instalado lo siguiente:

* **PHP 8.x**
* **Composer**
* **Node.js (LTS)** y **npm** (viene con Node.js) o **Yarn**
* **MySQL** (o un servidor de base de datos compatible)
* **Git**
* **XAMPP** o un entorno de servidor web local similar (Apache, Nginx) si no estás usando un servidor de desarrollo de Laravel.

### Pasos de Instalación

1.  **Clonar el repositorio:**
    Abre tu terminal (PowerShell en Windows, o tu terminal favorita) y clona el proyecto:
    ```bash
    git clone [https://github.com/Johlevic/led-web.git](https://github.com/Johlevic/led-web.git)
    cd led-web
    ```

2.  **Configuración del Backend (Laravel):**
    a.  **Instalar dependencias de Composer:**
        ```bash
        composer install
        ```
    b.  **Copiar el archivo de entorno:**
        ```bash
        cp .env.example .env
        ```
    c.  **Generar la clave de la aplicación:**
        ```bash
        php artisan key:generate
        ```
    d.  **Configurar la base de datos:**
        Abre el archivo `.env` y configura tus credenciales de base de datos (por ejemplo, para MySQL en XAMPP):
        ```env
        DB_CONNECTION=mysql
        DB_HOST=127.0.0.1
        DB_PORT=3306
        DB_DATABASE=led_web_db  # Puedes cambiar el nombre de tu base de datos aquí
        DB_USERNAME=root        # O tu usuario de MySQL
        DB_PASSWORD=            # O tu contraseña de MySQL (vacío si no tienes)
        ```
        *Asegúrate de que la base de datos `led_web_db` (o el nombre que elijas) exista en tu servidor MySQL.*

    e.  **Ejecutar migraciones de la base de datos:**
        Esto creará las tablas necesarias en tu base de datos.
        ```bash
        php artisan migrate
        ```
    f.  **Vincular el almacenamiento (para backups):**
        Esto crea un enlace simbólico para que el almacenamiento de Laravel sea accesible públicamente (aunque tus backups estarán en `storage/app/backups`, que no es directamente público sin una ruta específica como tu ruta de descarga).
        ```bash
        php artisan storage:link
        ```

3.  **Configuración del Frontend (React & TypeScript):**
    a.  **Instalar dependencias de Node.js:**
        ```bash
        npm install
        # O si usas Yarn:
        # yarn install
        ```
    b.  **Compilar los assets de frontend para producción (opcional, para despliegue):**
        ```bash
        npm run build
        # O
        # yarn build
        ```

### Ejecutar la Aplicación

1.  **Iniciar el servidor de desarrollo de Laravel:**
    ```bash
    php artisan serve
    ```
    Esto iniciará el backend de Laravel, generalmente en `http://127.0.0.1:8000`.

2.  **Iniciar el servidor de desarrollo de Vite (para el frontend):**
    Abre una **nueva terminal** en la raíz del proyecto y ejecuta:
    ```bash
    npm run dev
    # O
    # yarn dev
    ```
    Vite se encargará de compilar y servir tu frontend, y se conectará automáticamente con el servidor de Laravel.

Ahora puedes acceder a la aplicación web a través de la URL que te proporciona `php artisan serve` (normalmente `http://127.0.0.1:8000`).

## 🚀 Uso de la Aplicación

1.  **Acceso Inicial:** Navega a `http://127.0.0.1:8000` en tu navegador.
2.  **Login/Registro:** Si la aplicación tiene un sistema de autenticación, regístrate o inicia sesión.
3.  **Gestión de Productos:** Accede a la sección de productos para añadir, editar o eliminar productos del sistema.
4.  **Gestión de Clientes:** Utiliza esta sección para registrar nuevos clientes, actualizar su información o visualizar su listado.
5.  **Envío de Notificaciones:** Desde la interfaz, podrás enviar notificaciones personalizadas vía email a tus clientes.
6.  **Gestión de Backups:**
    * Dentro del panel de administración, encontrarás la opción para crear una copia de seguridad de tu base de datos con un clic.
    * Podrás ver los backups existentes, descargarlos o eliminarlos según sea necesario.
7.  **[Describe aquí cómo usar otras características específicas que tengas].**

## 🤝 Contribución

Si deseas contribuir a este proyecto, por favor sigue estos pasos:

1.  Haz un "fork" del repositorio.
2.  Crea una nueva rama (`git checkout -b feature/nombre-de-la-caracteristica`).
3.  Realiza tus cambios y haz commits descriptivos.
4.  Empuja tus cambios a tu "fork".
5.  Abre un Pull Request con una descripción clara de tus cambios.

## 📄 Licencia

Este proyecto está bajo la licencia [**Menciona tu tipo de licencia aquí, ej. MIT, GNU GPL, etc.**]. Consulta el archivo `LICENSE` para más detalles.
