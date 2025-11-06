// Select by ID
const navbar = document.getElementById('navbar');

// Select by class (first match)
const button = document.querySelector('.btn-primary');

// Select all matches
const allButtons = document.querySelectorAll('.btn');

// Select by tag name
const sections = document.querySelectorAll('section');

// Examples
console.log(navbar);      // Shows navbar element
console.log(allButtons);  // Shows NodeList of buttons

// Get element
const heading = document.querySelector('h1');

// Change text
heading.textContent = "New Heading";
heading.innerText = "Also changes text";

// Change HTML
heading.innerHTML = "Heading with <span>HTML</span>";

// Example: Update profile name
const profileName = document.querySelector('.hero h1');
profileName.textContent = "Sree Kanikadevi K";

// Select element
const hero = document.querySelector('.hero');

// Change individual style
hero.style.backgroundColor = '#3498db';
hero.style.color = 'white';
hero.style.padding = '50px';

// Change multiple styles
hero.style.cssText = `
    background-color: #3498db;
    color: white;
    padding: 50px;
`;

const element = document.querySelector('.skill-card');

// Add class
element.classList.add('active');

// Remove class
element.classList.remove('active');

// Toggle class (add if not present, remove if present)
element.classList.toggle('active');

// Check if class exists
if (element.classList.contains('active')) {
    console.log('Element is active');
}
// ==================== SMOOTH SCROLLING ====================
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

console.log('✅ Smooth scrolling enabled');
// ==================== FORM VALIDATION ====================
const contactForm = document.getElementById('contact-form');

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();

        // Get form values
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const message = document.getElementById('message').value.trim();

        // Clear previous errors
        clearErrors();

        let isValid = true;

        // Validate name
        if (name.length < 2) {
            showError('name', 'Name must be at least 2 characters');
            isValid = false;
        }

        // Validate email
        if (!isValidEmail(email)) {
            showError('email', 'Please enter a valid email address');
            isValid = false;
        }

        // Validate message
        if (message.length < 10) {
            showError('message', 'Message must be at least 10 characters');
            isValid = false;
        }

        // If valid, submit (for now, just show success)
        if (isValid) {
            showAlert('Message sent successfully! (Demo mode)', 'success');
            contactForm.reset();
        }
    });
}

// Email validation helper
function isValidEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Show error message
function showError(fieldId, message) {
    const field = document.getElementById(fieldId);
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.textContent = message;
    errorDiv.style.color = '#e74c3c';
    errorDiv.style.fontSize = '0.9rem';
    errorDiv.style.marginTop = '5px';
    field.parentElement.appendChild(errorDiv);
    field.style.borderColor = '#e74c3c';
}

// Clear all errors
function clearErrors() {
    document.querySelectorAll('.error-message').forEach(el => el.remove());
    document.querySelectorAll('input, textarea').forEach(el => {
        el.style.borderColor = '';
    });
}

// Show alert message
function showAlert(message, type) {
    const alert = document.createElement('div');
    alert.className = `alert alert-${type}`;
    alert.textContent = message;
    alert.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 25px;
        border-radius: 8px;
        color: white;
        font-weight: bold;
        z-index: 10000;
        background: ${type === 'success' ? '#2ecc71' : '#e74c3c'};
    `;

    document.body.appendChild(alert);

    setTimeout(() => alert.remove(), 3000);
}

console.log('✅ Form validation enabled');
// ==================== ANIMATED COUNTERS ====================
function animateCounters() {
    const counters = document.querySelectorAll('.stat h3');

    counters.forEach(counter => {
        const target = parseInt(counter.textContent);
        const duration = 2000; // 2 seconds
        const increment = target / (duration / 16); // 60 FPS
        let current = 0;

        const updateCounter = () => {
            current += increment;

            if (current < target) {
                counter.textContent = Math.ceil(current);
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target;
            }
        };

        updateCounter();
    });
}

// Use Intersection Observer to trigger when visible
const statsSection = document.querySelector('.about-stats');

if (statsSection) {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounters();
                observer.unobserve(entry.target); // Only animate once
            }
        });
    }, { threshold: 0.5 });

    observer.observe(statsSection);
}

console.log('✅ Counter animations enabled');
// ==================== TYPING EFFECT ====================
const tagline = document.querySelector('.tagline');

if (tagline) {
    const originalText = tagline.textContent;
    tagline.textContent = '';
    let charIndex = 0;

    function typeWriter() {
        if (charIndex < originalText.length) {
            tagline.textContent += originalText.charAt(charIndex);
            charIndex++;
            setTimeout(typeWriter, 100); // Adjust speed here (ms)
        }
    }

    // Start typing when page loads
    window.addEventListener('load', typeWriter);

    console.log('✅ Typing effect enabled');
}
// ==================== THEME TOGGLE ====================
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;
const sunIcon = document.querySelector('.sun-icon');
const moonIcon = document.querySelector('.moon-icon');

// Check for saved theme preference
const currentTheme = localStorage.getItem('theme');
if (currentTheme === 'dark') {
    body.classList.add('dark-mode');
    sunIcon.style.display = 'none';
    moonIcon.style.display = 'block';
}

// Toggle theme
if (themeToggle) {
    themeToggle.addEventListener('click', () => {
        body.classList.toggle('dark-mode');

        // Update icons
        if (body.classList.contains('dark-mode')) {
            sunIcon.style.display = 'none';
            moonIcon.style.display = 'block';
            localStorage.setItem('theme', 'dark');
        } else {
            sunIcon.style.display = 'block';
            moonIcon.style.display = 'none';
            localStorage.setItem('theme', 'light');
        }
    });

    console.log('✅ Theme toggle enabled');
}
// ==================== BACK TO TOP BUTTON ====================
const backToTopBtn = document.getElementById('back-to-top');

if (backToTopBtn) {
    // Show/hide button based on scroll position
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    });

    // Scroll to top on click
    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    console.log('✅ Back to top button enabled');
}
// ==================== MOBILE MENU TOGGLE ====================
const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
const navLinks = document.querySelector('.nav-links');

if (mobileMenuToggle) {
    mobileMenuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        mobileMenuToggle.classList.toggle('active');
    });

    // Close menu when clicking a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            mobileMenuToggle.classList.remove('active');
        });
    });

    console.log('✅ Mobile menu enabled');
}