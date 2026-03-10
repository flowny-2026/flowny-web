// ===== SINGLE PAGE SCROLL FUNCTIONALITY =====

// Scroll suave para links de âncora (exceto os da política de privacidade)
document.addEventListener('DOMContentLoaded', function() {
    // Adicionar scroll suave apenas para links de navegação principal
    document.querySelectorAll('a[href^="#"]:not(.privacy-nav-link)').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            // Não interceptar links da política de privacidade
            if (this.closest('.privacy-page-modern')) {
                return;
            }
            
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const target = document.getElementById(targetId);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Event listeners para elementos com IDs
    const menuToggle = document.getElementById('menu-toggle');
    const privacyBack = document.getElementById('privacy-back');
    const privacyClose = document.getElementById('privacy-close');
    const privacyLink = document.getElementById('privacy-link');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', toggleMenu);
    }
    
    if (privacyBack) {
        privacyBack.addEventListener('click', function(e) {
            e.preventDefault();
            closePrivacyModal();
        });
    }
    
    if (privacyClose) {
        privacyClose.addEventListener('click', closePrivacyModal);
    }
    
    if (privacyLink) {
        privacyLink.addEventListener('click', function(e) {
            e.preventDefault();
            openPrivacyModal();
        });
    }
});

// Menu hambúrguer simples
function toggleMenu() {
    const hamburger = document.querySelector('.hamburger-menu');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    }
}

// Fechar menu ao clicar em um link
document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', function() {
            const hamburger = document.querySelector('.hamburger-menu');
            const navMenu = document.querySelector('.nav-menu');
            
            if (hamburger && navMenu) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            }
        });
    });
    
    // Fechar modal ao clicar fora do conteúdo
    const modal = document.getElementById('privacidade');
    if (modal) {
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                closePrivacyModal();
            }
        });
    }
});

// Fechar modal com tecla ESC
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        const modal = document.getElementById('privacidade');
        if (modal && modal.classList.contains('active')) {
            closePrivacyModal();
        }
    }
});

// Tornar a função global
window.toggleMenu = toggleMenu;

// Funções para modal de privacidade
function openPrivacyModal() {
    const modal = document.getElementById('privacidade');
    if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

function closePrivacyModal() {
    const modal = document.getElementById('privacidade');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
}

// Tornar as funções globais
window.openPrivacyModal = openPrivacyModal;
window.closePrivacyModal = closePrivacyModal;