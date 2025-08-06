document.addEventListener('DOMContentLoaded', () => {
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

    initCursor();
    initMagneticElements();
});