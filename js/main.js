/**
 * MAS - Melgoza Advanced Solutions
 * Landing Page JavaScript v2.3.1
 * Interactive functionality for modern landing page
 */

// ==========================================
// Global State & Configuration
// ==========================================
const state = {
    scrollPosition: 0,
    isMenuOpen: false,
    activeSection: 'home'
};

// ==========================================
// DOM Elements Cache
// ==========================================
const elements = {
    navbar: null,
    navMenu: null,
    menuToggle: null,
    navLinks: null,
    scrollProgress: null,
    contactForm: null,
    modal: null,
    heroCards: null
};

// ==========================================
// Initialize Application
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
    cacheElements();
    initNavigation();
    initScrollEffects();
    initAnimations();
    initContactForm();
    initModal();
    initParallax();
    initEasterEgg();
    
    console.log('%c🚗 MAS Solutions ', 'background: #4A90E2; color: white; font-size: 20px; padding: 10px; border-radius: 5px;');
    console.log('%cGracias por visitar nuestra landing page!', 'color: #50D4B4; font-size: 14px;');
    console.log('%c¿Buscas algo en especial? Contáctanos en admin@elamortiguador.com', 'color: #9CA3AF; font-size: 12px;');
});

// ==========================================
// Cache DOM Elements
// ==========================================
function cacheElements() {
    elements.navbar = document.getElementById('navbar');
    elements.navMenu = document.getElementById('navMenu');
    elements.menuToggle = document.getElementById('menuToggle');
    elements.navLinks = document.querySelectorAll('.nav-link');
    elements.scrollProgress = document.getElementById('scrollProgress');
    elements.contactForm = document.getElementById('contactForm');
    elements.modal = document.getElementById('notificationModal');
    elements.heroCards = document.querySelectorAll('.floating-card');
}

// ==========================================
// Navigation Functionality
// ==========================================
function initNavigation() {
    // Mobile menu toggle
    if (elements.menuToggle) {
        elements.menuToggle.addEventListener('click', toggleMobileMenu);
    }
    
    // Smooth scroll for navigation links
    elements.navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                const offset = 80; // Navbar height
                const targetPosition = targetSection.offsetTop - offset;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                if (state.isMenuOpen) {
                    toggleMobileMenu();
                }
                
                // Update active link
                updateActiveLink(link);
            }
        });
    });
    
    // Update active section on scroll
    window.addEventListener('scroll', updateActiveSection);
}

function toggleMobileMenu() {
    state.isMenuOpen = !state.isMenuOpen;
    elements.navMenu.classList.toggle('active');
    
    // Animate icon
    const icon = elements.menuToggle.querySelector('i');
    if (state.isMenuOpen) {
        icon.classList.replace('fa-bars', 'fa-times');
    } else {
        icon.classList.replace('fa-times', 'fa-bars');
    }
}

function updateActiveLink(activeLink) {
    elements.navLinks.forEach(link => {
        link.classList.remove('active');
    });
    activeLink.classList.add('active');
}

function updateActiveSection() {
    const sections = ['home', 'products', 'features', 'about', 'contact'];
    const scrollPosition = window.scrollY + 150;
    
    for (const sectionId of sections) {
        const section = document.getElementById(sectionId);
        if (section) {
            const sectionTop = section.offsetTop;
            const sectionBottom = sectionTop + section.offsetHeight;
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                if (state.activeSection !== sectionId) {
                    state.activeSection = sectionId;
                    const activeLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
                    if (activeLink) {
                        updateActiveLink(activeLink);
                    }
                }
                break;
            }
        }
    }
}

// ==========================================
// Scroll Effects
// ==========================================
function initScrollEffects() {
    let ticking = false;
    
    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                handleScroll();
                ticking = false;
            });
            ticking = true;
        }
    });
}

function handleScroll() {
    const scrollY = window.scrollY;
    
    // Update navbar style
    updateNavbarStyle(scrollY);
    
    // Update scroll progress bar
    updateScrollProgress();
    
    // Fade out floating cards on scroll
    fadeHeroCards(scrollY);
}

function updateNavbarStyle(scrollY) {
    if (scrollY > 50) {
        elements.navbar.classList.add('scrolled');
    } else {
        elements.navbar.classList.remove('scrolled');
    }
    
    if (scrollY > 200) {
        elements.navbar.classList.add('scrolled-more');
    } else {
        elements.navbar.classList.remove('scrolled-more');
    }
}

function updateScrollProgress() {
    const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (window.scrollY / windowHeight) * 100;
    elements.scrollProgress.style.width = `${scrolled}%`;
}

function fadeHeroCards(scrollY) {
    if (elements.heroCards.length > 0) {
        const opacity = Math.max(0, 1 - (scrollY / 500));
        const translateY = scrollY * 0.05; // Reduced parallax speed
        
        elements.heroCards.forEach((card, index) => {
            const factor = 0.05 + (index * 0.01); // Reduced movement
            card.style.opacity = opacity;
            card.style.transform = `translateY(${translateY * factor}px)`;
        });
    }
}

// ==========================================
// Scroll Animations (Intersection Observer)
// ==========================================
function initAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                
                // Animate stats counter if it's a stat element
                if (entry.target.classList.contains('stat')) {
                    animateCounter(entry.target);
                }
                
                // Staggered animation for grids
                if (entry.target.classList.contains('product-card') || 
                    entry.target.classList.contains('feature-card')) {
                    const cards = entry.target.parentElement.children;
                    Array.from(cards).forEach((card, index) => {
                        setTimeout(() => {
                            card.style.opacity = '1';
                            card.style.transform = 'translateY(0)';
                        }, index * 100);
                    });
                }
            }
        });
    }, observerOptions);
    
    // Observe elements that should animate
    const animatedElements = document.querySelectorAll('.product-card, .feature-card, .about-card, .stat, .info-card');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

function animateCounter(statElement) {
    const target = statElement.querySelector('h3');
    if (!target || target.dataset.animated) return;
    
    target.dataset.animated = 'true';
    const text = target.textContent;
    const hasPlus = text.includes('+');
    const hasPercent = text.includes('%');
    const number = parseInt(text.replace(/[^\d]/g, ''));
    
    if (isNaN(number)) return;
    
    const duration = 2000;
    const steps = 60;
    const increment = number / steps;
    let current = 0;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= number) {
            current = number;
            clearInterval(timer);
        }
        
        let displayValue = Math.floor(current);
        if (hasPlus) displayValue += '+';
        if (hasPercent) displayValue += '%';
        
        target.textContent = displayValue;
    }, duration / steps);
}

// ==========================================
// Parallax Effect
// ==========================================
function initParallax() {
    const hero = document.querySelector('.hero');
    if (!hero) return;
    
    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;
        const parallaxSpeed = 0.5;
        hero.style.transform = `translateY(${scrollY * parallaxSpeed}px)`;
    });
}

// ==========================================
// Contact Form Handling
// ==========================================
function initContactForm() {
    if (!elements.contactForm) return;
    
    elements.contactForm.addEventListener('submit', handleFormSubmit);
    
    // Email validation
    const emailInput = document.getElementById('email');
    if (emailInput) {
        emailInput.addEventListener('blur', validateEmail);
    }
}

function handleFormSubmit(e) {
    e.preventDefault();
    
    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        interest: document.getElementById('interest').value,
        message: document.getElementById('message').value,
        timestamp: new Date().toISOString()
    };
    
    // Validate form
    if (!formData.name || !formData.email || !formData.interest) {
        showNotification('Por favor completa todos los campos requeridos', 'error');
        return;
    }
    
    // In production, send to backend
    console.log('Form submitted:', formData);
    
    // Show success modal
    showSuccessModal(formData.interest);
    
    // Reset form
    elements.contactForm.reset();
}

function validateEmail(e) {
    const email = e.target.value;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (email && !emailRegex.test(email)) {
        e.target.style.borderColor = 'var(--secondary-color)';
        showNotification('Por favor ingresa un email válido', 'warning');
    } else {
        e.target.style.borderColor = 'var(--primary-color)';
    }
}

function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        padding: 1rem 1.5rem;
        background: ${type === 'error' ? '#FF8B6A' : type === 'warning' ? '#FFB86A' : '#50D4B4'};
        color: white;
        border-radius: 12px;
        box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);
        z-index: 3000;
        animation: slideInRight 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// ==========================================
// Modal Functionality
// ==========================================
function initModal() {
    if (!elements.modal) return;
    
    // Close modal on background click
    elements.modal.addEventListener('click', (e) => {
        if (e.target === elements.modal) {
            closeModal();
        }
    });
    
    // Close modal on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && elements.modal.classList.contains('active')) {
            closeModal();
        }
    });
}

function showSuccessModal(interest) {
    const productName = document.getElementById('productName');
    const interestMap = {
        'usuario': 'MiaGarage Usuario',
        'taller': 'MiaGarage Taller',
        'ambos': 'nuestros productos'
    };
    
    if (productName) {
        productName.textContent = interestMap[interest] || 'nuestros productos';
    }
    
    elements.modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    elements.modal.classList.remove('active');
    document.body.style.overflow = 'auto';
}

// Global function for notification buttons
window.notifyMe = function(product) {
    const productNames = {
        'taller': 'MiaGarage Taller'
    };
    
    const productName = document.getElementById('productName');
    if (productName) {
        productName.textContent = productNames[product] || 'este producto';
    }
    
    elements.modal.classList.add('active');
    document.body.style.overflow = 'hidden';
};

window.closeModal = closeModal;

// ==========================================
// Scroll Indicator
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
    const scrollIndicator = document.querySelector('.scroll-indicator');
    if (scrollIndicator) {
        scrollIndicator.addEventListener('click', () => {
            const productsSection = document.getElementById('products');
            if (productsSection) {
                const offset = 80;
                const targetPosition = productsSection.offsetTop - offset;
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
        
        // Hide scroll indicator after scrolling
        window.addEventListener('scroll', () => {
            if (window.scrollY > 100) {
                scrollIndicator.style.opacity = '0';
                scrollIndicator.style.pointerEvents = 'none';
            } else {
                scrollIndicator.style.opacity = '0.7';
                scrollIndicator.style.pointerEvents = 'auto';
            }
        });
    }
});

// ==========================================
// Easter Egg - Konami Code
// ==========================================
function initEasterEgg() {
    const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
    let konamiIndex = 0;
    
    document.addEventListener('keydown', (e) => {
        if (e.key === konamiCode[konamiIndex]) {
            konamiIndex++;
            if (konamiIndex === konamiCode.length) {
                activateEasterEgg();
                konamiIndex = 0;
            }
        } else {
            konamiIndex = 0;
        }
    });
}

function activateEasterEgg() {
    console.log('%c🎮 KONAMI CODE ACTIVATED! 🎮', 'background: linear-gradient(90deg, #4A90E2, #50D4B4); color: white; font-size: 24px; padding: 20px; border-radius: 10px;');
    console.log('%c¡Felicidades! Has encontrado el easter egg de MAS Solutions', 'color: #50D4B4; font-size: 16px;');
    console.log('%cTe mereces un descuento especial. Contacta a admin@elamortiguador.com mencionando "KONAMI" 😉', 'color: #FF8B6A; font-size: 14px;');
    
    // Add fun visual effect
    document.body.style.animation = 'rainbow 2s ease-in-out';
    
    setTimeout(() => {
        document.body.style.animation = '';
    }, 2000);
    
    // Add rainbow animation if not exists
    if (!document.getElementById('rainbow-style')) {
        const style = document.createElement('style');
        style.id = 'rainbow-style';
        style.textContent = `
            @keyframes rainbow {
                0% { filter: hue-rotate(0deg); }
                100% { filter: hue-rotate(360deg); }
            }
        `;
        document.head.appendChild(style);
    }
}

// ==========================================
// Back to Top Button
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
    const backToTop = document.createElement('button');
    backToTop.innerHTML = '<i class="fas fa-arrow-up"></i>';
    backToTop.className = 'back-to-top';
    backToTop.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        background: linear-gradient(135deg, var(--primary-color), var(--accent-color));
        color: white;
        border: none;
        border-radius: 50%;
        font-size: 1.2rem;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        box-shadow: 0 4px 15px rgba(74, 144, 226, 0.3);
        z-index: 1000;
    `;
    
    document.body.appendChild(backToTop);
    
    // Show/hide based on scroll position
    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            backToTop.style.opacity = '1';
            backToTop.style.visibility = 'visible';
        } else {
            backToTop.style.opacity = '0';
            backToTop.style.visibility = 'hidden';
        }
    });
    
    // Scroll to top on click
    backToTop.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Hover effect
    backToTop.addEventListener('mouseenter', () => {
        backToTop.style.transform = 'translateY(-5px)';
        backToTop.style.boxShadow = '0 6px 20px rgba(74, 144, 226, 0.4)';
    });
    
    backToTop.addEventListener('mouseleave', () => {
        backToTop.style.transform = 'translateY(0)';
        backToTop.style.boxShadow = '0 4px 15px rgba(74, 144, 226, 0.3)';
    });
});

// ==========================================
// Performance Optimization
// ==========================================

// Debounce function for scroll events
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

// Lazy load images (for future implementation)
function initLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                observer.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// ==========================================
// Console Art
// ==========================================
console.log(`
    ███╗   ███╗ █████╗ ███████╗
    ████╗ ████║██╔══██╗██╔════╝
    ██╔████╔██║███████║███████╗
    ██║╚██╔╝██║██╔══██║╚════██║
    ██║ ╚═╝ ██║██║  ██║███████║
    ╚═╝     ╚═╝╚═╝  ╚═╝╚══════╝
    
    Melgoza Advanced Solutions
    © 2025 - All Rights Reserved
    
    🚗 Innovación en Mantenimiento Automotriz
    🤖 Powered by AI Technology
    💡 Built with ❤️ by MAS Team
`);

// ==========================================
// Export for potential module usage
// ==========================================
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        initNavigation,
        initScrollEffects,
        initAnimations,
        initContactForm,
        initModal,
        closeModal,
        notifyMe: window.notifyMe
    };
}
