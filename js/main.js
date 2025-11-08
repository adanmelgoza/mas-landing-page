/**
 * MAS - Melgoza Advanced Solutions
 * Landing Page Main JavaScript v2.3.1
 * Interactive functionality and animations
 */

// ========================================
// DOM Elements
// ========================================
const navbar = document.getElementById('navbar');
const navMenu = document.getElementById('navMenu');
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.querySelectorAll('.nav-link');
const scrollProgress = document.getElementById('scrollProgress');
const modal = document.getElementById('notificationModal');
const contactForm = document.getElementById('contactForm');

// ========================================
// Scroll Progress Bar
// ========================================
function updateScrollProgress() {
    const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (window.scrollY / windowHeight) * 100;
    scrollProgress.style.width = scrolled + '%';
}

// ========================================
// Navbar Scroll Effect
// ========================================
function handleNavbarScroll() {
    const scrollPosition = window.scrollY;
    
    if (scrollPosition > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    if (scrollPosition > 200) {
        navbar.classList.add('scrolled-more');
    } else {
        navbar.classList.remove('scrolled-more');
    }
}

// ========================================
// Mobile Menu Toggle
// ========================================
function toggleMobileMenu() {
    navMenu.classList.toggle('active');
    const icon = menuToggle.querySelector('i');
    
    if (navMenu.classList.contains('active')) {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-times');
    } else {
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    }
}

// Close mobile menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        const icon = menuToggle.querySelector('i');
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    });
});

// ========================================
// Smooth Scroll with Offset
// ========================================
function smoothScrollToSection(e) {
    e.preventDefault();
    const targetId = e.currentTarget.getAttribute('href');
    
    if (targetId.startsWith('#')) {
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            const navbarHeight = navbar.offsetHeight;
            const targetPosition = targetSection.offsetTop - navbarHeight - 20;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
            
            // Update active link
            updateActiveLink(targetId);
        }
    }
}

// Add smooth scroll to all nav links
navLinks.forEach(link => {
    link.addEventListener('click', smoothScrollToSection);
});

// ========================================
// Update Active Navigation Link
// ========================================
function updateActiveLink(targetId) {
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === targetId) {
            link.classList.add('active');
        }
    });
}

// Update active link on scroll
function updateActiveOnScroll() {
    const sections = document.querySelectorAll('section');
    const scrollPosition = window.scrollY + navbar.offsetHeight + 100;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = '#' + section.getAttribute('id');
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            updateActiveLink(sectionId);
        }
    });
}

// ========================================
// Intersection Observer for Animations
// ========================================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all sections and cards
function observeElements() {
    const elementsToObserve = document.querySelectorAll('.product-card, .feature-card, .about-card, .stat');
    
    elementsToObserve.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// ========================================
// Parallax Effect for Hero Section
// ========================================
function parallaxEffect() {
    const scrolled = window.scrollY;
    const heroBackground = document.querySelector('.hero-background');
    const floatingCards = document.querySelectorAll('.floating-card');
    
    if (heroBackground) {
        heroBackground.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
    
    floatingCards.forEach((card, index) => {
        const speed = 0.05 + (index * 0.015);
        card.style.transform = `translateY(${scrolled * speed}px)`;
        
        // Fade out as you scroll down
        const opacity = Math.max(0, 1 - (scrolled / 500));
        card.style.opacity = opacity;
    });
}

// ========================================
// Animated Counter for Statistics
// ========================================
function animateCounters() {
    const stats = document.querySelectorAll('.stat h3');
    
    stats.forEach(stat => {
        const target = parseInt(stat.textContent);
        const duration = 2000;
        const step = target / (duration / 16);
        let current = 0;
        
        const counter = setInterval(() => {
            current += step;
            if (current >= target) {
                stat.textContent = target + (stat.textContent.includes('+') ? '+' : '%');
                clearInterval(counter);
            } else {
                stat.textContent = Math.floor(current) + (stat.textContent.includes('+') ? '+' : '%');
            }
        }, 16);
    });
}

// Trigger counter animation when stats section is visible
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCounters();
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

const aboutSection = document.querySelector('.about');
if (aboutSection) {
    statsObserver.observe(aboutSection);
}

// ========================================
// Contact Form Handler
// ========================================
function handleFormSubmit(e) {
    e.preventDefault();
    
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const interest = document.getElementById('interest').value;
    const message = document.getElementById('message').value;
    
    // Here you would normally send data to a backend
    console.log('Form submitted:', { name, email, interest, message });
    
    // Show success modal
    showModal(getInterestName(interest));
    
    // Reset form
    contactForm.reset();
}

function getInterestName(value) {
    const interests = {
        'usuario': 'MiaGarage Usuario',
        'taller': 'MiaGarage Taller',
        'ambos': 'ambos productos'
    };
    return interests[value] || 'nuestros productos';
}

// ========================================
// Modal Functions
// ========================================
function showModal(productName) {
    document.getElementById('productName').textContent = productName;
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    modal.classList.remove('active');
    document.body.style.overflow = '';
}

// Notify button handler for products
function notifyMe(productType) {
    const productName = productType === 'taller' ? 'MiaGarage Taller' : 'MiaGarage Usuario';
    showModal(productName);
}

// Make notifyMe global for onclick handlers
window.notifyMe = notifyMe;
window.closeModal = closeModal;

// Close modal on escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
        closeModal();
    }
});

// Close modal when clicking outside
modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        closeModal();
    }
});

// ========================================
// Scroll Indicator Click
// ========================================
const scrollIndicator = document.querySelector('.scroll-indicator');
if (scrollIndicator) {
    scrollIndicator.addEventListener('click', () => {
        const productsSection = document.getElementById('products');
        if (productsSection) {
            productsSection.scrollIntoView({ behavior: 'smooth' });
        }
    });
}

// ========================================
// Email Validation
// ========================================
const emailInput = document.getElementById('email');
if (emailInput) {
    emailInput.addEventListener('blur', function() {
        const email = this.value;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        if (email && !emailRegex.test(email)) {
            this.style.borderColor = 'var(--secondary-color)';
        } else {
            this.style.borderColor = '';
        }
    });
    
    emailInput.addEventListener('input', function() {
        this.style.borderColor = '';
    });
}

// ========================================
// Lazy Loading Images
// ========================================
function lazyLoadImages() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// ========================================
// Console Easter Egg
// ========================================
console.log('%c🚗 Bienvenido a MAS - Melgoza Advanced Solutions', 'font-size: 20px; font-weight: bold; color: #4A90E2;');
console.log('%c💡 Transformando el mantenimiento automotriz con IA', 'font-size: 14px; color: #50D4B4;');
console.log('%c📧 Contacto: admin@elamortiguador.com', 'font-size: 12px; color: #9CA3AF;');

// Konami Code Easter Egg
let konamiCode = [];
const konamiPattern = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

document.addEventListener('keydown', (e) => {
    konamiCode.push(e.key);
    konamiCode = konamiCode.slice(-10);
    
    if (konamiCode.join(',') === konamiPattern.join(',')) {
        console.log('%c🎮 ¡Código Konami activado! ¡Eres un verdadero gamer!', 'font-size: 16px; color: #FF8B6A; font-weight: bold;');
        document.body.style.animation = 'rainbow 2s linear infinite';
        setTimeout(() => {
            document.body.style.animation = '';
        }, 3000);
    }
});

// Add rainbow animation for easter egg
const style = document.createElement('style');
style.textContent = `
    @keyframes rainbow {
        0% { filter: hue-rotate(0deg); }
        100% { filter: hue-rotate(360deg); }
    }
`;
document.head.appendChild(style);

// ========================================
// Debounced Scroll Handler
// ========================================
let scrollTimeout;
function debouncedScroll() {
    if (scrollTimeout) {
        window.cancelAnimationFrame(scrollTimeout);
    }
    
    scrollTimeout = window.requestAnimationFrame(() => {
        updateScrollProgress();
        handleNavbarScroll();
        updateActiveOnScroll();
        parallaxEffect();
    });
}

// ========================================
// Event Listeners
// ========================================
window.addEventListener('scroll', debouncedScroll);
window.addEventListener('load', () => {
    updateScrollProgress();
    observeElements();
    lazyLoadImages();
});

window.addEventListener('resize', () => {
    // Close mobile menu on resize to desktop
    if (window.innerWidth > 768 && navMenu.classList.contains('active')) {
        navMenu.classList.remove('active');
        const icon = menuToggle.querySelector('i');
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    }
});

menuToggle.addEventListener('click', toggleMobileMenu);
contactForm.addEventListener('submit', handleFormSubmit);

// ========================================
// Page Load Animation
// ========================================
document.addEventListener('DOMContentLoaded', () => {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
});

// ========================================
// Performance Monitoring (Development Only)
// ========================================
if (window.performance) {
    window.addEventListener('load', () => {
        setTimeout(() => {
            const perfData = window.performance.timing;
            const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
            console.log(`%c⚡ Página cargada en ${pageLoadTime}ms`, 'color: #50D4B4; font-weight: bold;');
        }, 0);
    });
}
