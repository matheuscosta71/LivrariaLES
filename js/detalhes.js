// JavaScript para página de detalhes do livro

// Função para aumentar quantidade
function increaseQty() {
    const qtyInput = document.getElementById('quantity');
    const currentValue = parseInt(qtyInput.value);
    const maxValue = parseInt(qtyInput.max);
    
    if (currentValue < maxValue) {
        qtyInput.value = currentValue + 1;
    }
}

// Função para diminuir quantidade
function decreaseQty() {
    const qtyInput = document.getElementById('quantity');
    const currentValue = parseInt(qtyInput.value);
    const minValue = parseInt(qtyInput.min);
    
    if (currentValue > minValue) {
        qtyInput.value = currentValue - 1;
    }
}

// Função para adicionar aos favoritos
function toggleFavorite() {
    const favoriteBtn = document.querySelector('.btn-favorite');
    const icon = favoriteBtn.querySelector('i');
    
    if (icon.classList.contains('far')) {
        icon.classList.remove('far');
        icon.classList.add('fas');
        favoriteBtn.style.backgroundColor = '#e74c3c';
        favoriteBtn.style.color = 'white';
        showNotification('Adicionado aos favoritos!', 'success');
    } else {
        icon.classList.remove('fas');
        icon.classList.add('far');
        favoriteBtn.style.backgroundColor = '';
        favoriteBtn.style.color = '#e74c3c';
        showNotification('Removido dos favoritos!', 'info');
    }
}

// Função para carregar mais avaliações
function loadMoreReviews() {
    const reviewsList = document.querySelector('.reviews-list');
    const loadMoreBtn = document.querySelector('.btn-load-more');
    
    // Simular carregamento
    loadMoreBtn.textContent = 'Carregando...';
    loadMoreBtn.disabled = true;
    
    setTimeout(() => {
        // Adicionar mais avaliações (simulação)
        const newReview = document.createElement('div');
        newReview.className = 'review-item';
        newReview.innerHTML = `
            <div class="review-header">
                <div class="reviewer-info">
                    <div class="reviewer-avatar">
                        <i class="fas fa-user"></i>
                    </div>
                    <div class="reviewer-details">
                        <h4>Carlos Oliveira</h4>
                        <div class="review-stars">
                            <i class="fas fa-star"></i>
                            <i class="fas fa-star"></i>
                            <i class="fas fa-star"></i>
                            <i class="fas fa-star"></i>
                            <i class="fas fa-star"></i>
                        </div>
                    </div>
                </div>
                <span class="review-date">1 de agosto, 2024</span>
            </div>
            <div class="review-content">
                <h5>Excelente qualidade</h5>
                <p>Livro chegou rapidamente e em perfeitas condições. A história é envolvente e a tradução está muito boa. Recomendo!</p>
            </div>
            <div class="review-actions">
                <button class="review-helpful">
                    <i class="fas fa-thumbs-up"></i>
                    Útil (5)
                </button>
            </div>
        `;
        
        reviewsList.appendChild(newReview);
        
        loadMoreBtn.textContent = 'Ver mais avaliações';
        loadMoreBtn.disabled = false;
        
        showNotification('Mais avaliações carregadas!', 'success');
    }, 1000);
}

// Função para marcar avaliação como útil
function markReviewHelpful(button) {
    const currentText = button.textContent;
    const currentCount = parseInt(currentText.match(/\d+/)[0]);
    const newCount = currentCount + 1;
    
    button.innerHTML = `<i class="fas fa-thumbs-up"></i> Útil (${newCount})`;
    button.style.backgroundColor = '#3498db';
    button.style.color = 'white';
    button.disabled = true;
    
    showNotification('Obrigado pelo feedback!', 'success');
}

// Event listeners
document.addEventListener('DOMContentLoaded', function() {
    // Botão de favoritos
    const favoriteBtn = document.querySelector('.btn-favorite');
    if (favoriteBtn) {
        favoriteBtn.addEventListener('click', toggleFavorite);
    }
    
    // Botão carregar mais avaliações
    const loadMoreBtn = document.querySelector('.btn-load-more');
    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', loadMoreReviews);
    }
    
    // Botões de avaliação útil
    const helpfulBtns = document.querySelectorAll('.review-helpful');
    helpfulBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            markReviewHelpful(this);
        });
    });
    
    // Validação de quantidade
    const qtyInput = document.getElementById('quantity');
    if (qtyInput) {
        qtyInput.addEventListener('change', function() {
            const value = parseInt(this.value);
            const min = parseInt(this.min);
            const max = parseInt(this.max);
            
            if (value < min) this.value = min;
            if (value > max) this.value = max;
        });
    }
    
    // Animação de entrada para elementos
    const elements = document.querySelectorAll('.book-main, .book-synopsis, .reviews-section, .related-books');
    elements.forEach((element, index) => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            element.style.transition = 'all 0.6s ease-out';
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }, index * 200);
    });
});

// Função para mostrar notificações (reutilizada)
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#27ae60' : '#3498db'};
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

