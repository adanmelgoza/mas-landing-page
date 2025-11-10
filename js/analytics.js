/**
 * MAS - Google Analytics Enhanced Tracking
 * Custom event tracking for better insights
 * Version: 1.0.0
 */

// ========================================
// Analytics Helper Functions
// ========================================

/**
 * Wrapper para enviar eventos a Google Analytics
 * @param {string} eventName - Nombre del evento
 * @param {object} eventParams - Parámetros adicionales del evento
 */
function trackEvent(eventName, eventParams = {}) {
    if (typeof gtag === 'function') {
        gtag('event', eventName, eventParams);
        console.log('📊 Analytics Event:', eventName, eventParams);
    } else {
        console.warn('⚠️ Google Analytics no está disponible');
    }
}

/**
 * Track pageview personalizado
 * @param {string} pageTitle - Título de la página
 * @param {string} pagePath - Ruta de la página
 */
function trackPageView(pageTitle, pagePath) {
    if (typeof gtag === 'function') {
        gtag('event', 'page_view', {
            page_title: pageTitle,
            page_location: window.location.href,
            page_path: pagePath
        });
    }
}

// ========================================
// Event Tracking - Navigation
// ========================================

// Track navigation clicks
document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const section = this.getAttribute('href').replace('#', '');
            
            trackEvent('navigation_click', {
                event_category: 'Navigation',
                event_label: section,
                navigation_type: 'internal',
                link_text: this.textContent.trim()
            });
        });
    });
});

// ========================================
// Event Tracking - Products
// ========================================

// Track product card clicks
document.addEventListener('DOMContentLoaded', function() {
    const productButtons = document.querySelectorAll('.product-card .btn');
    
    productButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            const productCard = this.closest('.product-card');
            const productName = productCard.querySelector('.product-title')?.textContent || 'Unknown';
            const isExternal = this.getAttribute('href')?.startsWith('http');
            
            trackEvent('product_click', {
                event_category: 'Products',
                event_label: productName,
                product_name: productName,
                link_type: isExternal ? 'external' : 'internal',
                destination_url: this.getAttribute('href') || this.getAttribute('onclick')
            });
        });
    });
});

// ========================================
// Event Tracking - CTA Buttons
// ========================================

// Track hero CTA clicks
document.addEventListener('DOMContentLoaded', function() {
    const heroButtons = document.querySelectorAll('.hero-buttons .btn');
    
    heroButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            const buttonText = this.textContent.trim();
            const buttonClass = this.classList.contains('btn-primary') ? 'primary' : 'secondary';
            
            trackEvent('cta_click', {
                event_category: 'CTA',
                event_label: buttonText,
                cta_location: 'hero',
                cta_type: buttonClass,
                button_text: buttonText
            });
        });
    });
});

// ========================================
// Event Tracking - Form Submissions
// ========================================

// Track form submissions
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        const interest = document.getElementById('interest').value;
        const email = document.getElementById('email').value;
        
        trackEvent('form_submission', {
            event_category: 'Form',
            event_label: 'Contact Form',
            form_type: 'contact',
            interest_type: interest,
            form_location: 'contact_section'
        });
        
        // Track conversion
        trackEvent('generate_lead', {
            event_category: 'Conversion',
            lead_type: interest,
            method: 'contact_form'
        });
    });
}

// Track form field interactions
document.addEventListener('DOMContentLoaded', function() {
    const formInputs = document.querySelectorAll('#contactForm input, #contactForm select, #contactForm textarea');
    
    formInputs.forEach(input => {
        // Track when user starts filling the form
        input.addEventListener('focus', function() {
            trackEvent('form_interaction', {
                event_category: 'Form',
                event_label: 'Field Focus',
                field_name: this.id || this.name,
                field_type: this.type
            });
        }, { once: true }); // Only track first focus
    });
});

// ========================================
// Event Tracking - Email Validation
// ========================================

const emailInput = document.getElementById('email');
if (emailInput) {
    emailInput.addEventListener('blur', function() {
        const email = this.value;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const isValid = emailRegex.test(email);
        
        if (email && !isValid) {
            trackEvent('form_validation_error', {
                event_category: 'Form',
                event_label: 'Email Validation',
                error_type: 'invalid_email',
                field_name: 'email'
            });
        }
    });
}

// ========================================
// Event Tracking - Notifications
// ========================================

// Track notification button clicks
window.trackNotification = function(productType) {
    trackEvent('notification_request', {
        event_category: 'Engagement',
        event_label: 'Notify Me',
        product_type: productType,
        notification_type: 'product_launch'
    });
};

// Override the notifyMe function to include tracking
const originalNotifyMe = window.notifyMe;
window.notifyMe = function(productType) {
    trackNotification(productType);
    if (originalNotifyMe) {
        originalNotifyMe(productType);
    }
};

// ========================================
// Event Tracking - Scroll Depth
// ========================================

let scrollTracked = {
    '25': false,
    '50': false,
    '75': false,
    '90': false,
    '100': false
};

function trackScrollDepth() {
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;
    const scrollTop = window.scrollY;
    const scrollPercent = (scrollTop / (documentHeight - windowHeight)) * 100;
    
    Object.keys(scrollTracked).forEach(threshold => {
        if (!scrollTracked[threshold] && scrollPercent >= parseInt(threshold)) {
            scrollTracked[threshold] = true;
            
            trackEvent('scroll_depth', {
                event_category: 'Engagement',
                event_label: `${threshold}%`,
                scroll_depth: parseInt(threshold),
                page_location: window.location.pathname
            });
        }
    });
}

// Debounce scroll tracking
let scrollTimeout;
window.addEventListener('scroll', function() {
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(trackScrollDepth, 500);
});

// ========================================
// Event Tracking - Time on Page
// ========================================

let pageLoadTime = Date.now();

// Track time spent on page when user leaves
window.addEventListener('beforeunload', function() {
    const timeOnPage = Math.round((Date.now() - pageLoadTime) / 1000); // seconds
    
    trackEvent('time_on_page', {
        event_category: 'Engagement',
        event_label: 'Page Exit',
        time_seconds: timeOnPage,
        time_minutes: Math.round(timeOnPage / 60)
    });
});

// ========================================
// Event Tracking - External Links
// ========================================

document.addEventListener('DOMContentLoaded', function() {
    const externalLinks = document.querySelectorAll('a[href^="http"]');
    
    externalLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const url = this.getAttribute('href');
            const linkText = this.textContent.trim();
            
            trackEvent('outbound_click', {
                event_category: 'Outbound Links',
                event_label: url,
                link_text: linkText,
                destination_url: url,
                link_domain: new URL(url).hostname
            });
        });
    });
});

// ========================================
// Event Tracking - Modal Interactions
// ========================================

// Track modal opens
const originalShowModal = window.showModal;
if (originalShowModal) {
    window.showModal = function(productName) {
        trackEvent('modal_open', {
            event_category: 'Modal',
            event_label: productName,
            modal_type: 'notification',
            product_name: productName
        });
        
        originalShowModal(productName);
    };
}

// Track modal closes
const originalCloseModal = window.closeModal;
if (originalCloseModal) {
    window.closeModal = function() {
        trackEvent('modal_close', {
            event_category: 'Modal',
            event_label: 'Close',
            modal_type: 'notification'
        });
        
        originalCloseModal();
    };
}

// ========================================
// Event Tracking - Social Media
// ========================================

document.addEventListener('DOMContentLoaded', function() {
    const socialLinks = document.querySelectorAll('.social-links a');
    
    socialLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const socialNetwork = this.querySelector('i').className.match(/fa-(\w+)/)?.[1] || 'unknown';
            
            trackEvent('social_click', {
                event_category: 'Social Media',
                event_label: socialNetwork,
                social_network: socialNetwork,
                link_location: 'footer'
            });
        });
    });
});

// ========================================
// Event Tracking - Easter Eggs
// ========================================

// Track Konami code activation (if implemented)
document.addEventListener('konami_activated', function() {
    trackEvent('easter_egg', {
        event_category: 'Engagement',
        event_label: 'Konami Code',
        easter_egg_type: 'konami_code'
    });
});

// ========================================
// Event Tracking - Downloads (if any)
// ========================================

document.addEventListener('DOMContentLoaded', function() {
    const downloadLinks = document.querySelectorAll('a[download], a[href$=".pdf"], a[href$=".zip"]');
    
    downloadLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const fileName = this.getAttribute('download') || this.getAttribute('href').split('/').pop();
            
            trackEvent('file_download', {
                event_category: 'Downloads',
                event_label: fileName,
                file_name: fileName,
                file_type: fileName.split('.').pop()
            });
        });
    });
});

// ========================================
// Event Tracking - Page Performance
// ========================================

window.addEventListener('load', function() {
    setTimeout(() => {
        if (window.performance) {
            const perfData = window.performance.timing;
            const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
            const domReadyTime = perfData.domContentLoadedEventEnd - perfData.navigationStart;
            
            trackEvent('page_performance', {
                event_category: 'Performance',
                event_label: 'Page Load',
                page_load_time: pageLoadTime,
                dom_ready_time: domReadyTime,
                value: pageLoadTime
            });
        }
    }, 0);
});

// ========================================
// Event Tracking - Section Visibility
// ========================================

const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const sectionId = entry.target.id;
            
            trackEvent('section_view', {
                event_category: 'Engagement',
                event_label: sectionId,
                section_name: sectionId,
                visibility: 'visible'
            });
        }
    });
}, {
    threshold: 0.5
});

document.addEventListener('DOMContentLoaded', function() {
    const sections = document.querySelectorAll('section[id]');
    sections.forEach(section => sectionObserver.observe(section));
});

// ========================================
// Custom Dimensions (if needed)
// ========================================

// You can set custom user properties
function setUserProperties() {
    if (typeof gtag === 'function') {
        gtag('set', 'user_properties', {
            visitor_type: 'website_visitor',
            page_type: 'landing_page',
            company: 'MAS Solutions'
        });
    }
}

// Call on page load
document.addEventListener('DOMContentLoaded', setUserProperties);

// ========================================
// Console Info
// ========================================

console.log('%c📊 Google Analytics Tracking Activo', 'color: #4A90E2; font-weight: bold; font-size: 14px;');
console.log('%cEventos rastreados:', 'color: #50D4B4; font-weight: bold;');
console.log('- Clicks en navegación');
console.log('- Clicks en productos');
console.log('- Envíos de formulario');
console.log('- Profundidad de scroll');
console.log('- Tiempo en página');
console.log('- Enlaces externos');
console.log('- Interacciones con modal');
console.log('- Redes sociales');
console.log('- Rendimiento de página');
