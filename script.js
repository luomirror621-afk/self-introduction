// Language switching functionality
class LanguageManager {
    constructor() {
        this.currentLang = 'zh';
        this.langBtn = document.getElementById('langBtn');
        this.init();
    }

    init() {
        this.langBtn.addEventListener('click', () => this.toggleLanguage());
        this.updateContent();
    }

    toggleLanguage() {
        this.currentLang = this.currentLang === 'zh' ? 'en' : 'zh';
        this.updateContent();
        this.updateButton();
    }

    updateContent() {
        const elements = document.querySelectorAll('[data-zh][data-en]');
        elements.forEach(element => {
            const content = element.getAttribute(`data-${this.currentLang}`);
            if (content) {
                element.textContent = content;
            }
        });
    }

    updateButton() {
        const langText = this.langBtn.querySelector('.lang-text');
        langText.textContent = this.currentLang === 'zh' ? 'EN' : '中文';
    }
}

// Navigation functionality
class NavigationManager {
    constructor() {
        this.navbar = document.getElementById('navbar');
        this.hamburger = document.getElementById('hamburger');
        this.navMenu = document.getElementById('nav-menu');
        this.navLinks = document.querySelectorAll('.nav-link');
        this.init();
    }

    init() {
        // Mobile menu toggle
        this.hamburger.addEventListener('click', () => this.toggleMobileMenu());
        
        // Close mobile menu when clicking on links
        this.navLinks.forEach(link => {
            link.addEventListener('click', () => this.closeMobileMenu());
        });

        // Navbar scroll effect
        window.addEventListener('scroll', () => this.handleScroll());

        // Smooth scroll for navigation links
        this.navLinks.forEach(link => {
            link.addEventListener('click', (e) => this.smoothScroll(e));
        });
    }

    toggleMobileMenu() {
        this.hamburger.classList.toggle('active');
        this.navMenu.classList.toggle('active');
        document.body.style.overflow = this.navMenu.classList.contains('active') ? 'hidden' : '';
    }

    closeMobileMenu() {
        this.hamburger.classList.remove('active');
        this.navMenu.classList.remove('active');
        document.body.style.overflow = '';
    }

    handleScroll() {
        const scrolled = window.scrollY > 50;
        this.navbar.classList.toggle('scrolled', scrolled);
    }

    smoothScroll(e) {
        const href = e.target.getAttribute('href');
        if (href.startsWith('#')) {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                const offsetTop = target.offsetTop - 70;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        }
    }
}

// Counter animation functionality
class CounterAnimator {
    constructor() {
        this.counters = document.querySelectorAll('[data-count]');
        this.isAnimated = false;
        this.init();
    }

    init() {
        // Intersection Observer for triggering animation
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !this.isAnimated) {
                    this.animateCounters();
                    this.isAnimated = true;
                }
            });
        }, { threshold: 0.5 });

        // Observe the hero section
        const heroSection = document.getElementById('hero');
        if (heroSection) {
            observer.observe(heroSection);
        }
    }

    animateCounters() {
        this.counters.forEach(counter => {
            const target = parseInt(counter.getAttribute('data-count'));
            const duration = 2000; // 2 seconds
            const startTime = performance.now();
            
            const animate = (currentTime) => {
                const elapsed = currentTime - startTime;
                const progress = Math.min(elapsed / duration, 1);
                
                // Easing function (ease-out)
                const easeOut = 1 - Math.pow(1 - progress, 3);
                const current = Math.floor(easeOut * target);
                
                counter.textContent = this.formatNumber(current);
                
                if (progress < 1) {
                    requestAnimationFrame(animate);
                } else {
                    counter.textContent = this.formatNumber(target);
                }
            };
            
            requestAnimationFrame(animate);
        });
    }

    formatNumber(num) {
        if (num >= 1000000) {
            return Math.floor(num / 1000000) + 'M';
        } else if (num >= 1000) {
            return Math.floor(num / 1000) + 'K';
        }
        return num.toString();
    }
}

// Scroll animation functionality
class ScrollAnimator {
    constructor() {
        this.elements = document.querySelectorAll('.case-card, .capability-item, .platform-item');
        this.init();
    }

    init() {
        // Add fade-in class to elements
        this.elements.forEach(element => {
            element.classList.add('fade-in');
        });

        // Intersection Observer for scroll animations
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, { 
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        this.elements.forEach(element => {
            observer.observe(element);
        });

        // Animate skill meters when skills section comes into view
        this.animateSkillMeters();
    }

    animateSkillMeters() {
        const skillsSection = document.getElementById('skills');
        let skillsAnimated = false;

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !skillsAnimated) {
                    this.triggerSkillAnimation();
                    skillsAnimated = true;
                }
            });
        }, { threshold: 0.3 });

        if (skillsSection) {
            observer.observe(skillsSection);
        }
    }

    triggerSkillAnimation() {
        const skillFills = document.querySelectorAll('.skill-fill');
        skillFills.forEach((fill, index) => {
            setTimeout(() => {
                fill.style.animationDelay = '0s';
                fill.style.animationPlayState = 'running';
            }, index * 100);
        });
    }
}

// Platform hover effects
class PlatformEffects {
    constructor() {
        this.platforms = document.querySelectorAll('.platform-item');
        this.init();
    }

    init() {
        this.platforms.forEach(platform => {
            platform.addEventListener('mouseenter', () => this.handleHover(platform));
            platform.addEventListener('mouseleave', () => this.handleLeave(platform));
        });
    }

    handleHover(platform) {
        const icon = platform.querySelector('i');
        const meter = platform.querySelector('.skill-fill');
        
        // Add pulse animation to icon
        icon.style.animation = 'pulse 0.6s ease-in-out';
        
        // Temporarily increase skill meter width
        const originalWidth = meter.style.getPropertyValue('--skill-percentage');
        meter.style.setProperty('--skill-percentage', '100%');
        
        // Reset after animation
        setTimeout(() => {
            icon.style.animation = '';
            meter.style.setProperty('--skill-percentage', originalWidth);
        }, 600);
    }

    handleLeave(platform) {
        // Reset any ongoing animations
        const icon = platform.querySelector('i');
        icon.style.animation = '';
    }
}

// Contact form functionality
class ContactManager {
    constructor() {
        this.contactBtns = document.querySelectorAll('.contact-btn, .btn-secondary');
        this.init();
    }

    init() {
        this.contactBtns.forEach(btn => {
            btn.addEventListener('click', (e) => this.handleContact(e, btn));
        });
    }

    handleContact(e, btn) {
        const btnText = btn.querySelector('span');
        if (btnText && btnText.textContent.includes('Coffee Chat')) {
            e.preventDefault();
            this.showContactInfo();
        }
    }

    showContactInfo() {
        // Create modal or show contact information
        const contactInfo = `
            📧 Email: your-email@example.com
            💼 LinkedIn: linkedin.com/in/your-profile
            💬 WeChat: your-wechat-id
            
            请通过以上方式联系我预约Coffee Chat！
        `;
        
        alert(contactInfo);
        // In production, replace with a proper modal
    }
}

// Performance optimization
class PerformanceOptimizer {
    constructor() {
        this.init();
    }

    init() {
        // Lazy load images when implemented
        this.lazyLoadImages();
        
        // Optimize scroll events
        this.throttleScrollEvents();
        
        // Preload critical resources
        this.preloadResources();
    }

    lazyLoadImages() {
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

    throttleScrollEvents() {
        let ticking = false;
        
        const handleScroll = () => {
            if (!ticking) {
                requestAnimationFrame(() => {
                    // Scroll-dependent operations
                    ticking = false;
                });
                ticking = true;
            }
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
    }

    preloadResources() {
        // Preload critical fonts and assets
        const link = document.createElement('link');
        link.rel = 'preload';
        link.href = 'https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap';
        link.as = 'style';
        document.head.appendChild(link);
    }
}

// Loading animation
class LoadingManager {
    constructor() {
        this.loadingElement = this.createLoadingElement();
        this.init();
    }

    createLoadingElement() {
        const loading = document.createElement('div');
        loading.className = 'loading';
        loading.innerHTML = '<div class="spinner"></div>';
        document.body.appendChild(loading);
        return loading;
    }

    init() {
        // Hide loading when page is fully loaded
        window.addEventListener('load', () => {
            setTimeout(() => this.hideLoading(), 500);
        });
    }

    hideLoading() {
        this.loadingElement.classList.add('hidden');
        setTimeout(() => {
            this.loadingElement.remove();
        }, 500);
    }
}

// Analytics and tracking (placeholder)
class AnalyticsManager {
    constructor() {
        this.init();
    }

    init() {
        // Track CTA clicks
        this.trackCTAClicks();
        
        // Track section views
        this.trackSectionViews();
        
        // Track scroll depth
        this.trackScrollDepth();
    }

    trackCTAClicks() {
        const ctaButtons = document.querySelectorAll('.btn, .contact-btn');
        ctaButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                // Analytics tracking code would go here
                console.log('CTA clicked:', btn.textContent.trim());
            });
        });
    }

    trackSectionViews() {
        const sections = document.querySelectorAll('section[id]');
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Analytics tracking code would go here
                    console.log('Section viewed:', entry.target.id);
                }
            });
        }, { threshold: 0.5 });

        sections.forEach(section => observer.observe(section));
    }

    trackScrollDepth() {
        let maxScroll = 0;
        
        window.addEventListener('scroll', () => {
            const scrollPercent = Math.round((window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100);
            if (scrollPercent > maxScroll) {
                maxScroll = scrollPercent;
                if (maxScroll % 25 === 0) {
                    // Analytics tracking code would go here
                    console.log('Scroll depth:', maxScroll + '%');
                }
            }
        });
    }
}

// Accessibility enhancements
class AccessibilityManager {
    constructor() {
        this.init();
    }

    init() {
        // Keyboard navigation
        this.enhanceKeyboardNavigation();
        
        // Focus management
        this.manageFocus();
        
        // Announce dynamic content changes
        this.announceContentChanges();
    }

    enhanceKeyboardNavigation() {
        // Enable keyboard navigation for interactive elements
        const interactiveElements = document.querySelectorAll('.platform-item, .case-card, .capability-item');
        
        interactiveElements.forEach(element => {
            element.setAttribute('tabindex', '0');
            element.setAttribute('role', 'button');
            
            element.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    element.click();
                }
            });
        });
    }

    manageFocus() {
        // Manage focus for mobile menu
        const hamburger = document.getElementById('hamburger');
        const navMenu = document.getElementById('nav-menu');
        
        hamburger.addEventListener('click', () => {
            if (navMenu.classList.contains('active')) {
                const firstLink = navMenu.querySelector('.nav-link');
                if (firstLink) firstLink.focus();
            }
        });
    }

    announceContentChanges() {
        // Create live region for announcements
        const liveRegion = document.createElement('div');
        liveRegion.setAttribute('aria-live', 'polite');
        liveRegion.setAttribute('aria-atomic', 'true');
        liveRegion.className = 'sr-only';
        document.body.appendChild(liveRegion);
        
        // Announce language changes
        const langBtn = document.getElementById('langBtn');
        langBtn.addEventListener('click', () => {
            liveRegion.textContent = 'Language switched';
        });
    }
}

// Add CSS for screen reader only content
const style = document.createElement('style');
style.textContent = `
    .sr-only {
        position: absolute;
        width: 1px;
        height: 1px;
        padding: 0;
        margin: -1px;
        overflow: hidden;
        clip: rect(0, 0, 0, 0);
        white-space: nowrap;
        border: 0;
    }
    
    @keyframes pulse {
        0% { transform: scale(1); }
        50% { transform: scale(1.1); }
        100% { transform: scale(1); }
    }
`;
document.head.appendChild(style);

// Initialize all components when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize loading manager first
    new LoadingManager();
    
    // Initialize all managers
    new LanguageManager();
    new NavigationManager();
    new CounterAnimator();
    new ScrollAnimator();
    new PlatformEffects();
    new ContactManager();
    new PerformanceOptimizer();
    new AnalyticsManager();
    new AccessibilityManager();
    
    // Add smooth reveal animation to hero content
    setTimeout(() => {
        const heroContent = document.querySelector('.hero-content');
        if (heroContent) {
            heroContent.style.opacity = '1';
            heroContent.style.transform = 'translateY(0)';
        }
    }, 100);
});

// Handle page visibility changes
document.addEventListener('visibilitychange', () => {
    if (!document.hidden) {
        // Restart any paused animations when page becomes visible
        const animatedElements = document.querySelectorAll('[style*="animation-play-state"]');
        animatedElements.forEach(element => {
            element.style.animationPlayState = 'running';
        });
    }
});

// Error handling
window.addEventListener('error', (e) => {
    console.error('JavaScript error:', e.error);
    // In production, send errors to analytics service
});

// Service Worker registration (for future PWA features)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        // Service worker registration would go here for offline functionality
        console.log('Service Worker support detected');
    });
}