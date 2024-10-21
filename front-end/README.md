# 🚀 Job Posting App - React + Material UI

Este proyecto es una aplicación web donde los empleadores pueden crear publicaciones de trabajo y los empleados pueden visualizar y aplicar a las ofertas disponibles. La aplicación está construida con **React** y estilizada con **Material UI**, proporcionando una interfaz amigable y moderna.

## 🌟 Características principales

- 📝 Creación de publicaciones de trabajo con título, descripción, rango salarial y fecha límite para aplicar.
- 🔍 Visualización y filtro de publicaciones de trabajo.
- 🛠️ Interfaz sencilla y responsiva usando **Material UI**.
- 🎨 NFTs para el rating de los trabajos de calidad realizados.
  
---

## 🛠️ Instalación y configuración

Sigue estos pasos para instalar y ejecutar el proyecto localmente.

### 1. Clona el repositorio

```bash
git clone https://github.com/Mgonzalez06/service-trust.git
```

### 2. Navega al directorio del proyecto

```bash
cd service-trust
```

### 3. Instala las dependencias

```bash
npm install
```

### 4. Inicia la aplicación

```bash
npm start
```

## 🌿 Estructura del proyecto

El proyecto sigue la siguiente estructura de carpetas:

``` bash
front-end/
├── public/                          # Archivos públicos
├── src/                             # Código fuente del proyecto
│   ├── components/                  # Componentes de React
│   │   ├── Applicants/              # Módulo para gestionar los solicitantes
│   │   │   └── Applicants.jsx       # Listado de los solicitantes
│   │   ├── ConnectWallet/           # Módulo para conectar la wallet
│   │   │   └── ConnectWallet.jsx    # Conectar la wallet del usuario
│   │   ├── CustomTable/             # Tablas personalizadas
│   │   │   └── CustomTable.jsx      # Componente de tablas personalizadas
│   │   ├── Dashboard/               # Módulo para el Dashboard
│   │   │   ├── Dashboard.jsx        # Pantalla principal del dashboard
│   │   │   ├── Header.jsx           # Encabezado del dashboard
│   │   │   └── Information.jsx      # Información adicional del dashboard
│   │   ├── Login/                   # Módulo de inicio de sesión
│   │   │   └── Login.jsx            # Pantalla de inicio de sesión
│   │   ├── Modals/                  # Modales de la aplicación
│   │   │   ├── ApplicantsModal.jsx  # Modal de solicitantes
│   │   │   ├── CustomModal.jsx      # Modal personalizado
│   │   │   ├── JobDescriptionModal.jsx  # Modal para la descripción del trabajo
│   │   │   └── ProfileModal.jsx     # Modal para ver el perfil
│   │   ├── Posts/                   # Módulo de publicaciones de trabajo
│   │   │   ├── CreatePost.jsx       # Formulario para crear publicaciones de trabajo
│   │   │   └── PostPage.jsx         # Página para ver publicaciones de trabajo
│   │   ├── Profile/                 # Módulo del perfil
│   │   │   └── ProfilePage.jsx      # Pantalla del perfil del usuario
│   │   ├── SignUp/                  # Módulo de registro
│   │   │   └── SignUp.jsx           # Pantalla para registro de usuarios
│   ├── utils/                       # Utilidades y funciones
│   │   ├── connectWallet.js         # Funciones para conectar wallet
│   │   ├── jobListingFunctions.js   # Funciones relacionadas con las publicaciones
│   │   └── userRegistryFunctions.js # Funciones para el registro de usuarios
│   ├── App.css                      # Estilos principales
│   ├── App.js                       # Componente principal de la aplicación
│   ├── App.test.js                  # Tests de la aplicación
│   ├── constants.js                 # Constantes usadas en la aplicación
│   ├── index.css                    # Estilos globales
│   ├── index.js                     # Punto de entrada de la aplicación
│   └── reportWebVitals.js           # Herramienta para medir el rendimiento
└── README.md                        # Documentación del proyecto

```

## 📦 Dependencias principales

- React: Una biblioteca de JavaScript para construir interfaces de usuario.
- Material UI: Un framework de componentes de UI que sigue las directrices de Material Design.


## 🚀 Scripts disponibles

En el proyecto puedes ejecutar los siguientes comandos:

- npm start: Inicia el servidor de desarrollo.
- npm run build: Crea una versión optimizada para producción en la carpeta build.


## 🔧 Herramientas de desarrollo recomendadas

- VSCode: Editor de código.
- React Developer Tools: Extensión para Chrome/Firefox para depurar aplicaciones React.

## 🤝 Contribuciones

Las contribuciones son bienvenidas. Si encuentras algún error o tienes ideas para nuevas funcionalidades, ¡no dudes en abrir un issue o enviar un pull request!

## 📝 Licencia

Este proyecto está bajo la licencia MIT. Consulta el archivo [LICENSE](https://opensource.org/license/mit) para más detalles.