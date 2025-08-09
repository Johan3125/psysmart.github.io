// Mobile menu functionality        
document.addEventListener('DOMContentLoaded', function() {      
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');     
    const mobileNav = document.getElementById('mobileNav');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
    
    // Toggle mobile menu 
    mobileMenuBtn.addEventListener('click', function() {
        mobileNav.classList.toggle('active');
    });
    
    // Close mobile menu when clicking on a link
    mobileNavLinks.forEach(link => { 
        link.addEventListener('click', function() {
            mobileNav.classList.remove('active');
        });
    });
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
        if (!mobileMenuBtn.contains(event.target) && !mobileNav.contains(event.target)) {
            mobileNav.classList.remove('active');
        }
    });
    
    // Fade-in animation on scroll
    const observerOptions = {
        threshold: 0.2,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);
    
    // Observe all fade-in elements
    const fadeElements = document.querySelectorAll('.fade-in');
    fadeElements.forEach(element => {
        observer.observe(element);
    });
    
    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('a[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Add hover effects to therapy cards
    const therapyCards = document.querySelectorAll('.therapy-card, .service-card');
    therapyCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });
    
    // Add click handlers for therapy cards
    const allCards = document.querySelectorAll('.therapy-card, .service-card');
    allCards.forEach(card => {
        card.addEventListener('click', function() {
            const cardType = this.classList.contains('individual') ? 'Individual' : 
                           this.classList.contains('couples') ? 'Couples' : 'Teen';
            
            alert(`You selected ${cardType} therapy. This would typically open a booking form or redirect to a detailed page.`);
        });
    });
    
    // Header scroll effect
    let lastScrollTop = 0;
    const header = document.querySelector('.header');
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > lastScrollTop && scrollTop > 100) {
            header.style.transform = 'translateY(-100%)';
        } else {
            header.style.transform = 'translateY(0)';
        }
        
        lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
    });
    
    header.style.transition = 'transform 0.3s ease';
    
    // Team slider functionality
    const teamSlider = document.getElementById('teamSlider');
    const teamPrevBtn = document.getElementById('teamPrevBtn');
    const teamNextBtn = document.getElementById('teamNextBtn');
    
    const teamMembers = teamSlider.querySelectorAll('.team-member');
    const totalMembers = teamMembers.length; // Now 8 members
    let visibleMembers = window.innerWidth <= 768 ? (window.innerWidth <= 480 ? 1 : 2) : 4;
    let currentIndex = 0;
    
    function updateSlider() {
        // Cập nhật lại visibleMembers khi resize
        visibleMembers = window.innerWidth <= 768 ? (window.innerWidth <= 480 ? 1 : 2) : 4;

        // Hide all members first
        teamMembers.forEach(member => {
            member.style.display = 'none';
        });

        // Tính toán chỉ số bắt đầu và kết thúc hợp lý
        let endIndex = currentIndex + visibleMembers;
        if (endIndex > totalMembers) {
            endIndex = totalMembers;
            currentIndex = totalMembers - visibleMembers < 0 ? 0 : totalMembers - visibleMembers;
        }

        // Show visible members liên tiếp
        for (let i = currentIndex; i < endIndex; i++) {
            teamMembers[i].style.display = 'block';
        }

        // Update grid layout
        if (window.innerWidth <= 480) {
            teamSlider.style.gridTemplateColumns = '1fr';
        } else if (window.innerWidth <= 768) {
            teamSlider.style.gridTemplateColumns = 'repeat(2, 1fr)';
        } else {
            teamSlider.style.gridTemplateColumns = 'repeat(4, 1fr)';
        }
    }
    
    function nextSlide() {
        if (currentIndex + visibleMembers < totalMembers) {
            currentIndex++;
        } else {
            currentIndex = 0;
        }
        updateSlider();
    }
    
    function prevSlide() {
        if (currentIndex > 0) {
            currentIndex--;
        } else {
            currentIndex = totalMembers - visibleMembers < 0 ? 0 : totalMembers - visibleMembers;
        }
        updateSlider();
    }
    
    // Initialize slider
    updateSlider();
    
    // Event listeners for navigation buttons
    teamNextBtn.addEventListener('click', nextSlide);
    teamPrevBtn.addEventListener('click', prevSlide);
    
    // Auto-slide functionality
    let autoSlideInterval = setInterval(nextSlide, 5000);
    
    // Pause auto-slide on hover
    const teamContainer = document.querySelector('.team-slider-container');
    teamContainer.addEventListener('mouseenter', () => {
        clearInterval(autoSlideInterval);
    });
    
    teamContainer.addEventListener('mouseleave', () => {
        autoSlideInterval = setInterval(nextSlide, 5000);
    });
    
    // Touch/swipe support for mobile
    let startX = 0;
    let isDragging = false;
    
    teamSlider.addEventListener('touchstart', (e) => {
        startX = e.touches[0].clientX;
        isDragging = true;
    });
    
    teamSlider.addEventListener('touchmove', (e) => {
        if (!isDragging) return;
        e.preventDefault();
    });
    
    teamSlider.addEventListener('touchend', (e) => {
        if (!isDragging) return;
        
        const endX = e.changedTouches[0].clientX;
        const diffX = startX - endX;
        
        if (Math.abs(diffX) > 50) {
            if (diffX > 0) {
                nextSlide();
            } else {
                prevSlide();
            }
        }
        
        isDragging = false;
    });
    
    // Update slider on window resize
    window.addEventListener('resize', function() {
        const newVisibleMembers = window.innerWidth <= 768 ? (window.innerWidth <= 480 ? 1 : 2) : 4;
        updateSlider();
        
        if (window.innerWidth > 768) {
            document.getElementById('mobileNav').classList.remove('active');
        }
    });
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') {
            prevSlide();
        } else if (e.key === 'ArrowRight') {
            nextSlide();
        }
    });
    
    // Scroll to services functionality
    const scrollToServicesBtn = document.getElementById('scrollToServices');
    if (scrollToServicesBtn) {
        scrollToServicesBtn.addEventListener('click', function() {
            const servicesSection = document.getElementById('services');
            if (servicesSection) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = servicesSection.offsetTop - headerHeight;
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    }
    
    document.querySelectorAll('.nav-link, .mobile-nav-link').forEach(link => {
        if (link.getAttribute('href') === '#contact') {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                window.location.href = 'contact.html';
            });
        }
    });
    
    // Hero chuyển đổi tự động
    const slides = document.querySelectorAll('.hero-slide');
    if (slides.length > 1) {
        let idx = 0;
        setInterval(() => { 
            slides[idx].classList.remove('active');
            idx = (idx + 1) % slides.length;
            slides[idx].classList.add('active');
        }, 5000);
    }
    
    // Nút Online Booking (hero 2) chuyển sang trang Book
    const bookingBtn = document.getElementById('onlineBookingBtn');
    if (bookingBtn) {
        bookingBtn.addEventListener('click', function() { // khi nhấp vào nút Booking
            window.location.href = 'book.html';
        });
    }

    // Nhấp vào ảnh hero (hero 1) chuyển sang trang Service
    const heroImageSlide = document.querySelector('.hero-image-slide');
    if (heroImageSlide) {
        heroImageSlide.style.cursor = 'pointer';
        heroImageSlide.addEventListener('click', function() { // khi nhấp vào ảnh hero
            window.location.href = 'service.html';
        });
    }

    document.querySelectorAll('.fade-in-element').forEach(function(el, idx) { // hiệu ứng fade-in cho các phần tử
        setTimeout(function() { // thời gian chờ trước khi hiệu ứng bắt đầu
            el.classList.add('visible');
        }, 200 + idx * 120); // hiệu ứng xuất hiện lần lượt
    });
});

// Form submission handler (if needed later)
function handleFormSubmit(event) { // xử lý gửi form
    event.preventDefault();
    const formData = new FormData(event.target);
    
    console.log('Form submitted:', Object.fromEntries(formData));
    alert('Thank you for your message! We will get back to you soon.');
    event.target.reset();
}

// Utility functions
function showLoading(element) { // hiển thị loading
    element.style.opacity = '0.6';
    element.style.pointerEvents = 'none';
}

function hideLoading(element) { // ẩn loading
    element.style.opacity = '1';
    element.style.pointerEvents = 'auto';
}