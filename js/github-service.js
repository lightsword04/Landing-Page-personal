/**
 * GITHUB API SERVICE - PAT TOKEN MANAGER & REPOSITORY FETCHING
 */

const GITHUB_PAT_KEY = 'PORTFOLIO_GITHUB_PAT';

const GitHubService = {
    // PAT Token Management
    getPAT() {
        return localStorage.getItem(GITHUB_PAT_KEY) || '';
    },

    savePAT(token) {
        if (token) {
            localStorage.setItem(GITHUB_PAT_KEY, token.trim());
        } else {
            localStorage.removeItem(GITHUB_PAT_KEY);
        }
    },

    removePAT() {
        localStorage.removeItem(GITHUB_PAT_KEY);
    },

    // Verify PAT token status with GitHub API
    async verifyPAT(tokenOverride) {
        const token = tokenOverride !== undefined ? tokenOverride.trim() : this.getPAT();
        if (!token) {
            return {
                status: 'NO_TOKEN',
                message: '⚪ Sin Token PAT configurado (Acceso solo a repositorios públicos).',
                user: null
            };
        }

        try {
            const res = await fetch('https://api.github.com/user', {
                headers: {
                    'Authorization': `token ${token}`,
                    'Accept': 'application/vnd.github.v3+json'
                }
            });

            if (res.status === 200) {
                const userData = await res.json();
                return {
                    status: 'VALID',
                    message: `🟢 Token VÁLIDO y ACTIVO (${userData.login})`,
                    user: userData
                };
            } else if (res.status === 401) {
                return {
                    status: 'INVALID',
                    message: '🔴 Token INVÁLIDO o EXPIRADO. Por favor ingresa un PAT vigente.',
                    user: null
                };
            } else {
                return {
                    status: 'ERROR',
                    message: `⚠️ Error de respuesta de GitHub (HTTP ${res.status}).`,
                    user: null
                };
            }
        } catch (err) {
            return {
                status: 'NETWORK_ERROR',
                message: '⚠️ Error de conexión a la API de GitHub.',
                user: null
            };
        }
    },

    // Fetch User Repositories (Public + Private if PAT is active)
    async fetchUserRepos(username = 'lightsword04') {
        const token = this.getPAT();
        const headers = {
            'Accept': 'application/vnd.github.v3+json'
        };

        if (token) {
            headers['Authorization'] = `token ${token}`;
        }

        const endpoint = token
            ? 'https://api.github.com/user/repos?per_page=100&sort=updated'
            : `https://api.github.com/users/${username}/repos?per_page=100&sort=updated`;

        try {
            const res = await fetch(endpoint, { headers });
            if (!res.ok) {
                throw new Error(`GitHub API error HTTP ${res.status}`);
            }

            const repos = await res.json();
            return Array.isArray(repos) ? repos : [];
        } catch (err) {
            console.error('Error fetching GitHub repos:', err);
            return [];
        }
    },

    // Fetch README content of a repository
    async fetchRepoReadme(owner, repoName) {
        const token = this.getPAT();
        const headers = {
            'Accept': 'application/vnd.github.v3+json'
        };
        if (token) {
            headers['Authorization'] = `token ${token}`;
        }

        try {
            const res = await fetch(`https://api.github.com/repos/${owner}/${repoName}/readme`, { headers });
            if (!res.ok) return '';
            const data = await res.json();
            if (data.content) {
                // Decode base64 UTF-8
                const binary = atob(data.content.replace(/\s/g, ''));
                const bytes = new Uint8Array(binary.length);
                for (let i = 0; i < binary.length; i++) {
                    bytes[i] = binary.charCodeAt(i);
                }
                return new TextDecoder('utf-8').decode(bytes);
            }
            return '';
        } catch (err) {
            console.error('Error fetching repo README:', err);
            return '';
        }
    },

    // Infer technologies based on language & root files
    inferTechnologies(repo, rootFiles = []) {
        const tech = new Set();

        if (repo.language) {
            tech.add(repo.language);
        }

        const filesLower = rootFiles.map(f => f.toLowerCase());

        if (filesLower.includes('pubspec.yaml')) tech.add('Flutter').add('Dart');
        if (filesLower.includes('pom.xml') || filesLower.includes('build.gradle')) tech.add('Java').add('Spring Boot');
        if (filesLower.includes('package.json')) tech.add('Node.js').add('JavaScript');
        if (filesLower.includes('requirements.txt') || filesLower.includes('pyproject.toml')) tech.add('Python');
        if (filesLower.includes('dockerfile') || filesLower.includes('docker-compose.yml')) tech.add('Docker');

        return Array.from(tech);
    }
};

if (typeof module !== 'undefined' && module.exports) {
    module.exports = GitHubService;
}
