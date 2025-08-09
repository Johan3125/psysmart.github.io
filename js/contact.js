// Mobile menu functionality
let isMobileMenuOpen = false;

function toggleMobileMenu() {
    const mobileMenu = document.getElementById('mobile-menu');
    const menuIcon = document.getElementById('menu-icon');
    
    isMobileMenuOpen = !isMobileMenuOpen;
    
    if (isMobileMenuOpen) {
        mobileMenu.classList.add('show');
        menuIcon.className = 'fas fa-times';
    } else {
        mobileMenu.classList.remove('show');
        menuIcon.className = 'fas fa-bars';
    }
}

function closeMobileMenu() {
    const mobileMenu = document.getElementById('mobile-menu');
    const menuIcon = document.getElementById('menu-icon');
    
    isMobileMenuOpen = false;
    mobileMenu.classList.remove('show');
    menuIcon.className = 'fas fa-bars';
}

// Form submission
function handleFormSubmit(event) {
    event.preventDefault();
    
    const formData = new FormData(event.target);
    const data = {};
    
    for (let [key, value] of formData.entries()) {
        data[key] = value;
    }
    
    console.log('Form submitted:', data);
    
    // Show success toast
    showToast('Message sent successfully! We will contact you soon.');
    
    // Reset form
    event.target.reset();
}

// Toast notification
function showToast(message) {
    const toast = document.getElementById('toast');
    const toastMessage = document.getElementById('toast-message');
    
    toastMessage.textContent = message;
    toast.classList.add('show');
    
    // Hide toast after 3 seconds
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

// Email validation
function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Phone validation
function validatePhone(phone) {
    const phoneRegex = /^[\+]?[0-9\s\-\(\)]{10,}$/;
    return phoneRegex.test(phone);
}

// Scroll to top functionality
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// DOM loaded events
document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
            
            // Close mobile menu if open
            if (isMobileMenuOpen) {
                closeMobileMenu();
            }
        });
    });
    
    // Form validation
    const form = document.querySelector('.contact-form');
    if (form) {
        const emailInput = form.querySelector('input[name="email"]');
        const phoneInput = form.querySelector('input[name="phone"]');
        
        if (emailInput) {
            emailInput.addEventListener('blur', function() {
                if (this.value && !validateEmail(this.value)) {
                    this.style.borderColor = '#ef4444';
                    showToast('Please enter a valid email address.');
                } else {
                    this.style.borderColor = '#a7f3d0';
                }
            });
        }
        
        if (phoneInput) {
            phoneInput.addEventListener('blur', function() {
                if (this.value && !validatePhone(this.value)) {
                    this.style.borderColor = '#ef4444';
                    showToast('Please enter a valid phone number.');
                } else {
                    this.style.borderColor = '#a7f3d0';
                }
            });
        }
    }
    
    document.querySelectorAll('.nav-link, .mobile-nav-link').forEach(link => {
        const text = link.textContent.trim().toLowerCase();
        if (text === 'about us') {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                window.location.href = 'index.html#about';
            });
        }
        if (text === 'services') {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                window.location.href = 'index.html#services';
            });
        }
        if (text === 'our partners') {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                window.location.href = 'index.html#team';
            });
        }
    });
    
    document.querySelectorAll('.fade-in-element').forEach(function(el, idx) {
        setTimeout(function() {
            el.classList.add('visible');
        }, 200 + idx * 120); // hiệu ứng xuất hiện lần lượt
    });
});

// Close mobile menu when clicking outside
document.addEventListener('click', function(event) {
    const mobileMenu = document.getElementById('mobile-menu');
    const menuButton = document.querySelector('.mobile-menu-btn');
    
    if (isMobileMenuOpen && 
        !mobileMenu.contains(event.target) && 
        !menuButton.contains(event.target)) {
        closeMobileMenu();
    }
});

// Add scroll to top button when scrolling down
window.addEventListener('scroll', function() {
    if (window.scrollY > 300) {
        if (!document.querySelector('.scroll-to-top')) {
            const scrollButton = document.createElement('button');
            scrollButton.className = 'scroll-to-top';
            scrollButton.innerHTML = '<i class="fas fa-arrow-up"></i>';
            scrollButton.onclick = scrollToTop;
            document.body.appendChild(scrollButton);
        }
    } else {
        const scrollButton = document.querySelector('.scroll-to-top');
        if (scrollButton) {
            scrollButton.remove();
        }
    }
});

let lastScrollY = window.scrollY;
const header = document.querySelector('.header') || document.querySelector('.navbar');
window.addEventListener('scroll', function() {
    if (!header) return;
    if (window.scrollY > lastScrollY && window.scrollY > 50) {
        header.classList.add('hide');
    } else {
        header.classList.remove('hide');
    }
    lastScrollY = window.scrollY;
});
