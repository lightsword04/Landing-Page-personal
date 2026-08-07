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

// ==========================================
// ADMIN PANEL & CRUD CONTROLLER
// ==========================================

function openAdminModal() {
    const overlay = document.getElementById('adminProjectsModal');
    if (!overlay) return;

    // Load PAT into input
    const patInput = document.getElementById('githubPatInput');
    if (patInput && typeof GitHubService !== 'undefined') {
        patInput.value = GitHubService.getPAT();
    }

    updatePATStatusUI();
    renderAdminProjectsList();

    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeAdminModal() {
    const overlay = document.getElementById('adminProjectsModal');
    if (!overlay) return;

    overlay.classList.remove('active');
    document.body.style.overflow = 'auto';
}

async function updatePATStatusUI() {
    const badge = document.getElementById('patStatusBadge');
    const alertBox = document.getElementById('patStatusAlert');
    if (!badge || typeof GitHubService === 'undefined') return;

    const result = await GitHubService.verifyPAT();

    badge.className = 'pat-badge';
    if (result.status === 'VALID') {
        badge.classList.add('pat-valid');
        badge.textContent = `🟢 Token VÁLIDO (${result.user ? result.user.login : 'GitHub'})`;
    } else if (result.status === 'INVALID') {
        badge.classList.add('pat-invalid');
        badge.textContent = '🔴 Token EXPIRADO / INVÁLIDO';
    } else {
        badge.classList.add('pat-neutral');
        badge.textContent = '⚪ Sin Token PAT (Acceso Público)';
    }

    if (alertBox) {
        alertBox.style.display = 'block';
        alertBox.textContent = result.message;
        alertBox.style.color = result.status === 'VALID' ? '#4ade80' : (result.status === 'INVALID' ? '#fca5a5' : '#94a3b8');
    }
}

async function handleSavePAT() {
    const patInput = document.getElementById('githubPatInput');
    if (!patInput || typeof GitHubService === 'undefined') return;

    const token = patInput.value.trim();
    GitHubService.savePAT(token);
    await updatePATStatusUI();
}

async function handleRemovePAT() {
    if (typeof GitHubService === 'undefined') return;
    GitHubService.removePAT();
    const patInput = document.getElementById('githubPatInput');
    if (patInput) patInput.value = '';
    await updatePATStatusUI();
}

async function handleFetchGitHubRepos() {
    const reposListEl = document.getElementById('githubReposList');
    if (!reposListEl || typeof GitHubService === 'undefined') return;

    reposListEl.innerHTML = '<div style="color: var(--accent-cyan); font-size: 0.85rem; text-align: center; padding: 1rem;">⏳ Consultando API de GitHub (Públicos y Privados)...</div>';

    const repos = await GitHubService.fetchUserRepos('lightsword04');

    if (!repos || repos.length === 0) {
        reposListEl.innerHTML = '<div style="color: #fca5a5; font-size: 0.85rem; text-align: center; padding: 1rem;">No se encontraron repositorios o se excedió el límite de API sin Token.</div>';
        return;
    }

    reposListEl.innerHTML = repos.map(repo => `
        <div style="display: flex; justify-content: space-between; align-items: center; padding: 0.65rem 0.9rem; background: rgba(255, 255, 255, 0.03); border: 1px solid rgba(255, 255, 255, 0.08); border-radius: var(--radius-sm); font-size: 0.85rem;">
            <div>
                <strong style="color: #fff;">${repo.name}</strong>
                ${repo.private ? '<span style="background: rgba(239, 68, 68, 0.2); color: #fca5a5; padding: 0.1rem 0.4rem; border-radius: 4px; font-size: 0.72rem; margin-left: 0.4rem;">🔒 Privado</span>' : '<span style="background: rgba(74, 222, 128, 0.15); color: #4ade80; padding: 0.1rem 0.4rem; border-radius: 4px; font-size: 0.72rem; margin-left: 0.4rem;">🌐 Público</span>'}
                <div style="font-size: 0.78rem; color: var(--text-secondary); margin-top: 0.2rem;">${repo.description || 'Sin descripción en GitHub'}</div>
            </div>
            <button onclick="importGitHubRepo('${repo.owner.login}', '${repo.name}', '${encodeURIComponent(repo.html_url)}', '${encodeURIComponent(repo.description || '')}')" class="btn btn-primary" style="font-size: 0.78rem; padding: 0.35rem 0.75rem;">
                + Importar
            </button>
        </div>
    `).join('');
}

async function importGitHubRepo(owner, repoName, encodedUrl, encodedDesc) {
    const url = decodeURIComponent(encodedUrl);
    const desc = decodeURIComponent(encodedDesc);

    let readme = '';
    if (typeof GitHubService !== 'undefined') {
        readme = await GitHubService.fetchRepoReadme(owner, repoName);
    }

    // Populate form
    document.getElementById('formProjectId').value = 'repo-' + repoName.toLowerCase();
    document.getElementById('formProjectTitle').value = repoName;
    document.getElementById('formProjectCategory').value = 'personales';
    document.getElementById('formProjectBadge').value = 'REPOSISTORIO GITHUB';
    document.getElementById('formProjectTech').value = 'GitHub, Code';
    document.getElementById('formProjectGithubUrl').value = url;
    document.getElementById('formProjectDesc').value = desc || `Repositorio ${repoName} importado directamente de GitHub.`;
    document.getElementById('formProjectReadme').value = readme || `# ${repoName}\n\nRepositorio oficial importado desde GitHub: [${url}](${url})`;

    document.getElementById('crudFormTitle').textContent = `✏️ Editando Importación: ${repoName}`;
    document.getElementById('crudProjectForm').scrollIntoView({ behavior: 'smooth' });
}

function renderAdminProjectsList() {
    const listEl = document.getElementById('adminProjectsList');
    if (!listEl) return;

    const data = typeof getStoredPortfolioData === 'function' ? getStoredPortfolioData() : PORTFOLIO_DATA;
    if (!data || !Array.isArray(data.projectCategories)) return;

    const allProjects = [];
    data.projectCategories.forEach(cat => {
        (cat.projects || []).forEach(p => {
            allProjects.push({ ...p, categoryId: cat.categoryId, categoryTitle: cat.title });
        });
    });

    if (allProjects.length === 0) {
        listEl.innerHTML = '<div style="color: var(--text-muted); font-size: 0.85rem;">No hay proyectos registrados.</div>';
        return;
    }

    listEl.innerHTML = allProjects.map(proj => `
        <div style="display: flex; justify-content: space-between; align-items: center; padding: 0.75rem 1rem; background: rgba(255, 255, 255, 0.03); border: 1px solid var(--border-color); border-radius: var(--radius-sm); flex-wrap: wrap; gap: 0.75rem;">
            <div style="flex: 1; min-width: 220px;">
                <div style="display: flex; align-items: center; gap: 0.5rem;">
                    <strong style="color: #fff; font-size: 0.95rem;">${proj.title}</strong>
                    ${proj.hidden ? '<span style="background: rgba(239, 68, 68, 0.2); color: #fca5a5; padding: 0.1rem 0.4rem; border-radius: 4px; font-size: 0.72rem;">👁️ Oculto</span>' : '<span style="background: rgba(74, 222, 128, 0.15); color: #4ade80; padding: 0.1rem 0.4rem; border-radius: 4px; font-size: 0.72rem;">👁️ Visible</span>'}
                </div>
                <div style="font-size: 0.78rem; color: var(--accent-cyan); margin-top: 0.2rem;">${proj.categoryTitle} • ID: ${proj.id}</div>
            </div>

            <div style="display: flex; gap: 0.4rem; flex-wrap: wrap;">
                <button onclick="editProject('${proj.id}')" class="btn btn-secondary" style="font-size: 0.78rem; padding: 0.35rem 0.65rem;">✏️ Editar</button>
                <button onclick="toggleProjectVisibility('${proj.id}')" class="btn btn-secondary" style="font-size: 0.78rem; padding: 0.35rem 0.65rem;">${proj.hidden ? '👁️ Mostrar' : '🙈 Ocultar'}</button>
                <button onclick="deleteProject('${proj.id}')" class="btn btn-secondary" style="font-size: 0.78rem; padding: 0.35rem 0.65rem; background: rgba(239, 68, 68, 0.15); border-color: rgba(239, 68, 68, 0.3); color: #fca5a5;">🗑️ Eliminar</button>
            </div>
        </div>
    `).join('');
}

function handleSaveProjectForm(event) {
    event.preventDefault();

    const id = document.getElementById('formProjectId').value.trim() || ('proj-' + Date.now());
    const title = document.getElementById('formProjectTitle').value.trim();
    const categoryId = document.getElementById('formProjectCategory').value;
    const badge = document.getElementById('formProjectBadge').value.trim() || 'PROYECTO';
    const techStr = document.getElementById('formProjectTech').value.trim();
    const githubUrl = document.getElementById('formProjectGithubUrl').value.trim();
    const imageCard = document.getElementById('formProjectImage').value.trim();
    const description = document.getElementById('formProjectDesc').value.trim();
    const readmeMarkdown = document.getElementById('formProjectReadme').value;

    const technologies = techStr ? techStr.split(',').map(t => t.trim()).filter(Boolean) : [];

    const data = typeof getStoredPortfolioData === 'function' ? getStoredPortfolioData() : PORTFOLIO_DATA;

    let foundCat = data.projectCategories.find(c => c.categoryId === categoryId);
    if (!foundCat) {
        foundCat = data.projectCategories[0];
    }

    // Check if updating existing
    let existingProj = null;
    data.projectCategories.forEach(cat => {
        const idx = cat.projects.findIndex(p => p.id === id);
        if (idx !== -1) {
            existingProj = cat.projects[idx];
            cat.projects.splice(idx, 1);
        }
    });

    const newProject = {
        id,
        title,
        badge,
        imageCard,
        description,
        technologies,
        githubUrl,
        isFeatured: existingProj ? existingProj.isFeatured : false,
        hasDetailModal: true,
        readmeMarkdown: readmeMarkdown || `# ${title}\n\n${description}`,
        hidden: false
    };

    foundCat.projects.push(newProject);

    if (typeof savePortfolioData === 'function') {
        savePortfolioData(data);
    }

    cancelProjectEdit();
    renderAdminProjectsList();
    renderProjects();
}

function editProject(projectId) {
    const data = typeof getStoredPortfolioData === 'function' ? getStoredPortfolioData() : PORTFOLIO_DATA;
    let target = null;
    let categoryId = 'personales';

    for (const cat of data.projectCategories) {
        const found = cat.projects.find(p => p.id === projectId);
        if (found) {
            target = found;
            categoryId = cat.categoryId;
            break;
        }
    }

    if (!target) return;

    document.getElementById('formProjectId').value = target.id;
    document.getElementById('formProjectTitle').value = target.title;
    document.getElementById('formProjectCategory').value = categoryId;
    document.getElementById('formProjectBadge').value = target.badge || '';
    document.getElementById('formProjectTech').value = (target.technologies || []).join(', ');
    document.getElementById('formProjectGithubUrl').value = target.githubUrl || '';
    document.getElementById('formProjectImage').value = target.imageCard || '';
    document.getElementById('formProjectDesc').value = target.description || '';
    document.getElementById('formProjectReadme').value = target.readmeMarkdown || '';

    document.getElementById('crudFormTitle').textContent = `✏️ Editando: ${target.title}`;
    document.getElementById('crudProjectForm').scrollIntoView({ behavior: 'smooth' });
}

function toggleProjectVisibility(projectId) {
    const data = typeof getStoredPortfolioData === 'function' ? getStoredPortfolioData() : PORTFOLIO_DATA;
    for (const cat of data.projectCategories) {
        const found = cat.projects.find(p => p.id === projectId);
        if (found) {
            found.hidden = !found.hidden;
            break;
        }
    }
    if (typeof savePortfolioData === 'function') {
        savePortfolioData(data);
    }
    renderAdminProjectsList();
    renderProjects();
}

function deleteProject(projectId) {
    if (!confirm('¿Estás seguro de eliminar este proyecto de la landing page?')) return;

    const data = typeof getStoredPortfolioData === 'function' ? getStoredPortfolioData() : PORTFOLIO_DATA;
    for (const cat of data.projectCategories) {
        const idx = cat.projects.findIndex(p => p.id === projectId);
        if (idx !== -1) {
            cat.projects.splice(idx, 1);
            break;
        }
    }
    if (typeof savePortfolioData === 'function') {
        savePortfolioData(data);
    }
    renderAdminProjectsList();
    renderProjects();
}

function cancelProjectEdit() {
    document.getElementById('crudProjectForm').reset();
    document.getElementById('formProjectId').value = '';
    document.getElementById('crudFormTitle').textContent = '➕ Crear Nuevo Proyecto Personalizado';
}

function handleResetProjectsData() {
    if (!confirm('¿Deseas restablecer los proyectos a los valores iniciales por defecto?')) return;
    if (typeof resetPortfolioData === 'function') {
        resetPortfolioData();
    }
    renderAdminProjectsList();
    renderProjects();
}

function handleExportProjectsConfig() {
    const data = typeof getStoredPortfolioData === 'function' ? getStoredPortfolioData() : PORTFOLIO_DATA;
    const jsonStr = JSON.stringify(data, null, 4);
    
    // Copy to clipboard
    navigator.clipboard.writeText(`const PORTFOLIO_DATA = ${jsonStr};`).then(() => {
        alert('📋 ¡Configuración copiada al portapapeles! Puedes pegarla directamente en js/portfolio-data.js');
    }).catch(() => {
        alert('Configuración JSON:\n' + jsonStr.substring(0, 500) + '...');
    });
}

// Deprecated alias for backward compatibility
function openProjectDetailModal(projectId) {
    openProjectModal(projectId);
}

function closeProjectDetailModal() {
    closeProjectModal();
}


