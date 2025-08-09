$(document).ready(function() {
    // Fade-in animation cho các phần tử
    $('.fade-in-element').each(function(idx, el) {
        setTimeout(function() {
            $(el).addClass('visible');
        }, 200 + idx * 120);
    });

    // Hero section animation - alternates every 5 seconds
    var $slides = $('.hero-slide');
    if ($slides.length > 1) {
        var idx = 0;
        setInterval(function() {
            $slides.eq(idx).removeClass('active');
            idx = (idx + 1) % $slides.length;
            $slides.eq(idx).addClass('active');
        }, 5000);
    }

    // Hero image auto switch every 5 seconds
    setInterval(function() {
        const $imgs = $('#heroImageFull .hero-img');
        let idx = $imgs.index($imgs.filter('.active'));
        $imgs.removeClass('active');
        $imgs.eq((idx + 1) % $imgs.length).addClass('active');
    }, 5000);

    // Fade-in animation for page elements
    function initFadeInAnimation() {
        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        // Observe all fade-in elements
        $('.fade-in-element').each(function() {
            observer.observe(this);
        });
    }

    // Initialize fade-in animations
    initFadeInAnimation();

    // Smooth scrolling for navigation links
    $('.nav-link[href^="#"]').on('click', function(e) {
        e.preventDefault();
        const target = $(this.getAttribute('href'));
        if (target.length) {
            $('html, body').animate({
                scrollTop: target.offset().top - 70
            }, 800);
        }
    });

    // Set minimum date for appointment booking (today)
    const today = new Date().toISOString().split('T')[0];
    $('#preferredDate, #alternativeDate').attr('min', today);

    // Service booking modal
    $('.btn-book').on('click', function(e) {
        e.preventDefault();
        
        // Get service information from the clicked card
        const serviceCard = $(this).closest('.service-card');
        const serviceTitle = serviceCard.find('.service-title').text();
        const serviceDuration = serviceCard.find('.service-duration').text();
        const servicePrice = serviceCard.find('.service-price').text();
        
        // Pre-fill the service dropdown in modal
        const serviceValue = getServiceValue(serviceTitle);
        $('#bookingModal #service').val(serviceValue);
        
        // Show the booking modal
        $('#bookingModal').modal('show');
    });

    // Package booking modal
    $('.btn-package').on('click', function(e) {
        e.preventDefault();
        
        // Get package information from the clicked card
        const packageCard = $(this).closest('.package-card');
        const packageName = packageCard.find('.package-name').text();
        
        // Pre-fill the package dropdown in modal
        $('#packageModal #package').val(getPackageValue(packageName));
        
        // Show the package modal
        $('#packageModal').modal('show');
    });

    // Service booking form submission
    $('#serviceBookingForm').on('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        const bookingData = {};
        
        for (let [key, value] of formData.entries()) {
            bookingData[key] = value;
        }

        // Simulate form submission
        console.log('Service Booking Data:', bookingData);
        
        // Show success message
        showSuccessMessage('Cảm ơn bạn đã đặt lịch dịch vụ! Chúng tôi sẽ liên hệ với bạn trong vòng 24 giờ để xác nhận cuộc hẹn.');
        
        // Reset form and close modal
        this.reset();
        $('#bookingModal').modal('hide');
    });

    // Package booking form submission
    $('#packageBookingForm').on('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        const packageData = {};
        
        for (let [key, value] of formData.entries()) {
            packageData[key] = value;
        }

        // Simulate form submission
        console.log('Package Booking Data:', packageData);
        
        // Show success message
        showSuccessMessage('Cảm ơn bạn đã đăng ký gói dịch vụ! Chúng tôi sẽ liên hệ với bạn để tư vấn chi tiết về gói dịch vụ phù hợp.');
        
        // Reset form and close modal
        this.reset();
        $('#packageModal').modal('hide');
    });

    // Helper function to show success message
    function showSuccessMessage(message) {
        // Create and show alert
        const alertHtml = `
            <div class="alert alert-success alert-dismissible fade show position-fixed" 
                 style="top: 20px; right: 20px; z-index: 9999; min-width: 300px;" 
                 role="alert">
                <i class="fas fa-check-circle me-2"></i>
                ${message}
                <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
            </div>
        `;
        
        $('body').append(alertHtml);
        
        // Auto remove after 5 seconds
        setTimeout(function() {
            $('.alert').fadeOut();
        }, 5000);
    }

    // Helper function to get service value for dropdown
    function getServiceValue(serviceTitle) {
        const serviceMap = {
            'Individual Wellness Consult (Adults)': 'individual-wellness',
            'Psychological & Counseling Consult (Adults)': 'psychological-counseling',
            'Psychiatric Consult (Adults)': 'psychiatric-consult',
            'Case Conference (Virtual)': 'case-conference',
            'Couples Therapy': 'couples-therapy',
            'Family Therapy': 'family-therapy'
        };
        
        return serviceMap[serviceTitle] || '';
    }

    // Helper function to get package value for dropdown
    function getPackageValue(packageName) {
        if (packageName.includes('Individual Counseling') && packageName.includes('PPP')) {
            return 'individual-ppp';
        } else if (packageName.includes('Individual Counseling')) {
            return 'individual-standard';
        } else if (packageName.includes('Adult Consultation') && packageName.includes('PPP')) {
            return 'adult-ppp';
        } else if (packageName.includes('Adult Consultation')) {
            return 'adult-standard';
        }
        return '';
    }

    // Navbar collapse on mobile when clicking nav links
    $('.navbar-nav .nav-link').on('click', function() {
        if ($(window).width() < 992) {
            $('.navbar-collapse').collapse('hide');
        }
    });

    // Enhanced hover effects
    $('.hover-effect').hover(
        function() {
            $(this).css('transform', 'translateY(-5px)');
        },
        function() {
            $(this).css('transform', 'translateY(0)');
        }
    );

    // Navigation link click handling
    $('.nav-link').on('click', function(e) {
        const text = $(this).text().trim().toLowerCase();
        if (text === 'about us') {
            e.preventDefault();
            window.location.href = 'index.html#about';
            return;
        }
        if (text === 'services') {
            e.preventDefault();
            window.location.href = 'index.html#services';
            return;
        }
        if (text === 'our partners') {
            e.preventDefault();
            window.location.href = 'index.html#team';
            return;
        }
        if (text === 'contact') {
            e.preventDefault();
            window.location.href = 'contact.html';
            return;
        }
        // Nếu là link nội bộ của trang này thì mới cuộn mượt
        if (this.hash && $(this.hash).length) {
            e.preventDefault();
            $('html, body').animate({
                scrollTop: $(this.hash).offset().top - 70
            }, 800);
        }
    });

    // Hero chuyển đổi (nếu chưa có)
    const slides = document.querySelectorAll('.hero-slide');
    if (slides.length > 1) {
        let idx = 0;
        setInterval(() => {
            slides[idx].classList.remove('active');
            idx = (idx + 1) % slides.length;
            slides[idx].classList.add('active');
        }, 5000);
    }

    // Nút Online Booking (hero 2) chuyển sang trang Book (nếu muốn reload lại chính trang này)
    const bookingBtn = document.getElementById('onlineBookingBtn');
    if (bookingBtn) {
        bookingBtn.addEventListener('click', function() {
            window.location.href = 'book.html';
        });
    }
});

