// Floating Labels e Formulário Moderno
document.addEventListener('DOMContentLoaded', function() {
    const inputs = document.querySelectorAll('.form-input-modern');
    
    inputs.forEach(input => {
        // Verificar se já tem valor ao carregar
        if (input.value) {
            input.classList.add('has-value');
        }
        
        // Eventos de foco e blur
        input.addEventListener('focus', function() {
            this.classList.add('focused');
        });
        
        input.addEventListener('blur', function() {
            this.classList.remove('focused');
            if (this.value) {
                this.classList.add('has-value');
            } else {
                this.classList.remove('has-value');
            }
        });
        
        // Evento de input para detectar digitação
        input.addEventListener('input', function() {
            if (this.value) {
                this.classList.add('has-value');
            } else {
                this.classList.remove('has-value');
            }
        });
    });
});