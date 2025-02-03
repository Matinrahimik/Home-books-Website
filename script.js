// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

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

// Create intersection observer for animation triggers
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
        }
    });
}, {
    threshold: 0.25,
    rootMargin: '-50px'
});

// Observe mission section when document is loaded
document.addEventListener('DOMContentLoaded', () => {
    const missionSection = document.querySelector('.mission');
    const userSection = document.querySelector('.user');
    
    if (missionSection) {
        observer.observe(missionSection);
    }
    
    if (userSection) {
        observer.observe(userSection);
    }
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

// Scroll to Top Button Functionality
const scrollToTopButton = document.getElementById('scrollToTop');

// Show button when user scrolls down 200px from the top
window.addEventListener('scroll', () => {
    if (window.scrollY > 200) {
        scrollToTopButton.classList.add('visible');
    } else {
        scrollToTopButton.classList.remove('visible');
    }
});

// Smooth scroll to top when button is clicked
scrollToTopButton.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}); 