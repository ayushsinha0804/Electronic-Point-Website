document.addEventListener('DOMContentLoaded', () => {
    // Dark mode toggle
    const toggleSwitch = document.querySelector('.theme-switch input[type="checkbox"]');
    const currentTheme = localStorage.getItem('theme');

    if (currentTheme) {
        document.documentElement.setAttribute('data-theme', currentTheme);
        if (toggleSwitch && currentTheme === 'dark') toggleSwitch.checked = true;
    }

    if (toggleSwitch) {
        toggleSwitch.addEventListener('change', (e) => {
            if (e.target.checked) {
                document.documentElement.setAttribute('data-theme', 'dark');
                localStorage.setItem('theme', 'dark');
            } else {
                document.documentElement.setAttribute('data-theme', 'light');
                localStorage.setItem('theme', 'light');
            }
        });
    }

    // Scroll animations
    const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
                obs.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.fade-in, .team-card, .customer-card, .service-card, .hero-content').forEach(el => {
        observer.observe(el);
    });

    // Hamburger menu toggle
    const hamburger = document.getElementById('hamburger');
    const navRight = document.querySelector('.nav-right'); // class selector is safer if id missing

    if (hamburger && navRight) {
        hamburger.addEventListener('click', () => {
            const isOpen = navRight.classList.toggle('active');
            hamburger.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
        });

        // Close menu with Escape
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && navRight.classList.contains('active')) {
                navRight.classList.remove('active');
                hamburger.setAttribute('aria-expanded', 'false');
                hamburger.focus();
            }
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!navRight.contains(e.target) && !hamburger.contains(e.target) && navRight.classList.contains('active')) {
                navRight.classList.remove('active');
                hamburger.setAttribute('aria-expanded', 'false');
            }
        });
    }
});
