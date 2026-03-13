// ===========================
// Form Handling
// ===========================

const contactForm = document.getElementById('contactForm');
const formNote = document.getElementById('formNote');

// Handle form submission
contactForm.addEventListener('submit', function (e) {
    e.preventDefault();

    // Get form values
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const message = document.getElementById('message').value.trim();

    // Basic validation
    if (!name || !email || !message) {
        showFormMessage('Please fill in all required fields', 'error');
        return;
    }

    // Email validation
    if (!isValidEmail(email)) {
        showFormMessage('Please enter a valid email address', 'error');
        return;
    }

    // Simulate form submission (in production, this would send to a server)
    submitForm(name, email, phone, message);
});

/**
 * Validate email format
 * @param {string} email - Email to validate
 * @returns {boolean} - True if valid email format
 */
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

/**
 * Submit form data
 * @param {string} name - User name
 * @param {string} email - User email
 * @param {string} phone - User phone
 * @param {string} message - User message
 */
function submitForm(name, email, phone, message) {
    // Create FormData for submission
    const formData = new FormData();
    formData.append('name', name);
    formData.append('email', email);
    formData.append('phone', phone);
    formData.append('message', message);

    // In a real application, send to your backend
    // For now, we'll just show a success message
    showFormMessage(
        '✓ Thank you! We received your message. We\'ll get back to you soon!',
        'success'
    );

    // Clear form
    contactForm.reset();

    // Reset message after 5 seconds
    setTimeout(() => {
        formNote.textContent = '';
        formNote.className = '';
    }, 5000);
}

/**
 * Display form message
 * @param {string} message - Message to display
 * @param {string} type - Message type ('success' or 'error')
 */
function showFormMessage(message, type) {
    formNote.textContent = message;
    formNote.className = type;
}

// ===========================
// Menu Tab Switching
// ===========================

const menuTabBtns = document.querySelectorAll('.menu-tab-btn');
const menuTabContents = document.querySelectorAll('.menu-tab-content');

menuTabBtns.forEach((btn) => {
    btn.addEventListener('click', function () {
        const tabName = this.getAttribute('data-tab');

        // Remove active class from all buttons
        menuTabBtns.forEach((b) => b.classList.remove('active'));
        // Add active class to clicked button
        this.classList.add('active');

        // Hide all tab contents
        menuTabContents.forEach((content) => content.classList.remove('active'));
        // Show selected tab content
        const selectedTab = document.getElementById(tabName);
        if (selectedTab) {
            selectedTab.classList.add('active');
        }
    });
});

// ===========================
// Menu Interactions
// ===========================

const addToOrderButtons = document.querySelectorAll('.btn-add');

addToOrderButtons.forEach((button) => {
    button.addEventListener('click', function (e) {
        const itemName = this.getAttribute('data-pizza') || this.getAttribute('data-item');
        const originalText = this.textContent;

        // Change button text
        this.textContent = '✓ Added!';
        this.style.background = 'var(--primary-green)';

        // Reset after 2 seconds
        setTimeout(() => {
            this.textContent = originalText;
            this.style.background = '';
        }, 2000);

        // Log for testing (in production, this would add to cart)
        console.log(`Added ${itemName} to order`);
    });
});

// ===========================
// Smooth Scroll for Navigation
// ===========================

document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#') {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        }
    });
});

// ===========================
// Mobile Menu Toggle (if added in future)
// ===========================

// Function to toggle mobile menu (for future implementation)
function toggleMobileMenu() {
    const navMenu = document.querySelector('.nav-menu');
    if (navMenu) {
        navMenu.classList.toggle('active');
    }
}

// ===========================
// Intersection Observer for Animations
// ===========================

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px',
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeInUp 0.6s ease forwards';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe menu cards and feature cards
document.querySelectorAll('.menu-card, .feature').forEach((el) => {
    observer.observe(el);
});

// ===========================
// Phone Number Click Handler
// ===========================

document.querySelectorAll('a[href^="tel:"]').forEach((link) => {
    link.addEventListener('click', function (e) {
        // On desktop, tel: links might not work as expected
        // This ensures the click is handled properly
        if (!/iPhone|iPad|iPod|Android/i.test(navigator.userAgent)) {
            // For desktop users, you might want to show a message or call handler
            console.log('Phone clicked:', this.href);
        }
    });
});

// ===========================
// Active Menu Item on Scroll
// ===========================

window.addEventListener('scroll', updateActiveMenu);

function updateActiveMenu() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');

    let current = '';

    sections.forEach((section) => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;

        if (scrollY >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach((link) => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
}

// ===========================
// Lazy Load Images (if you add images)
// ===========================

if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    });

    // Uncomment when you add lazy-loaded images
    // document.querySelectorAll('img[data-src]').forEach(img => {
    //     imageObserver.observe(img);
    // });
}

// ===========================
// Initialize
// ===========================

console.log('🍕 Pizzeria website loaded successfully!');
