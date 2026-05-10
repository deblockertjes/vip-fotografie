document.addEventListener('DOMContentLoaded', () => {
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
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                header.style.padding = '10px 0';
                header.style.backgroundColor = 'rgba(255, 255, 255, 0.98)';
            } else {
                header.style.padding = '20px 0';
                header.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
            }
        });
    }

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