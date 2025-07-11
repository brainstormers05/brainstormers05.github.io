document.addEventListener('DOMContentLoaded', function() {
    const menuBtn = document.querySelector('.mobile-menu-btn');
    const mobileMenu = document.querySelector('.mobile-menu');
    const closeBtn = document.querySelector('.close-btn');
    const pageTransition = document.querySelector('.page-transition');
    const navLinks = document.querySelectorAll('.nav-links a');

    // Toggle mobile menu with animation
    if (menuBtn && mobileMenu) {
        menuBtn.addEventListener('click', function() {
            mobileMenu.classList.add('active');
            document.body.style.overflow = 'hidden';
            menuBtn.style.opacity = '0';
            setTimeout(() => {
                menuBtn.style.display = 'none';
            }, 300);
        });
    }

    if (closeBtn && mobileMenu) {
        closeBtn.addEventListener('click', function() {
            mobileMenu.classList.remove('active');
            document.body.style.overflow = '';
            menuBtn.style.display = 'flex';
            setTimeout(() => {
                menuBtn.style.opacity = '1';
            }, 50);
        });
    }

    // SPA navigation only for header and mobile menu links with href starting with #
    function spaNavHandler(e) {
        const href = this.getAttribute('href');
        if (!href || !href.startsWith('#')) return;
        e.preventDefault();
        const targetId = href.substring(1);
        const target = document.getElementById(targetId);
        if (target) {
            // Show page transition with loading animation
            pageTransition.classList.add('active');
            // Close mobile menu if open
            if (mobileMenu.classList.contains('active')) {
                mobileMenu.classList.remove('active');
                document.body.style.overflow = '';
                menuBtn.style.display = 'flex';
                setTimeout(() => {
                    menuBtn.style.opacity = '1';
                }, 50);
            }
            // Scroll to target after transition
            setTimeout(() => {
                target.scrollIntoView({ behavior: 'smooth' });
                // Hide page transition
                setTimeout(() => {
                    pageTransition.classList.remove('active');
                }, 500);
            }, 500);
        }
    }
    // Attach SPA nav only to header and mobile menu nav links
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', spaNavHandler);
    });

    // Handle scroll events with smooth navbar transition
    let lastScroll = 0;
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        const currentScroll = window.scrollY;

        if (currentScroll > 50) {
            navbar.classList.add('scrolled');
            if (currentScroll > lastScroll) {
                navbar.style.transform = 'translateY(-100%)';
            } else {
                navbar.style.transform = 'translateY(0)';
            }
        } else {
            navbar.classList.remove('scrolled');
            navbar.style.transform = 'translateY(0)';
        }

        lastScroll = currentScroll;
    });

    // Prevent SPA navigation for external links in admissions section
    document.querySelectorAll('.admissions-section a[href^="http"]').forEach(link => {
        link.addEventListener('click', function(e) {
            // Let the browser handle the link normally
            e.stopPropagation();
        });
    });

    // Robust handler for Portal Login button
    const portalLoginBtn = document.getElementById('portal-login-btn');
    if (portalLoginBtn) {
        portalLoginBtn.addEventListener('click', function(e) {
            window.open('https://dev-brain-stormerss.pantheonsite.io//wp-login.php?redirect_to=https%3A%2F%2Fdev-brain-stormerss.pantheonsite.io%2Fwp-admin%2F&reauth=1', '_blank', 'noopener');
        });
    }
}); 