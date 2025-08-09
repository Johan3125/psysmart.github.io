document.addEventListener('DOMContentLoaded', function() {
    // ===== MOBILE NAV =====
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileNav = document.getElementById('mobileNav');
    const mobileNavOverlay = document.getElementById('mobileNavOverlay');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
    function closeMobileNav() {
        mobileNav.classList.remove('open');
        mobileNavOverlay.style.display = 'none';
    }
    mobileMenuBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        mobileNav.classList.add('open');
        mobileNavOverlay.style.display = 'block';
    });
    mobileNavOverlay.addEventListener('click', closeMobileNav);
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', closeMobileNav);
    });
    window.addEventListener('resize', function() {
        if(window.innerWidth > 900) closeMobileNav();
    });

    // ===== SMOOTH SCROLL =====
    const navLinks = document.querySelectorAll('a[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            if (targetSection) {
                const headerHeight = document.querySelector('.header') ? document.querySelector('.header').offsetHeight : 0;
                const targetPosition = targetSection.offsetTop - headerHeight;
                window.scrollTo({ top: targetPosition, behavior: 'smooth' });
            }
        });
    });

    // ===== HEADER SCROLL EFFECT =====
    let lastScrollTop = 0;
    const header = document.querySelector('.header');
    if (header) {
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
    }

    // ===== FADE-IN ANIMATION =====
    document.querySelectorAll('.fade-in-element').forEach(function(el, idx) {
        setTimeout(function() {
            el.classList.add('visible');
        }, 200 + idx * 120);
    });

    // ===== QUESTIONNAIRE =====
    const questions = [
        {
            title: "How important is religion in your life?",
            options: ["Very important", "Somewhat important", "Not important"]
        },
        {
            title: "What is your preferred therapist gender?",
            options: ["Male", "Female", "No preference"]
        },
        {
            title: "What is your age group?",
            options: ["Under 18", "18-35", "36-60", "Above 60"]
        },
        {
            title: "What language do you prefer for sessions?",
            options: ["Vietnamese", "English", "Other"]
        },
        {
            title: "What is your main goal for therapy?",
            options: ["Stress management", "Relationship", "Self-development", "Other"]
        },
        {
            title: "Do you have any previous therapy experience?",
            options: ["Yes", "No"]
        }
    ];

    let current = 0;
    const questionTitle = document.getElementById('question-title');
    const optionsContainer = document.getElementById('options-container');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const findBtn = document.getElementById('find-therapist-btn');
    const progressBar = document.getElementById('progress-bar');
    const currentQ = document.getElementById('current-question');
    const indicators = document.querySelectorAll('.progress-indicator');

    function renderQuestion(idx) {
        const q = questions[idx];
        if (!questionTitle || !optionsContainer) return;
        questionTitle.textContent = q.title;
        optionsContainer.innerHTML = '';
        q.options.forEach(opt => {
            const btn = document.createElement('button');
            btn.type = 'button';
            btn.className = 'btn btn-outline-success';
            btn.textContent = opt;
            btn.onclick = () => {
                nextBtn.disabled = false;
                findBtn.disabled = false;
            };
            optionsContainer.appendChild(btn);
        });

        if (prevBtn) prevBtn.style.visibility = idx === 0 ? 'hidden' : 'visible';
        if (nextBtn) nextBtn.style.display = idx < questions.length - 1 ? 'inline-block' : 'none';
        if (findBtn) findBtn.style.display = idx === questions.length - 1 ? 'inline-block' : 'none';
        if (nextBtn) nextBtn.disabled = true;
        if (findBtn) findBtn.disabled = true;

        // Progress
        if (currentQ) currentQ.textContent = idx + 1;
        if (progressBar) progressBar.style.width = ((idx + 1) / questions.length * 100) + '%';
        if (indicators) {
            indicators.forEach((el, i) => {
                el.classList.toggle('active', i === idx);
                el.classList.toggle('bg-success', i <= idx);
                el.classList.toggle('bg-secondary', i > idx);
            });
        }
    }

    if (prevBtn) {
        prevBtn.addEventListener('click', function() {
            if (current > 0) {
                current--;
                renderQuestion(current);
            }
        });
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', function() {
            if (current < questions.length - 1) {
                current++;
                renderQuestion(current);
            }
        });
    }

    if (findBtn) {
        findBtn.addEventListener('click', function() {
            alert('Thank you! We will match you with a suitable therapist soon.');
        });
    }

    renderQuestion(current);

        // Team slider functionality
        const teamSlider = document.getElementById('teamSlider');
        const teamPrevBtn = document.getElementById('teamPrevBtn');
        const teamNextBtn = document.getElementById('teamNextBtn');
        
        const teamMembers = teamSlider.querySelectorAll('.team-member');
        const totalMembers = teamMembers.length; // Now 8 members
        let visibleMembers = window.innerWidth <= 768 ? (window.innerWidth <= 480 ? 1 : 2) : 4;
        let currentIndex = 0;
        
        function updateSlider() {
            // Xác định số lượng thành viên hiển thị theo kích thước màn hình
            if (window.innerWidth <= 900) {
                visibleMembers = 1;
                teamSlider.style.display = 'flex';
                teamSlider.style.flexDirection = 'column';
                teamSlider.style.alignItems = 'center';
                teamSlider.style.gridTemplateColumns = '';
                teamSlider.style.justifyItems = '';
            } else {
                visibleMembers = 4;
                teamSlider.style.display = 'grid';
                teamSlider.style.flexDirection = '';
                teamSlider.style.alignItems = '';
                teamSlider.style.gridTemplateColumns = 'repeat(4, 1fr)';
                teamSlider.style.justifyItems = 'center';
            }

            // Đảm bảo visibleMembers không lớn hơn tổng số thành viên
            if (visibleMembers > totalMembers) visibleMembers = totalMembers;

            // Đảm bảo currentIndex luôn hợp lệ
            if (currentIndex > totalMembers - visibleMembers) currentIndex = Math.max(0, totalMembers - visibleMembers);
            if (currentIndex < 0) currentIndex = 0;

            // Ẩn tất cả, chỉ hiển thị các thành viên cần thiết
            teamMembers.forEach(member => member.style.display = 'none');
            for (let i = currentIndex; i < currentIndex + visibleMembers; i++) {
                if (teamMembers[i]) teamMembers[i].style.display = 'block';
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
        if (teamSlider && teamPrevBtn && teamNextBtn) {
            updateSlider();
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
            window.addEventListener('resize', updateSlider);
            
            // Keyboard navigation
            document.addEventListener('keydown', (e) => {
                if (e.key === 'ArrowLeft') {
                    prevSlide();
                } else if (e.key === 'ArrowRight') {
                    nextSlide();
                }
            });
        }
});

document.getElementById('mobileMenuBtn').onclick = function() {
    document.getElementById('mobileNav').classList.toggle('active');
    document.getElementById('mobileNavOverlay').classList.toggle('active');
};
document.getElementById('mobileNavOverlay').onclick = function() {
    document.getElementById('mobileNav').classList.remove('active');
    document.getElementById('mobileNavOverlay').classList.remove('active');
};
