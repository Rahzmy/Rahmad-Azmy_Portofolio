// Intersection Observer for Scroll Reveals
const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
        }
    });
}, observerOptions);

document.querySelectorAll('.reveal-on-scroll').forEach(el => observer.observe(el));

// Subtle parallax & interaction enhancements
document.querySelectorAll('.glass-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        card.style.setProperty('--mouse-x', `${x}px`);
        card.style.setProperty('--mouse-y', `${y}px`);
    });
});

// Slow mesh drift based on scroll
window.addEventListener('scroll', () => {
    const scrollPercent = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight);
    const move = scrollPercent * 30;
    document.querySelector('.mesh-gradient').style.transform = `translateY(${move}px) scale(1.05)`;
});

// Smooth cursor follow for background (very subtle)
window.addEventListener('mousemove', (e) => {
    const x = (e.clientX / window.innerWidth - 0.5) * 20;
    const y = (e.clientY / window.innerHeight - 0.5) * 20;
    const gradient = document.querySelector('.mesh-gradient');
    if (gradient) gradient.style.left = `${x}px`;
    if (gradient) gradient.style.top = `${y}px`;
});

const menuOpen = document.getElementById('mobile-menu-open');
const menuClose = document.getElementById('mobile-menu-close');
const menuOverlay = document.getElementById('mobile-menu-overlay');

const toggleMenu = () => {
    menuOverlay.classList.toggle('translate-x-full');
    document.body.classList.toggle('overflow-hidden');
};

menuOpen.addEventListener('click', toggleMenu);
menuClose.addEventListener('click', toggleMenu);

// Close menu when clicking a link
menuOverlay.querySelectorAll('nav a').forEach(link => {
    link.addEventListener('click', toggleMenu);
});
