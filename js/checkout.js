// JavaScript para página de checkout

let currentStep = 1;

// Função para avançar para próxima etapa
function nextStep(stepNumber) {
    if (validateCurrentStep()) {
        goToStep(stepNumber);
    }
}

// Função para voltar para etapa anterior
function prevStep(stepNumber) {
    goToStep(stepNumber);
}

// Função para ir para uma etapa específica
function goToStep(stepNumber) {
    // Ocultar etapa atual
    document.querySelector(`#step-${currentStep}`).classList.remove('active');
    document.querySelector(`.step[data-step="${currentStep}"]`).classList.remove('active');
    
    // Marcar etapas anteriores como concluídas
    for (let i = 1; i < stepNumber; i++) {
        document.querySelector(`.step[data-step="${i}"]`).classList.add('completed');
    }
    
    // Mostrar nova etapa
    document.querySelector(`#step-${stepNumber}`).classList.add('active');
    document.querySelector(`.step[data-step="${stepNumber}"]`).classList.add('active');
    
    currentStep = stepNumber;
    
    // Scroll para o topo
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Função para validar etapa atual
function validateCurrentStep() {
    switch(currentStep) {
        case 1:
            return validateAddressStep();
        case 2:
            return validatePaymentStep();
        case 3:
            return true; // Etapa de revisão sempre válida
        default:
            return true;
    }
}

// Função para validar etapa de endereço
function validateAddressStep() {
    const selectedAddress = document.querySelector('input[name="address"]:checked');
    
    if (!selectedAddress) {
        showNotification('Selecione um endereço de entrega!', 'error');
        return false;
    }
    
    if (selectedAddress.value === 'new') {
        return validateNewAddressForm();
    }
    
    return true;
}

// Função para validar formulário de novo endereço
function validateNewAddressForm() {
    const requiredFields = [
        'recipient-name',
        'cep',
        'street',
        'number',
        'neighborhood',
        'city',
        'state'
    ];
    
    for (let fieldId of requiredFields) {
        const field = document.getElementById(fieldId);
        if (!field.value.trim()) {
            field.focus();
            showNotification('Preencha todos os campos obrigatórios!', 'error');
            return false;
        }
    }
    
    return true;
}

// Função para validar etapa de pagamento
function validatePaymentStep() {
    const selectedPayment = document.querySelector('input[name="payment"]:checked');
    
    if (!selectedPayment) {
        showNotification('Selecione uma forma de pagamento!', 'error');
        return false;
    }
    
    if (selectedPayment.value === 'credit' || selectedPayment.value === 'debit') {
        return validateCardForm();
    }
    
    return true;
}

// Função para validar formulário de cartão
function validateCardForm() {
    const cardNumber = document.getElementById('card-number').value;
    const cardName = document.getElementById('card-name').value;
    const cardExpiry = document.getElementById('card-expiry').value;
    const cardCvv = document.getElementById('card-cvv').value;
    
    if (!cardNumber || !cardName || !cardExpiry || !cardCvv) {
        showNotification('Preencha todos os dados do cartão!', 'error');
        return false;
    }
    
    if (cardNumber.replace(/\s/g, '').length < 16) {
        showNotification('Número do cartão inválido!', 'error');
        return false;
    }
    
    return true;
}

// Função para confirmar pedido
function confirmOrder() {
    // Simular processamento
    const confirmBtn = document.querySelector('.btn-confirm');
    confirmBtn.textContent = 'Processando...';
    confirmBtn.disabled = true;
    confirmBtn.classList.add('loading');
    
    setTimeout(() => {
        showConfirmationModal();
        confirmBtn.textContent = 'Confirmar Pedido';
        confirmBtn.disabled = false;
        confirmBtn.classList.remove('loading');
    }, 2000);
}

// Função para mostrar modal de confirmação
function showConfirmationModal() {
    const modal = document.getElementById('confirmation-modal');
    modal.classList.add('show');
    
    // Gerar número do pedido
    const orderNumber = '#BS' + new Date().getFullYear() + 
                       String(Math.floor(Math.random() * 1000000)).padStart(6, '0');
    
    modal.querySelector('.order-info p:first-child strong').nextSibling.textContent = orderNumber;
}

// Função para fechar modal
function closeModal() {
    const modal = document.getElementById('confirmation-modal');
    modal.classList.remove('show');
}

// Função para mostrar/ocultar formulário de novo endereço
function toggleNewAddressForm() {
    const newAddressRadio = document.getElementById('address-new');
    const newAddressForm = document.getElementById('new-address-form');
    
    if (newAddressRadio.checked) {
        newAddressForm.style.display = 'block';
        newAddressForm.style.animation = 'fadeIn 0.3s ease-out';
    } else {
        newAddressForm.style.display = 'none';
    }
}

// Função para mostrar/ocultar formulário de cartão
function toggleCardForm() {
    const creditRadio = document.getElementById('payment-credit');
    const debitRadio = document.getElementById('payment-debit');
    const cardForm = document.getElementById('card-form');
    
    if (creditRadio.checked || debitRadio.checked) {
        cardForm.style.display = 'block';
        cardForm.style.animation = 'fadeIn 0.3s ease-out';
    } else {
        cardForm.style.display = 'none';
    }
}

// Função para formatar número do cartão
function formatCardNumber(input) {
    let value = input.value.replace(/\D/g, '');
    value = value.replace(/(\d{4})(?=\d)/g, '$1 ');
    input.value = value;
}

// Função para formatar data de validade
function formatCardExpiry(input) {
    let value = input.value.replace(/\D/g, '');
    if (value.length >= 2) {
        value = value.substring(0, 2) + '/' + value.substring(2, 4);
    }
    input.value = value;
}

// Função para formatar CEP
function formatCEP(input) {
    let value = input.value.replace(/\D/g, '');
    if (value.length > 5) {
        value = value.replace(/^(\d{5})(\d)/, '$1-$2');
    }
    input.value = value;
}

// Event listeners
document.addEventListener('DOMContentLoaded', function() {
    // Endereços
    const addressRadios = document.querySelectorAll('input[name="address"]');
    addressRadios.forEach(radio => {
        radio.addEventListener('change', toggleNewAddressForm);
    });
    
    // Formas de pagamento
    const paymentRadios = document.querySelectorAll('input[name="payment"]');
    paymentRadios.forEach(radio => {
        radio.addEventListener('change', toggleCardForm);
    });
    
    // Formatação de campos
    const cardNumberInput = document.getElementById('card-number');
    if (cardNumberInput) {
        cardNumberInput.addEventListener('input', function() {
            formatCardNumber(this);
        });
    }
    
    const cardExpiryInput = document.getElementById('card-expiry');
    if (cardExpiryInput) {
        cardExpiryInput.addEventListener('input', function() {
            formatCardExpiry(this);
        });
    }
    
    const cepInput = document.getElementById('cep');
    if (cepInput) {
        cepInput.addEventListener('input', function() {
            formatCEP(this);
        });
    }
    
    // Fechar modal ao clicar fora
    const modal = document.getElementById('confirmation-modal');
    if (modal) {
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                closeModal();
            }
        });
    }
    
    // Animações de entrada
    const stepContents = document.querySelectorAll('.step-content');
    stepContents.forEach(content => {
        content.style.opacity = '0';
        content.style.transform = 'translateY(20px)';
    });
    
    // Mostrar primeira etapa
    setTimeout(() => {
        const firstStep = document.querySelector('.step-content.active');
        if (firstStep) {
            firstStep.style.transition = 'all 0.6s ease-out';
            firstStep.style.opacity = '1';
            firstStep.style.transform = 'translateY(0)';
        }
    }, 100);
});

// Função para mostrar notificações
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    const colors = {
        'success': '#27ae60',
        'error': '#e74c3c',
        'info': '#3498db'
    };
    
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${colors[type] || colors.info};
        color: white;
        padding: 1rem 2rem;
        border-radius: 5px;
        box-shadow: 0 4px 15px rgba(0,0,0,0.2);
        z-index: 10000;
        animation: slideInRight 0.3s ease-out;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease-out';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

