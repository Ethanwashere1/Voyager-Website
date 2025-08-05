document.addEventListener('DOMContentLoaded', () => {
    gsap.registerPlugin(ScrollTrigger, MotionPathPlugin, ScrollToPlugin);

    // Scroll to top on page reload
    window.onbeforeunload = function () {
        window.scrollTo(0, 0);
    };

    // --- INITIALIZATION ---
    initPageLoad();
    initCursor();
    initMagneticElements();
    initMobileMenu();
    
    initScrollBasedAnimations();
    initResponsiveAnimations();
    init3DTiltCards();
    initMissionPathAnimation();
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
    initMeteorShower();

    // --- FUNCTIONS ---

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
        gsap.set('.aurora-background, .parallax-layer, .cosmic-web-effect, .background-dots, .background-overlay-effect, .cosmic-dust, .floating-elements, .shooting-stars', { opacity: 1 });

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

        // Initially hide all sections below the header
        gsap.set('main .container > section', { opacity: 0, y: 50 });
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
    
    function initHeaderAnimation() {
        const titleElement = document.querySelector('.main-title');
        const exploreBtn = document.getElementById('begin-exploration-btn');
        const statsSection = document.querySelector('.stats-section');

        if (!titleElement) return;

        // Set initial states for other elements
        gsap.set('.subtitle-line', { opacity: 0 });
        gsap.set('.scroll-down-indicator', { opacity: 0 });

        try {
            // Use a timeout to ensure all assets are loaded
            setTimeout(() => {
                // Dynamically create the text content
                const words = ["Embark", "on", "a", "Journey"];
                words.forEach(word => {
                    const span = document.createElement('span');
                    span.className = 'title-word';
                    span.textContent = word;
                    titleElement.appendChild(span);
                });

                const subtitleElement = document.querySelector('.subtitle');
                const subtitleLines = [
                    "Discover the cosmos, explore distant galaxies,",
                    "and unravel the mysteries of the universe with Voyager."
                ];
                subtitleLines.forEach(line => {
                    const span = document.createElement('span');
                    span.className = 'subtitle-line';
                    span.textContent = line;
                    subtitleElement.appendChild(span);
                });

                const exploreBtn = document.getElementById('begin-exploration-btn');
                const btnSpan = document.createElement('span');
                btnSpan.textContent = 'Begin Exploration';
                exploreBtn.appendChild(btnSpan);

                const title = new SplitType('.main-title', { types: 'words,chars' });
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

                tl.fromTo('.subtitle-line', 
                    { opacity: 0, y: 30, skewX: 10 },
                    { opacity: 1, y: 0, skewX: 0, duration: 1, ease: 'power3.out', stagger: 0.2 },
                    "-=1.0"
                );

                tl.fromTo(exploreBtn, 
                    { opacity: 0, scale: 0.5, y: 50 },
                    { opacity: 1, scale: 1, y: 0, duration: 1.5, ease: 'elastic.out(1, 0.5)', onComplete: () => {
                        gsap.to(exploreBtn, { scale: 1.1, duration: 0.2, yoyo: true, repeat: 1, ease: 'power2.inOut' });
                    } },
                    "-=0.8"
                );

                tl.fromTo('.scroll-down-indicator', 
                    { opacity: 0, y: 80 },
                    { opacity: 1, y: 0, duration: 1.5, ease: 'elastic.out(1, 0.5)' },
                    "-=1.0"
                );

            }, 100);

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
                trigger: '.home-header',
                start: 'top top',
                end: 'bottom top',
                scrub: true
            }
        });

        if (exploreBtn && statsSection) {
            exploreBtn.addEventListener('click', () => {
                gsap.to(window, {
                    duration: 1.5,
                    scrollTo: { y: statsSection, offsetY: 50 },
                    ease: 'power2.inOut'
                });
            });
        }
    }

    function initScrollBasedAnimations() {
        gsap.utils.toArray('[data-animate-scroll]').forEach(el => {
            gsap.fromTo(el, 
                { y: 120, opacity: 0, rotationX: 45, transformOrigin: "top center" }, 
                { 
                    y: 0, 
                    opacity: 1, 
                    rotationX: 0, 
                    duration: 2, 
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
        
        // Counter animations with cool effects
        gsap.utils.toArray('.stat-item').forEach((item, index) => {
            const numElement = item.querySelector('.stat-number');
            const labelElement = item.querySelector('.stat-label span');
            if (!numElement) return;
            
            const target = parseInt(numElement.dataset.target, 10) || 0;
            
            // Create a timeline for each counter
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: item,
                    start: 'top 85%',
                    toggleActions: 'play none none none'
                }
            });
            
            // Scale and color animation during counting
            tl.to(numElement, {
                scale: 1.3,
                color: 'var(--secondary-accent)',
                duration: 0.4,
                ease: 'power2.out'
            })
            .to(numElement, {
                innerText: target,
                duration: 2.5,
                snap: { innerText: 1 },
                ease: 'power3.out',
                onUpdate: function() {
                    // Add pulsing effect during counting
                    if (Math.random() > 0.6) { // Increased frequency
                        gsap.to(numElement, {
                            scale: 1.35,
                            duration: 0.1,
                            yoyo: true,
                            repeat: 1,
                            ease: 'power2.inOut'
                        });
                    }
                }
            }, 0.4) // Start counting slightly after scale
            .to(numElement, {
                scale: 1,
                color: 'var(--accent-color)',
                duration: 0.6,
                ease: 'elastic.out(1, 0.5)'
            }, 2.5); // End scale/color after counting
            
            // Animate stat label
            if (labelElement) {
                tl.fromTo(labelElement, 
                    { y: 30, opacity: 0, skewY: 10 }, 
                    { y: 0, opacity: 1, skewY: 0, duration: 1, ease: 'power2.out' }, 
                    '-=1.8' // Start label animation slightly before number finishes
                );
            }

            // Add sparkle effect when counting finishes
            tl.call(() => {
                createSparkles(item);
            }, null, 2.8); // Adjusted delay
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

    function initMissionPathAnimation() {
        const ship = document.getElementById('ship');
        const path = document.getElementById('mission-path-svg');
        
        if (!ship || !path) {
            console.warn("Ship or path element not found for mission path animation.");
            return;
        }
        
        console.log("Ship and path found. Initializing motion path animation.");

        gsap.to(ship, {
            motionPath: {
                path: path,
                align: path,
                alignOrigin: [0.5, 0.5],
                autoRotate: true,
                start: 0,
                end: 1
            },
            duration: 8, // Increased duration for smoother, more deliberate animation
            ease: 'power1.inOut',
            scrollTrigger: {
                trigger: '.mission-path-section',
                start: 'top center',
                end: 'bottom center',
                scrub: 2, // Increased scrub for more control and dynamic feel
                onUpdate: self => {
                    // Add more pronounced visual feedback during scrub
                    gsap.to(ship, { scale: 1 + Math.abs(self.getVelocity() / 800), duration: 0.1 });
                    createShipTrail(ship);
                }
            }
        });

        // Animate path stars along the path with more variation
        gsap.utils.toArray('.path-star').forEach((star, i) => {
            gsap.to(star, {
                motionPath: {
                    path: path,
                    align: path,
                    alignOrigin: [0.5, 0.5],
                    autoRotate: false,
                    start: i * 0.15, // Stagger start positions more closely
                    end: 1 + (i * 0.15) // Ensure they complete the path
                },
                duration: 10 + (i * 3), // Vary duration more significantly
                repeat: -1,
                ease: 'none',
                delay: i * 0.7, // Stagger delays more
                yoyo: true // Make stars move back and forth slightly
            });
        });

        // Add pulsating glow to the path
        gsap.to('#mission-path-svg', {
            attr: { 'stroke-width': 5 },
            opacity: 0.8,
            repeat: -1,
            yoyo: true,
            duration: 2,
            ease: 'sine.inOut'
        });
    }

    function createShipTrail(shipElement) {
        const trailElement = document.createElement('div');
        trailElement.className = 'ship-trail-particle';
        document.body.appendChild(trailElement);

        const shipRect = shipElement.getBoundingClientRect();
        const shipX = shipRect.left + shipRect.width / 2;
        const shipY = shipRect.top + shipRect.height / 2;

        gsap.set(trailElement, {
            x: shipX,
            y: shipY,
            scale: 0.5,
            opacity: 0.8,
            backgroundColor: 'var(--secondary-accent)',
            borderRadius: '50%',
            pointerEvents: 'none',
            zIndex: 2
        });

        gsap.to(trailElement, {
            scale: 0,
            opacity: 0,
            duration: 0.8,
            ease: 'power1.out',
            onComplete: () => trailElement.remove()
        });
    }
    
    function init3DTiltCards() {
        // Skip 3D effects on touch devices
        if (window.matchMedia("(pointer: coarse)").matches) return;
        
        document.querySelectorAll("[data-tilt]").forEach(card => {
            const maxTilt = 25; // Increased max tilt
            
            card.addEventListener('mousemove', e => {
                const { left, top, width, height } = card.getBoundingClientRect();
                const x = e.clientX - left;
                const y = e.clientY - top;
                const rotateY = gsap.utils.mapRange(0, width, -maxTilt, maxTilt, x);
                const rotateX = gsap.utils.mapRange(0, height, maxTilt, -maxTilt, y);
                
                gsap.to(card, { 
                    rotationX: rotateX * 0.8, 
                    rotationY: rotateY * 0.8, 
                    rotationZ: (rotateY + rotateX) / 8, // Add subtle Z-axis rotation
                    transformPerspective: 2000, // Increased perspective
                    duration: 0.8, // Faster response
                    ease: 'power4.out' 
                });
                
                // Change card color based on tilt
                const tiltXPercent = Math.abs(rotateX) / maxTilt;
                const tiltYPercent = Math.abs(rotateY) / maxTilt;
                const colorR = 100 + 155 * tiltXPercent;
                const colorG = 150 + 105 * tiltYPercent;
                const colorB = 255;
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
                card.style.borderColor = 'transparent'; // Reset border color
                gsap.to(card.querySelector('.card-glow'), { opacity: 0, duration: 0.6 });
            });
        });
    }

    function initResponsiveAnimations() {
        // Clear any existing ScrollTriggers for this function
        ScrollTrigger.getAll().forEach(trigger => {
            if (trigger.vars && trigger.vars.id === 'horizontal-scroll') {
                trigger.kill();
            }
        });
        
        ScrollTrigger.matchMedia({
            "(min-width: 769px)": function() {
                const track = document.querySelector('.scroll-track');
                if (!track) return;
                
                const horizontalScroll = gsap.to(track, { 
                    xPercent: -66.67, // Only scroll 2/3 to show 3 panels properly
                    ease: "none", 
                    scrollTrigger: { 
                        id: 'horizontal-scroll',
                        trigger: ".horizontal-scroll-section", 
                        start: "top top", 
                        end: "bottom top", 
                        pin: true, 
                        scrub: 1, 
                        snap: 1, /* Snap to the start/end of the section */
                        invalidateOnRefresh: true 
                    } 
                });
                
                gsap.utils.toArray('.panel-image-container img').forEach(img => {
                    gsap.to(img, { 
                        xPercent: -10, 
                        ease: 'none', 
                        scrollTrigger: { 
                            trigger: '.horizontal-scroll-section', 
                            containerAnimation: horizontalScroll, 
                            start: 'left right', 
                            end: 'right left', 
                            scrub: true 
                        } 
                    });
                });
            },
            
            "(max-width: 768px)": function() {
                // Reset any transforms that might be applied
                gsap.set('.scroll-track', { xPercent: 0, clearProps: "transform" });
                
                gsap.utils.toArray('.h-scroll-panel').forEach((panel, index) => {
                    gsap.from(panel, { 
                        opacity: 0, 
                        y: 50, 
                        duration: 1, 
                        ease: 'power3.out',
                        scrollTrigger: { 
                            trigger: panel, 
                            start: 'top 85%',
                            end: 'bottom 15%',
                            toggleActions: 'play none none reverse'
                        } 
                    });
                });
            }
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
                const warpFactor = gsap.utils.clamp(0, 1, velocity * 0.008); // Adjusted warp factor
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
        document.querySelectorAll('.showcase-card').forEach((card, index) => {
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
        document.querySelectorAll('.showcase-card').forEach(card => {
            card.addEventListener('click', (e) => {
                const rect = card.getBoundingClientRect();
                const x = rect.left + rect.width / 2;
                const y = rect.top + rect.height / 2;

                for (let i = 0; i < 50; i++) {
                    const confetti = document.createElement('div');
                    confetti.style.cssText = `
                        position: fixed;
                        width: 8px;
                        height: 8px;
                        background-color: ${Math.random() > 0.5 ? 'var(--accent-color)' : 'var(--secondary-accent)'};
                        border-radius: 50%;
                        pointer-events: none;
                        z-index: 9999;
                        left: ${x}px;
                        top: ${y}px;
                        opacity: 1;
                    `;
                    document.body.appendChild(confetti);

                    gsap.to(confetti, {
                        x: x + (Math.random() - 0.5) * 200,
                        y: y + (Math.random() - 0.5) * 200,
                        scale: 0,
                        opacity: 0,
                        duration: 1 + Math.random() * 0.5,
                        ease: 'power1.out',
                        onComplete: () => confetti.remove()
                    });
                }
            });
        });
    }
    
    function initGlitchEffects() {
        const glitchElements = document.querySelectorAll('.glitch-text');
        
        glitchElements.forEach(el => {
            // Random glitch trigger
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

    function createShipTrail(shipElement) {
        const trailElement = document.createElement('div');
        trailElement.className = 'ship-trail-particle';
        document.body.appendChild(trailElement);

        const shipRect = shipElement.getBoundingClientRect();
        const shipX = shipRect.left + shipRect.width / 2;
        const shipY = shipRect.top + shipRect.height / 2;

        gsap.set(trailElement, {
            x: shipX,
            y: shipY,
            scale: 0.5,
            opacity: 0.8,
            backgroundColor: 'var(--secondary-accent)',
            borderRadius: '50%',
            pointerEvents: 'none',
            zIndex: 2
        });

        gsap.to(trailElement, {
            scale: 0,
            opacity: 0,
            duration: 0.8,
            ease: 'power1.out',
            onComplete: () => trailElement.remove()
        });
    }

    function initRandomAnimations() {
        // Universal scroll-in animation for all sections
        gsap.utils.toArray('section').forEach(section => {
            gsap.fromTo(section, 
                { opacity: 0, y: 100, scale: 0.9, rotationX: -10 }, 
                { 
                    opacity: 1, 
                    y: 0, 
                    scale: 1, 
                    rotationX: 0, 
                    duration: 1.5, 
                    ease: 'elastic.out(1, 0.7)', 
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

    function initMeteorShower() {
        const meteorContainer = document.querySelector('.meteor-shower');
        if (!meteorContainer) return;

        setInterval(() => {
            const meteor = document.createElement('div');
            meteor.classList.add('meteor');
            meteor.style.left = `${Math.random() * 150 - 25}vw`; // Start off-screen
            meteor.style.top = `${Math.random() * 150 - 25}vh`;
            meteor.style.width = `${Math.random() * 100 + 50}px`;
            meteor.style.animationDuration = `${Math.random() * 5 + 5}s`;
            meteorContainer.appendChild(meteor);

            setTimeout(() => {
                meteor.remove();
            }, 10000);
        }, 2000); // Create a new meteor every 2 seconds
    }

    // Refresh ScrollTrigger on window resize
    window.addEventListener('resize', () => {
        ScrollTrigger.refresh();
    });
});
