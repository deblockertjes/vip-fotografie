document.addEventListener('DOMContentLoaded', () => {
    // --- Theme Toggle (Dark Mode) ---
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;

    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        body.classList.add('dark-theme');
        if (themeToggle) themeToggle.textContent = '☀️';
    }

    // --- Header Style Helper ---
    const updateHeaderStyle = () => {
        if (!header) return;
        const isDark = body.classList.contains('dark-theme');
        if (window.scrollY > 50) {
            header.style.padding = '10px 0';
            header.style.backgroundColor = isDark ? 'rgba(18, 18, 18, 0.85)' : 'rgba(252, 252, 252, 0.85)';
            header.style.backdropFilter = 'blur(10px)';
        } else {
            header.style.padding = '20px 0';
            header.style.backgroundColor = isDark ? 'rgba(18, 18, 18, 0.7)' : 'rgba(252, 252, 252, 0.7)';
            header.style.backdropFilter = 'blur(5px)';
        }
    };

    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            body.classList.toggle('dark-theme');
            const isDark = body.classList.contains('dark-theme');
            localStorage.setItem('theme', isDark ? 'dark' : 'light');
            themeToggle.textContent = isDark ? '☀️' : '🌓';
            updateHeaderStyle(); // Immediate update on toggle
        });
    }

    // --- Hero Dynamic Background ---
    const hero = document.getElementById('home');
    const heroBg = document.querySelector('.hero-bg');
    
    if (heroBg && hero) {
        const heroImages = [
            { url: 'assets/images/trouw-1.jpg', dark: true },
            { url: 'assets/images/natuur-4.jpg', dark: true },
            { url: 'assets/images/evenementen-9.jpg', dark: true },
            { url: 'assets/images/trouw-2.jpg', dark: true },
            { url: 'assets/images/natuur-2.jpg', dark: true },
            { url: 'assets/images/communie-1.jpg', dark: true },
            { url: 'assets/images/communie-2.jpg', dark: true },
            { url: 'assets/images/natuur-8.jpg', dark: true },
            { url: 'assets/images/natuur-9.jpg', dark: true },
            { url: 'assets/images/evenementen-5.jpg', dark: true },
            { url: 'assets/images/evenementen-8.jpg', dark: true }
        ];

        const randomHero = heroImages[Math.floor(Math.random() * heroImages.length)];
        heroBg.style.backgroundImage = `url('${randomHero.url}')`;
        if (randomHero.dark) {
            hero.classList.add('dark-text-overlay');
        }
    }

    // --- Mobile Menu Toggle ---
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const navItems = document.querySelectorAll('.nav-links li a');

    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navLinks.classList.toggle('active');
        });

        navItems.forEach(item => {
            item.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navLinks.classList.remove('active');
            });
        });
    }

    // --- Scroll Animations (Intersection Observer) ---
    const fadeInElements = document.querySelectorAll('.fade-in');
    if (fadeInElements.length > 0) {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: "0px 0px -50px 0px"
        };

        const appearanceObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        fadeInElements.forEach(el => {
            appearanceObserver.observe(el);
        });
    }

    // --- Contact Form Submission ---
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            submitBtn.disabled = true;
            submitBtn.textContent = 'Verzenden...';
            
            setTimeout(() => {
                alert('Bedankt voor uw bericht! Paul neemt zo snel mogelijk contact met u op.');
                contactForm.reset();
                submitBtn.disabled = false;
                submitBtn.textContent = originalText;
            }, 1500);
        });
    }

    // --- Header Scroll Effect ---
    const header = document.querySelector('header');
    if (header) {
        window.addEventListener('scroll', updateHeaderStyle);
        updateHeaderStyle(); // Set initial style correctly
    }

    // --- Copyright Year ---
    const yearElements = document.querySelectorAll('.current-year');
    const currentYear = new Date().getFullYear();
    yearElements.forEach(el => el.textContent = currentYear);

    // --- Lightbox Functionality ---
    const initLightbox = () => {
        const triggers = document.querySelectorAll('.lightbox-trigger');
        if (triggers.length === 0) return;

        let lightbox = document.querySelector('.lightbox');
        if (!lightbox) {
            lightbox = document.createElement('div');
            lightbox.className = 'lightbox';
            lightbox.innerHTML = `
                <div class="lightbox-content">
                    <span class="lightbox-close">&times;</span>
                    <img class="lightbox-img" src="" alt="Large view">
                </div>
            `;
            document.body.appendChild(lightbox);

            const lightboxClose = lightbox.querySelector('.lightbox-close');
            const closeLightbox = () => {
                lightbox.classList.remove('active');
                document.body.style.overflow = 'auto';
            };

            lightboxClose.addEventListener('click', closeLightbox);
            lightbox.addEventListener('click', (e) => {
                if (e.target === lightbox) closeLightbox();
            });

            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape') closeLightbox();
            });
        }

        const lightboxImg = lightbox.querySelector('.lightbox-img');

        triggers.forEach(trigger => {
            trigger.addEventListener('click', function() {
                const img = this.querySelector('img');
                if (img) {
                    lightboxImg.src = img.src;
                    document.querySelector('.lightbox').classList.add('active');
                    document.body.style.overflow = 'hidden';
                }
            });
        });
    };

    initLightbox();
});