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
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// =====================
// HAMBURGER MENU
// =====================

const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

function closeMenu() {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
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

// Observe skill progress bars
document.querySelectorAll('.skill-progress').forEach(el => {
    observer.observe(el);
});

// Observe project cards
document.querySelectorAll('.project-card').forEach(el => {
    observer.observe(el);
});

// =====================
// CONTACT FORM HANDLING
// =====================

const contactForm = document.getElementById('contactForm');
const formMessage = document.getElementById('formMessage');

contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Get form data
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const subject = document.getElementById('subject').value.trim();
    const message = document.getElementById('message').value.trim();

    // Validation
    if (!name || !email || !subject || !message) {
        showFormMessage('Please fill in all fields', 'error');
        return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        showFormMessage('Please enter a valid email address', 'error');
        return;
    }

    // Simulate form submission (In production, connect to backend service)
    try {
        // Disable submit button
        const submitBtn = contactForm.querySelector('.btn-submit');
        submitBtn.disabled = true;
        submitBtn.textContent = 'Sending...';

        // Simulate API call with delay
        await new Promise(resolve => setTimeout(resolve, 1500));

        // Show success message
        showFormMessage('✓ Message sent successfully! I\'ll get back to you soon.', 'success');

        // Reset form
        contactForm.reset();

        // Re-enable submit button
        submitBtn.disabled = false;
        submitBtn.textContent = 'Send Message';

        // Log form data to console (for testing)
        console.log('Form Data:', { name, email, subject, message });

    } catch (error) {
        showFormMessage('✗ Error sending message. Please try again.', 'error');
        console.error('Form submission error:', error);
    }
});

function showFormMessage(message, type) {
    formMessage.textContent = message;
    formMessage.className = `form-message ${type}`;

    // Auto hide message after 5 seconds
    setTimeout(() => {
        formMessage.className = 'form-message';
    }, 5000);
}

// =====================
// DOWNLOAD RESUME
// =====================

function downloadResume() {
    // Create a simple text file content
    const resumeContent = `
ASRAR BHAT
Computer Science Student | Kashmir University

CONTACT INFORMATION
Email: asrar@example.com
Phone: +91 9876 543 210
Location: Kashmir, India
GitHub: https://github.com
LinkedIn: https://linkedin.com

EDUCATION
Bachelor of Technology in Computer Science & Engineering
Kashmir University
Graduation: 2026

SKILLS
Programming Languages: Python, Java, C++, JavaScript
Web Technologies: HTML, CSS, React.js, Node.js
Database: SQL, SQLite
Tools: Git, GitHub, VS Code, Linux

PROJECTS
1. Portfolio Website
   - Responsive personal portfolio with smooth animations
   - Built with HTML, CSS, and JavaScript
   
2. Todo Application
   - Feature-rich todo app with local storage
   - Built with React.js

3. Calculator App
   - Fully functional calculator application
   - Built with vanilla JavaScript

4. Weather App
   - Real-time weather data using OpenWeather API
   - Responsive design

5. Student Management System
   - Database project using Python and SQLite
   - CRUD operations implementation

6. Data Structures Visualizer
   - Interactive visualization of data structures
   - Built with JavaScript Canvas API

EXPERIENCE & ACHIEVEMENTS
- Strong foundation in Data Structures and Algorithms
- Experienced in problem-solving and coding
- Contributed to open-source projects
- Participated in coding competitions

ABOUT
Passionate Computer Science student dedicated to building innovative solutions and exploring cutting-edge technologies. 
Strong problem-solving skills with a focus on writing clean, efficient code.
`;

    // Create blob from content
    const blob = new Blob([resumeContent], { type: 'text/plain' });

    // Create download link
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'Asrar_Bhat_Resume.txt';
    document.body.appendChild(a);
    a.click();

    // Cleanup
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);

    console.log('Resume downloaded');
}

// =====================
// BUTTON CLICK ANIMATION
// =====================

document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', function(event) {
        // Create ripple effect
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
// TYPING ANIMATION FOR HERO TITLE
// =====================

function typeAnimation(element, text, speed = 100) {
    let index = 0;
    element.textContent = '';

    function type() {
        if (index < text.length) {
            element.textContent += text.charAt(index);
            index++;
            setTimeout(type, speed);
        }
    }

    type();
}

// Run typing animation when page loads
window.addEventListener('load', () => {
    // Optional: Uncomment to enable typing animation
    // const heroTitle = document.querySelector('.hero-title');
    // typeAnimation(heroTitle, 'Hi, I\'m Asrar Bhat', 50);
});

// =====================
// SCROLL PROGRESS INDICATOR
// =====================

window.addEventListener('scroll', () => {
    const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (window.scrollY / scrollHeight) * 100;
    // Can be used to display progress bar
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
        const sectionHeight = section.clientHeight;

        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').substring(1) === current) {
            link.classList.add('active');
        }
    });
});

// =====================
// UTILITY FUNCTIONS
// =====================

// Function to check if element is in viewport
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// Function to format date
function formatDate(date) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(date).toLocaleDateString(undefined, options);
}

// =====================
// CONSOLE MESSAGE
// =====================

console.log('%cWelcome to Asrar Bhat\'s Portfolio!', 'color: #6366f1; font-size: 20px; font-weight: bold;');
console.log('%cFeel free to explore the code on GitHub!', 'color: #8b5cf6; font-size: 14px;');