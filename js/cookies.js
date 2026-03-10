// Script para gerenciar o banner de cookies

// Aguardar o DOM estar pronto
document.addEventListener('DOMContentLoaded', function() {
    
    // Verificar se já aceitou cookies
    const cookiesJaAceitos = localStorage.getItem('cookiesAceitos');
    
    if (cookiesJaAceitos) {
        return;
    }
    
    // Criar e mostrar banner
    criarBannerCookies();
    
    // Mostrar banner após 1 segundo
    setTimeout(() => {
        const banner = document.querySelector('.cookie-banner');
        if (banner) {
            banner.style.display = 'flex';
            banner.classList.add('show');
        }
    }, 1000);
});

function criarBannerCookies() {
    
    // Verificar se já existe um banner
    const bannerExistente = document.querySelector('.cookie-banner');
    if (bannerExistente) {
        bannerExistente.remove();
    }
    
    // Criar HTML do banner
    const banner = document.createElement('div');
    banner.className = 'cookie-banner';
    banner.innerHTML = `
        <div class="cookie-content">
            <div class="cookie-icon">🍪</div>
            <div class="cookie-text">
                <h3>Cookies e Privacidade</h3>
                <p>Utilizamos cookies para melhorar sua experiência. Ao continuar navegando, você concorda com nossa <a href="#" class="privacy-link-cookies">Política de Privacidade</a>.</p>
            </div>
            <div class="cookie-actions">
                <button class="cookie-btn cookie-btn-accept">Aceitar Todos</button>
                <button class="cookie-btn cookie-btn-settings">Personalizar</button>
            </div>
        </div>
    `;
    
    document.body.appendChild(banner);
    
    // Adicionar event listeners
    const acceptBtn = banner.querySelector('.cookie-btn-accept');
    const settingsBtn = banner.querySelector('.cookie-btn-settings');
    const privacyLink = banner.querySelector('.privacy-link-cookies');
    
    if (acceptBtn) {
        acceptBtn.addEventListener('click', function() {
            aceitarTodosCookies();
        });
    }
    
    if (settingsBtn) {
        settingsBtn.addEventListener('click', function() {
            // Implementar modal de configurações se necessário
        });
    }
    
    if (privacyLink) {
        privacyLink.addEventListener('click', function(e) {
            e.preventDefault();
            if (typeof window.openPrivacyModal === 'function') {
                window.openPrivacyModal();
            }
        });
    }
}

function aceitarTodosCookies() {
    
    try {
        // Salvar no localStorage
        localStorage.setItem('cookiesAceitos', 'true');
        localStorage.setItem('dataAceite', new Date().toISOString());
        
        // Ocultar banner
        const banner = document.querySelector('.cookie-banner');
        if (banner) {
            banner.classList.remove('show');
            banner.style.display = 'none';
        }
        
    } catch (error) {
        // Erro silencioso em produção
    }
}