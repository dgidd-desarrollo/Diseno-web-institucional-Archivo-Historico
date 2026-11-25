/**
 * SERIE - Gobierno de Tucumán
 * Efectos de UI (navbar)
 */

document.addEventListener('DOMContentLoaded', () => {
    initHeaderScroll();
    initMobileNavClose();
    initOpportunitiesSlider();
});

/**
 * Sombra extra en navbar al hacer scroll
 */
function initHeaderScroll() {
    const navbar = document.getElementById('mainNavbar');
    if (!navbar) return;

    window.addEventListener('scroll', () => {
        navbar.classList.toggle('navbar-scrolled', window.scrollY > 20);
    });
}

/**
 * Cierra el menú mobile al hacer click en un enlace
 */
function initMobileNavClose() {
    const navCollapse = document.getElementById('navbarNav');
    if (!navCollapse) return;

    navCollapse.querySelectorAll('.nav-link:not(.dropdown-toggle)').forEach(link => {
        link.addEventListener('click', () => {
            const collapse = bootstrap.Collapse.getInstance(navCollapse);
            if (collapse && navCollapse.classList.contains('show')) {
                collapse.hide();
            }
        });
    });
}

/**
 * Slider horizontal de Oportunidades Internacionales
 */
function initOpportunitiesSlider() {
    const slider = document.getElementById('opportunitiesSlider');
    const prevBtn = document.getElementById('opportunitiesPrev');
    const nextBtn = document.getElementById('opportunitiesNext');

    if (!slider || !prevBtn || !nextBtn) return;

    const AUTOPLAY_INTERVAL = 4500;
    let autoplayTimer = null;

    const getScrollAmount = () => {
        const card = slider.querySelector('.opportunity-card');
        if (!card) return slider.clientWidth;
        const gap = parseFloat(getComputedStyle(slider).gap) || 20;
        return card.offsetWidth + gap;
    };

    const getMaxScroll = () => slider.scrollWidth - slider.clientWidth;

    const scrollNext = (smooth = true) => {
        const maxScroll = getMaxScroll();
        const amount = getScrollAmount();

        if (maxScroll <= 0) return;

        if (slider.scrollLeft >= maxScroll - 2) {
            slider.scrollTo({ left: 0, behavior: smooth ? 'smooth' : 'auto' });
        } else {
            slider.scrollBy({ left: amount, behavior: smooth ? 'smooth' : 'auto' });
        }
    };

    const scrollPrev = (smooth = true) => {
        const maxScroll = getMaxScroll();
        const amount = getScrollAmount();

        if (maxScroll <= 0) return;

        if (slider.scrollLeft <= 2) {
            slider.scrollTo({ left: maxScroll, behavior: smooth ? 'smooth' : 'auto' });
        } else {
            slider.scrollBy({ left: -amount, behavior: smooth ? 'smooth' : 'auto' });
        }
    };

    const startAutoplay = () => {
        clearInterval(autoplayTimer);
        autoplayTimer = setInterval(() => scrollNext(true), AUTOPLAY_INTERVAL);
    };

    const stopAutoplay = () => {
        clearInterval(autoplayTimer);
    };

    const resetAutoplay = () => {
        stopAutoplay();
        startAutoplay();
    };

    prevBtn.addEventListener('click', () => {
        scrollPrev(true);
        resetAutoplay();
    });

    nextBtn.addEventListener('click', () => {
        scrollNext(true);
        resetAutoplay();
    });

    slider.addEventListener('mouseenter', stopAutoplay);
    slider.addEventListener('mouseleave', startAutoplay);
    slider.addEventListener('focusin', stopAutoplay);
    slider.addEventListener('focusout', startAutoplay);

    document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
            stopAutoplay();
        } else {
            startAutoplay();
        }
    });

    window.addEventListener('resize', resetAutoplay);

    startAutoplay();
}
