// ==========================================
// 1. SCROLL REVEAL ANIMATION OVERSEER
// ==========================================
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

// Track all elements equipped with 'reveal-on-scroll' class
document.querySelectorAll('.reveal-on-scroll').forEach(el => observer.observe(el));


// ==========================================
// 2. PARALLAX & AMBIENT INTERACTION EFFECTS
// ==========================================
// Slow mesh background drift based on window scroll positioning
window.addEventListener('scroll', () => {
    const scrollPercent = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight);
    const move = scrollPercent * 30;
    const gradient = document.querySelector('.mesh-gradient');
    if (gradient) {
        gradient.style.transform = `translateY(${move}px) scale(1.05)`;
    }
});

// Smooth ambient cursor follow mechanism for the background canvas
window.addEventListener('mousemove', (e) => {
    const x = (e.clientX / window.innerWidth - 0.5) * 20;
    const y = (e.clientY / window.innerHeight - 0.5) * 20;
    const gradient = document.querySelector('.mesh-gradient');
    if (gradient) {
        gradient.style.left = `${x}px`;
        gradient.style.top = `${y}px`;
    }
});


// ==========================================
// 3. NAVIGATION CONTROL (MOBILE OVERLAY)
// ==========================================
const menuOpen = document.getElementById('mobile-menu-open');
const menuClose = document.getElementById('mobile-menu-close');
const menuOverlay = document.getElementById('mobile-menu-overlay');

const toggleMenu = () => {
    if (menuOverlay) {
        menuOverlay.classList.toggle('translate-x-full');
        document.body.classList.toggle('overflow-hidden');
    }
};

if (menuOpen) menuOpen.addEventListener('click', toggleMenu);
if (menuClose) menuClose.addEventListener('click', toggleMenu);

// Automatically close mobile layout if any navigation path is selected
if (menuOverlay) {
    menuOverlay.querySelectorAll('nav a').forEach(link => {
        link.addEventListener('click', toggleMenu);
    });
}


// ==========================================
// 4. PROJECT TAB CATEGORY SWITCHER
// ==========================================
function switchTab(tabType) {
    const personalContent = document.getElementById('tab-content-personal');
    const groupContent = document.getElementById('tab-content-group');
    const personalBtn = document.getElementById('tab-btn-personal');
    const groupBtn = document.getElementById('tab-btn-group');

    // Double-check components safety before running state manipulations
    if (!personalContent || !groupContent || !personalBtn || !groupBtn) return;

    if (tabType === 'personal') {
        // Bring Personal projects forward, shelter group projects
        personalContent.classList.remove('hidden');
        groupContent.classList.add('hidden');
        
        // Highlight Personal Tab, dim Group Tab layout styles
        personalBtn.className = "px-6 py-2 rounded-full font-bold text-sm border transition-all duration-300 bg-primary text-[#00363a] border-primary";
        groupBtn.className = "px-6 py-2 rounded-full font-bold text-sm border transition-all duration-300 bg-transparent text-on-surface-variant border-white/10 hover:border-white/30";
    } else {
        // Bring Group projects forward, shelter personal projects
        personalContent.classList.add('hidden');
        groupContent.classList.remove('hidden');
        
        // Highlight Group Tab, dim Personal Tab layout styles
        groupBtn.className = "px-6 py-2 rounded-full font-bold text-sm border transition-all duration-300 bg-primary text-[#00363a] border-primary";
        personalBtn.className = "px-6 py-2 rounded-full font-bold text-sm border transition-all duration-300 bg-transparent text-on-surface-variant border-white/10 hover:border-white/30";
    }
}
