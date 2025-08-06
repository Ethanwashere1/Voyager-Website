document.addEventListener('DOMContentLoaded', () => {
    initMobileMenu();
    initMagneticElements();

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
                // Smooth scroll to section when clicking a nav link
                const targetId = link.getAttribute('href').substring(1);
                const targetElement = document.getElementById(targetId);
                if (targetElement) {
                    gsap.to(window, { duration: 1, scrollTo: { y: targetElement, offsetY: 70 }, ease: "power2.inOut" });
                }
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

    gsap.registerPlugin(ScrollTrigger, MotionPathPlugin, ScrollToPlugin);
    gsap.registerPlugin(ScrollTrigger, MotionPathPlugin, ScrollToPlugin);

    // Scroll to top on page reload
    window.onbeforeunload = function () {
        window.scrollTo(0, 0);
    };

    // --- INITIALIZATION --- 
    function initPageLoad() {
        const loader = document.querySelector('.loader');
        gsap.to(loader, { 
            opacity: 0, 
            duration: 1, 
            delay: 2, 
            onComplete: () => {
                loader.style.display = 'none';
                // Animate menu after loader is gone
                gsap.fromTo(".menu", 
                    { yPercent: -100, opacity: 0 }, 
                    { yPercent: 0, opacity: 1, duration: 1, ease: 'power3.out' }
                );
                initHeaderAnimation(); // Call header animation directly after menu animation
            }
        });

        // Ensure background elements are visible immediately
        gsap.set('.aurora-background, .parallax-layer, .cosmic-web-effect, .background-dots, .background-overlay-effect, .floating-elements, .shooting-stars', { opacity: 1 });

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

        // Removed: gsap.set('main .container > section', { opacity: 0, y: 50 });
    }

    initPageLoad();
    initScrollBasedAnimations();
    init3DTiltCards();
    initParticles();
    initParticleScrollEffect();
    initFloatingElements();
    initInteractiveElements();
    initGlitchEffects();
    initRandomAnimations();
    initBackgroundEffects();
    initFooterAnimations();
    initStarFieldEffect();
    initInteractiveBackgroundElements();
    initMeteorShower();
    initFactGenerator();

    function initHeaderAnimation() {
        const titleElement = document.querySelector('.about-header .main-title');
        const subtitleElement = document.querySelector('.about-header .subtitle');

        if (!titleElement || !subtitleElement) return;

        // Set initial states for other elements
        gsap.set(subtitleElement.querySelectorAll('.subtitle-line'), { opacity: 0 });

        try {
            // Dynamically create the text content
            const titleWords = titleElement.getAttribute('data-text').split(' ');
            titleElement.innerHTML = ''; // Clear existing content
            titleWords.forEach(word => {
                const span = document.createElement('span');
                span.className = 'title-word';
                span.textContent = word;
                titleElement.appendChild(span);
            });

            if (subtitleElement) {
                            if (subtitleElement) {
                subtitleElement.innerHTML = ''; // Clear existing content
                const line1 = document.createElement('span');
                line1.className = 'subtitle-line';
                line1.textContent = 'Our journey through the cosmos,';
                subtitleElement.appendChild(line1);

                const line2 = document.createElement('span');
                line2.className = 'subtitle-line';
                line2.textContent = 'driven by curiosity and discovery.';
                subtitleElement.appendChild(line2);

                gsap.set(subtitleElement.querySelectorAll('.subtitle-line'), { opacity: 0 });
            }
            }

            const title = new SplitType(titleElement, { types: 'words,chars' });
            gsap.set(titleElement, { opacity: 1 });

            const tl = gsap.timeline({ delay: 0.1 });

            if (title.chars && title.chars.length > 0) {
                tl.from(title.chars, {
                    yPercent: 120,
                    opacity: 0,
                    stagger: 0.04,
                    duration: 1.5,
                    ease: 'elastic.out(1.2, 0.5)',
                    rotationZ: () => Math.random() * 30 - 15,
                    scale: 0.7
                });

                title.chars.forEach(char => {
                    char.addEventListener('mouseenter', () => {
                        gsap.to(char, { y: -20, rotationZ: Math.random() * 40 - 20, scale: 1.2, duration: 0.4, ease: 'back.out(5)' });
                    });
                    char.addEventListener('mouseleave', () => {
                        gsap.to(char, { y: 0, rotationZ: 0, scale: 1, duration: 0.8, ease: 'elastic.out(1.2, 0.5)' });
                    });
                });
            }

            tl.fromTo(subtitleElement.querySelectorAll('.subtitle-line'), 
                { opacity: 0, y: 30, skewX: 10 },
                { opacity: 1, y: 0, skewX: 0, duration: 1, ease: 'power3.out', stagger: 0.2 },
                "-=1.0"
            );

        } catch (error) {
            console.warn('SplitType animation failed for main-title, using fallback');
            gsap.fromTo(titleElement, 
                { opacity: 0, y: 50 },
                { opacity: 1, y: 0, duration: 1, ease: 'power3.out', delay: 0.2 }
            );
        }

        gsap.to('.header-content', {
            yPercent: -20,
            scale: 1.05,
            ease: 'power1.inOut',
            scrollTrigger: {
                trigger: '.about-header',
                start: 'top top',
                end: 'bottom top',
                scrub: true
            }
        });
    }

    function initScrollBasedAnimations() {
        gsap.utils.toArray('[data-animate-scroll]').forEach(el => {
            gsap.fromTo(el, 
                { opacity: 0, y: 100, scale: 0.9, rotationX: -10 }, 
                { 
                    opacity: 1, 
                    y: 0, 
                    scale: 1, 
                    rotationX: 0, 
                    duration: 1.5, 
                    ease: 'elastic.out(1.1, 0.7)', 
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
        
        // Enhanced parallax for background layers
        gsap.to('.stars-bg', { 
            yPercent: -25, 
            ease: 'none', 
            scrollTrigger: { scrub: 1 } 
        });
        
        gsap.to('.twinkle-bg', { 
            yPercent: -35, 
            ease: 'none', 
            scrollTrigger: { scrub: 1 } 
        });

        // Add more elements to react to scroll
        gsap.to('.floating-elements', {
            yPercent: -10,
            ease: 'none',
            scrollTrigger: { scrub: 0.5 }
        });

        gsap.to('.shooting-stars', {
            xPercent: -50,
            ease: 'none',
            scrollTrigger: { scrub: 0.8 }
        });
    }

    function createSparkles(container) {
        for (let i = 0; i < 8; i++) {
            const sparkle = document.createElement('div');
            sparkle.style.cssText = `
                position: absolute;
                width: 4px;
                height: 4px;
                background: var(--accent-color);
                border-radius: 50%;
                pointer-events: none;
                z-index: 100;
                left: 50%;
                top: 20%;
            `;
            
            container.appendChild(sparkle);
            
            gsap.to(sparkle, {
                x: (Math.random() - 0.5) * 60,
                y: (Math.random() - 0.5) * 60,
                scale: 0,
                opacity: 0,
                duration: 1,
                ease: 'power2.out',
                onComplete: () => sparkle.remove()
            });
        }
    }

    function init3DTiltCards() {
        if (window.matchMedia("(pointer: coarse)").matches) return;
        
        document.querySelectorAll("[data-tilt]").forEach(card => {
            const maxTilt = 25; 
            
            card.addEventListener('mousemove', e => {
                const { left, top, width, height } = card.getBoundingClientRect();
                const x = e.clientX - left;
                const y = e.clientY - top;
                const rotateY = gsap.utils.mapRange(0, width, -maxTilt, maxTilt, x);
                const rotateX = gsap.utils.mapRange(0, height, maxTilt, -maxTilt, y);
                
                gsap.to(card, { 
                    rotationX: rotateX * 0.8, 
                    rotationY: rotateY * 0.8, 
                    rotationZ: (rotateY + rotateX) / 8, 
                    transformPerspective: 2000, 
                    duration: 0.8, 
                    ease: 'power4.out' 
                });
                
                const tiltXPercent = Math.abs(rotateX) / maxTilt;
                const tiltYPercent = Math.abs(rotateY) / maxTilt;
                const colorR = 100 + 155 * tiltXPercent;
                const colorG = 150 + 105 * tiltYPercent;
                const colorB = 255;
                card.style.borderColor = `rgb(${colorR}, ${colorG}, ${colorB})`;

                card.style.setProperty('--mouse-x', `${(x / width) * 100}%`);
                card.style.setProperty('--mouse-y', `${(y / height) * 100}%`);

                const gradientAngle = (rotateY + maxTilt) / (2 * maxTilt) * 360; 
                const gradientPositionX = (x / width) * 100;
                const gradientPositionY = (y / height) * 100;
                card.style.setProperty('--gradient-angle', `${gradientAngle}deg`);
                card.style.setProperty('--gradient-position-x', `${gradientPositionX}%`);
                card.style.setProperty('--gradient-position-y', `${gradientPositionY}%`);

                gsap.to(card.querySelector('.card-glow'), { opacity: 0.6 + (tiltXPercent + tiltYPercent) / 3, duration: 0.3 });
            });
            
            card.addEventListener('mouseleave', () => {
                gsap.to(card, { 
                    rotationX: 0, 
                    rotationY: 0, 
                    rotationZ: 0,
                    duration: 1.2, 
                    ease: 'elastic.out(1, 0.4)' 
                });
                card.style.borderColor = 'transparent'; 
                gsap.to(card.querySelector('.card-glow'), { opacity: 0, duration: 0.6 });
            });
        });
    }

    function initParticles() {
        if (typeof particlesJS === 'undefined') return;
        
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
                const velocity = Math.abs(self.getVelocity() / 200); 
                const targetSpeed = gsap.utils.clamp(1, 15, 1 + velocity); 

                if (speedTween) speedTween.kill();

                speedTween = gsap.to(particleConfig, {
                    speed: targetSpeed,
                    duration: 0.1, 
                    onUpdate: () => {
                        if (window.pJSDom && window.pJSDom[0] && window.pJSDom[0].pJS) {
                            window.pJSDom[0].pJS.particles.move.speed = particleConfig.speed;
                        }
                    }
                });

                const warpFactor = gsap.utils.clamp(0, 1, velocity * 0.008); 
                gsap.to('.aurora-background, .stars-bg, .twinkle-bg, .cosmic-web-effect, .background-dots', { 
                    yPercent: -self.progress * 100 * warpFactor, 
                    ease: 'none',
                    duration: 0.05 
                });

                clearTimeout(window.scrollTimeout);
                window.scrollTimeout = setTimeout(() => {
                    gsap.to(particleConfig, {
                        speed: 1,
                        duration: 2, 
                        ease: 'power2.out',
                        onUpdate: () => {
                            if (window.pJSDom && window.pJSDom[0] && window.pJSDom[0].pJS) {
                                window.pJSDom[0].pJS.particles.move.speed = particleConfig.speed;
                            }
                        }
                    });
                    gsap.to('.aurora-background, .stars-bg, .twinkle-bg, .cosmic-web-effect, .background-dots', {
                        yPercent: 0, 
                        ease: 'power2.out',
                        duration: 2
                    });
                }, 150); 
            }
        });
    }

    function initFloatingElements() {
        const floatingOrbs = document.querySelectorAll('.floating-orb');
        const floatingConstellations = document.querySelectorAll('.floating-constellation');

        floatingOrbs.forEach(orb => {
            gsap.to(orb, {
                x: () => Math.random() * 200 - 100, 
                y: () => Math.random() * 200 - 100,
                scale: () => 0.8 + Math.random() * 0.4, 
                rotation: () => Math.random() * 360,
                opacity: () => 0.05 + Math.random() * 0.1, 
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
                opacity: () => 0.2 + Math.random() * 0.2, 
                duration: () => 15 + Math.random() * 15,
                ease: "power1.inOut",
                repeat: -1,
                yoyo: true
            });
        });
    }
    
    function initInteractiveElements() {
        if (window.matchMedia("(pointer: fine)").matches) {
            const trail = [];
            const trailLength = 30; 
            
            for (let i = 0; i < trailLength; i++) {
                const dot = document.createElement('div');
                dot.style.cssText = `
                    position: fixed;
                    width: ${4 + i * 0.2}px; 
                    height: ${4 + i * 0.2}px;
                    background: var(--accent-color);
                    border-radius: 50%;
                    pointer-events: none;
                    z-index: 9998;
                    opacity: 0;
                    transition: opacity 0.3s;
                    filter: blur(${i * 0.1}px); 
                `;
                document.body.appendChild(dot);
                trail.push(dot);
            }
            
            let mouseX = 0, mouseY = 0;
            
            document.addEventListener('mousemove', e => {
                mouseX = e.clientX;
                mouseY = e.clientY;
            });
            
            function animateTrail() {
                let x = mouseX, y = mouseY;
                
                trail.forEach((dot, index) => {
                    const nextDot = trail[index + 1] || trail[0];
                    dot.style.left = x + 'px';
                    dot.style.top = y + 'px';
                    dot.style.opacity = (trailLength - index) / trailLength * 0.7; 
                    
                    x += (parseFloat(nextDot.style.left) - x) * 0.2; 
                    y += (parseFloat(nextDot.style.top) - y) * 0.2;
                });
                
                requestAnimationFrame(animateTrail);
            }
            
            animateTrail();
        }
        
        document.querySelectorAll('.enhanced-card').forEach((card, index) => {
            card.addEventListener('mouseenter', () => {
                const ripple = document.createElement('div');
                ripple.style.cssText = `
                    position: absolute;
                    border-radius: 50%;
                    background: radial-gradient(circle, var(--accent-color) 0%, transparent 70%);
                    transform: scale(0);
                    animation: ripple 0.6s linear;
                    pointer-events: none;
                    width: 150px; 
                    height: 150px;
                    left: 50%;
                    top: 50%;
                    margin-left: -75px;
                    margin-top: -75px;
                    opacity: 0.8;
                `;
                
                card.appendChild(ripple);
                setTimeout(() => ripple.remove(), 600);

                gsap.to(card, { x: -5, y: -5, rotationZ: 1, duration: 0.1, yoyo: true, repeat: 1, ease: 'power1.inOut' });
            });

            card.addEventListener('mouseleave', () => {
                gsap.to(card, { x: 0, y: 0, rotationZ: 0, duration: 0.5, ease: 'elastic.out(1, 0.5)' });
            });
        });
        
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

    
    function initGlitchEffects() {
        const glitchElements = document.querySelectorAll('.glitch-text');
        
        glitchElements.forEach(el => {
            setInterval(() => {
                if (Math.random() > 0.85) {
                    el.style.animation = 'none';
                    setTimeout(() => {
                        el.style.animation = '';
                    }, 50);
                }
            }, 3000);
        });
    }
    
    function initRandomAnimations() {
        gsap.utils.toArray('section:not(.globe-section)').forEach(section => {
            gsap.fromTo(section, 
                { opacity: 0, y: 100, scale: 0.9, rotationX: -10 }, 
                { 
                    opacity: 1, 
                    y: 0, 
                    scale: 1, 
                    rotationX: 0, 
                    duration: 1.5, 
                    ease: 'elastic.out(1.1, 0.7)', 
                    scrollTrigger: { 
                        trigger: section, 
                        start: 'top 85%', 
                        toggleActions: 'play none none reverse' 
                    } 
                }
            );
        });
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

        const cosmicWeb = document.querySelector('.cosmic-web-effect');
        if (cosmicWeb) initCosmicWebEffect();

        const nebulaEffect = document.querySelector('.nebula-effect');
        if (nebulaEffect) initNebulaEffect();

        const galaxyShimmer = document.querySelector('.galaxy-shimmer');
        if (galaxyShimmer) initGalaxyShimmer();
    }

    function initCosmicWebEffect() {
        const cosmicWeb = document.querySelector('.cosmic-web-effect');
        if (!cosmicWeb) return;

        document.body.addEventListener('mousemove', e => {
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
        const nebulaEffect = document.querySelector('.nebula-effect');
        if (!nebulaEffect) return;
        gsap.to(nebulaEffect, {
            backgroundPosition: '200px 200px',
            duration: 40,
            ease: 'none',
            repeat: -1,
            yoyo: true
        });
    }

    function initGalaxyShimmer() {
        const galaxyShimmer = document.querySelector('.galaxy-shimmer');
        if (!galaxyShimmer) return;
        gsap.to(galaxyShimmer, {
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
        if (window.matchMedia("(pointer: coarse)").matches) return; 

        document.body.addEventListener('mousemove', e => {
            const xPos = (e.clientX / window.innerWidth) - 0.5; 
            const yPos = (e.clientY / window.innerHeight) - 0.5; 

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
            
        });
    }

    function initMeteorShower() {
        const meteorContainer = document.querySelector('.meteor-shower');
        if (!meteorContainer) return;

        setInterval(() => {
            const meteor = document.createElement('div');
            meteor.classList.add('meteor');
            meteor.style.left = `${Math.random() * 150 - 25}vw`; 
            meteor.style.top = `${Math.random() * 150 - 25}vh`;
            meteor.style.width = `${Math.random() * 100 + 50}px`;
            meteor.style.animationDuration = `${Math.random() * 5 + 5}s`;
            meteorContainer.appendChild(meteor);

            setTimeout(() => {
                meteor.remove();
            }, 10000);
        }, 2000); 
    }

    

    function initFactGenerator() {
        const factDisplay = document.getElementById('cosmos-fact');
        const generateFactBtn = document.getElementById('generate-fact-btn');
        const cosmosFacts = [
            "A light-year is the distance light travels in one Earth year, which is about 9.46 trillion kilometers (5.88 trillion miles).",
            "The Sun is actually a yellow dwarf star, and it's just one of over 100 billion stars in our Milky Way galaxy.",
            "There are more stars in the universe than grains of sand on all the beaches on Earth.",
            "The largest known star, UY Scuti, is a hypergiant with a radius about 1,700 times larger than the Sun.",
            "Neutron stars are so dense that a single teaspoon of their material would weigh about 6 billion tons.",
            "The observable universe is estimated to be 93 billion light-years in diameter.",
            "Black holes are regions in spacetime where gravity is so strong that nothing, not even light, can escape.",
            "The Andromeda galaxy is on a collision course with the Milky Way, expected to merge in about 4.5 billion years.",
            "Mars is home to the tallest mountain in the solar system, Olympus Mons, a shield volcano about 2.5 times the height of Mount Everest.",
            "The temperature of the Sun's core is about 15 million degrees Celsius (27 million degrees Fahrenheit).",
            "Saturn's rings are made up of billions of small chunks of ice and rock, ranging in size from tiny dust particles to mountains.",
            "The Kuiper Belt is a region of the solar system beyond the planets, extending from the orbit of Neptune, consisting mainly of small bodies, or remnants from the solar system's formation.",
            "Exoplanets are planets that orbit stars outside of our solar system.",
            "The Big Bang theory is the leading scientific explanation for how the universe began.",
            "Dark matter and dark energy are thought to make up about 95% of the universe, but we can't directly observe them."
        ];

        if (generateFactBtn) {
            generateFactBtn.addEventListener('click', () => {
                const randomIndex = Math.floor(Math.random() * cosmosFacts.length);
                factDisplay.textContent = cosmosFacts[randomIndex];
                
                // Optional: Add a subtle animation to the fact display
                gsap.fromTo(factDisplay, 
                    { opacity: 0, y: 20 }, 
                    { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }
                );
            });
        }
    }

    // Refresh ScrollTrigger on window resize
    window.addEventListener('resize', () => {
        ScrollTrigger.refresh();
    });
});