// Script avançado para identificar seção ativa e barra de progresso
function initPrivacyScrollEffects() {
    const privacyPage = document.querySelector('.privacy-page');
    const sections = document.querySelectorAll('.privacy-section');
    const navLinks = document.querySelectorAll('.privacy-nav-link');
    const progressBar = document.querySelector('.reading-progress-bar');
    
    if (!privacyPage || !progressBar) return;
    
    // Função para atualizar a barra de progresso e scrollspy
    function updateScrollEffects() {
        // 1. Lógica da Barra de Progresso
        const winScroll = privacyPage.scrollTop;
        const height = privacyPage.scrollHeight - privacyPage.clientHeight;
        const scrolled = height > 0 ? (winScroll / height) * 100 : 0;
        progressBar.style.width = Math.min(Math.max(scrolled, 0), 100) + "%";
        
        // 2. Lógica do Scrollspy (Destaque do Menu)
        let current = "";
        let closestDistance = Infinity;
        
        sections.forEach(section => {
            const rect = section.getBoundingClientRect();
            const sectionTop = rect.top + winScroll;
            const distance = Math.abs(winScroll - sectionTop + 200);
            
            if (rect.top <= 200 && rect.bottom >= 100) {
                if (distance < closestDistance) {
                    closestDistance = distance;
                    current = section.getAttribute('id');
                }
            }
        });
        
        // Se estiver no final da página, ativar última seção
        if (winScroll + privacyPage.clientHeight >= privacyPage.scrollHeight - 50) {
            current = sections[sections.length - 1]?.getAttribute('id') || current;
        }
        
        // Atualizar links ativos
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (current && link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    }
    
    // Listener para scroll com throttle
    let scrollTimeout;
    privacyPage.addEventListener('scroll', () => {
        if (scrollTimeout) {
            clearTimeout(scrollTimeout);
        }
        scrollTimeout = setTimeout(updateScrollEffects, 10);
    });
    
    // Listeners para cliques nos links
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            
            const targetId = link.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection && privacyPage) {
                const rect = targetSection.getBoundingClientRect();
                const offsetTop = rect.top + privacyPage.scrollTop - 100;
                
                privacyPage.scrollTo({
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
    setTimeout(updateScrollEffects, 100);
}

// Inicializar quando a política de privacidade for aberta
const originalOpenPrivacyModal = window.openPrivacyModal;
window.openPrivacyModal = function() {
    originalOpenPrivacyModal();
    setTimeout(() => {
        initPrivacyScrollEffects();
    }, 200);
};