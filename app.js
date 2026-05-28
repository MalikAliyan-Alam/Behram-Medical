// =====================================================================
// ALWAYS-ON BEHAVIOR (runs on every page — footer, menu, navbar scroll)
// =====================================================================

// Auto-update footer year
(function () {
    var yearEl = document.getElementById('footer-year');
    if (yearEl) yearEl.textContent = new Date().getFullYear();
})();

// Mobile menu toggle
const menuToggle = document.getElementById('menuToggle');
const closeMenu = document.getElementById('closeMenu');
const mobileMenuOverlay = document.getElementById('mobileMenuOverlay');

if (menuToggle && mobileMenuOverlay) {
    menuToggle.addEventListener('click', function() {
        mobileMenuOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
        menuToggle.setAttribute('aria-expanded', 'true');
    });
}

if (closeMenu && mobileMenuOverlay) {
    closeMenu.addEventListener('click', function() {
        mobileMenuOverlay.classList.remove('active');
        document.body.style.overflow = '';
        if (menuToggle) menuToggle.setAttribute('aria-expanded', 'false');
    });
}

// Close menu when clicking on a link
document.querySelectorAll('.mobile-nav-links a').forEach(link => {
    link.addEventListener('click', function() {
        if (mobileMenuOverlay) mobileMenuOverlay.classList.remove('active');
        document.body.style.overflow = '';
        if (menuToggle) menuToggle.setAttribute('aria-expanded', 'false');
    });
});

// Navbar scroll effect
window.addEventListener('scroll', function() {
    const navbar = document.getElementById('navbar');
    if (!navbar) return;
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// =====================================================================
// DEVELOPER CREDIT DROPDOWN (Esc closes, click-outside closes)
// Uses <details class="dev-credit"> so toggling is native + keyboard-accessible.
// =====================================================================
document.addEventListener('keydown', function(e) {
    if (e.key !== 'Escape') return;
    document.querySelectorAll('details.dev-credit[open]').forEach(el => {
        el.open = false;
        const summary = el.querySelector('summary');
        if (summary) summary.focus();
    });
});

document.addEventListener('click', function(e) {
    document.querySelectorAll('details.dev-credit[open]').forEach(el => {
        if (!el.contains(e.target)) el.open = false;
    });
});

// =====================================================================
// HOMEPAGE-ONLY BEHAVIOR (guarded — these libs are not loaded on other pages)
// =====================================================================

// GSAP ScrollTrigger pinning for mobile sections (homepage swiper only)
if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);

    let mm = gsap.matchMedia();
    mm.add("(max-width: 768px)", () => {
        if (!document.querySelector(".sections-swiper")) return;
        gsap.utils.toArray(".sections-swiper section").forEach((panel) => {
            ScrollTrigger.create({
                trigger: panel,
                start: "top top+=70px",
                pin: true,
                pinSpacing: false
            });
        });
    });
}

// Patient testimonials slider (requires Swiper lib + .patient-slider element)
document.addEventListener('DOMContentLoaded', function() {
    if (typeof Swiper === 'undefined') return;
    if (!document.querySelector('.patient-slider')) return;

    new Swiper('.patient-slider', {
        slidesPerView: 1,
        spaceBetween: 0,
        loop: true,
        speed: 800,
        effect: 'fade',
        fadeEffect: { crossFade: true },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        autoplay: {
            delay: 5000,
            disableOnInteraction: false,
        },
    });
});

// =====================================================================
// SELF-GUARDED ANIMATIONS (no-op on pages where the targets don't exist)
// =====================================================================

// Scroll-based horizontal animation for Doctor section heading (large screens only)
function initScrollAnimation() {
    const scrollAnimateH1 = document.querySelector('.scroll-animate-h1');
    if (!scrollAnimateH1) return;

    function handleScroll() {
        if (window.innerWidth <= 991) {
            scrollAnimateH1.style.transform = 'translateX(0)';
            return;
        }

        const doctorSection = document.querySelector('.doctor-section');
        if (!doctorSection) return;

        const rect = doctorSection.getBoundingClientRect();
        const windowHeight = window.innerHeight;

        if (rect.top < windowHeight && rect.bottom > 0) {
            const sectionHeight = rect.height;
            const visibleStart = windowHeight - rect.top;
            const scrollProgress = Math.min(Math.max(visibleStart / (windowHeight + sectionHeight), 0), 1);
            const translateX = scrollProgress * 400;
            scrollAnimateH1.style.transform = `translateX(${translateX}px)`;
        }
    }

    let ticking = false;
    window.addEventListener('scroll', function() {
        if (!ticking) {
            window.requestAnimationFrame(function() {
                handleScroll();
                ticking = false;
            });
            ticking = true;
        }
    });
    window.addEventListener('resize', handleScroll);
    handleScroll();
}
initScrollAnimation();

// Scroll-based rotation for circular text around patient image (large screens only)
function initCircularTextRotation() {
    const rotateTextHolders = document.querySelectorAll('.rotate-text-holder');
    if (rotateTextHolders.length === 0) return;

    let lastScrollY = window.scrollY;
    let currentRotation = 0;

    function handleScroll() {
        if (window.innerWidth <= 991) {
            rotateTextHolders.forEach(holder => {
                holder.style.transform = 'rotate(0deg)';
            });
            return;
        }

        const patientsSection = document.querySelector('.patients-section');
        if (!patientsSection) return;

        const rect = patientsSection.getBoundingClientRect();
        const windowHeight = window.innerHeight;

        if (rect.top < windowHeight && rect.bottom > 0) {
            const scrollDelta = window.scrollY - lastScrollY;
            currentRotation += scrollDelta * 0.3;
            rotateTextHolders.forEach(holder => {
                holder.style.transform = `rotate(${currentRotation}deg)`;
            });
        }

        lastScrollY = window.scrollY;
    }

    let ticking = false;
    window.addEventListener('scroll', function() {
        if (!ticking) {
            window.requestAnimationFrame(function() {
                handleScroll();
                ticking = false;
            });
            ticking = true;
        }
    });

    window.addEventListener('resize', function() {
        if (window.innerWidth <= 991) {
            rotateTextHolders.forEach(holder => {
                holder.style.transform = 'rotate(0deg)';
            });
        }
    });
}
initCircularTextRotation();
