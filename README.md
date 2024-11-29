Faketagram - Aplicación Móvil (React Native)

Tabla de Contenidos
Descripción del Proyecto
Objetivo
Características Principales
Autenticación y Autorización
Interacción con Publicaciones
Gestión de Perfiles
Subida de Imágenes
Tecnologías Utilizadas
Requisitos del Proyecto
Estructura del Proyecto
Instrucciones para Ejecutar el Proyecto
Funcionalidades
Limitaciones Actuales
Mejoras Futuras
Lecciones Aprendidas
Estado del Proyecto
Cómo Contribuir
Licencia
Contacto

Descripción del Proyecto
Faketagram es una red social de intercambio de imágenes diseñada para dispositivos móviles. Permite a los usuarios interactuar en un entorno social mediante un feed de publicaciones, comentarios, "me gusta" y la edición de perfiles. La aplicación está desarrollada en React Native y actualmente está enfocada en dispositivos Android.

Objetivo
El objetivo principal es ofrecer una experiencia funcional para que los usuarios puedan:

Subir imágenes desde su dispositivo (cámara o galería).
Interactuar con un feed de imágenes en tiempo real.
Gestionar su perfil de usuario, incluyendo nombre y foto de perfil.
Utilizar una autenticación segura mediante JWT.
Características Principales
Autenticación y Autorización
Registro e inicio de sesión utilizando JSON Web Tokens (JWT).
Solo los usuarios autenticados pueden acceder al feed y otras funcionalidades.
Interacción con Publicaciones
Feed cronológico con imágenes de usuarios.
Funcionalidad de "Me gusta" y comentarios en publicaciones.
Gestión de Perfiles
Edición de nombre y foto de perfil.
Subida de Imágenes
Subida de fotos directamente desde la cámara o galería del dispositivo móvil.

Tecnologías Utilizadas
React Native: Framework principal para la aplicación móvil.
Expo: Plataforma para desarrollo y pruebas de aplicaciones React Native.
expo-image-picker: Para seleccionar imágenes desde la cámara o galería.
@react-navigation: Para la navegación entre pantallas.
AsyncStorage: Para persistir información del usuario en el dispositivo.
Axios: Para realizar solicitudes HTTP hacia la API.

Requisitos del Proyecto
Node.js instalado en tu máquina.

Expo CLI instalado globalmente:

bash
Copiar código
npm install -g expo-cli
Clonar este repositorio:

bash
Copiar código
git clone https://github.com/Rafael-Dur/SocialAppFakestagram

Estructura del Proyecto

faketagram/
├── assets/         # Recursos estáticos como imágenes
├── components/     # Componentes reutilizables como PostCard y CommentSection
├── context/        # Contextos globales para manejo de estado (AuthContext, PostContext, ProfileContext)
├── controllers/    # Lógica de negocio y comunicación con la API
├── navigation/     # Configuración de navegación entre pantallas
├── screens/        # Pantallas principales de la aplicación (Feed, Login, Profile, etc.)
├── App.js          # Punto de entrada principal de la aplicación
├── IP.js           # Configuración de la dirección IP del backend
└── package.json    # Configuración del proyecto y dependencias

Instrucciones para Ejecutar el Proyecto
Instalar dependencias
bash
Copiar código
npm install
Ejecutar la aplicación
bash
Copiar código
expo start
Probar en un dispositivo móvil
Escanea el código QR desde la consola de Expo utilizando la app Expo Go en Android.

Funcionalidades
Autenticación
Inicio de sesión y registro seguro con JWT.
Persistencia del estado del usuario con AsyncStorage.
Feed Dinámico
Visualización de publicaciones de usuarios en orden cronológico.
Interacción con publicaciones ("me gusta" y comentarios).
Gestión de Perfiles
Edición de foto y nombre de usuario.
Subida de Imágenes
Subida de fotos desde la cámara o galería del dispositivo móvil.

Limitaciones Actuales
Responsividad: Pendiente adaptar la aplicación para múltiples tamaños de pantalla y dispositivos iOS.
Estilos centralizados: Actualmente los estilos están implementados en cada componente, lo que dificulta cambios globales.

Mejoras Futuras
Implementar un diseño completamente responsivo que funcione tanto en Android como en iOS.
Utilizar un sistema de estilos centralizado para facilitar cambios globales (como un tema general).
Incluir soporte completo para pantallas pequeñas y grandes.

Lecciones Aprendidas
Ventajas de un diseño modular: Organizar el código en contextos, controladores y componentes reutilizables facilita el mantenimiento.
Pruebas incrementales: Identificar errores a medida que se desarrolla ayuda a reducir problemas acumulados.
Considerar TypeScript: Aunque JavaScript permitió un desarrollo más rápido, TypeScript habría mejorado la robustez y mantenibilidad del código a largo plazo.

Estado del Proyecto
Actualmente, el proyecto está en fase beta. Se han implementado las funcionalidades principales, pero aún hay aspectos por mejorar y optimizar.