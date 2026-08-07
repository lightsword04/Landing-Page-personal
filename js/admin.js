/**
 * DEDICATED ADMIN PANEL CONTROLLER - YORDAN ROJAS PORTFOLIO
 * Only loaded on admin.html (separated from public visitors)
 */

function initAdminPage() {
    updatePATStatusUI();
    renderAdminProjectsList();
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAdminPage);
} else {
    initAdminPage();
}

// ==========================================
// GITHUB PAT TOKEN MANAGEMENT
// ==========================================

async function updatePATStatusUI() {
    const badge = document.getElementById('patStatusBadge');
    const alertBox = document.getElementById('patStatusAlert');
    const patInput = document.getElementById('githubPatInput');

    if (patInput && typeof GitHubService !== 'undefined') {
        patInput.value = GitHubService.getPAT();
    }

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

// ==========================================
// GITHUB REPO AUTO-IMPORTER
// ==========================================

async function handleFetchGitHubRepos() {
    const reposListEl = document.getElementById('githubReposList');
    if (!reposListEl || typeof GitHubService === 'undefined') return;

    reposListEl.innerHTML = '<div style="color: var(--accent-cyan); font-size: 0.85rem; text-align: center; padding: 1rem;">⏳ Consultando API de GitHub (Públicos y Privados)...</div>';

    const repos = await GitHubService.fetchUserRepos('lightsword04');

    if (!repos || repos.length === 0) {
        reposListEl.innerHTML = '<div style="color: #fca5a5; font-size: 0.85rem; text-align: center; padding: 1rem;">No se encontraron repositorios o se excedió el límite de API sin Token.</div>';
        return;
    }

    const data = typeof getStoredPortfolioData === 'function' ? getStoredPortfolioData() : PORTFOLIO_DATA;
    const existingProjects = [];
    if (data && Array.isArray(data.projectCategories)) {
        data.projectCategories.forEach(cat => {
            (cat.projects || []).forEach(p => existingProjects.push(p));
        });
    }

    const isRepoAdded = (repo) => {
        const repoUrlLower = repo.html_url.toLowerCase();
        const repoNameLower = repo.name.toLowerCase();
        return existingProjects.some(p => {
            if (p.githubUrl && p.githubUrl.toLowerCase() === repoUrlLower) return true;
            if (p.githubUrl && p.githubUrl.toLowerCase().endsWith('/' + repoNameLower)) return true;
            if (p.id && (p.id.toLowerCase() === 'repo-' + repoNameLower || p.id.toLowerCase() === repoNameLower)) return true;
            return false;
        });
    };

    reposListEl.innerHTML = repos.map(repo => {
        const alreadyAdded = isRepoAdded(repo);

        return `
            <div style="display: flex; justify-content: space-between; align-items: center; padding: 0.65rem 0.9rem; background: ${alreadyAdded ? 'rgba(6, 182, 212, 0.05)' : 'rgba(255, 255, 255, 0.03)'}; border: 1px solid ${alreadyAdded ? 'rgba(6, 182, 212, 0.2)' : 'rgba(255, 255, 255, 0.08)'}; border-radius: var(--radius-sm); font-size: 0.85rem; flex-wrap: wrap; gap: 0.5rem;">
                <div>
                    <strong style="color: #fff;">${repo.name}</strong>
                    ${repo.private ? '<span style="background: rgba(239, 68, 68, 0.2); color: #fca5a5; padding: 0.1rem 0.4rem; border-radius: 4px; font-size: 0.72rem; margin-left: 0.4rem;">🔒 Privado</span>' : '<span style="background: rgba(74, 222, 128, 0.15); color: #4ade80; padding: 0.1rem 0.4rem; border-radius: 4px; font-size: 0.72rem; margin-left: 0.4rem;">🌐 Público</span>'}
                    <div style="font-size: 0.78rem; color: var(--text-secondary); margin-top: 0.2rem;">${repo.description || 'Sin descripción en GitHub'}</div>
                </div>

                <div>
                    ${alreadyAdded ? `
                        <span style="background: rgba(74, 222, 128, 0.15); color: #4ade80; border: 1px solid rgba(74, 222, 128, 0.3); padding: 0.35rem 0.75rem; border-radius: var(--radius-sm); font-size: 0.78rem; font-weight: 600; display: inline-flex; align-items: center; gap: 0.3rem;">
                            ✓ Ya en el Portafolio
                        </span>
                    ` : `
                        <button onclick="importGitHubRepo('${repo.owner.login}', '${repo.name}', '${encodeURIComponent(repo.html_url)}', '${encodeURIComponent(repo.description || '')}', '${repo.language || ''}')" class="btn btn-primary" style="font-size: 0.78rem; padding: 0.35rem 0.75rem;">
                            + Importar
                        </button>
                    `}
                </div>
            </div>
        `;
    }).join('');
}

async function importGitHubRepo(owner, repoName, encodedUrl, encodedDesc, mainLanguage) {
    const url = decodeURIComponent(encodedUrl);
    const desc = decodeURIComponent(encodedDesc);

    let readme = '';
    if (typeof GitHubService !== 'undefined') {
        readme = await GitHubService.fetchRepoReadme(owner, repoName);
    }

    const techList = mainLanguage ? [mainLanguage, 'GitHub'] : ['GitHub', 'Code'];

    // Populate form
    document.getElementById('formProjectId').value = 'repo-' + repoName.toLowerCase();
    document.getElementById('formProjectTitle').value = repoName;
    document.getElementById('formProjectCategory').value = 'personales';
    document.getElementById('formProjectBadge').value = mainLanguage ? `PROYECTO EN ${mainLanguage.toUpperCase()}` : 'REPOSITORIO GITHUB';
    document.getElementById('formProjectTech').value = techList.join(', ');
    document.getElementById('formProjectGithubUrl').value = url;
    document.getElementById('formProjectDesc').value = desc || `Repositorio ${repoName} importado directamente de GitHub.`;
    document.getElementById('formProjectReadme').value = readme || `# ${repoName}\n\nRepositorio oficial importado desde GitHub: [${url}](${url})`;

    document.getElementById('crudFormTitle').textContent = `✏️ Editando Importación: ${repoName}`;
    document.getElementById('crudProjectForm').scrollIntoView({ behavior: 'smooth' });
}

// ==========================================
// PROJECT CRUD OPERATIONS
// ==========================================

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

    const reposListEl = document.getElementById('githubReposList');
    if (reposListEl && reposListEl.children.length > 1) {
        handleFetchGitHubRepos();
    }
}

async function handleImageFileSelect(event) {
    const file = event.target.files[0];
    if (!file) return;

    const statusEl = document.getElementById('formImageUploadStatus');
    const previewContainer = document.getElementById('formImagePreviewContainer');
    const previewImg = document.getElementById('formImagePreview');
    const imageInput = document.getElementById('formProjectImage');

    if (!file.type.startsWith('image/')) {
        alert('Por favor selecciona un archivo de imagen válido (.png, .jpg, .webp).');
        return;
    }

    // Instant local preview using Base64 Data URL
    const reader = new FileReader();
    reader.onload = (e) => {
        if (previewImg && previewContainer) {
            previewImg.src = e.target.result;
            previewContainer.style.display = 'block';
        }
        if (imageInput && !imageInput.value) {
            imageInput.value = e.target.result;
        }
    };
    reader.readAsDataURL(file);

    // Upload to GitHub repository if PAT is available
    if (statusEl) {
        statusEl.style.display = 'block';
        statusEl.style.color = 'var(--accent-cyan)';
        statusEl.textContent = '⏳ Procesando y subiendo imagen a tu repositorio en GitHub...';
    }

    if (typeof GitHubService !== 'undefined') {
        const uploadRes = await GitHubService.uploadImageToRepo(file);

        if (statusEl) {
            statusEl.style.color = uploadRes.success ? '#4ade80' : '#94a3b8';
            statusEl.textContent = uploadRes.message;
        }

        if (uploadRes.success && uploadRes.path) {
            if (imageInput) {
                imageInput.value = uploadRes.path;
            }
        }
    }
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

    // Load preview if image exists
    const previewContainer = document.getElementById('formImagePreviewContainer');
    const previewImg = document.getElementById('formImagePreview');
    if (target.imageCard && previewContainer && previewImg) {
        previewImg.src = target.imageCard;
        previewContainer.style.display = 'block';
    } else if (previewContainer) {
        previewContainer.style.display = 'none';
    }

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
}

function deleteProject(projectId) {
    if (!confirm('¿Estás seguro de eliminar este proyecto del portafolio?')) return;

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
}

function cancelProjectEdit() {
    document.getElementById('crudProjectForm').reset();
    document.getElementById('formProjectId').value = '';
    document.getElementById('crudFormTitle').textContent = '➕ Crear Nuevo Proyecto Personalizado';
    
    const previewContainer = document.getElementById('formImagePreviewContainer');
    const statusEl = document.getElementById('formImageUploadStatus');
    if (previewContainer) previewContainer.style.display = 'none';
    if (statusEl) statusEl.style.display = 'none';
}

function handleResetProjectsData() {
    if (!confirm('¿Deseas restablecer los proyectos a los valores iniciales por defecto?')) return;
    if (typeof resetPortfolioData === 'function') {
        resetPortfolioData();
    }
    renderAdminProjectsList();
}

function handleExportProjectsConfig() {
    const data = typeof getStoredPortfolioData === 'function' ? getStoredPortfolioData() : PORTFOLIO_DATA;
    const jsonStr = JSON.stringify(data, null, 4);
    
    navigator.clipboard.writeText(`const PORTFOLIO_DATA = ${jsonStr};`).then(() => {
        alert('📋 ¡Configuración copiada al portapapeles! Puedes pegarla directamente en js/portfolio-data.js');
    }).catch(() => {
        alert('Configuración JSON:\n' + jsonStr.substring(0, 500) + '...');
    });
}
