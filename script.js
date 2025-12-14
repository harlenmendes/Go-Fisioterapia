/**
 * GoFisioterapia - Premium Landing Page
 * JavaScript Interactions & Animations
 */

document.addEventListener('DOMContentLoaded', () => {
    // Initialize all modules
    initCustomCursor();
    initNavigation();
    initMobileMenu();
    initScrollReveal();
    initCounterAnimation();
    initTestimonialsSlider();
    initSmoothScroll();
});

/**
 * Custom Cursor
 */
function initCustomCursor() {
    // Cursor personalizado desabilitado
    return;
    
    const cursor = document.getElementById('cursor');
    const cursorFollower = document.getElementById('cursor-follower');
    
    if (!cursor || !cursorFollower) return;
    
    // Check if device supports hover (not touch device)
    if (window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
        let mouseX = 0, mouseY = 0;
        let cursorX = 0, cursorY = 0;
        let followerX = 0, followerY = 0;
        
        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        });
        
        // Smooth cursor animation
        function animateCursor() {
            // Cursor follows mouse exactly
            cursorX = mouseX;
            cursorY = mouseY;
            cursor.style.left = cursorX + 'px';
            cursor.style.top = cursorY + 'px';
            
            // Follower has slight delay
            followerX += (mouseX - followerX) * 0.15;
            followerY += (mouseY - followerY) * 0.15;
            cursorFollower.style.left = followerX + 'px';
            cursorFollower.style.top = followerY + 'px';
            
            requestAnimationFrame(animateCursor);
        }
        
        animateCursor();
        
        // Hover effects on interactive elements
        const interactiveElements = document.querySelectorAll('a, button, .service-card, .diff-item');
        
        interactiveElements.forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursor.classList.add('hover');
                cursorFollower.classList.add('hover');
            });
            
            el.addEventListener('mouseleave', () => {
                cursor.classList.remove('hover');
                cursorFollower.classList.remove('hover');
            });
        });
    }
}

/**
 * Navigation Scroll Effect
 */
function initNavigation() {
    const nav = document.getElementById('nav');
    if (!nav) return;
    
    let lastScroll = 0;
    const scrollThreshold = 100;
    
    function handleScroll() {
        const currentScroll = window.pageYOffset;
        
        // Add scrolled class when past threshold
        if (currentScroll > scrollThreshold) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
        
        lastScroll = currentScroll;
    }
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Check on load
}

/**
 * Mobile Menu Toggle
 */
function initMobileMenu() {
    const toggle = document.getElementById('nav-toggle');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileLinks = document.querySelectorAll('.mobile-link');
    
    if (!toggle || !mobileMenu) return;
    
    function toggleMenu() {
        toggle.classList.toggle('active');
        mobileMenu.classList.toggle('active');
        document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
    }
    
    toggle.addEventListener('click', toggleMenu);
    
    // Close menu when clicking a link
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            toggle.classList.remove('active');
            mobileMenu.classList.remove('active');
            document.body.style.overflow = '';
        });
    });
}

/**
 * Scroll Reveal Animations
 */
function initScrollReveal() {
    const revealElements = document.querySelectorAll(
        '.reveal, .reveal-delay-1, .reveal-delay-2, .reveal-delay-3, ' +
        '.reveal-delay-4, .reveal-delay-5, .reveal-delay-6, .reveal-up, .reveal-left'
    );
    
    if (!revealElements.length) return;
    
    const observerOptions = {
        root: null,
        rootMargin: '0px 0px -100px 0px',
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    revealElements.forEach(el => observer.observe(el));
}

/**
 * Counter Animation
 */
function initCounterAnimation() {
    const counters = document.querySelectorAll('[data-count]');
    
    if (!counters.length) return;
    
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.5
    };
    
    const animateCounter = (counter, target) => {
        const duration = 2000;
        const startTime = performance.now();
        
        function update(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            // Easing function (ease-out-expo)
            const easeOutExpo = 1 - Math.pow(2, -10 * progress);
            const current = Math.floor(easeOutExpo * target);
            
            counter.textContent = current.toLocaleString('pt-BR');
            
            if (progress < 1) {
                requestAnimationFrame(update);
            } else {
                counter.textContent = target.toLocaleString('pt-BR');
            }
        }
        
        requestAnimationFrame(update);
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = parseInt(entry.target.getAttribute('data-count'), 10);
                animateCounter(entry.target, target);
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    counters.forEach(counter => observer.observe(counter));
}

/**
 * Testimonials Slider
 */
function initTestimonialsSlider() {
    const track = document.getElementById('testimonial-track');
    const prevBtn = document.getElementById('testimonial-prev');
    const nextBtn = document.getElementById('testimonial-next');
    const dotsContainer = document.getElementById('testimonial-dots');
    
    if (!track || !prevBtn || !nextBtn) return;
    
    const cards = track.querySelectorAll('.testimonial-card');
    const dots = dotsContainer ? dotsContainer.querySelectorAll('.dot') : [];
    let currentIndex = 0;
    const totalSlides = cards.length;
    let autoPlayInterval;
    
    function updateSlider() {
        track.style.transform = `translateX(-${currentIndex * 100}%)`;
        
        // Update dots
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentIndex);
        });
    }
    
    function nextSlide() {
        currentIndex = (currentIndex + 1) % totalSlides;
        updateSlider();
    }
    
    function prevSlide() {
        currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
        updateSlider();
    }
    
    function goToSlide(index) {
        currentIndex = index;
        updateSlider();
    }
    
    function startAutoPlay() {
        autoPlayInterval = setInterval(nextSlide, 6000);
    }
    
    function stopAutoPlay() {
        clearInterval(autoPlayInterval);
    }
    
    // Event listeners
    nextBtn.addEventListener('click', () => {
        nextSlide();
        stopAutoPlay();
        startAutoPlay();
    });
    
    prevBtn.addEventListener('click', () => {
        prevSlide();
        stopAutoPlay();
        startAutoPlay();
    });
    
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            goToSlide(index);
            stopAutoPlay();
            startAutoPlay();
        });
    });
    
    // Touch/Swipe support
    let touchStartX = 0;
    let touchEndX = 0;
    
    track.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
        stopAutoPlay();
    }, { passive: true });
    
    track.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
        startAutoPlay();
    }, { passive: true });
    
    function handleSwipe() {
        const swipeThreshold = 50;
        const diff = touchStartX - touchEndX;
        
        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0) {
                nextSlide();
            } else {
                prevSlide();
            }
        }
    }
    
    // Pause on hover
    track.addEventListener('mouseenter', stopAutoPlay);
    track.addEventListener('mouseleave', startAutoPlay);
    
    // Start autoplay
    startAutoPlay();
}

/**
 * Smooth Scroll
 */
function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            
            if (href === '#') return;
            
            const target = document.querySelector(href);
            
            if (target) {
                e.preventDefault();
                
                const navHeight = document.getElementById('nav')?.offsetHeight || 0;
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

/**
 * Parallax Effect (optional enhancement)
 */
function initParallax() {
    const parallaxElements = document.querySelectorAll('[data-parallax]');
    
    if (!parallaxElements.length) return;
    
    function updateParallax() {
        const scrolled = window.pageYOffset;
        
        parallaxElements.forEach(el => {
            const speed = parseFloat(el.getAttribute('data-parallax')) || 0.5;
            const yPos = -(scrolled * speed);
            el.style.transform = `translate3d(0, ${yPos}px, 0)`;
        });
    }
    
    window.addEventListener('scroll', updateParallax, { passive: true });
}

/**
 * Form Validation (for future contact form)
 */
function initFormValidation() {
    const form = document.getElementById('contact-form');
    
    if (!form) return;
    
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Basic validation
        const formData = new FormData(form);
        let isValid = true;
        
        formData.forEach((value, key) => {
            const input = form.querySelector(`[name="${key}"]`);
            if (input && input.required && !value.trim()) {
                isValid = false;
                input.classList.add('error');
            } else if (input) {
                input.classList.remove('error');
            }
        });
        
        if (isValid) {
            // Handle form submission
            console.log('Form submitted:', Object.fromEntries(formData));
            // Add your form submission logic here
        }
    });
}

/**
 * Lazy Loading Images (native support with fallback)
 */
function initLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    if (!images.length) return;
    
    if ('loading' in HTMLImageElement.prototype) {
        // Native lazy loading supported
        images.forEach(img => {
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
        });
    } else {
        // Fallback with Intersection Observer
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
}

/**
 * Page Load Animation
 */
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
    
    // Trigger hero animations
    const heroElements = document.querySelectorAll('.hero .reveal, .hero .reveal-delay-1, .hero .reveal-delay-2, .hero .reveal-delay-3, .hero .reveal-delay-4, .hero .reveal-delay-5, .hero .reveal-delay-6');
    
    setTimeout(() => {
        heroElements.forEach(el => el.classList.add('visible'));
    }, 100);
    
    // Add parallax effect to hero images on mouse move
    const heroVisual = document.querySelector('.hero-visual');
    const heroImages = document.querySelectorAll('.hero-image');
    const floatCards = document.querySelectorAll('.float-card, .float-badge');
    
    if (heroVisual && window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
        document.addEventListener('mousemove', (e) => {
            const { clientX, clientY } = e;
            const { innerWidth, innerHeight } = window;
            
            // Calculate mouse position relative to center
            const xPos = (clientX - innerWidth / 2) / innerWidth;
            const yPos = (clientY - innerHeight / 2) / innerHeight;
            
            // Apply subtle parallax to images
            heroImages.forEach((img, index) => {
                const depth = (index + 1) * 8;
                const moveX = xPos * depth;
                const moveY = yPos * depth;
                img.style.transform = `translate(${img.classList.contains('hero-image-main') ? `calc(-50% + ${moveX}px), calc(-50% + ${moveY}px)` : `${moveX}px, ${moveY}px`})`;
            });
            
            // Apply parallax to floating elements
            floatCards.forEach((card, index) => {
                const depth = (index + 1) * 5;
                const moveX = xPos * depth;
                const moveY = yPos * depth;
                card.style.transform = `translate(${moveX}px, ${moveY}px)`;
            });
        });
    }
});

/**
 * Utility: Debounce function
 */
function debounce(func, wait = 100) {
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

/**
 * Utility: Throttle function
 */
function throttle(func, limit = 100) {
    let inThrottle;
    return function executedFunction(...args) {
        if (!inThrottle) {
            func(...args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

