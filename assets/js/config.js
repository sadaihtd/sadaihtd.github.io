
// =============================================================================
// SITE CONFIGURATION || poprawka config
// =============================================================================

const SITE_CONFIG = {
    // Common Data (same for all languages)
    common: {
        developerName: "Sad Dev Studio",
        shortName: "Saddev",
        email: "contact@example.com",
        footerCopyright: "© 2026 Sad Dev Studio. All rights reserved.",
        games: [
            "comfy-words",
            "project-alpha",
            "codenames"
        ],
        aboutPageImage: "assets/images/about_us.png",
        careersPageImage: "assets/images/careers_photo.png",
        heroImage: "assets/images/hero_bg2.png"
    },

    // Language Specific Data
    languages: {
        en: {
            heroTitle: "Building Worlds in Your Pocket.",
            heroSubtitle: "Simple, fun, and engaging Android games crafted with passion.",
            exploreGamesBtn: "Explore Games",
            watchReelBtn: "Watch Reel",

            ourCreationsTitle: "Our Creations",
            ourCreationsSubtitle: "Experience our latest title(s) available now on Android.",
            viewAllGamesBtn: "View All Games",

            aboutTitle: "My Philosophy",
            aboutText: "I believe mobile gaming should be accessible, relaxing, and fun. As a solo developer, I focus on creating experiences that bring joy to your daily commute or coffee break.",
            aboutUsBtn: "About Us",
            joinTeamBtn: "Join Our Team",
            gamesLink: "Games",
            careersLink: "Careers",
            privacyPolicyLink: "Privacy Policy",
            featuresTitle: "Features",

            // About Page
            aboutPageTitle: "About Sad Dev Studio",
            aboutPageSubtitle: "Passion for pixels, code, and storytelling.",
            aboutPageContent1: "Sad Dev Studio is a one-person independent game studio dedicated to crafting meaningful mobile experiences. Founded in 2026, the mission is simple: create games that respect your time and intelligence.",
            aboutPageContent2: "Every project is a labor of love, built from scratch with a focus on clean design, smooth gameplay, and no predatory monetization. When you play a Sadaiah game, you're playing something made by a gamer, for gamers.",
            backToGamesBtn: "Back to Games",

            // Careers Page
            careersPageTitle: "Join the Team",
            careersPageSubtitle: "Currently, the team is just me. But who knows?",
            careersPageContent1: "Sad Dev Studio is a solo operation. I do the coding, the art, the sound, and the coffee making. It's a lot of hats for one head, but I wouldn't have it any other way.",
            careersPageContent2: "While I'm not actively hiring, I'm always open to collaborations with talented artists or musicians. If you love games and want to make something cool together, drop me a line!",
            openPositionsTitle: "Open Positions",
            noPositionsText: "No open positions at the moment. Check back later!",
        },
        pl: {
            heroTitle: "Budujemy Światy w Twojej Kieszeni.",
            heroSubtitle: "Proste, zabawne i wciągające gry na Androida, tworzone z pasją.",
            exploreGamesBtn: "Poznaj Gry",
            watchReelBtn: "Zobacz Wideo",

            ourCreationsTitle: "Nasze Gry",
            ourCreationsSubtitle: "Sprawdź nasze najnowsze tytuły dostępne na Androida.",
            viewAllGamesBtn: "Wszystkie Gry",

            aboutTitle: "Moja Filozofia",
            aboutText: "Wierzę, że gry mobilne powinny być dostępne, relaksujące i zabawne. Jako solowy twórca skupiam się na tworzeniu doświadczeń, które dają radość podczas codziennych dojazdów czy przerwy na kawę.",
            aboutUsBtn: "O Nas",
            joinTeamBtn: "Dołącz do Zespołu",
            gamesLink: "Gry",
            careersLink: "Kariera",
            privacyPolicyLink: "Polityka Prywatności",
            featuresTitle: "Cechy Gry",

            // About Page
            aboutPageTitle: "O Sad Dev Studio",
            aboutPageSubtitle: "Pasja do pikseli, kodu i opowieści.",
            aboutPageContent1: "Sad Dev Studio to jednoosobowe studio gier niezależnych, dedykowane tworzeniu wartościowych doświadczeń mobilnych. Założone w 2026 roku, z prostą misją: tworzyć gry, które szanują Twój czas i inteligencję.",
            aboutPageContent2: "Każdy projekt to praca z miłości, budowana od podstaw z naciskiem na czysty design, płynną rozgrywkę i brak drapieżnej monetyzacji. Grając w grę Sadaiah, grasz w coś stworzonego przez gracza, dla graczy.",
            backToGamesBtn: "Powrót do Gier",

            // Careers Page
            careersPageTitle: "Dołącz do Zespołu",
            careersPageSubtitle: "Aktualnie zespół to tylko ja. Ale kto wie?",
            careersPageContent1: "Sad Dev Studio to operacja jednoosobowa. Robię kod, grafikę, dźwięk i parzę kawę. To dużo czapek na jedną głowę, ale nie chciałbym inaczej.",
            careersPageContent2: "Mimo że aktywnie nie zatrudniam, zawsze jestem otwarty na współpracę z utalentowanymi artystami czy muzykami. Jeśli kochasz gry i chcesz stworzyć razem coś fajnego, napisz do mnie!",
            openPositionsTitle: "Otwarte Stanowiska",
            noPositionsText: "Brak otwartych stanowisk w tej chwili. Sprawdź później!",
        }
    },

};

// =============================================================================
// LOGIC (Do not edit below this line unless you know what you are doing)
// =============================================================================

// Helper: Get user language (priority: localStorage > browser > default en)
function getLanguage() {
    const savedLang = localStorage.getItem('site_language');
    if (savedLang) return savedLang;

    const navLang = navigator.language || navigator.userLanguage;
    return navLang.startsWith('pl') ? 'pl' : 'en';
}

// Helper: Set language and reload
function setLanguage(lang) {
    localStorage.setItem('site_language', lang);
    window.location.reload();
}

// Flatten config based on language for easy access
function getActiveConfig() {
    const lang = getLanguage();
    return {
        ...SITE_CONFIG.common,
        ...SITE_CONFIG.languages[lang],
        currentLang: lang,
        // Helper to access common properties if needed explicitly
        common: SITE_CONFIG.common
    };
}

const ACTIVE_CONFIG = getActiveConfig();

document.addEventListener("DOMContentLoaded", () => {
    // Basic Text Config
    document.querySelectorAll('[data-config-text]').forEach(el => {
        const key = el.getAttribute('data-config-text');
        if (ACTIVE_CONFIG[key]) {
            el.textContent = ACTIVE_CONFIG[key];
        }
    });

    // Basic Links Config
    document.querySelectorAll('[data-config-href]').forEach(el => {
        const key = el.getAttribute('data-config-href');
        if (key === 'email' && ACTIVE_CONFIG.email) {
            el.href = `mailto:${ACTIVE_CONFIG.email}`;
        } else if (ACTIVE_CONFIG[key] && key !== 'careersLink') { // Avoid overwriting careers link with text
            el.href = ACTIVE_CONFIG[key];
        }
    });

    // Dynamic Images Config
    document.querySelectorAll('[data-config-src]').forEach(el => {
        const key = el.getAttribute('data-config-src');
        if (SITE_CONFIG[key] || ACTIVE_CONFIG[key]) { // Check root (common images) or lang specific
            el.src = SITE_CONFIG[key] || ACTIVE_CONFIG[key];
        }
    });

    // Dynamic Games Loading
    const gamesContainer = document.getElementById('games-container');

    // Check for file protocol which blocks fetch
    if (window.location.protocol === 'file:') {
        const warning = document.createElement('div');
        warning.className = "col-span-full text-center py-12 text-red-500 font-bold bg-red-50 rounded-xl border border-red-200 p-4";
        warning.innerHTML = `
            <p class="text-lg mb-2">⚠️ Uwaga: Tryb lokalny wykryty (file://)</p>
            <p class="text-sm font-normal text-gray-700">
                Przeglądarki blokują wczytywanie plików konfiguracyjnych (JSON) bezpośrednio z dysku ze względów bezpieczeństwa.<br>
                Aby zobaczyć gry, użyj wtyczki "Live Server" w VS Code lub wrzuć stronę na GitHub Pages.
            </p>
        `;
        if (gamesContainer) {
            gamesContainer.innerHTML = '';
            gamesContainer.appendChild(warning);
        }
        return;
    } else {
        // Load Components (Header/Footer)
        loadComponent('site-header', 'assets/components/header.html', setupNavigation);
        loadComponent('site-footer', 'assets/components/footer.html');
    }

    if (gamesContainer && ACTIVE_CONFIG.games) {
        gamesContainer.innerHTML = ''; // Clear existing static content if any

        // Use Promise.all to fetch all manifests in parallel but process them in order
        const gamePromises = ACTIVE_CONFIG.games.map(gameId =>
            fetch(`games/${gameId}/manifest.json`)
                .then(response => {
                    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
                    return response.json();
                })
                .then(game => ({ game, gameId }))
                .catch(err => {
                    console.error(`Failed to load manifest for ${gameId}:`, err);
                    return null;
                })
        );

        Promise.all(gamePromises).then(results => {
            results.forEach(result => {
                if (result) {
                    const card = createGameCard(result.game, result.gameId, ACTIVE_CONFIG.currentLang);
                    gamesContainer.appendChild(card);
                }
            });
        });
    }
});

function createGameCard(game, folderName, lang) {
    const div = document.createElement('div');
    div.className = "clean-card rounded-2xl overflow-hidden group";

    // Detect fields based on language fallback
    const name = (lang === 'pl' && game.name_pl) ? game.name_pl : game.name;
    const type = (lang === 'pl' && game.type_pl) ? game.type_pl : game.type;
    const description = (lang === 'pl' && game.description_pl) ? game.description_pl : game.description;
    const buttonText = (lang === 'pl' && game.buttonText_pl) ? game.buttonText_pl : (game.buttonText || (lang === 'pl' ? 'Zagraj Teraz' : 'Play Now'));

    // Determine button style based on status
    let buttonHtml = '';

    // Always create a link, but change style/text based on status
    if (game.status === 'released') {
        buttonHtml = `
            <a href="games/${folderName}/${game.playLink}" class="w-full py-3 rounded-lg bg-accent-green hover:bg-[#1db053] text-white text-sm font-bold transition-all flex items-center justify-center gap-2 shadow-sm hover:shadow-md">
                <span class="material-symbols-outlined text-xl">play_arrow</span>
                ${buttonText}
            </a>`;
    } else {
        // Even for unreleased games, allow viewing the "Coming Soon" page (template)
        // Fallback for button text if not in manifest
        const infoText = (lang === 'pl' && game.buttonText_pl) ? game.buttonText_pl : (game.buttonText || (lang === 'pl' ? 'Zobacz Szczegóły' : 'Read More'));

        buttonHtml = `
            <a href="games/${folderName}/${game.playLink}" class="w-full py-3 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-800 text-sm font-bold transition-all flex items-center justify-center gap-2 border border-gray-300">
                <span class="material-symbols-outlined text-xl">info</span>
                ${infoText}
            </a>`;
    }

    div.innerHTML = `
        <div class="aspect-video w-full bg-gray-100 relative overflow-hidden">
            <div class="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                 style="background-image: url('games/${folderName}/${game.thumbnail}');">
            </div>
            <div class="absolute top-4 right-4 bg-black/50 backdrop-blur-sm p-1.5 rounded-full">
                <span class="material-symbols-outlined text-white text-sm">android</span>
            </div>
        </div>
        <div class="p-8">
            <h3 class="text-xl font-bold text-black mb-1">${name}</h3>
            <p class="text-xs text-gray-500 uppercase tracking-wider font-bold mb-4">${type}</p>
            <p class="text-gray-600 text-sm mb-6 line-clamp-2 leading-relaxed">${description}</p>
            ${buttonHtml}
        </div>
    `;
    return div;
}

async function loadComponent(elementId, path, callback) {
    const element = document.getElementById(elementId);
    if (!element) return;

    try {
        const response = await fetch(path);
        if (!response.ok) throw new Error(`Failed to load ${path}`);
        const html = await response.text();
        element.innerHTML = html;

        // Auto-fix relative links if we are loading config from a subdirectory (indicated by path starting with ../../)
        if (path.startsWith('../../')) {
            element.querySelectorAll('a').forEach(a => {
                const href = a.getAttribute('href');
                if (href && !href.startsWith('http') && !href.startsWith('#') && !href.startsWith('mailto:') && !href.startsWith('javascript:')) {
                    a.setAttribute('href', '../../' + href);
                }
            });
            element.querySelectorAll('img').forEach(img => {
                const src = img.getAttribute('src');
                if (src && !src.startsWith('http') && !src.startsWith('data:') && !src.startsWith('../../')) { // Check if not already fixed or absolute
                    img.setAttribute('src', '../../' + src);
                }
            });
        }

        // Re-run config replacement on loaded content
        element.querySelectorAll('[data-config-text]').forEach(el => {
            const key = el.getAttribute('data-config-text');
            if (ACTIVE_CONFIG[key]) el.textContent = ACTIVE_CONFIG[key];
        });
        element.querySelectorAll('[data-config-href]').forEach(el => {
            const key = el.getAttribute('data-config-href');
            if (key === 'email' && ACTIVE_CONFIG.email) el.href = `mailto:${ACTIVE_CONFIG.email}`;
        });

        // Language Toggle Logic (if present)
        const setupLangButton = (btnId) => {
            const btn = element.querySelector(btnId);
            if (btn) {
                const currentLang = getLanguage();
                btn.textContent = currentLang === 'pl' ? 'EN' : 'PL';
                btn.onclick = (e) => {
                    e.preventDefault();
                    setLanguage(currentLang === 'pl' ? 'en' : 'pl');
                };
            }
        };

        setupLangButton('#lang-toggle');
        setupLangButton('#lang-toggle-mobile');

        // Mobile Menu Logic
        const mobileMenuBtn = element.querySelector('#mobile-menu-btn');
        const mobileMenu = element.querySelector('#mobile-menu');
        const menuIcon = element.querySelector('#menu-icon');

        if (mobileMenuBtn && mobileMenu && menuIcon) {
            mobileMenuBtn.onclick = () => {
                const isHidden = mobileMenu.classList.contains('hidden');
                if (isHidden) {
                    mobileMenu.classList.remove('hidden');
                    menuIcon.textContent = 'close';
                } else {
                    mobileMenu.classList.add('hidden');
                    menuIcon.textContent = 'menu';
                }
            };

            // Close menu on link click
            mobileMenu.querySelectorAll('a').forEach(link => {
                link.addEventListener('click', () => {
                    mobileMenu.classList.add('hidden');
                    menuIcon.textContent = 'menu';
                });
            });
        }

        if (callback) callback();
    } catch (error) {
        console.error(error);
    }
}

function setupNavigation() {
    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll('.nav-link');

    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        // Simple check: if current path contains the href (e.g. /about.html)
        // OR if it's the home page and href is index.html
        if (currentPath.includes(href) || (href === 'index.html' && (currentPath.endsWith('/') || currentPath.endsWith('index.html')))) {
            link.classList.remove('text-gray-600', 'font-medium');
            link.classList.add('text-black', 'font-bold');
        } else {
            link.classList.remove('text-black', 'font-bold');
            link.classList.add('text-gray-600', 'font-medium');
        }
    });
}
