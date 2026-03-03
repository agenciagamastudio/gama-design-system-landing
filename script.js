// ═════════════════════════════════════════════════════════════════
// GAMA STUDIO DESIGN SYSTEM - Landing Page Script
// ═════════════════════════════════════════════════════════════════

// TAB FUNCTIONALITY
document.querySelectorAll('.tab-btn').forEach(button => {
    button.addEventListener('click', () => {
        const tabName = button.getAttribute('data-tab');

        // Remove active class from all buttons
        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.classList.remove('active');
        });

        // Remove active class from all contents
        document.querySelectorAll('.tab-content').forEach(content => {
            content.classList.remove('active');
        });

        // Add active class to clicked button
        button.classList.add('active');

        // Add active class to corresponding content
        document.getElementById(`tab-${tabName}`).classList.add('active');
    });
});

// SMOOTH SCROLL
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ANIMATION ON SCROLL
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeInUp 0.6s ease-out forwards';
        }
    });
}, observerOptions);

// Observe all cards and sections
document.querySelectorAll('.problem-card, .pillar-card, .feature-card, .showcase-container').forEach(el => {
    observer.observe(el);
});

// ADD FADE-IN-UP ANIMATION
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(style);

// NAVBAR SCROLL EFFECT
let lastScrollY = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    lastScrollY = window.scrollY;

    if (lastScrollY > 50) {
        navbar.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.3)';
    } else {
        navbar.style.boxShadow = 'none';
    }
});

// BUTTON INTERACTIONS
document.querySelectorAll('button').forEach(button => {
    button.addEventListener('mouseenter', function() {
        // Ripple effect
        const ripple = document.createElement('span');
        ripple.classList.add('ripple');
        this.appendChild(ripple);

        setTimeout(() => ripple.remove(), 600);
    });
});

// COPY TO CLIPBOARD (Color Swatches)
document.querySelectorAll('.swatch').forEach(swatch => {
    swatch.addEventListener('click', function() {
        const hex = this.style.backgroundColor;
        // Convert to hex
        const context = document.createElement('canvas').getContext('2d');
        context.fillStyle = hex;
        const hexColor = context.fillStyle;

        navigator.clipboard.writeText(hexColor).then(() => {
            // Show toast notification
            const toast = document.createElement('div');
            toast.textContent = `Copiado: ${hexColor}`;
            toast.style.cssText = `
                position: fixed;
                bottom: 20px;
                right: 20px;
                background: #88CE11;
                color: #000;
                padding: 12px 20px;
                border-radius: 8px;
                font-weight: 600;
                z-index: 10000;
                animation: slideIn 0.3s ease-out;
            `;
            document.body.appendChild(toast);

            setTimeout(() => toast.remove(), 2000);
        });
    });
});

// INITIALIZE
console.log('🎨 Gama Studio Design System v1.0.4 - Landing Page Loaded');
