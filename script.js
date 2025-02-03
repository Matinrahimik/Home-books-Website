// Enhanced smooth scroll function
function smoothScrollTo(target, duration = 800) {
    // Calculate navbar height dynamically
    const navbar = document.querySelector('.navbar');
    const navbarHeight = navbar ? navbar.offsetHeight : 0;
    
    // Different padding for different sections
    let extraPadding = 48; // default padding
    
    // Less padding for mission and user sections
    if (target.classList.contains('mission') || 
        target.classList.contains('user')) {
        extraPadding = 16;
    }
    // Keep challenges as is
    else if (target.classList.contains('challenges')) {
        extraPadding = 24;
    }
    // More padding for features and FAQ sections
    else if (target.classList.contains('features') || 
             target.classList.contains('faq')) {
        extraPadding = 64;
    }

    const scrollPadding = navbarHeight + extraPadding;
    const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - scrollPadding;
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition;
    let startTime = null;

    function animation(currentTime) {
        if (startTime === null) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
        const progress = Math.min(timeElapsed / duration, 1);
        
        // Easing function for smooth acceleration and deceleration
        const ease = t => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
        
        window.scrollTo(0, startPosition + distance * ease(progress));
        
        if (timeElapsed < duration) {
            requestAnimationFrame(animation);
        }
    }
    
    requestAnimationFrame(animation);
}

// Reset and update smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            smoothScrollTo(target);
            // Close mobile menu when clicking a link
            document.querySelector('.nav-links').classList.remove('show');
            document.querySelector('.mobile-menu-btn')?.classList.remove('active');
        }
    });
});

// Mobile menu toggle
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const navLinks = document.querySelector('.nav-links');

if (mobileMenuBtn && navLinks) {
    mobileMenuBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        mobileMenuBtn.classList.toggle('active');
        navLinks.classList.toggle('show');
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!navLinks.contains(e.target) && !mobileMenuBtn.contains(e.target) && navLinks.classList.contains('show')) {
            navLinks.classList.remove('show');
            mobileMenuBtn.classList.remove('active');
        }
    });

    // Close menu when window is resized to desktop view
    window.addEventListener('resize', () => {
        const isPortrait = window.matchMedia('(orientation: portrait)').matches;
        if (window.innerWidth > 1024 && !isPortrait) {
            navLinks.classList.remove('show');
            mobileMenuBtn.classList.remove('active');
        }
    });

    // Close menu when clicking a link
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('show');
            mobileMenuBtn.classList.remove('active');
        });
    });
}

// Auto-scroll carousels
function setupCarousel(carouselClass) {
    const carousel = document.querySelector(carouselClass);
    if (!carousel) return;

    let isDown = false;
    let startX;
    let scrollLeft;

    carousel.addEventListener('mousedown', (e) => {
        isDown = true;
        carousel.style.cursor = 'grabbing';
        startX = e.pageX - carousel.offsetLeft;
        scrollLeft = carousel.scrollLeft;
    });

    carousel.addEventListener('mouseleave', () => {
        isDown = false;
        carousel.style.cursor = 'grab';
    });

    carousel.addEventListener('mouseup', () => {
        isDown = false;
        carousel.style.cursor = 'grab';
    });

    carousel.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - carousel.offsetLeft;
        const walk = (x - startX) * 2;
        carousel.scrollLeft = scrollLeft - walk;
    });
}

// Setup carousels
setupCarousel('.image-carousel');
setupCarousel('.quotes-carousel');

// Enhanced intersection observer for animations
const observerOptions = {
    threshold: 0.2,
    rootMargin: '-50px'
};

const animationObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
            // Optional: Remove observer after animation
            // animationObserver.unobserve(entry.target);
        } else {
            // Optional: Remove animation when out of view for replay
            entry.target.classList.remove('animate');
        }
    });
}, observerOptions);

// Observe all animated sections
document.addEventListener('DOMContentLoaded', () => {
    const animatedSections = [
        '.mission',
        '.user',
        '.challenges',
        '.quotes',
        '.features',
        '.faq'
    ];

    animatedSections.forEach(selector => {
        const element = document.querySelector(selector);
        if (element) {
            animationObserver.observe(element);
        }
    });
});

// FAQ Toggle functionality
document.querySelectorAll('.faq-question').forEach(question => {
    question.addEventListener('click', () => {
        const answer = question.nextElementSibling;
        const isOpen = question.classList.contains('active');
        
        // Close all other answers
        document.querySelectorAll('.faq-question').forEach(q => {
            if (q !== question) {
                q.classList.remove('active');
                q.nextElementSibling.style.display = 'none';
            }
        });
        
        // Toggle current answer
        if (isOpen) {
            question.classList.remove('active');
            answer.style.display = 'none';
        } else {
            question.classList.add('active');
            answer.style.display = 'block';
        }
    });
});

// Scroll to top with smooth animation
const scrollToTopBtn = document.getElementById('scrollToTop');
if (scrollToTopBtn) {
    // Show button when user scrolls down 100px
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            scrollToTopBtn.classList.add('visible');
        } else {
            scrollToTopBtn.classList.remove('visible');
        }
    });

    scrollToTopBtn.addEventListener('click', () => {
        smoothScrollTo(document.body);
    });
}

// Intersection Observer for challenges section animation
const challengesSection = document.querySelector('.challenges');
const challengesObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
            challengesObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.2
});

if (challengesSection) {
    challengesObserver.observe(challengesSection);
}

// Intersection Observer for quotes section animation
const quotesSection = document.querySelector('.quotes');
const quotesObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
            quotesObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.2
});

if (quotesSection) {
    quotesObserver.observe(quotesSection);
}

// Intersection Observer for features section animation
const featuresSection = document.querySelector('.features');
const featuresObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
            featuresObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.2
});

if (featuresSection) {
    featuresObserver.observe(featuresSection);
}

// Intersection Observer for FAQ section animation
const faqSection = document.querySelector('.faq');
const faqObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
            faqObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.2
});

if (faqSection) {
    faqObserver.observe(faqSection);
}

// Add mouse tracking for dot hover effect
document.addEventListener('mousemove', (e) => {
    document.body.style.setProperty('--mouse-x', e.clientX + 'px');
    document.body.style.setProperty('--mouse-y', e.clientY + 'px');
}); 