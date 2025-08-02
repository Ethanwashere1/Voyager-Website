document.addEventListener('DOMContentLoaded', () => {
    gsap.registerPlugin(ScrollTrigger, MotionPathPlugin, ScrollToPlugin);

    // --- INITIALIZATION ---
    initPageLoad();
    initCursor();
    initMagneticElements();
    initMobileMenu();
    
    initScrollBasedAnimations();
    init3DTiltCards();
    initParticles();
    initParticleScrollEffect();
    initFloatingElements();
    initInteractiveElements();
    initConfettiEffect();
    initGlitchEffects();
    initRandomAnimations();
    initBackgroundEffects();
    initFooterAnimations();
    initStarFieldEffect();
    initInteractiveBackgroundElements();

    // --- FUNCTIONS ---

    function initPageLoad() {
        const loader = document.querySelector('.loader');
        gsap.to(loader, { 
            opacity: 0, 
            duration: 1, 
            delay: 2, 
            onComplete: () => {
                loader.style.display = 'none';
                gsap.fromTo(".menu", 
                    { yPercent: -100, opacity: 0 }, 
                    { yPercent: 0, opacity: 1, duration: 1, ease: 'power3.out' }
                );
                initHeaderAnimation(); // Call header animation directly
            }
        });

        gsap.to('body', { duration: 0.5, opacity: 1, ease: 'power1.out', delay: 2.5 });
        // Ensure menu is initially off-screen
        gsap.set(".menu", { yPercent: -100, opacity: 0 });
        ScrollTrigger.create({
            start: 'top -80',
            end: 99999,
            toggleClass: { className: 'scrolled', targets: '.menu' }
        });

        // Animate logo and logo text on page load (after preloader)
        gsap.fromTo('.menu .left-image img', 
            { opacity: 0, scale: 0.5, rotation: -90 }, 
            { opacity: 1, scale: 1, rotation: 0, duration: 1, ease: 'elastic.out(1, 0.5)', delay: 3 } // Adjusted delay
        );
        gsap.fromTo('.logo-text', 
            { opacity: 0, x: -20 }, 
            { opacity: 1, x: 0, duration: 0.8, ease: 'power2.out', delay: 3.3 } // Adjusted delay
        );
    }

    function initCursor() {
        // Skip custom cursor on touch devices
        if (window.matchMedia("(pointer: coarse)").matches) return;
        const cursorDot = document.querySelector('.cursor-dot');
        const cursorOutline = document.querySelector('.cursor-outline');
        
        if (!cursorDot || !cursorOutline) return;
        
        gsap.set([cursorDot, cursorOutline], { xPercent: -50, yPercent: -50, opacity: 1 });
        
        window.addEventListener('mousemove', e => {
            gsap.to(cursorDot, { duration: 0.2, x: e.clientX, y: e.clientY });
            gsap.to(cursorOutline, { duration: 0.6, x: e.clientX, y: e.clientY, ease: 'power2.out' });
        });
        
        document.querySelectorAll('a:not(.home-link), button, .showcase-card').forEach(el => {
            el.addEventListener('mouseenter', () => document.body.classList.add('link-hovered'));
            el.addEventListener('mouseleave', () => document.body.classList.remove('link-hovered'));
        });

        // Prevent page reload if clicking on the current page's navigation link
        const currentPage = window.location.pathname.split('/').pop();

        document.querySelectorAll('.nav-link').forEach(link => {
            if (link.getAttribute('href') === currentPage) {
                link.classList.add('active'); // Ensure active class is set
                link.addEventListener('click', e => {
                    e.preventDefault(); // Prevent reload
                });
            } else {
                link.classList.remove('active'); // Ensure other links are not active
            }
        });

        // Prevent logo from reloading home page if already on home page
        const homeLink = document.querySelector('.home-link');
        if (homeLink && currentPage === 'index.html') {
            homeLink.addEventListener('click', e => {
                e.preventDefault();
            });
        }
    }

    function initMobileMenu() {
        const toggle = document.querySelector('.mobile-menu-toggle');
        const nav = document.querySelector('.main-nav');
        
        if (!toggle || !nav) return;
        
        // Close menu when clicking on navigation links
        const navLinks = nav.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                document.body.classList.remove('menu-open');
                toggle.setAttribute('aria-expanded', 'false');
            });
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            const isMenuOpen = document.body.classList.contains('menu-open');
            const clickedInsideMenu = nav.contains(e.target) || toggle.contains(e.target);
            
            if (isMenuOpen && !clickedInsideMenu) {
                document.body.classList.remove('menu-open');
                toggle.setAttribute('aria-expanded', 'false');
            }
        });
        
        // Prevent menu from closing when clicking inside nav
        nav.addEventListener('click', (e) => {
            e.stopPropagation();
        });
        
        toggle.addEventListener('click', (e) => {
            e.stopPropagation();
            const isMenuOpen = document.body.classList.toggle('menu-open');
            toggle.setAttribute('aria-expanded', isMenuOpen);
        });
        
        // Handle escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && document.body.classList.contains('menu-open')) {
                document.body.classList.remove('menu-open');
                toggle.setAttribute('aria-expanded', 'false');
            }
        });
        
        // Handle resize events to close mobile menu on desktop
        window.addEventListener('resize', () => {
            if (window.innerWidth > 900 && document.body.classList.contains('menu-open')) {
                document.body.classList.remove('menu-open');
                toggle.setAttribute('aria-expanded', 'false');
            }
        });
    }

    function initMagneticElements() {
        if (window.matchMedia("(pointer: coarse)").matches) return;
        
        document.querySelectorAll('[data-magnetic]').forEach(el => {
            el.addEventListener('mousemove', e => {
                const { left, top, width, height } = el.getBoundingClientRect();
                const x = e.clientX - left - width / 2;
                const y = e.clientY - top - height / 2;
                gsap.to(el, { x: x * 0.4, y: y * 0.6, duration: 0.8, ease: 'power3.out' });
            });
            
            el.addEventListener('mouseleave', () => {
                gsap.to(el, { x: 0, y: 0, duration: 0.8, ease: 'elastic.out(1, 0.5)' });
            });
            
            el.addEventListener('mouseenter', () => document.body.classList.add('magnetic-hover'));
            el.addEventListener('mouseleave', () => document.body.classList.remove('magnetic-hover'));
        });
    }
    
    function initScrollBasedAnimations() {
        gsap.utils.toArray('section').forEach(section => {
            gsap.from(section, { 
                opacity: 0, 
                y: 100, 
                rotationX: 90, 
                transformOrigin: "top center",
                duration: 1.8, 
                ease: 'elastic.out(1, 0.6)', 
                scrollTrigger: { 
                    trigger: section, 
                    start: 'top 80%', 
                    toggleActions: 'play none none reverse' 
                } 
            });
        });

        gsap.utils.toArray('[data-animate-scroll]').forEach(el => {
            gsap.fromTo(el, 
                { y: 100, opacity: 0, rotationX: 90, transformOrigin: "top center" }, 
                { 
                    y: 0, 
                    opacity: 1, 
                    rotationX: 0, 
                    duration: 1.8, 
                    ease: 'elastic.out(1, 0.6)', 
                    scrollTrigger: { 
                        trigger: el, 
                        start: 'top 85%', 
                        toggleActions: 'play none none reverse' 
                    } 
                }
            );
        });
        
        // Text reveal animations
        gsap.utils.toArray('[data-reveal-text]').forEach(el => {
            try {
                const text = new SplitType(el, { types: 'lines,words' });
                if (text.lines && text.lines.length > 0) {
                    gsap.from(text.words, { 
                        yPercent: 100, 
                        opacity: 0,
                        rotationZ: () => Math.random() * 30 - 15,
                        scale: 0.8,
                        duration: 0.8, 
                        ease: 'back.out(2)', 
                        stagger: 0.02, 
                        scrollTrigger: { 
                            trigger: el, 
                            start: 'top 85%' 
                        } 
                    });
                }
            } catch (error) {
                console.warn('Text reveal animation failed, using fallback');
                gsap.from(el, { 
                    y: 30, 
                    opacity: 0, 
                    duration: 0.8, 
                    ease: 'power3.out', 
                    scrollTrigger: { 
                        trigger: el, 
                        start: 'top 85%' 
                    } 
                });
            }
        });
    }
    
    function init3DTiltCards() {
        // Skip 3D effects on touch devices
        if (window.matchMedia("(pointer: coarse)").matches) return;
        
        document.querySelectorAll("[data-tilt]").forEach(card => {
            const maxTilt = 20; // Increased max tilt
            
            card.addEventListener('mousemove', e => {
                const { left, top, width, height } = card.getBoundingClientRect();
                const x = e.clientX - left;
                const y = e.clientY - top;
                const rotateY = gsap.utils.mapRange(0, width, -maxTilt, maxTilt, x);
                const rotateX = gsap.utils.mapRange(0, height, maxTilt, -maxTilt, y);
                
                gsap.to(card, { 
                    rotationX: rotateX, 
                    rotationY: rotateY, 
                    rotationZ: (rotateY + rotateX) / 5, // Add subtle Z-axis rotation
                    transformPerspective: 1500, // Increased perspective
                    duration: 0.6, // Faster response
                    ease: 'power3.out' 
                });
                
                // Change card color based on tilt
                const tiltXPercent = Math.abs(rotateX) / maxTilt;
                const tiltYPercent = Math.abs(rotateY) / maxTilt;
                const colorR = 255 * tiltXPercent;
                const colorG = 255 * tiltYPercent;
                const colorB = 255 * (1 - (tiltXPercent + tiltYPercent) / 2);
                card.style.borderColor = `rgb(${colorR}, ${colorG}, ${colorB})`;

                card.style.setProperty('--mouse-x', `${(x / width) * 100}%`);
                card.style.setProperty('--mouse-y', `${(y / height) * 100}%`);

                // Update gradient based on tilt
                const gradientAngle = (rotateY + maxTilt) / (2 * maxTilt) * 360; // Map tilt to 0-360 degrees
                const gradientPositionX = (x / width) * 100;
                const gradientPositionY = (y / height) * 100;
                card.style.setProperty('--gradient-angle', `${gradientAngle}deg`);
                card.style.setProperty('--gradient-position-x', `${gradientPositionX}%`);
                card.style.setProperty('--gradient-position-y', `${gradientPositionY}%`);

                // More pronounced glow effect
                gsap.to(card.querySelector('.card-glow'), { opacity: 0.5 + (tiltXPercent + tiltYPercent) / 4, duration: 0.2 });
            });
            
            card.addEventListener('mouseleave', () => {
                gsap.to(card, { 
                    rotationX: 0, 
                    rotationY: 0, 
                    rotationZ: 0,
                    duration: 1, 
                    ease: 'elastic.out(1, 0.5)' 
                });
                card.style.borderColor = 'transparent'; // Reset border color
                gsap.to(card.querySelector('.card-glow'), { opacity: 0, duration: 0.5 });
            });
        });
    }

    function initParticles() {
        if (typeof particlesJS === 'undefined') return;
        
        // Full page particles
        particlesJS("particles-js", {
            "particles": {
                "number": {
                    "value": window.innerWidth < 768 ? 60 : 120,
                    "density": {
                        "enable": true,
                        "value_area": 1000
                    }
                },
                "color": {
                    "value": "#ffffff"
                },
                "shape": {
                    "type": "circle"
                },
                "opacity": {
                    "value": 0.4,
                    "random": true,
                    "anim": {
                        "enable": true,
                        "speed": 0.5,
                        "opacity_min": 0.1
                    }
                },
                "size": {
                    "value": 2,
                    "random": true
                },
                "line_linked": {
                    "enable": false
                },
                "move": {
                    "enable": true,
                    "speed": 1,
                    "direction": "none",
                    "random": true,
                    "out_mode": "out"
                }
            },
            "interactivity": {
                "detect_on": "canvas",
                "events": {
                    "onhover": {
                        "enable": false
                    }
                }
            },
            "retina_detect": true
        });
        
        // Footer particles
        particlesJS("footer-particles", {
            "particles": {
                "number": {
                    "value": 30,
                    "density": {
                        "enable": true,
                        "value_area": 400
                    }
                },
                "color": {
                    "value": "#00ffff"
                },
                "opacity": {
                    "value": 0.3,
                    "random": true,
                    "anim": {
                        "enable": true,
                        "speed": 0.5,
                        "opacity_min": 0.1
                    }
                },
                "size": {
                    "value": 2,
                    "random": true
                },
                "move": {
                    "enable": true,
                    "speed": 0.8,
                    "direction": "none"
                }
            }
        });
    }
    
    function initParticleScrollEffect() {
        const particleConfig = { speed: 1 };
        let speedTween;

        ScrollTrigger.create({
            onUpdate: (self) => {
                const velocity = Math.abs(self.getVelocity() / 200); // Increased sensitivity
                const targetSpeed = gsap.utils.clamp(1, 15, 1 + velocity); // Increased max speed

                if (speedTween) speedTween.kill();

                speedTween = gsap.to(particleConfig, {
                    speed: targetSpeed,
                    duration: 0.1, // Faster response
                    onUpdate: () => {
                        if (window.pJSDom && window.pJSDom[0] && window.pJSDom[0].pJS) {
                            window.pJSDom[0].pJS.particles.move.speed = particleConfig.speed;
                        }
                    }
                });

                // Apply warp speed effect to background elements
                const warpFactor = gsap.utils.clamp(0, 1, velocity * 0.01); // More aggressive warp
                gsap.to('.aurora-background, .stars-bg, .twinkle-bg, .cosmic-web-effect, .background-dots, .cosmic-dust', { // Added more elements
                    yPercent: -self.progress * 100 * warpFactor, 
                    ease: 'none',
                    duration: 0.05 // Even smaller duration for responsiveness
                });

                clearTimeout(window.scrollTimeout);
                window.scrollTimeout = setTimeout(() => {
                    gsap.to(particleConfig, {
                        speed: 1,
                        duration: 2, // Smoother reset
                        ease: 'power2.out',
                        onUpdate: () => {
                            if (window.pJSDom && window.pJSDom[0] && window.pJSDom[0].pJS) {
                                window.pJSDom[0].pJS.particles.move.speed = particleConfig.speed;
                            }
                        }
                    });
                    // Reset background elements to their normal parallax position
                    gsap.to('.aurora-background, .stars-bg, .twinkle-bg, .cosmic-web-effect, .background-dots, .cosmic-dust', {
                        yPercent: 0, 
                        ease: 'power2.out',
                        duration: 2
                    });
                }, 150); // Slightly longer delay before reset
            }
        });
    }

    // NEW FUNCTIONS FOR ENHANCED INTERACTIVITY
    
    function initFloatingElements() {
        const floatingOrbs = document.querySelectorAll('.floating-orb');
        const floatingConstellations = document.querySelectorAll('.floating-constellation');

        floatingOrbs.forEach(orb => {
            gsap.to(orb, {
                x: () => Math.random() * 200 - 100, // -100 to 100
                y: () => Math.random() * 200 - 100,
                scale: () => 0.8 + Math.random() * 0.4, // 0.8 to 1.2
                rotation: () => Math.random() * 360,
                opacity: () => 0.05 + Math.random() * 0.1, // 0.05 to 0.15
                duration: () => 10 + Math.random() * 10,
                ease: "sine.inOut",
                repeat: -1,
                yoyo: true
            });
        });

        floatingConstellations.forEach(constellation => {
            gsap.to(constellation, {
                x: () => Math.random() * 300 - 150,
                y: () => Math.random() * 300 - 150,
                rotation: () => Math.random() * 360,
                opacity: () => 0.2 + Math.random() * 0.2, // 0.2 to 0.4
                duration: () => 15 + Math.random() * 15,
                ease: "power1.inOut",
                repeat: -1,
                yoyo: true
            });
        });
    }
    
    function initInteractiveElements() {
        // Mouse trail effect
        if (window.matchMedia("(pointer: fine)").matches) {
            const trail = [];
            const trailLength = 30; // Increased trail length
            
            for (let i = 0; i < trailLength; i++) {
                const dot = document.createElement('div');
                dot.style.cssText = `
                    position: fixed;
                    width: ${4 + i * 0.2}px; // Vary size
                    height: ${4 + i * 0.2}px;
                    background: var(--accent-color);
                    border-radius: 50%;
                    pointer-events: none;
                    z-index: 9998;
                    opacity: 0;
                    transition: opacity 0.3s;
                    filter: blur(${i * 0.1}px); // Add blur
                `;
                document.body.appendChild(dot);
                trail.push(dot);
            }
            
            let mouseX = 0, mouseY = 0;
            
            document.addEventListener('mousemove', (e) => {
                mouseX = e.clientX;
                mouseY = e.clientY;
            });
            
            function animateTrail() {
                let x = mouseX, y = mouseY;
                
                trail.forEach((dot, index) => {
                    const nextDot = trail[index + 1] || trail[0];
                    dot.style.left = x + 'px';
                    dot.style.top = y + 'px';
                    dot.style.opacity = (trailLength - index) / trailLength * 0.7; // More opaque
                    
                    x += (parseFloat(nextDot.style.left) - x) * 0.2; // Smoother follow
                    y += (parseFloat(nextDot.style.top) - y) * 0.2;
                });
                
                requestAnimationFrame(animateTrail);
            }
            
            animateTrail();
        }
        
        // Interactive card hover effects
        document.querySelectorAll('.team-member-card').forEach((card, index) => {
            card.addEventListener('mouseenter', () => {
                // Create ripple effect
                const ripple = document.createElement('div');
                ripple.style.cssText = `
                    position: absolute;
                    border-radius: 50%;
                    background: radial-gradient(circle, var(--accent-color) 0%, transparent 70%);
                    transform: scale(0);
                    animation: ripple 0.6s linear;
                    pointer-events: none;
                    width: 150px; // Larger ripple
                    height: 150px;
                    left: 50%;
                    top: 50%;
                    margin-left: -75px;
                    margin-top: -75px;
                    opacity: 0.8;
                `;
                
                card.appendChild(ripple);
                setTimeout(() => ripple.remove(), 600);

                // Add subtle card shake on hover
                gsap.to(card, { x: -5, y: -5, rotationZ: 1, duration: 0.1, yoyo: true, repeat: 1, ease: 'power1.inOut' });
            });

            card.addEventListener('mouseleave', () => {
                gsap.to(card, { x: 0, y: 0, rotationZ: 0, duration: 0.5, ease: 'elastic.out(1, 0.5)' });
            });
        });
        
        // Add ripple keyframes
        const style = document.createElement('style');
        style.textContent = `
            @keyframes ripple {
                to {
                    transform: scale(4);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }

    function initConfettiEffect() {
        document.querySelectorAll('.team-member-card').forEach(card => {
            card.addEventListener('click', (e) => {
                const rect = card.getBoundingClientRect();
                const x = rect.left + rect.width / 2;
                const y = rect.top + rect.height / 2;

                for (let i = 0; i < 80; i++) { // More confetti
                    const confetti = document.createElement('div');
                    confetti.style.cssText = `
                        position: fixed;
                        width: ${5 + Math.random() * 5}px; // Vary size
                        height: ${5 + Math.random() * 5}px;
                        background-color: ${Math.random() > 0.5 ? 'var(--accent-color)' : 'var(--secondary-accent)'};
                        border-radius: 50%;
                        pointer-events: none;
                        z-index: 9999;
                        left: ${x}px;
                        top: ${y}px;
                        opacity: 1;
                        transform: rotate(${Math.random() * 360}deg); // Initial random rotation
                    `;
                    document.body.appendChild(confetti);

                    gsap.to(confetti, {
                        x: x + (Math.random() - 0.5) * 300, // Wider spread
                        y: y + (Math.random() - 0.5) * 300,
                        scale: 0,
                        opacity: 0,
                        rotation: Math.random() * 720, // More rotation
                        duration: 1.5 + Math.random() * 1, // Longer duration
                        ease: 'power2.out',
                        onComplete: () => confetti.remove()
                    });
                }
            });
        });
    }
    
    function initGlitchEffects() {
        const glitchElements = document.querySelectorAll('.glitch-text, .glowing-text'); // Apply to more elements
        
        glitchElements.forEach(el => {
            // Random glitch trigger
            setInterval(() => {
                if (Math.random() > 0.7) { // Increased frequency
                    el.style.animation = 'none';
                    setTimeout(() => {
                        el.style.animation = '';
                    }, 80); // Longer glitch duration
                }
            }, 2000); // More frequent checks
        });
    }
    
    function createSparkles(container) {
        for (let i = 0; i < 12; i++) { // More sparkles
            const sparkle = document.createElement('div');
            sparkle.style.cssText = `
                position: absolute;
                width: ${3 + Math.random() * 3}px; // Vary size
                height: ${3 + Math.random() * 3}px;
                background: var(--accent-color);
                border-radius: 50%;
                pointer-events: none;
                z-index: 100;
                left: 50%;
                top: 20%;
                filter: blur(${Math.random() * 2}px); // Add blur
            `;
            
            container.appendChild(sparkle);
            
            gsap.to(sparkle, {
                x: (Math.random() - 0.5) * 80, // Wider spread
                y: (Math.random() - 0.5) * 80,
                scale: 0,
                opacity: 0,
                duration: 1.2, // Longer duration
                ease: 'power2.out',
                onComplete: () => sparkle.remove()
            });
        }
    }

    function initRandomAnimations() {
        // Animate section titles on scroll
        gsap.utils.toArray('.section-title').forEach(title => {
            gsap.fromTo(title, 
                { opacity: 0, y: 50, scale: 0.8, rotationZ: () => Math.random() * 20 - 10 }, 
                { 
                    opacity: 1, 
                    y: 0, 
                    scale: 1, 
                    rotationZ: 0, 
                    duration: 1.5, 
                    ease: 'elastic.out(1, 0.7)', 
                    scrollTrigger: { 
                        trigger: title, 
                        start: 'top 80%', 
                        toggleActions: 'play none none reverse' 
                    } 
                }
            );
        });

        // Animate team member cards on scroll
        gsap.utils.toArray('.team-member-card').forEach(card => {
            gsap.fromTo(card, 
                { opacity: 0, y: 100, rotationX: 90, scale: 0.8 }, 
                { 
                    opacity: 1, 
                    y: 0, 
                    rotationX: 0, 
                    scale: 1, 
                    duration: 1.8, 
                    ease: 'elastic.out(1, 0.6)', 
                    scrollTrigger: { 
                        trigger: card, 
                        start: 'top 85%', 
                        toggleActions: 'play none none reverse' 
                    } 
                }
            );
        });

        // Animate philosophy items on scroll
        gsap.utils.toArray('.philosophy-item').forEach(item => {
            gsap.fromTo(item, 
                { opacity: 0, y: 50, rotationY: 90 }, 
                { 
                    opacity: 1, 
                    y: 0, 
                    rotationY: 0, 
                    duration: 1.2, 
                    ease: 'power3.out', 
                    scrollTrigger: { 
                        trigger: item, 
                        start: 'top 85%', 
                        toggleActions: 'play none none reverse' 
                    } 
                }
            );
        });

        // Animate timeline items on scroll
        gsap.utils.toArray('.timeline-item').forEach(item => {
            gsap.fromTo(item, 
                { opacity: 0, x: item.classList.contains('even') ? 100 : -100 }, 
                { 
                    opacity: 1, 
                    x: 0, 
                    duration: 1.2, 
                    ease: 'power3.out', 
                    scrollTrigger: { 
                        trigger: item, 
                        start: 'top 85%', 
                        toggleActions: 'play none none reverse' 
                    } 
                }
            );
        });

        // Animate footer text and button
        gsap.fromTo('.footer-text', 
            { opacity: 0, y: 50, scale: 0.9 }, 
            { 
                opacity: 1, 
                y: 0, 
                scale: 1, 
                duration: 1.2, 
                ease: 'elastic.out(1, 0.6)', 
                scrollTrigger: { 
                    trigger: '.footer-text', 
                    start: 'top 90%', 
                    toggleActions: 'play none none reverse' 
                } 
            }
        );

        gsap.fromTo('.cta-button', 
            { opacity: 0, scale: 0.5, rotationZ: 360 }, 
            { 
                opacity: 1, 
                scale: 1, 
                rotationZ: 0, 
                duration: 1.5, 
                ease: 'elastic.out(1, 0.5)', 
                scrollTrigger: { 
                    trigger: '.cta-button', 
                    start: 'top 90%', 
                    toggleActions: 'play none none reverse' 
                } 
            }
        );
    }

    function initHeaderAnimation() {
        const titleElement = document.querySelector('.section-title');

        if (!titleElement) return;
        
        try {
            const title = new SplitType('.section-title', { types: 'chars' });
            if (title.chars && title.chars.length > 0) {
                gsap.from(title.chars, { 
                    yPercent: 100, 
                    opacity: 0, 
                    stagger: 0.05, 
                    duration: 1.5, 
                    ease: 'elastic.out(1.2, 0.5)', 
                    delay: 0.5, // Reduced delay for faster appearance
                    rotationZ: Math.random() * 20 - 10 // Slight random rotation
                });

                // Add hover effect to title characters
                title.chars.forEach(char => {
                    char.addEventListener('mouseenter', () => {
                        gsap.to(char, { y: -15, duration: 0.3, ease: 'back.out(4)' });
                    });
                    char.addEventListener('mouseleave', () => {
                        gsap.to(char, { y: 0, duration: 0.8, ease: 'elastic.out(1.2, 0.5)' });
                    });
                });
            }
        } catch (error) {
            console.warn('SplitType animation failed, using fallback');
            gsap.from(titleElement, { 
                y: 50, 
                opacity: 0, 
                duration: 1, 
                ease: 'power3.out', 
                delay: 1 
            });
        }
    }

    function initBackgroundEffects() {
        gsap.to('.background-dots', {
            opacity: 0.5,
            scale: 1.1,
            repeat: -1,
            yoyo: true,
            duration: 20,
            ease: "sine.inOut"
        });

        gsap.to('.background-overlay-effect', {
            opacity: 0.15,
            scale: 1.2,
            repeat: -1,
            yoyo: true,
            duration: 25,
            ease: "power1.inOut"
        });

        initCosmicWebEffect();
        initNebulaEffect();
        initGalaxyShimmer();
    }

    function initCosmicWebEffect() {
        const cosmicWeb = document.querySelector('.cosmic-web-effect');
        if (!cosmicWeb) return;

        document.body.addEventListener('mousemove', (e) => {
            const x = e.clientX / window.innerWidth;
            const y = e.clientY / window.innerHeight;
            gsap.to(cosmicWeb, {
                '--mouse-x': `${x * 100}%`,
                '--mouse-y': `${y * 100}%`,
                duration: 0.5,
                ease: 'power2.out'
            });
        });
    }

    function initNebulaEffect() {
        gsap.to('.nebula-effect', {
            backgroundPosition: '200px 200px',
            duration: 40,
            ease: 'none',
            repeat: -1,
            yoyo: true
        });
    }

    function initGalaxyShimmer() {
        gsap.to('.galaxy-shimmer', {
            backgroundSize: '40px 40px',
            duration: 10,
            ease: 'none',
            repeat: -1,
            yoyo: true
        });
    }

    function initFooterAnimations() {
        gsap.utils.toArray('.footer-constellation .constellation-dot').forEach(dot => {
            gsap.to(dot, {
                scale: 1.5,
                opacity: 1,
                repeat: -1,
                yoyo: true,
                duration: () => 1 + Math.random() * 2,
                ease: "sine.inOut",
                delay: () => Math.random() * 2
            });
        });

        gsap.utils.toArray('.footer-constellation .constellation-line').forEach(line => {
            gsap.fromTo(line, 
                { scaleX: 0, opacity: 0 }, 
                { 
                    scaleX: 1, 
                    opacity: 0.5, 
                    duration: 1.5, 
                    ease: 'power2.out', 
                    scrollTrigger: { 
                        trigger: line, 
                        start: 'top 90%', 
                        toggleActions: 'play none none reverse' 
                    } 
                }
            );
        });
    }

    function initStarFieldEffect() {
        const starField = document.querySelector('.star-field-effect');
        if (!starField) return;

        gsap.to(starField, {
            rotation: 360,
            duration: 120,
            ease: 'none',
            repeat: -1
        });
    }

    function initInteractiveBackgroundElements() {
        if (window.matchMedia("(pointer: coarse)").matches) return; // Skip on touch devices

        document.body.addEventListener('mousemove', (e) => {
            const xPos = (e.clientX / window.innerWidth) - 0.5; // -0.5 to 0.5
            const yPos = (e.clientY / window.innerHeight) - 0.5; // -0.5 to 0.5

            gsap.to('.aurora-background', { 
                x: xPos * 30, 
                y: yPos * 30, 
                duration: 1.5, 
                ease: 'power2.out' 
            });
            gsap.to('.stars-bg', { 
                x: xPos * 20, 
                y: yPos * 20, 
                duration: 1.5, 
                ease: 'power2.out' 
            });
            gsap.to('.twinkle-bg', { 
                x: xPos * 10, 
                y: yPos * 10, 
                duration: 1.5, 
                ease: 'power2.out' 
            });
            gsap.to('.background-dots', { 
                x: xPos * 5, 
                y: yPos * 5, 
                duration: 1.5, 
                ease: 'power2.out' 
            });
            gsap.to('.cosmic-dust', { 
                x: xPos * 25, 
                y: yPos * 25, 
                duration: 1.5, 
                ease: 'power2.out' 
            });
        });
    }

    // Refresh ScrollTrigger on window resize
    window.addEventListener('resize', () => {
        ScrollTrigger.refresh();
    });
});