
// =============================================================================
// SITE CONFIGURATION
// =============================================================================

const SITE_CONFIG = {
    // Basic Info
    developerName: "Sadaiah Games",
    shortName: "Sadaiah",

    // Links
    email: "contact@example.com",

    // Text Content
    heroTitle: "Building Worlds in Your Pocket.",
    heroSubtitle: "Simple, fun, and engaging Android games crafted with passion.",
    aboutTitle: "My Philosophy",
    aboutText: "I believe mobile gaming should be accessible, relaxing, and fun. As a solo developer, I focus on creating experiences that bring joy to your daily commute or coffee break.",

    // Footer
    footerCopyright: "© 2026 Sadaiah Games. All rights reserved.",

    // Games List - Folders in 'games/' directory
    games: [
        "comfy-words",
        "project-alpha",
        "codenames"
    ]
};

// =============================================================================
// LOGIC (Do not edit below this line unless you know what you are doing)
// =============================================================================

document.addEventListener("DOMContentLoaded", () => {
    // Basic Text Config
    document.querySelectorAll('[data-config-text]').forEach(el => {
        const key = el.getAttribute('data-config-text');
        if (SITE_CONFIG[key]) {
            el.textContent = SITE_CONFIG[key];
        }
    });

    // Basic Links Config
    document.querySelectorAll('[data-config-href]').forEach(el => {
        const key = el.getAttribute('data-config-href');
        if (key === 'email' && SITE_CONFIG.email) {
            el.href = `mailto:${SITE_CONFIG.email}`;
        } else if (SITE_CONFIG[key]) {
            el.href = SITE_CONFIG[key];
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
    }

    if (gamesContainer && SITE_CONFIG.games) {
        gamesContainer.innerHTML = ''; // Clear existing static content if any

        SITE_CONFIG.games.forEach(gameId => {
            fetch(`games/${gameId}/manifest.json`)
                .then(response => response.json())
                .then(game => {
                    const card = createGameCard(game, gameId);
                    gamesContainer.appendChild(card);
                })
                .catch(err => console.error(`Failed to load manifest for ${gameId}:`, err));
        });
    }
});

function createGameCard(game, folderName) {
    const div = document.createElement('div');
    div.className = "clean-card rounded-2xl overflow-hidden group";

    // Determine button style based on status
    let buttonHtml = '';

    // Always create a link, but change style/text based on status
    if (game.status === 'released') {
        buttonHtml = `
            <a href="games/${folderName}/${game.playLink}" class="w-full py-3 rounded-lg bg-accent-green hover:bg-[#1db053] text-white text-sm font-bold transition-all flex items-center justify-center gap-2 shadow-sm hover:shadow-md">
                <span class="material-symbols-outlined text-xl">play_arrow</span>
                ${game.buttonText || 'Zagraj Teraz'}
            </a>`;
    } else {
        // Even for unreleased games, allow viewing the "Coming Soon" page (template)
        buttonHtml = `
            <a href="games/${folderName}/${game.playLink}" class="w-full py-3 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-800 text-sm font-bold transition-all flex items-center justify-center gap-2 border border-gray-300">
                <span class="material-symbols-outlined text-xl">info</span>
                ${game.buttonText || 'Zobacz Szczegóły'}
            </a>`;
    }

    div.innerHTML = `
        <div class="aspect-video w-full bg-gray-100 relative overflow-hidden">
            <div class="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105" 
                 style="background-image: url('${game.thumbnail}');">
            </div>
            <div class="absolute top-4 right-4 bg-black/50 backdrop-blur-sm p-1.5 rounded-full">
                <span class="material-symbols-outlined text-white text-sm">android</span>
            </div>
        </div>
        <div class="p-8">
            <h3 class="text-xl font-bold text-black mb-1">${game.name}</h3>
            <p class="text-xs text-gray-500 uppercase tracking-wider font-bold mb-4">${game.type}</p>
            <p class="text-gray-600 text-sm mb-6 line-clamp-2 leading-relaxed">${game.description}</p>
            ${buttonHtml}
        </div>
    `;
    return div;
}
