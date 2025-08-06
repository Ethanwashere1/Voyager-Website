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
});
