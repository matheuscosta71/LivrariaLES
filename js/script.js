// JavaScript principal para funcionalidades gerais

// Função para buscar livros
function searchBooks() {
    const searchInput = document.querySelector('.search-input');
    const searchTerm = searchInput.value.toLowerCase();
    const bookCards = document.querySelectorAll('.book-card');
    
    bookCards.forEach(card => {
        const title = card.querySelector('.book-title').textContent.toLowerCase();
        const author = card.querySelector('.book-author').textContent.toLowerCase();
        
        if (title.includes(searchTerm) || author.includes(searchTerm)) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}

// Função para filtrar livros por categoria
function filterByCategory() {
    const categoryFilters = document.querySelectorAll('input[name="categoria"]:checked');
    const bookCards = document.querySelectorAll('.book-card');
    
    if (categoryFilters.length === 0) {
        bookCards.forEach(card => card.style.display = 'block');
        return;
    }
    
    const selectedCategories = Array.from(categoryFilters).map(filter => filter.value);
    
    bookCards.forEach(card => {
        const cardCategory = card.getAttribute('data-categoria');
        if (selectedCategories.includes(cardCategory)) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}

// Função para filtrar por preço
function filterByPrice() {
    const priceFilter = document.querySelector('input[name="preco"]:checked');
    const bookCards = document.querySelectorAll('.book-card');
    
    if (!priceFilter) {
        bookCards.forEach(card => card.style.display = 'block');
        return;
    }
    
    const priceRange = priceFilter.value;
    
    bookCards.forEach(card => {
        const price = parseFloat(card.getAttribute('data-preco'));
        let showCard = false;
        
        switch(priceRange) {
            case '0-30':
                showCard = price <= 30;
                break;
            case '30-60':
                showCard = price > 30 && price <= 60;
                break;
            case '60-100':
                showCard = price > 60 && price <= 100;
                break;
            case '100+':
                showCard = price > 100;
                break;
        }
        
        card.style.display = showCard ? 'block' : 'none';
    });
}

// Função para filtrar por avaliação
function filterByRating() {
    const ratingFilter = document.querySelector('input[name="avaliacao"]:checked');
    const bookCards = document.querySelectorAll('.book-card');
    
    if (!ratingFilter) {
        bookCards.forEach(card => card.style.display = 'block');
        return;
    }
    
    const minRating = parseInt(ratingFilter.value);
    
    bookCards.forEach(card => {
        const rating = parseInt(card.getAttribute('data-avaliacao'));
        if (rating >= minRating) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}

// Função para ordenar livros
function sortBooks() {
    const sortSelect = document.querySelector('.sort-select');
    const booksContainer = document.querySelector('.books-container');
    const bookCards = Array.from(document.querySelectorAll('.book-card'));
    
    const sortValue = sortSelect.value;
    
    bookCards.sort((a, b) => {
        switch(sortValue) {
            case 'preco-menor':
                return parseFloat(a.getAttribute('data-preco')) - parseFloat(b.getAttribute('data-preco'));
            case 'preco-maior':
                return parseFloat(b.getAttribute('data-preco')) - parseFloat(a.getAttribute('data-preco'));
            case 'avaliacao':
                return parseInt(b.getAttribute('data-avaliacao')) - parseInt(a.getAttribute('data-avaliacao'));
            case 'lancamento':
                return a.querySelector('.book-badge.lancamento') ? -1 : 1;
            default:
                return 0;
        }
    });
    
    // Reordenar os elementos no DOM
    bookCards.forEach(card => booksContainer.appendChild(card));
}

// Event listeners
document.addEventListener('DOMContentLoaded', function() {
    // Busca
    const searchInput = document.querySelector('.search-input');
    const searchBtn = document.querySelector('.search-btn');
    
    if (searchInput) {
        searchInput.addEventListener('input', searchBooks);
    }
    
    if (searchBtn) {
        searchBtn.addEventListener('click', searchBooks);
    }
    
    // Filtros
    const categoryFilters = document.querySelectorAll('input[name="categoria"]');
    categoryFilters.forEach(filter => {
        filter.addEventListener('change', filterByCategory);
    });
    
    const priceFilters = document.querySelectorAll('input[name="preco"]');
    priceFilters.forEach(filter => {
        filter.addEventListener('change', filterByPrice);
    });
    
    const ratingFilters = document.querySelectorAll('input[name="avaliacao"]');
    ratingFilters.forEach(filter => {
        filter.addEventListener('change', filterByRating);
    });
    
    // Ordenação
    const sortSelect = document.querySelector('.sort-select');
    if (sortSelect) {
        sortSelect.addEventListener('change', sortBooks);
    }
    
    // Animações de entrada
    const bookCards = document.querySelectorAll('.book-card');
    bookCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
    });
});

// Função para adicionar ao carrinho (simulação)
function addToCart(bookId) {
    const cartCount = document.querySelector('.cart-count');
    let currentCount = parseInt(cartCount.textContent);
    cartCount.textContent = currentCount + 1;
    
    // Animação de feedback
    cartCount.style.transform = 'scale(1.3)';
    cartCount.style.backgroundColor = '#e74c3c';
    
    setTimeout(() => {
        cartCount.style.transform = 'scale(1)';
        cartCount.style.backgroundColor = '';
    }, 300);
    
    // Mostrar notificação
    showNotification('Livro adicionado ao carrinho!', 'success');
}

// Função para mostrar notificações
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

// CSS para animações de notificação
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

