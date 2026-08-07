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
            subtitle: "Sistema empresarial desarrollado en la industria tecnológica para Multillantas Macollins",
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
                    details: {
                        architecture: "Arquitectura en Capas (Controller, Service, Repository, DTO) con validación estricta y transacciones ACID.",
                        security: "Autenticación stateless basada en JWT (Access & Refresh Tokens), BCryptPasswordEncoder, StrictHttpFirewall, protección contra Clickjacking y roles del sistema (DUEÑO, ADMIN, ALMACENERO, VENDEDOR).",
                        frontend: "Cliente Flutter multiplataforma (Windows 1280x720 & Android) con sincronización fuera de línea (OfflineHttpClient & SyncService), almacenamiento seguro AES-256 (FlutterSecureStorage) y cierre automático de sesión por inactividad.",
                        optimizations: "Caché en memoria Caffeine, comprobantes e inventarios en PDF (OpenPDF), generación de códigos QR (ZXing) y notificaciones Firebase Admin SDK."
                    }
                }
            ]
        },
        {
            categoryId: "personales",
            title: "🚀 Proyectos de Práctica Personal",
            subtitle: "Desarrollo independiente para practicar, mejorar habilidades y experimentar con nuevas tecnologías",
            projects: [
                {
                    id: "media-downloader-pro",
                    title: "MediaDownloader Pro — Descargador y Editor de Clips",
                    badge: "PROYECTO PERSONAL EN PYTHON",
                    imageCard: "img/media-downloader-app.png",
                    description: "Aplicación de escritorio desarrollada en Python (yt-dlp, ffmpeg, CustomTkinter) para descargar y recortar clips de video/audio de plataformas como YouTube, Twitch, TikTok, Instagram y Twitter/X. Creada de forma independiente para practicar el uso de Python, procesamiento de multimedia y concurrencia (multithreading).",
                    technologies: ["Python", "yt-dlp", "ffmpeg", "CustomTkinter", "Multithreading", "PyInstaller"],
                    isFeatured: false,
                    hasDetailModal: false
                }
            ]
        }
    ]
};
