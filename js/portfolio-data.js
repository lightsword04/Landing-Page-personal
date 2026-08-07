/**
 * PORTFOLIO DATA - YORDAN ALBERTO ROJAS DE LA CRUZ
 * Este archivo centraliza la información del portafolio.
 * Para actualizar experiencias, habilidades o proyectos a futuro, solo edita este archivo.
 */

const PORTFOLIO_DATA = {
    profile: {
        name: "Yordan Alberto Rojas de La Cruz",
        title: "Ingeniero de Sistemas | Full Stack & Multiplataforma (Mobile & Desktop)",
        subtitle: "Especializado en Desarrollo Web, Aplicaciones Multiplataforma (Flutter PC & Móvil) y Transformación Digital",
        phone: "+51 971 957 627",
        email: "yordandevmulti@gmail.com",
        linkedin: "https://www.linkedin.com/in/yordan-rojas-de-la-cruz-15241015b",
        location: "Lima, Perú",
        education: {
            university: "Universidad Tecnológica del Perú",
            degree: "Título Profesional de Ingeniero de Sistemas (Abril 2026)",
            bachelor: "Grado de Bachiller en Ingeniería de Sistemas (Setiembre 2025)"
        },
        about: "Ingeniero de Sistemas enfocado en el desarrollo de software Full Stack y aplicaciones multiplataforma (Desktop PC y Mobile). Experiencia comprobada en el diseño de arquitecturas limpias, automatización de procesos empresariales y creación de soluciones de alta calidad en entornos Web, Escritorio (PC) y Dispositivos Móviles.",
        highlights: [
            { number: "2+", label: "Años de Experiencia" },
            { number: "5+", label: "Proyectos Clave" },
            { number: "100%", label: "Enfoque en Calidad" }
        ]
    },

    skills: [
        {
            category: "Web & Backend",
            icon: "code",
            items: ["React", "Spring Boot", "Laravel", "Python", "JavaScript / ES6+", "HTML5 / CSS3"]
        },
        {
            category: "Multiplataforma (Mobile & Desktop / PC)",
            icon: "smartphone",
            items: ["Flutter (Windows / PC)", "Flutter (Android / iOS)", "Dart", "Android Native (Java/Kotlin)", "Firebase Services"]
        },
        {
            category: "Bases de Datos & APIs",
            icon: "database",
            items: ["PostgreSQL", "SQLite / Sqflite", "MongoDB", "RESTful APIs"]
        },
        {
            category: "Herramientas & Entorno",
            icon: "bar-chart",
            items: ["Docker", "Git & GitHub", "Postman", "Herramientas IA (Copilot, Claude, Gemini)"]
        }
    ],

    experiences: [
        {
            id: 1,
            role: "Desarrollador Multiplataforma (Mobile & Desktop / PC)",
            project: "Proyecto: Aplicación Multiplataforma de Gestión Operativa",
            company: "Multillantas Macollins",
            sector: "Sector automotriz",
            period: "Jul 2025 – Actualidad",
            isCurrent: true,
            technologies: ["Flutter (PC & Mobile)", "Dart", "Firebase", "REST APIs", "Provider", "UX/UI Responsive"],
            achievements: [
                "Desarrollé y desplegué una actualización mayor del ecosistema tecnológico mediante una aplicación multiplataforma (Flutter) ejecutada de forma fluida tanto en PC de escritorio (Windows) como en dispositivos móviles.",
                "Habilité la gestión administrativa y de recursos operativos de forma remota para ordenadores, smartphones y tablets, mejorando la movilidad y la eficiencia operativa.",
                "Optimicé la experiencia de usuario (UX) y la estabilidad de la aplicación, garantizando un acceso rápido y seguro a la información del negocio en tiempo real."
            ]
        },
        {
            id: 2,
            role: "Ingeniero de Software",
            project: "Proyecto: Sistema Local de Inventario y Ventas",
            company: "Multillantas Macollins",
            sector: "Sector automotriz",
            period: "Ago 2024 – Abr 2025",
            isCurrent: false,
            technologies: ["Java", "PostgreSQL", "Desktop UI", "Arquitectura Limpia", "Automatización"],
            achievements: [
                "Lideré la transformación digital integral de la empresa, diseñando e implementando desde cero un Sistema de Gestión de Inventario y Ventas para reemplazar procesos manuales.",
                "Configuré e instalé el sistema de forma nativa en los equipos locales, automatizando el registro diario de transacciones y optimizando el control de stock en tiempo real con Java y PostgreSQL.",
                "Reduje errores en el registro de datos y agilicé los procesos de facturación y seguimiento de productos."
            ]
        },
        {
            id: 3,
            role: "Ingeniero de Software / Automatización",
            project: "Proyecto: Estructuración de Datos & Sistema Comercial",
            company: "Multillantas Macollins",
            sector: "Sector automotriz",
            period: "Jul 2024",
            isCurrent: false,
            technologies: ["SQL", "Modelado de Datos Relacional", "Java", "Automatización"],
            achievements: [
                "Realicé el levantamiento de requerimientos y análisis del sistema de información empírico de la empresa, migrando y estructurando datos hacia un modelo de datos relacional robusto.",
                "Desarrollé módulos de consulta visual y reportes automáticos que permitieron agilizar la toma de decisiones comerciales del equipo directivo."
            ]
        }
    ],

    projectCategories: [
        {
            categoryId: "laborales",
            title: "🏢 Proyectos de Experiencia Laboral",
            subtitle: "Sistemas empresariales desarrollados en la industria tecnológica para Multillantas Macollins",
            projects: [
                {
                    id: "sistema-llantas-api",
                    title: "Sistema de Gestión de Inventario y Ventas (Backend & Frontend)",
                    badge: "PROYECTO LABORAL / EMPRESARIAL",
                    imageCard: "img/llantas-login.png",
                    imageModal: "img/llantas-dashboard.png",
                    description: "Sistema integral de gestión comercial para negocios de llantas y servicios automotrices. Desarrollado con backend en Java 17 / Spring Boot 3.4.2, PostgreSQL y cliente multiplataforma en Flutter para PC (Windows) y móviles (Android).",
                    technologies: ["Java 17", "Spring Boot 3.4.2", "PostgreSQL", "Flutter (PC & Mobile)", "JWT RBAC", "Docker", "Caffeine Cache"],
                    isFeatured: true,
                    hasDetailModal: true,
                    readmeMarkdown: `# Multillantas Macollins — Sistema de Gestión de Inventario y Ventas

Sistema integral de gestión comercial y administrativa para negocios de venta de llantas y servicios automotrices.

---

## ⚙️ Backend REST API (Java 17 & Spring Boot 3.4.2)
- **Arquitectura en Capas**: Controller, Service (@Transactional), Repository (JpaRepository), Models JPA y DTOs seguros con validación estricta y transacciones ACID.
- **Seguridad & RBAC**: Autenticación stateless basada en JWT (Access & Refresh Tokens), BCryptPasswordEncoder, StrictHttpFirewall, protección contra Clickjacking y matriz de roles (\`DUEÑO\`, \`ADMIN\`, \`ALMACENERO\`, \`VENDEDOR\`).
- **Caché & Performance**: Caché en memoria Caffeine para catálogos de productos e inventario de alto tráfico.
- **Servicios Integrados**: Impresión de reportes y comprobantes PDF en tiempo real (\`OpenPDF\`), generación de códigos QR (\`ZXing\`) y notificaciones mediante \`Firebase Admin SDK\`.

---

## 📱 Cliente Multiplataforma (Flutter PC Desktop & Android)
- **Gestión Offline Sync**: \`OfflineHttpClient\` y \`SyncService\` para registrar transacciones sin conexión a internet y sincronizarlas automáticamente al recuperar conectividad.
- **Seguridad en Cliente**: Encriptación de alta seguridad AES-256 mediante \`FlutterSecureStorage\` para tokens de sesión.
- **Auto Logout**: \`SessionTimeoutWrapper\` para cierre automático de sesión tras periodos de inactividad.
- **Soporte Desktop PC**: Integración de \`WindowManager\` configurado para una interfaz estandarizada de 1280x720 en ordenadores Windows PC.
`
                }
            ]
        },
        {
            categoryId: "personales",
            title: "🚀 Proyectos de Práctica Personal",
            subtitle: "Desarrollo independiente para practicar, mejorar habilidades y experimentar con nuevas tecnologías",
            projects: [
                {
                    id: "api-google-colab",
                    title: "Gestor Financiero IA — API REST con ML & Firebase",
                    badge: "PROYECTO PERSONAL EN PYTHON",
                    description: "API REST avanzada en Python (Flask, Firebase, Scikit-learn) con 20 funcionalidades de Inteligencia Artificial para predicción de gastos, análisis estadístico, clustering, asesor financiero y gráficos.",
                    technologies: ["Python", "Flask", "Firebase", "Machine Learning", "Scikit-Learn", "JWT", "Swagger"],
                    githubUrl: "https://github.com/lightsword04/Api-google-colab",
                    isFeatured: true,
                    hasDetailModal: true,
                    readmeMarkdown: `# 🚀 Gestor Financiero IA - API REST

API avanzada con **20 características de Inteligencia Artificial** para gestión financiera personal desarrollada en Python.

[![Python](https://img.shields.io/badge/Python-3.8+-blue.svg)](https://www.python.org/)
[![Flask](https://img.shields.io/badge/Flask-2.0+-green.svg)](https://flask.palletsprojects.com/)
[![Firebase](https://img.shields.io/badge/Firebase-Ready-orange.svg)](https://firebase.google.com/)
[![Machine Learning](https://img.shields.io/badge/ML-Enabled-red.svg)](https://scikit-learn.org/)

---

## 🎯 Características Destacadas

### 📊 Predicción de Gastos con Machine Learning
1. **Predicción por categoría**: Algoritmos dedicados para proyectar gastos individuales por rubro.
2. **Predicción mensual (30 días)**: Proyección diaria con intervalos de confianza.
3. **Detección de anomalías**: Detección automática de montos inusuales mediante Z-Score e Isolation Forest.
4. **Múltiples modelos ML**: Comparación de rendimiento entre RandomForest, ARIMA y Prophet.

### 📈 Análisis Estadístico & Clustering
5. **Clustering automático (K-Means)**: Agrupamiento inteligente de patrones de consumo similares.
6. **Análisis temporal**: Comparativas mes actual vs mes anterior y tendencias de variabilidad.
7. **Puntuación de Salud Financiera**: Gamificación del nivel de ahorro (escala 0-100).

### 🤖 Asesor Financiero IA & Firebase Integración
8. **Integración con Firestore**: Almacenamiento y sincronización de transacciones en tiempo real.
9. **Swagger UI**: Documentación interactiva para consumo en el cliente web/móvil.
`
                },
                {
                    id: "media-downloader-pro",
                    title: "MediaDownloader Pro — Descargador y Editor Multimedia",
                    badge: "PROYECTO PERSONAL EN PYTHON",
                    imageCard: "img/media-downloader-app.png",
                    description: "Aplicación de escritorio en Python (yt-dlp, ffmpeg, PyWebView, HTML5/JS) para previsualizar, recortar clips y descargar videos/audio de YouTube, Twitch, TikTok, Instagram, Twitter/X y más.",
                    technologies: ["Python", "PyWebView", "yt-dlp", "ffmpeg", "HTML5 / JS", "Multithreading", "Inno Setup"],
                    githubUrl: "https://github.com/lightsword04/Descargar-videos-de-youtube-y-twitch",
                    isFeatured: true,
                    hasDetailModal: true,
                    readmeMarkdown: `# 🎬 MediaDownloader Pro

**MediaDownloader Pro** es una aplicación de escritorio nativa, moderna y de alto rendimiento diseñada para la **reproducción previa, previsualización en tiempo real, recorte de fragmentos específicos y descarga de contenido multimedia** (videos y audio) desde múltiples plataformas de streaming y redes sociales como YouTube, Twitch, TikTok, Instagram, Twitter / X, Facebook, Kick y más.

Construida con una arquitectura híbrida que combina el rendimiento de **Python** en el backend con una interfaz web fluida en **HTML5, CSS3 y JavaScript** empaquetada mediante **PyWebView**.

---

## 🌟 Características Principales

- 📱 **Soporte Multi-Plataforma**: Compatible con **YouTube**, **Twitch** (VODs y Clips), **TikTok**, **Instagram** (Reels e Historias), **Twitter / X**, **Facebook** y más de 1000 sitios soportados por el motor \`yt-dlp\`.
- 📺 **Previsualización de Stream e Integración de Proxy**: Incorpora un servidor HTTP local interno (\`/proxy\` y \`/transcode\`) con soporte para solicitudes de rango (*HTTP Range Requests*), permitiendo reproducir y hacer *seek* instantáneo en el reproductor HTML5 sin necesidad de descargar el video completo previamente.
- ✂️ **Descarga de Fragmentos / Recorte Temporal**: Permite definir tiempo de inicio y fin (\`HH:MM:SS\`) para descargar exclusivamente la sección deseada del video sin procesar el archivo completo.
- 🎥 **Selección de Calidad y Formatos**: Descarga en 4K, 1080p, 720p, 480p o mejor calidad disponible. Permite elegir contenedores de video (**MP4, WEBM, MKV, FLV**) o extracción directa de audio (**MP3, AAC, FLAC, WAV, M4A**).
- 🍪 **Bypass de Restricciones e Importación de Cookies**: Soporta la carga de archivos \`cookies.txt\` (formato Netscape) para saltar restricciones de edad, captchas, bots y acceder a videos privados o de cuentas seguidas en TikTok, Instagram y Twitter/X.
- 🔄 **Actualización Automática de Motor**: Verificación e instalación de actualizaciones de \`yt-dlp\` en segundo plano.

---

## 📚 Tecnologías Utilizadas

### 🔹 Backend & Núcleo (Python)
- **\`pywebview\`**: Crea la ventana nativa de escritorio renderizando la interfaz HTML5/JS sin requerir navegador externo.
- **\`yt-dlp\`**: Motor principal para la extracción de URLs de streaming, análisis de formatos y descarga de contenidos.
- **\`http.server\`**: Servidor web interno que atiende los endpoints \`/proxy\` y \`/transcode\` para sobrepasar políticas CORS y permitir streaming con *seeking*.
- **\`threading\` & \`socket\`**: Gestión de tareas asíncronas en segundo plano (descargas, proxy streaming).

### 🔹 Transcodificación & Frontend
- **\`FFmpeg\`**: Binarios ejecutables (\`ffmpeg.exe\`, \`ffprobe.exe\`) empaquetados para unir pistas separadas de audio/video y recortar segmentos por tiempo.
- **\`HTML5 / CSS3 / JS\`**: Interfaz responsiva moderna con tema oscuro, reproductor personalizado e indicadores de progreso en tiempo real.
`
                },
                {
                    id: "calculadora-android",
                    title: "Calculadora Android Nativa",
                    badge: "PROYECTO PERSONAL ANDROID",
                    description: "Aplicación de calculadora nativa para Android desarrollada en Kotlin con evaluación de expresiones matemáticas y diseño responsivo.",
                    technologies: ["Android Native", "Kotlin", "ConstraintLayout", "Material Design"],
                    githubUrl: "https://github.com/lightsword04/Calculadora",
                    isFeatured: false,
                    hasDetailModal: true,
                    readmeMarkdown: `# Calculadora Android Nativa

Aplicación nativa de calculadora desarrollada en **Kotlin** para dispositivos Android.

---

## 💡 Destacados
- Evaluación precisa de operaciones matemáticas y expresiones compuestas.
- Diseño de interfaz limpio adaptado a diferentes tamaños de pantalla usando ConstraintLayout y temas Material.
`
                }
            ]
        }
    ]
};

const PORTFOLIO_STORAGE_KEY = 'PORTFOLIO_PROJECTS_CUSTOM_DATA';

function getStoredPortfolioData() {
    try {
        const stored = localStorage.getItem(PORTFOLIO_STORAGE_KEY);
        if (stored) {
            const parsed = JSON.parse(stored);
            if (parsed && Array.isArray(parsed.projectCategories)) {
                return parsed;
            }
        }
    } catch (e) {
        console.error('Error loading stored portfolio data:', e);
    }
    return PORTFOLIO_DATA;
}

function savePortfolioData(customData) {
    try {
        localStorage.setItem(PORTFOLIO_STORAGE_KEY, JSON.stringify(customData));
    } catch (e) {
        console.error('Error saving portfolio data:', e);
    }
}

function resetPortfolioData() {
    localStorage.removeItem(PORTFOLIO_STORAGE_KEY);
}
