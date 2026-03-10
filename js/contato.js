// ===== FORMULÁRIO DE CONTATO =====
// Configuração do EmailJS

(function() {
    'use strict';
    
    // ========================================
    // CONFIGURAÇÃO DO EMAILJS
    // ========================================
    
    const EMAILJS_CONFIG = {
        publicKey: 'FnmWCrl1UeOzRr2cq',
        serviceId: 'service_rfaevlt',
        templateId: 'template_gptydxj'
    };
    
    // ========================================
    
    // Inicializar EmailJS quando o DOM estiver pronto
    document.addEventListener('DOMContentLoaded', function() {
        
        // Verificar se EmailJS foi carregado
        if (typeof emailjs === 'undefined') {
            return;
        }
        
        // Inicializar EmailJS com a chave pública
        try {
            emailjs.init(EMAILJS_CONFIG.publicKey);
        } catch (error) {
            return;
        }
        
        const contactForm = document.getElementById('contact-form-modern');
        
        if (!contactForm) {
            return;
        }
        
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Coletar dados do formulário
            const formData = {
                from_name: document.getElementById('nome-modern').value,
                from_email: document.getElementById('email-modern').value,
                phone: document.getElementById('telefone-modern').value || 'Não informado',
                message: document.getElementById('mensagem-modern').value
            };
            
            // Validação básica
            if (!formData.from_name || !formData.from_email || !formData.message) {
                alert('Por favor, preencha todos os campos obrigatórios.');
                return;
            }
            
            // Validar email
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(formData.from_email)) {
                alert('Por favor, insira um email válido.');
                return;
            }
            
            // Desabilitar botão durante o envio
            const submitBtn = contactForm.querySelector('.btn-submit-modern');
            const originalText = submitBtn.querySelector('.btn-text').textContent;
            const spinner = submitBtn.querySelector('.btn-spinner');
            const arrow = submitBtn.querySelector('.btn-arrow');
            
            submitBtn.disabled = true;
            submitBtn.querySelector('.btn-text').textContent = 'Enviando...';
            spinner.style.display = 'block';
            arrow.style.display = 'none';
            
            // Enviar email usando EmailJS
            emailjs.send(
                EMAILJS_CONFIG.serviceId,
                EMAILJS_CONFIG.templateId,
                formData
            )
            .then(function(response) {
                // Feedback de sucesso
                const btnText = submitBtn.querySelector('.btn-text');
                btnText.textContent = 'Mensagem Enviada!';
                submitBtn.style.background = 'linear-gradient(135deg, #10B981 0%, #059669 100%)';
                
                setTimeout(() => {
                    btnText.textContent = 'Enviar Mensagem';
                    submitBtn.style.background = '';
                }, 3000);
                
                // Limpar formulário
                contactForm.reset();
                
                // Remover classes dos inputs
                const inputs = contactForm.querySelectorAll('.form-input-modern');
                inputs.forEach(input => {
                    input.classList.remove('has-value', 'focused');
                });
                
                alert('✅ Mensagem enviada com sucesso!\n\nEntraremos em contato em breve.');
            })
            .catch(function(error) {
                let mensagemErro = '❌ Erro ao enviar mensagem.\n\n';
                
                if (error.status === 400) {
                    mensagemErro += '⚠️ Erro 400: Problema com o template do EmailJS.\n\n';
                    mensagemErro += 'Verifique se o template tem as variáveis:\n';
                    mensagemErro += '• {{from_name}}\n';
                    mensagemErro += '• {{from_email}}\n';
                    mensagemErro += '• {{phone}}\n';
                    mensagemErro += '• {{message}}\n\n';
                } else if (error.status === 401) {
                    mensagemErro += '⚠️ Erro 401: Chave pública inválida.\n\n';
                } else if (error.status === 404) {
                    mensagemErro += '⚠️ Erro 404: Service ID ou Template ID não encontrado.\n\n';
                }
                
                mensagemErro += 'Por favor, entre em contato pelo WhatsApp.';
                alert(mensagemErro);
            })
            .finally(function() {
                submitBtn.disabled = false;
                submitBtn.querySelector('.btn-text').textContent = originalText;
                spinner.style.display = 'none';
                arrow.style.display = 'block';
            });
        });
    });
})();
