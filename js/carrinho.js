// JavaScript para página do carrinho

// Função para atualizar quantidade
function updateQuantity(itemId, change) {
    const qtyInput = document.getElementById(`qty-${itemId}`);
    const currentValue = parseInt(qtyInput.value);
    const minValue = parseInt(qtyInput.min);
    const maxValue = parseInt(qtyInput.max);
    
    const newValue = currentValue + change;
    
    if (newValue >= minValue && newValue <= maxValue) {
        qtyInput.value = newValue;
        updateItemSubtotal(itemId);
        updateCartTotal();
    }
}

// Função para atualizar subtotal do item
function updateItemSubtotal(itemId) {
    const qtyInput = document.getElementById(`qty-${itemId}`);
    const quantity = parseInt(qtyInput.value);
    
    // Preços simulados (em uma aplicação real, viriam do servidor)
    const prices = {
        1: 45.50, // O Hobbit
        2: 38.90, // Orgulho e Preconceito
        3: 89.90  // Clean Code
    };
    
    const unitPrice = prices[itemId];
    const subtotal = (unitPrice * quantity).toFixed(2);
    
    const subtotalElement = qtyInput.closest('.cart-item').querySelector('.subtotal-value');
    subtotalElement.textContent = `R$ ${subtotal.replace('.', ',')}`;
}

// Função para remover item do carrinho
function removeItem(itemId) {
    const cartItem = document.getElementById(`qty-${itemId}`).closest('.cart-item');
    
    // Animação de remoção
    cartItem.style.transition = 'all 0.5s ease';
    cartItem.style.transform = 'translateX(-100%)';
    cartItem.style.opacity = '0';
    
    setTimeout(() => {
        cartItem.remove();
        updateCartTotal();
        updateCartCount();
        showNotification('Item removido do carrinho!', 'info');
    }, 500);
}

// Função para limpar carrinho
function clearCart() {
    if (confirm('Tem certeza que deseja limpar o carrinho?')) {
        const cartItems = document.querySelectorAll('.cart-item');
        
        cartItems.forEach((item, index) => {
            setTimeout(() => {
                item.style.transition = 'all 0.3s ease';
                item.style.transform = 'translateX(-100%)';
                item.style.opacity = '0';
                
                setTimeout(() => {
                    item.remove();
                    if (index === cartItems.length - 1) {
                        updateCartTotal();
                        updateCartCount();
                        showNotification('Carrinho limpo!', 'info');
                    }
                }, 300);
            }, index * 100);
        });
    }
}

// Função para atualizar total do carrinho
function updateCartTotal() {
    const subtotalElements = document.querySelectorAll('.subtotal-value');
    let total = 0;
    
    subtotalElements.forEach(element => {
        const value = parseFloat(element.textContent.replace('R$ ', '').replace(',', '.'));
        total += value;
    });
    
    const discount = 26.00; // Desconto fixo para demonstração
    const shipping = 8.50;  // Frete fixo para demonstração
    const finalTotal = total - discount + shipping;
    
    document.getElementById('total-cost').textContent = `R$ ${finalTotal.toFixed(2).replace('.', ',')}`;
}

// Função para atualizar contador do carrinho
function updateCartCount() {
    const cartItems = document.querySelectorAll('.cart-item');
    const cartCount = document.querySelector('.cart-count');
    cartCount.textContent = cartItems.length;
}

// Função para aplicar cupom
function applyCoupon() {
    const couponInput = document.getElementById('coupon-code');
    const couponCode = couponInput.value.toUpperCase();
    
    const validCoupons = {
        'PRIMEIRA10': { discount: 0.10, type: 'percentage', description: '10% de desconto' },
        'FRETE15': { discount: 0, type: 'free_shipping', description: 'Frete grátis' }
    };
    
    if (validCoupons[couponCode]) {
        const coupon = validCoupons[couponCode];
        couponInput.style.borderColor = '#27ae60';
        couponInput.style.backgroundColor = '#d5f4e6';
        
        showNotification(`Cupom aplicado: ${coupon.description}`, 'success');
        
        // Aqui você aplicaria o desconto real
        updateCartTotal();
    } else {
        couponInput.style.borderColor = '#e74c3c';
        couponInput.style.backgroundColor = '#fdf2f2';
        showNotification('Cupom inválido!', 'error');
        
        setTimeout(() => {
            couponInput.style.borderColor = '';
            couponInput.style.backgroundColor = '';
        }, 3000);
    }
}

// Função para aplicar cupom sugerido
function applySuggestedCoupon(couponCode) {
    const couponInput = document.getElementById('coupon-code');
    couponInput.value = couponCode;
    applyCoupon();
}

// Função para calcular frete
function calculateShipping() {
    const cepInput = document.getElementById('cep-input');
    const cep = cepInput.value.replace(/\D/g, '');
    
    if (cep.length !== 8) {
        showNotification('CEP inválido! Digite um CEP válido.', 'error');
        return;
    }
    
    // Simular cálculo de frete
    const shippingOptions = document.getElementById('shipping-options');
    shippingOptions.style.display = 'block';
    
    // Animação de entrada
    shippingOptions.style.opacity = '0';
    shippingOptions.style.transform = 'translateY(-10px)';
    
    setTimeout(() => {
        shippingOptions.style.transition = 'all 0.3s ease';
        shippingOptions.style.opacity = '1';
        shippingOptions.style.transform = 'translateY(0)';
    }, 100);
    
    showNotification('Frete calculado com sucesso!', 'success');
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
    // Formatação de CEP
    const cepInput = document.getElementById('cep-input');
    if (cepInput) {
        cepInput.addEventListener('input', function() {
            formatCEP(this);
        });
    }
    
    // Atualizar total inicial
    updateCartTotal();
    
    // Animações de entrada
    const cartItems = document.querySelectorAll('.cart-item');
    cartItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            item.style.transition = 'all 0.6s ease-out';
            item.style.opacity = '1';
            item.style.transform = 'translateY(0)';
        }, index * 100);
    });
    
    // Event listeners para opções de frete
    const shippingOptions = document.querySelectorAll('input[name="shipping"]');
    shippingOptions.forEach(option => {
        option.addEventListener('change', function() {
            const shippingCost = document.getElementById('shipping-cost');
            const prices = {
                'sedex': 'R$ 15,90',
                'pac': 'R$ 8,50',
                'expressa': 'R$ 25,00'
            };
            
            shippingCost.textContent = prices[this.value];
            updateCartTotal();
        });
    });
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

