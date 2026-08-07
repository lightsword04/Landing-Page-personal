/**
 * MAIN UI RENDERER & INTERACTION CONTROLLER - YORDAN ROJAS DE LA CRUZ PORTFOLIO
 */

function initApp() {
    initNavigation();
    renderHero();
    renderTimeline();
    renderSkills();
    renderProjects();
    setupProjectModal();
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initApp);
} else {
    initApp();
}

// Navigation Sticky & Smooth Scroll
function initNavigation() {
    const navbar = document.querySelector('.navbar');
    const navToggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 40) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    if (navToggle) {
        navToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
    }

    // Active Nav Highlight on Scroll
    const sections = document.querySelectorAll('section[id]');
    window.addEventListener('scroll', () => {
        const scrollY = window.pageYOffset;
        sections.forEach(current => {
            const sectionHeight = current.offsetHeight;
            const sectionTop = current.offsetTop - 100;
            const sectionId = current.getAttribute('id');
            const navLink = document.querySelector(`.nav-links a[href*=${sectionId}]`);

            if (navLink) {
                if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                    navLink.classList.add('active');
                } else {
                    navLink.classList.remove('active');
                }
            }
        });
    });
}

// Render Hero Section
function renderHero() {
    if (typeof PORTFOLIO_DATA === 'undefined') return;
    const profile = PORTFOLIO_DATA.profile;

    const heroName = document.getElementById('heroName');
    const heroTitle = document.getElementById('heroTitle');
    const heroSubtitle = document.getElementById('heroSubtitle');
    const heroAbout = document.getElementById('heroAbout');

    if (heroName) heroName.textContent = profile.name;
    if (heroTitle) heroTitle.textContent = profile.title;
    if (heroSubtitle) heroSubtitle.textContent = profile.subtitle;
    if (heroAbout) heroAbout.textContent = profile.about;

    // Render Stats
    const statsContainer = document.getElementById('heroStats');
    if (statsContainer) {
        statsContainer.innerHTML = profile.highlights.map(h => `
            <div class="stat-item">
                <h3>${h.number}</h3>
                <p>${h.label}</p>
            </div>
        `).join('');
    }
}

// Render Work Experience Timeline
function renderTimeline() {
    const container = document.getElementById('experienceTimeline');
    if (!container || typeof PORTFOLIO_DATA === 'undefined') return;

    container.innerHTML = PORTFOLIO_DATA.experiences.map(exp => `
        <div class="timeline-item">
            <div class="timeline-dot"></div>
            <div class="timeline-content">
                <div class="timeline-header">
                    <div>
                        <h3 class="timeline-role">${exp.role}</h3>
                        <div class="timeline-company">${exp.company} • <span style="color: var(--text-muted); font-size: 0.85rem;">${exp.sector}</span></div>
                    </div>
                    <span class="timeline-period">${exp.period}</span>
                </div>
                <div class="timeline-project">${exp.project}</div>
                <ul class="timeline-list">
                    ${exp.achievements.map(a => `<li>${a}</li>`).join('')}
                </ul>
                <div class="tech-tags">
                    ${exp.technologies.map(t => `<span class="tech-tag">${t}</span>`).join('')}
                </div>
            </div>
        </div>
    `).join('');
}

// Render Skills Grids (Enumerated List without Percentages)
function renderSkills() {
    const container = document.getElementById('skillsGrid');
    if (!container || typeof PORTFOLIO_DATA === 'undefined') return;

    const iconMap = {
        'code': '💻',
        'smartphone': '📱',
        'database': '🗄️',
        'bar-chart': '⚡'
    };

    container.innerHTML = PORTFOLIO_DATA.skills.map(cat => `
        <div class="skill-card">
            <div class="skill-card-header">
                <div class="skill-icon-box">${iconMap[cat.icon] || '⚡'}</div>
                <h3>${cat.category}</h3>
            </div>
            <ul class="skill-enum-list">
                ${cat.items.map((item, idx) => `
                    <li class="skill-enum-item">
                        <span class="skill-enum-num">${idx + 1}.</span>
                        <span class="skill-enum-name">${item}</span>
                    </li>
                `).join('')}
            </ul>
        </div>
    `).join('');
}

// Render Projects Categorized into Laborales vs Personales
function renderProjects() {
    const container = document.getElementById('projectsContainer');
    if (!container) return;

    const data = typeof getStoredPortfolioData === 'function' ? getStoredPortfolioData() : PORTFOLIO_DATA;
    if (!data || !Array.isArray(data.projectCategories)) return;

    container.innerHTML = data.projectCategories.map(category => {
        const visibleProjects = (category.projects || []).filter(p => p.hidden !== true);
        if (visibleProjects.length === 0) return '';

        return `
            <div class="project-category-block" style="margin-bottom: 4rem;">
                <div style="margin-bottom: 2rem;">
                    <h3 style="font-size: 1.75rem; color: var(--text-primary); margin-bottom: 0.4rem;">
                        ${category.title}
                    </h3>
                    <p style="color: var(--text-secondary); font-size: 0.98rem;">
                        ${category.subtitle}
                    </p>
                </div>

                <div class="projects-grid">
                    ${visibleProjects.map(proj => `
                        <div class="project-card ${proj.isFeatured ? 'featured' : ''}">
                            ${proj.imageCard ? `
                                <div class="project-card-img-wrapper">
                                    <img src="${proj.imageCard}" alt="${proj.title}" class="project-card-img">
                                </div>
                            ` : ''}

                            <div>
                                <div class="project-tech-badges-inline">
                                    ${(proj.technologies || []).map(t => `<span class="tech-badge-mini">${t}</span>`).join('')}
                                </div>

                                <span class="project-badge ${proj.isFeatured ? 'highlight' : 'standard'}">${proj.badge || 'PROYECTO'}</span>
                                <h3 class="project-title">${proj.title}</h3>
                                <p class="project-desc">${proj.description}</p>
                            </div>

                            <div class="project-actions" style="margin-top: 1.5rem; display: flex; gap: 0.75rem; flex-wrap: wrap;">
                                ${proj.hasDetailModal ? `
                                    <button class="btn btn-primary" style="flex: 1; min-width: 130px; font-size: 0.85rem;" onclick="openProjectModal('${proj.id}')">
                                        📖 Ver README
                                    </button>
                                ` : ''}

                                ${proj.githubUrl ? `
                                    <a href="${proj.githubUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-secondary" style="flex: 1; min-width: 130px; font-size: 0.85rem; text-decoration: none; text-align: center; display: inline-flex; align-items: center; justify-content: center; gap: 0.4rem;">
                                        <span>🔗 Ver en GitHub</span>
                                    </a>
                                ` : ''}
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    }).join('');
}

// Dynamic Project & README Modal Controller
function setupProjectModal() {
    const overlay = document.getElementById('dynamicProjectModal');
    if (!overlay) return;

    overlay.addEventListener('click', (e) => {
        if (e.target === overlay) {
            closeProjectModal();
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && overlay.classList.contains('active')) {
            closeProjectModal();
        }
    });
}

function openProjectModal(projectId) {
    const data = typeof getStoredPortfolioData === 'function' ? getStoredPortfolioData() : PORTFOLIO_DATA;
    if (!data) return;

    let targetProject = null;
    for (const cat of data.projectCategories) {
        const found = cat.projects.find(p => p.id === projectId);
        if (found) {
            targetProject = found;
            break;
        }
    }

    if (!targetProject) return;

    const overlay = document.getElementById('dynamicProjectModal');
    const titleEl = document.getElementById('modalProjectTitle');
    const subtitleEl = document.getElementById('modalProjectSubtitle');
    const imageWrapper = document.getElementById('modalProjectImageWrapper');
    const imageEl = document.getElementById('modalProjectImage');
    const actionsEl = document.getElementById('modalProjectActions');
    const markdownBodyEl = document.getElementById('modalProjectMarkdownBody');

    if (!overlay || !markdownBodyEl) return;

    if (titleEl) titleEl.textContent = targetProject.title;
    if (subtitleEl) subtitleEl.textContent = (targetProject.badge || '') + " • Stack: " + (targetProject.technologies || []).join(', ');

    const imgSource = targetProject.imageModal || targetProject.imageCard;
    if (imgSource && imageWrapper && imageEl) {
        imageEl.src = imgSource;
        imageWrapper.style.display = 'flex';
    } else if (imageWrapper) {
        imageWrapper.style.display = 'none';
    }

    if (actionsEl) {
        actionsEl.innerHTML = targetProject.githubUrl ? `
            <a href="${targetProject.githubUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-primary" style="display: inline-flex; align-items: center; gap: 0.5rem; text-decoration: none;">
                <span>💻 Abrir Repositorio Oficial en GitHub</span>
            </a>
        ` : '';
    }

    if (typeof marked !== 'undefined' && targetProject.readmeMarkdown) {
        markdownBodyEl.innerHTML = marked.parse(targetProject.readmeMarkdown);
    } else {
        markdownBodyEl.innerHTML = targetProject.readmeMarkdown ? `<pre style="white-space: pre-wrap;">${targetProject.readmeMarkdown}</pre>` : '<p>Sin README disponible.</p>';
    }

    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeProjectModal() {
    const overlay = document.getElementById('dynamicProjectModal');
    if (!overlay) return;

    overlay.classList.remove('active');
    document.body.style.overflow = 'auto';
}

// Deprecated alias for backward compatibility
function openProjectDetailModal(projectId) {
    openProjectModal(projectId);
}

function closeProjectDetailModal() {
    closeProjectModal();
}



