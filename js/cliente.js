// JavaScript para área do cliente

// Função para alternar entre seções
// Função SIMPLIFICADA para alternar entre seções
function showSection(sectionId) {
    console.log('Mostrando seção:', sectionId);
    
    // 1. Ocultar todas as seções
    const sections = document.querySelectorAll('.section-content');
    sections.forEach(section => {
        section.classList.remove('active');
        section.style.display = 'none';
        section.style.opacity = '0';
    });
    
    // 2. Remover classe active de todos os itens do menu
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => {
        item.classList.remove('active');
    });
    
    // 3. Mostrar seção selecionada
    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
        targetSection.classList.add('active');
        targetSection.style.display = 'block';
        targetSection.style.opacity = '1';
        
        // Scroll para a seção
        targetSection.scrollIntoView({ behavior: 'smooth' });
    }
    
    // 4. Ativar item do menu correspondente
    const activeNavItem = document.querySelector(`[data-section="${sectionId}"]`);
    if (activeNavItem) {
        activeNavItem.classList.add('active');
    }
}
// Função para filtrar pedidos
function filterOrders() {
    const filterSelect = document.querySelector('.filter-select');
    const selectedStatus = filterSelect.value;
    const orderCards = document.querySelectorAll('.order-card');
    
    orderCards.forEach(card => {
        const statusElement = card.querySelector('.order-status');
        const statusClass = Array.from(statusElement.classList).find(cls => 
            ['processing', 'approved', 'transit', 'delivered'].includes(cls)
        );
        
        if (selectedStatus === 'all' || selectedStatus === statusClass) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}

// Função para abrir modal de endereço
function openAddressModal() {
    showNotification('Modal de endereço seria aberto aqui', 'info');
}

// Função para abrir modal de cartão
function openCardModal() {
    showNotification('Modal de cartão seria aberto aqui', 'info');
}

// Função para editar endereço
function editAddress(addressId) {
    showNotification('Edição de endereço seria aberta aqui', 'info');
}

// Função para excluir endereço
function deleteAddress(addressId) {
    if (confirm('Tem certeza que deseja excluir este endereço?')) {
        showNotification('Endereço excluído com sucesso!', 'success');
    }
}

// Função para definir endereço padrão
function setDefaultAddress(addressId) {
    // Remover badge padrão de outros endereços
    const defaultBadges = document.querySelectorAll('.address-badge.default');
    defaultBadges.forEach(badge => {
        badge.remove();
    });
    
    // Adicionar badge padrão ao endereço selecionado
    const addressCard = event.target.closest('.address-card');
    const addressHeader = addressCard.querySelector('.address-header');
    
    const defaultBadge = document.createElement('div');
    defaultBadge.className = 'address-badge default';
    defaultBadge.textContent = 'Padrão';
    addressHeader.appendChild(defaultBadge);
    
    showNotification('Endereço padrão atualizado!', 'success');
}

// Função para editar cartão
function editCard(cardId) {
    showNotification('Edição de cartão seria aberta aqui', 'info');
}

// Função para remover cartão
function removeCard(cardId) {
    if (confirm('Tem certeza que deseja remover este cartão?')) {
        const cardItem = event.target.closest('.card-item');
        cardItem.style.transition = 'all 0.5s ease';
        cardItem.style.transform = 'translateY(-20px)';
        cardItem.style.opacity = '0';
        
        setTimeout(() => {
            cardItem.remove();
            showNotification('Cartão removido com sucesso!', 'success');
        }, 500);
    }
}

// Função para adicionar ao carrinho (recomendações)
function addToCartFromRecommendations(bookId) {
    const cartCount = document.querySelector('.cart-count');
    let currentCount = parseInt(cartCount.textContent);
    cartCount.textContent = currentCount + 1;
    
    showNotification('Livro adicionado ao carrinho!', 'success');
}

// Função para salvar dados pessoais
function savePersonalData() {
    const form = document.querySelector('.profile-form');
    const formData = new FormData(form);
    
    // Simular salvamento
    const saveBtn = form.querySelector('.btn-primary');
    const originalText = saveBtn.textContent;
    
    saveBtn.textContent = 'Salvando...';
    saveBtn.disabled = true;
    
    setTimeout(() => {
        saveBtn.textContent = originalText;
        saveBtn.disabled = false;
        showNotification('Dados salvos com sucesso!', 'success');
    }, 1500);
}

// Função para alternar autenticação em duas etapas
function toggleTwoFactor() {
    const toggle = document.getElementById('two-factor');
    const status = toggle.checked ? 'ativada' : 'desativada';
    
    showNotification(`Autenticação em duas etapas ${status}!`, 'success');
}

// Event listeners
document.addEventListener('DOMContentLoaded', function() {
    // Menu de navegação
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            const sectionId = this.getAttribute('data-section');
            showSection(sectionId);
        });
    });
    
    // Filtro de pedidos
    const filterSelect = document.querySelector('.filter-select');
    if (filterSelect) {
        filterSelect.addEventListener('change', filterOrders);
    }
    
    // Botões de ação dos endereços
    const editAddressBtns = document.querySelectorAll('.btn-edit');
    editAddressBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            editAddress(this.dataset.addressId);
        });
    });
    
    const deleteAddressBtns = document.querySelectorAll('.btn-delete');
    deleteAddressBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            deleteAddress(this.dataset.addressId);
        });
    });
    
    const setDefaultBtns = document.querySelectorAll('.btn-set-default');
    setDefaultBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            setDefaultAddress(this.dataset.addressId);
        });
    });
    
    // Botões de ação dos cartões
    const editCardBtns = document.querySelectorAll('.card-actions .btn-edit');
    editCardBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            editCard(this.dataset.cardId);
        });
    });
    
    const removeCardBtns = document.querySelectorAll('.card-actions .btn-delete');
    removeCardBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            removeCard(this.dataset.cardId);
        });
    });
    
    // Botões de adicionar ao carrinho (recomendações)
    const addToCartBtns = document.querySelectorAll('.btn-add-cart');
    addToCartBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            addToCartFromRecommendations(this.dataset.bookId);
        });
    });
    
    // Formulário de dados pessoais
    const profileForm = document.querySelector('.profile-form');
    if (profileForm) {
        profileForm.addEventListener('submit', function(e) {
            e.preventDefault();
            savePersonalData();
        });
    }
    
    // Toggle de autenticação em duas etapas
    const twoFactorToggle = document.getElementById('two-factor');
    if (twoFactorToggle) {
        twoFactorToggle.addEventListener('change', toggleTwoFactor);
    }
    
    // Animações de entrada
    const sections = document.querySelectorAll('.section-content');
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
    });
    
    // Mostrar primeira seção
    setTimeout(() => {
        const activeSection = document.querySelector('.section-content.active');
        if (activeSection) {
            activeSection.style.transition = 'all 0.6s ease-out';
            activeSection.style.opacity = '1';
            activeSection.style.transform = 'translateY(0)';
        }
    }, 100);
    
    // Animação das estatísticas
    const statNumbers = document.querySelectorAll('.stat-number');
    statNumbers.forEach((stat, index) => {
        const finalValue = stat.textContent;
        stat.textContent = '0';
        
        setTimeout(() => {
            animateNumber(stat, finalValue, 1000);
        }, index * 200);
    });
});

// Função para animar números
function animateNumber(element, finalValue, duration) {
    const isPrice = finalValue.includes('R$');
    const numericValue = isPrice ? 
        parseFloat(finalValue.replace('R$ ', '').replace('.', '')) : 
        parseInt(finalValue);
    
    const startTime = Date.now();
    
    function update() {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        const currentValue = Math.floor(numericValue * progress);
        
        if (isPrice) {
            element.textContent = `R$ ${currentValue.toLocaleString('pt-BR')}`;
        } else {
            element.textContent = currentValue;
        }
        
        if (progress < 1) {
            requestAnimationFrame(update);
        } else {
            element.textContent = finalValue;
        }
    }
    
    update();
}

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

