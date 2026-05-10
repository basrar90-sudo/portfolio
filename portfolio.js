// =====================
// SMOOTH SCROLL NAVIGATION
// =====================

function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
    }
}

// Handle navigation link clicks
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const href = link.getAttribute('href');
        if (href.startsWith('#')) {
            scrollToSection(href.substring(1));
            closeMenu();
        }
    });
});

// =====================
// NAVBAR STYLING ON SCROLL
// =====================

const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
    if (navbar) {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }
});

// =====================
// HAMBURGER MENU
// =====================

const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
}

function closeMenu() {
    if (hamburger && navMenu) {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }
}

// Close menu when clicking outside
document.addEventListener('click', (e) => {
    if (!e.target.closest('.nav-container')) {
        closeMenu();
    }
});

// =====================
// INTERSECTION OBSERVER FOR ANIMATIONS
// =====================

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in-up');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe elements
document.querySelectorAll('.skill-progress, .project-card').forEach(el => {
    observer.observe(el);
});

// =====================
// CONTACT FORM HANDLING WITH EMAILJS
// =====================

// Initialize EmailJS
emailjs.init({
    publicKey: "T5ra11dzPHbqdsCal"
});

const contactForm = document.getElementById('contactForm');
const formMessage = document.getElementById('formMessage');

if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
        e.preventDefault();

        // Validate fields
        const name = document.getElementById('name')?.value.trim();
        const email = document.getElementById('email')?.value.trim();
        const subject = document.getElementById('subject')?.value.trim();
        const message = document.getElementById('message')?.value.trim();

        if (!name || !email || !subject || !message) {
            showFormMessage('Please fill in all fields.', 'error');
            return;
        }

        // Validate email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            showFormMessage('Please enter a valid email address.', 'error');
            return;
        }

        // Disable button
        const submitBtn = contactForm.querySelector('.btn-submit');
        if (submitBtn) {
            submitBtn.disabled = true;
            submitBtn.textContent = 'Sending...';
        }

        // Send email using EmailJS
        emailjs.sendForm(
            "service_6appa4j",
            "template_y6temgk",
            contactForm
        )
        .then(function () {
            showFormMessage('✓ Message sent successfully! I will get back to you soon.', 'success');
            contactForm.reset();
        })
        .catch(function (error) {
            showFormMessage('✗ Failed to send message. Please try again.', 'error');
            console.error('EmailJS Error:', error);
        })
        .finally(function () {
            if (submitBtn) {
                submitBtn.disabled = false;
                submitBtn.textContent = 'Send Message';
            }
        });
    });
}

function showFormMessage(message, type) {
    if (!formMessage) return;

    formMessage.textContent = message;
    formMessage.className = `form-message ${type}`;

    setTimeout(() => {
        formMessage.className = 'form-message';
        formMessage.textContent = '';
    }, 5000);
}

// =====================
// DOWNLOAD RESUME
// =====================

function downloadResume() {
    window.open('resume.pdf', '_blank');
}

// =====================
// BUTTON CLICK ANIMATION
// =====================

document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', function (event) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = event.clientX - rect.left - size / 2;
        const y = event.clientY - rect.top - size / 2;

        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');

        this.appendChild(ripple);

        setTimeout(() => ripple.remove(), 600);
    });
});

// =====================
// PAGE LOAD ANIMATION
// =====================

window.addEventListener('load', () => {
    console.log('Portfolio loaded successfully');
    document.body.style.opacity = '1';
});

// Initial opacity
document.body.style.opacity = '0.99';

// =====================
// ACTIVE NAV LINK ON SCROLL
// =====================

window.addEventListener('scroll', () => {
    let current = '';

    document.querySelectorAll('section').forEach(section => {
        const sectionTop = section.offsetTop;

        if (window.pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');

        const href = link.getAttribute('href');
        if (href && href.startsWith('#') && href.substring(1) === current) {
            link.classList.add('active');
        }
    });
});

// =====================
// CONSOLE MESSAGE
// =====================

console.log('%cWelcome to Asrar Bhat\\'s Portfolio!', 'color: #6366f1; font-size: 20px; font-weight: bold;');
console.log('%cFeel free to explore the code on GitHub!', 'color: #8b5cf6; font-size: 14px;');
