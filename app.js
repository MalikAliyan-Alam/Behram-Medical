gsap.registerPlugin(ScrollTrigger);

let mm = gsap.matchMedia();

mm.add("(max-width: 768px)", () => {

    gsap.utils.toArray("section").forEach((panel, i) => {
        ScrollTrigger.create({
            trigger: panel,
            start: "top top+=70px",
            pin: true,
            pinSpacing: false
        });
    });

});


// Initialize Patient Slider - Like Rise Dental Studio
document.addEventListener('DOMContentLoaded', function() {
    // Patient Testimonials Slider
    const patientSlider = new Swiper('.patient-slider', {
        slidesPerView: 1,
        spaceBetween: 0,
        loop: true,
        speed: 800,
        effect: 'fade',
        fadeEffect: {
            crossFade: true
        },
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

// Navbar scroll effect
window.addEventListener('scroll', function() {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Mobile menu toggle
const menuToggle = document.getElementById('menuToggle');
const closeMenu = document.getElementById('closeMenu');
const mobileMenuOverlay = document.getElementById('mobileMenuOverlay');

if (menuToggle) {
    menuToggle.addEventListener('click', function() {
        mobileMenuOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    });
}

if (closeMenu) {
    closeMenu.addEventListener('click', function() {
        mobileMenuOverlay.classList.remove('active');
        document.body.style.overflow = '';
    });
}

// Close menu when clicking on a link
const mobileNavLinks = document.querySelectorAll('.mobile-nav-links a');
mobileNavLinks.forEach(link => {
    link.addEventListener('click', function() {
        mobileMenuOverlay.classList.remove('active');
        document.body.style.overflow = '';
    });
});

// Scroll-based horizontal animation for Doctor section heading (large screens only)
function initScrollAnimation() {
    const scrollAnimateH1 = document.querySelector('.scroll-animate-h1');
    if (!scrollAnimateH1) return;

    // Only apply on screens larger than 991px
    function handleScroll() {
        if (window.innerWidth <= 991) {
            scrollAnimateH1.style.transform = 'translateX(0)';
            return;
        }

        const doctorSection = document.querySelector('.doctor-section');
        if (!doctorSection) return;

        const rect = doctorSection.getBoundingClientRect();
        const windowHeight = window.innerHeight;

        // Check if section is in viewport
        if (rect.top < windowHeight && rect.bottom > 0) {
            // Calculate scroll progress within the section
            const sectionHeight = rect.height;
            const visibleStart = windowHeight - rect.top;
            const scrollProgress = Math.min(Math.max(visibleStart / (windowHeight + sectionHeight), 0), 1);

            // Animate from 0px to +400px (move right on scroll down, back to position on scroll up)
            const translateX = scrollProgress * 400;
            scrollAnimateH1.style.transform = `translateX(${translateX}px)`;
        }
    }

    // Throttle scroll event for performance
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

    // Also handle on resize
    window.addEventListener('resize', handleScroll);

    // Initial call
    handleScroll();
}

// Initialize scroll animation
initScrollAnimation();

// Scroll-based rotation for circular text around patient image (large screens only)
function initCircularTextRotation() {
    const rotateTextHolders = document.querySelectorAll('.rotate-text-holder');
    if (rotateTextHolders.length === 0) return;

    let lastScrollY = window.scrollY;
    let currentRotation = 0;

    function handleScroll() {
        // Only apply on screens larger than 991px
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

        // Check if section is in viewport
        if (rect.top < windowHeight && rect.bottom > 0) {
            const scrollDelta = window.scrollY - lastScrollY;

            // Rotate based on scroll direction: scroll down = rotate right, scroll up = rotate left
            currentRotation += scrollDelta * 0.3;

            rotateTextHolders.forEach(holder => {
                holder.style.transform = `rotate(${currentRotation}deg)`;
            });
        }

        lastScrollY = window.scrollY;
    }

    // Throttle scroll event for performance
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

    // Handle resize
    window.addEventListener('resize', function() {
        if (window.innerWidth <= 991) {
            rotateTextHolders.forEach(holder => {
                holder.style.transform = 'rotate(0deg)';
            });
        }
    });
}

// Initialize circular text rotation
initCircularTextRotation();
