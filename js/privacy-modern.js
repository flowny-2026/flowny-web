// ===== POLÍTICA DE PRIVACIDADE MODERNA - JAVASCRIPT =====

// Função para abrir a página
function openPrivacyModal() {
    const page = document.getElementById('privacidade');
    if (page) {
        page.classList.add('active');
        document.body.style.overflow = 'hidden';
        
        // Inicializar scrollspy após um pequeno delay
        setTimeout(() => {
            initScrollspy();
        }, 100);
    }
}

// Função para fechar a página
function closePrivacyModal() {
    const page = document.getElementById('privacidade');
    if (page) {
        page.classList.remove('active');
        document.body.style.overflow = '';
    }
}

// Scrollspy - destaca seção ativa no menu
function initScrollspy() {
    const navLinks = document.querySelectorAll('.privacy-nav-link');
    const sections = document.querySelectorAll('.privacy-section');
    const contentArea = document.querySelector('.privacy-content');
    
    if (!contentArea || navLinks.length === 0 || sections.length === 0) {
        return;
    }
    
    // Função para atualizar link ativo
    function updateActiveLink() {
        const scrollTop = contentArea.scrollTop;
        const contentHeight = contentArea.scrollHeight;
        const containerHeight = contentArea.clientHeight;
        
        let activeSection = null;
        let closestDistance = Infinity;
        
        // Se estiver no final da página, ativar última seção
        if (scrollTop + containerHeight >= contentHeight - 50) {
            activeSection = sections[sections.length - 1];
        } else {
            // Encontrar seção mais próxima do topo
            sections.forEach(section => {
                const sectionTop = section.offsetTop - contentArea.offsetTop;
                const distance = Math.abs(scrollTop - sectionTop + 100);
                
                if (distance < closestDistance && scrollTop >= sectionTop - 150) {
                    closestDistance = distance;
                    activeSection = section;
                }
            });
        }
        
        // Atualizar links ativos
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (activeSection && link.getAttribute('href') === `#${activeSection.id}`) {
                link.classList.add('active');
            }
        });
    }
    
    // Listener para scroll com throttle
    let scrollTimeout;
    contentArea.addEventListener('scroll', () => {
        if (scrollTimeout) {
            clearTimeout(scrollTimeout);
        }
        scrollTimeout = setTimeout(updateActiveLink, 10);
    });
    
    // Listeners para cliques nos links
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            
            const targetId = link.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection && contentArea) {
                const offsetTop = targetSection.offsetTop - contentArea.offsetTop - 20;
                
                contentArea.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
                
                // Atualizar link ativo imediatamente
                navLinks.forEach(l => l.classList.remove('active'));
                link.classList.add('active');
            }
        });
    });
    
    // Ativar primeiro link por padrão
    if (navLinks.length > 0) {
        navLinks[0].classList.add('active');
    }
    
    // Atualizar na inicialização
    setTimeout(updateActiveLink, 100);
}

// Inicialização
document.addEventListener('DOMContentLoaded', () => {
    // Botões de fechar
    const closeButtons = document.querySelectorAll('.privacy-close-btn, .privacy-back-btn');
    closeButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            closePrivacyModal();
        });
    });
    
    // Fechar com ESC
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            const page = document.getElementById('privacidade');
            if (page && page.classList.contains('active')) {
                closePrivacyModal();
            }
        }
    });
});

// Exportar funções globalmente
window.openPrivacyModal = openPrivacyModal;
window.closePrivacyModal = closePrivacyModal;