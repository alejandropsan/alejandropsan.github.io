// ========================================
// MAIN JAVASCRIPT - EFECTOS Y FUNCIONALIDAD
// ========================================

document.addEventListener('DOMContentLoaded', () => {
    initNavbar();
    initScrollAnimations();
    initCounters();
    initSmoothScroll();
});

// ========================================
// NAVBAR
// ========================================

function initNavbar() {
    const navbar = document.getElementById('navbar');
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');
    
    // Cambiar estilo del navbar al hacer scroll
    let lastScroll = 0;
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        lastScroll = currentScroll;
    });
    
    // Toggle menú móvil
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
            document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
        });
        
        // Cerrar menú al hacer clic en un enlace
        const navLinks = navMenu.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.style.overflow = '';
            });
        });
        
        // Cerrar menú al hacer clic fuera
        document.addEventListener('click', (e) => {
            if (navMenu.classList.contains('active') && 
                !navMenu.contains(e.target) && 
                !hamburger.contains(e.target)) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }
}

// ========================================
// ANIMACIONES DE SCROLL
// ========================================

function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('[data-animate]');
    
    if (animatedElements.length === 0) return;
    
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Añadir delay progresivo para efecto en cascada
                setTimeout(() => {
                    entry.target.classList.add('animated');
                }, index * 100);
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    animatedElements.forEach(el => observer.observe(el));
}

// ========================================
// CONTADORES ANIMADOS
// ========================================

function initCounters() {
    const counters = document.querySelectorAll('.stat-number[data-count]');
    
    if (counters.length === 0) return;
    
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.5
    };
    
    const animateCounter = (element) => {
        const target = parseInt(element.getAttribute('data-count'));
        const duration = 2000; // 2 segundos
        const increment = target / (duration / 16); // 60 FPS
        let current = 0;
        
        const updateCounter = () => {
            current += increment;
            if (current < target) {
                element.textContent = Math.floor(current);
                requestAnimationFrame(updateCounter);
            } else {
                element.textContent = target;
            }
        };
        
        updateCounter();
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    counters.forEach(counter => observer.observe(counter));
}

// ========================================
// SMOOTH SCROLL
// ========================================

function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            
            // Solo para anchors internos
            if (href === '#' || href === '') return;
            
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                const offset = 80; // Altura del navbar
                const targetPosition = target.offsetTop - offset;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ========================================
// PARALLAX SUAVE EN HERO
// ========================================

function initParallax() {
    const hero = document.querySelector('.page-hero');
    if (!hero) return;
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const parallaxSpeed = 0.5;
        hero.style.transform = `translateY(${scrolled * parallaxSpeed}px)`;
    });
}

// ========================================
// EFECTOS HOVER EN CARDS
// ========================================

function initCardEffects() {
    const cards = document.querySelectorAll('.feature-card');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function(e) {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            card.style.setProperty('--mouse-x', `${x}px`);
            card.style.setProperty('--mouse-y', `${y}px`);
        });
        
        card.addEventListener('mousemove', function(e) {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            card.style.setProperty('--mouse-x', `${x}px`);
            card.style.setProperty('--mouse-y', `${y}px`);
        });
    });
}

// ========================================
// LAZY LOADING DE IMÁGENES
// ========================================

function initLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    if (images.length === 0) return;
    
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.getAttribute('data-src');
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// ========================================
// THEME SWITCHER (OPCIONAL)
// ========================================

function initThemeSwitcher() {
    const themeSwitcher = document.getElementById('theme-switcher');
    if (!themeSwitcher) return;
    
    const currentTheme = localStorage.getItem('theme') || 'dark';
    document.documentElement.setAttribute('data-theme', currentTheme);
    
    themeSwitcher.addEventListener('click', () => {
        const theme = document.documentElement.getAttribute('data-theme');
        const newTheme = theme === 'dark' ? 'light' : 'dark';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
    });
}

// ========================================
// LOADING SCREEN (OPCIONAL)
// ========================================

function initLoadingScreen() {
    const loader = document.querySelector('.loader');
    if (!loader) return;
    
    window.addEventListener('load', () => {
        setTimeout(() => {
            loader.classList.add('fade-out');
            setTimeout(() => {
                loader.style.display = 'none';
            }, 500);
        }, 500);
    });
}

// ========================================
// SCROLL TO TOP BUTTON
// ========================================

function initScrollToTop() {
    // Crear botón si no existe
    let scrollBtn = document.getElementById('scroll-to-top');
    
    if (!scrollBtn) {
        scrollBtn = document.createElement('button');
        scrollBtn.id = 'scroll-to-top';
        scrollBtn.className = 'scroll-to-top';
        scrollBtn.innerHTML = `
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M18 15l-6-6-6 6"/>
            </svg>
        `;
        scrollBtn.setAttribute('aria-label', 'Scroll to top');
        document.body.appendChild(scrollBtn);
        
        // Añadir estilos
        const style = document.createElement('style');
        style.textContent = `
            .scroll-to-top {
                position: fixed;
                bottom: 2rem;
                right: 2rem;
                width: 48px;
                height: 48px;
                background: linear-gradient(135deg, var(--primary), var(--secondary));
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                color: white;
                box-shadow: var(--shadow-lg);
                cursor: pointer;
                opacity: 0;
                visibility: hidden;
                transform: translateY(20px);
                transition: all 0.3s ease;
                z-index: 999;
            }
            
            .scroll-to-top.visible {
                opacity: 1;
                visibility: visible;
                transform: translateY(0);
            }
            
            .scroll-to-top:hover {
                transform: translateY(-4px);
                box-shadow: 0 12px 40px rgba(0, 212, 255, 0.4);
            }
            
            @media (max-width: 768px) {
                .scroll-to-top {
                    bottom: 1rem;
                    right: 1rem;
                    width: 40px;
                    height: 40px;
                }
            }
        `;
        document.head.appendChild(style);
    }
    
    // Mostrar/ocultar botón
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 500) {
            scrollBtn.classList.add('visible');
        } else {
            scrollBtn.classList.remove('visible');
        }
    });
    
    // Funcionalidad del botón
    scrollBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Inicializar scroll to top
initScrollToTop();

// ========================================
// PERFORMANCE - REDUCE MOTION
// ========================================

// Detectar preferencia de movimiento reducido
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

if (prefersReducedMotion.matches) {
    // Desactivar animaciones si el usuario prefiere movimiento reducido
    document.querySelectorAll('[data-animate]').forEach(el => {
        el.classList.add('animated');
    });
}

// ========================================
// UTILS
// ========================================

// Debounce function para optimizar eventos
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

// Throttle function para optimizar eventos de scroll
function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Console log artístico (opcional)
console.log('%c alejandro.ps ', 'background: linear-gradient(135deg, #00d4ff, #7c3aed); color: white; font-size: 20px; padding: 10px 20px; border-radius: 8px; font-weight: bold;');
console.log('%c Full Stack Developer | DevOps | Cybersecurity ', 'color: #00d4ff; font-size: 14px; padding: 5px;');
console.log('%c Looking for something? Check out the code! ', 'color: #a1a1aa; font-size: 12px; font-style: italic;');
