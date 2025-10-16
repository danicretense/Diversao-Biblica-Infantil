// Diversão Bíblica Infantil - JavaScript Interativo

// Aguarda o carregamento completo da página
document.addEventListener('DOMContentLoaded', function() {
    initializePage();
});

// Inicializa todas as funcionalidades da página
function initializePage() {
    setupSmoothScrolling();
    setupCTATracking();
    setupImageLazyLoading();
    setupAnimationsOnScroll();
    setupMobileOptimizations();
    
    console.log('🎉 Diversão Bíblica Infantil - Página carregada!');
}

// Configuração de scroll suave para CTAs
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        // Smooth scroll com offset para melhor visualização
        const offsetTop = section.offsetTop - 20;
        
        window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
        });
        
        // Analytics tracking (simulado)
        trackCTAClick(sectionId);
    }
}

// Configuração de scroll suave geral
function setupSmoothScrolling() {
    // Garante scroll suave em todos os navegadores
    document.documentElement.style.scrollBehavior = 'smooth';
    
    // Fallback para navegadores mais antigos
    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            scrollToSection(targetId);
        });
    });
}

// Rastreamento de cliques nos CTAs
function setupCTATracking() {
    const ctaButtons = document.querySelectorAll('button[onclick*="scrollToSection"], a[href*="pay.wiapy.com"]');
    
    ctaButtons.forEach(button => {
        button.addEventListener('click', function() {
            const buttonText = this.textContent.trim();
            console.log(`CTA clicado: ${buttonText}`);
            
            // Adiciona feedback visual
            this.classList.add('animate-pulse-soft');
            setTimeout(() => {
                this.classList.remove('animate-pulse-soft');
            }, 1000);
        });
    });
}

// Função de tracking de eventos (simulada)
function trackCTAClick(section) {
    // Aqui seria integrado com Google Analytics ou similar
    console.log(`📊 CTA clicado - Seção: ${section}`);
    
    // Simula evento personalizado
    const event = new CustomEvent('ctaClick', { 
        detail: { section: section, timestamp: Date.now() } 
    });
    document.dispatchEvent(event);
}

// Lazy loading para imagens
function setupImageLazyLoading() {
    // Verifica se o navegador suporta Intersection Observer
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.classList.add('loaded');
                    observer.unobserve(img);
                }
            });
        });

        // Observa todas as imagens com loading="lazy"
        const images = document.querySelectorAll('img[loading="lazy"]');
        images.forEach(img => imageObserver.observe(img));
    }
}

// Animações ao fazer scroll
function setupAnimationsOnScroll() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-fade-in-up');
            }
        });
    }, observerOptions);

    // Adiciona animação às seções principais
    const sections = document.querySelectorAll('section');
    sections.forEach(section => observer.observe(section));
}

// Otimizações específicas para mobile
function setupMobileOptimizations() {
    // Detecta dispositivos móveis
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    
    if (isMobile) {
        // Adiciona classe para estilos específicos de mobile
        document.body.classList.add('mobile-device');
        
        // Otimiza o toque em botões
        const buttons = document.querySelectorAll('button, a');
        buttons.forEach(button => {
            button.addEventListener('touchstart', function() {
                this.style.transform = 'scale(0.98)';
            });
            
            button.addEventListener('touchend', function() {
                this.style.transform = '';
            });
        });
        
        // Previne zoom duplo-toque
        let lastTouchEnd = 0;
        document.addEventListener('touchend', function(event) {
            const now = (new Date()).getTime();
            if (now - lastTouchEnd <= 300) {
                event.preventDefault();
            }
            lastTouchEnd = now;
        }, false);
    }
}

// Função para feedback visual ao comprar
function handlePurchaseClick(element) {
    // Adiciona estado de loading
    element.classList.add('loading');
    element.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i>Redirecionando...';
    
    // Remove loading após um tempo (o redirecionamento acontecerá)
    setTimeout(() => {
        element.classList.remove('loading');
        element.innerHTML = '<i class="fas fa-credit-card mr-2"></i>Comprar Agora!';
    }, 3000);
}

// Utilitário para debounce (otimização de performance)
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Monitora scroll para otimizações
const handleScroll = debounce(() => {
    const scrollTop = window.pageYOffset;
    const windowHeight = window.innerHeight;
    
    // Adiciona classe quando usuário scrolla além do hero
    if (scrollTop > windowHeight * 0.5) {
        document.body.classList.add('scrolled');
    } else {
        document.body.classList.remove('scrolled');
    }
}, 100);

window.addEventListener('scroll', handleScroll);

// Função de validação básica (para futuras melhorias)
function validateForm(formData) {
    // Implementação básica para validação
    return true;
}

// Utilitário para formatação de preço
function formatPrice(price) {
    return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    }).format(price);
}

// Função para compartilhamento (futuro)
function shareContent(platform) {
    const url = window.location.href;
    const text = 'Transforme o tempo em família em momentos de fé e alegria! Kit Diversão Bíblica Infantil';
    
    let shareUrl = '';
    
    switch (platform) {
        case 'whatsapp':
            shareUrl = `https://wa.me/?text=${encodeURIComponent(text + ' ' + url)}`;
            break;
        case 'facebook':
            shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
            break;
        case 'twitter':
            shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`;
            break;
    }
    
    if (shareUrl) {
        window.open(shareUrl, '_blank', 'width=600,height=400');
    }
}

// Event listeners globais
document.addEventListener('ctaClick', function(e) {
    console.log('📈 Evento de conversão registrado:', e.detail);
});

// Prevenção de erro em console
window.addEventListener('error', function(e) {
    console.log('Erro capturado:', e.message);
    return true;
});

// Inicialização para hot reload em desenvolvimento
if (typeof module !== 'undefined' && module.hot) {
    module.hot.accept();
}