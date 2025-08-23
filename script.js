// Navigation und Seitenwechsel
document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('.section');
    const playBtn = document.getElementById('playBtn');
    
    // Navigation zwischen Sektionen
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Aktive Klasse von allen Links entfernen
            navLinks.forEach(l => l.classList.remove('active'));
            // Aktive Klasse zum geklickten Link hinzufügen
            this.classList.add('active');
            
            // Alle Sektionen verstecken
            sections.forEach(section => section.classList.remove('active'));
            
            // Ziel-Sektion anzeigen
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            if (targetSection) {
                targetSection.classList.add('active');
            }
        });
    });
    
    // Music Player Funktionalität
    const audioPlayer = document.getElementById('audioPlayer');
    if (playBtn && audioPlayer) {
        let isPlaying = false;
        
        // Audio-Metadaten laden
        audioPlayer.addEventListener('loadedmetadata', function() {
            const totalTimeSpan = document.querySelector('.total-time');
            if (totalTimeSpan) {
                totalTimeSpan.textContent = formatTime(audioPlayer.duration);
            }
        });
        
        // Play/Pause Button
        playBtn.addEventListener('click', function() {
            if (isPlaying) {
                audioPlayer.pause();
                isPlaying = false;
                // Pause-Icon zu Play-Icon ändern
                this.innerHTML = `
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <path d="M8 5v14l11-7z" fill="currentColor"/>
                    </svg>
                `;
            } else {
                audioPlayer.play();
                isPlaying = true;
                // Play-Icon zu Pause-Icon ändern
                this.innerHTML = `
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" fill="currentColor"/>
                    </svg>
                `;
            }
        });
        
        // Progress Bar Update
        audioPlayer.addEventListener('timeupdate', function() {
            const progressFill = document.querySelector('.progress-fill');
            const currentTimeSpan = document.querySelector('.current-time');
            
            if (progressFill && currentTimeSpan) {
                const progress = (audioPlayer.currentTime / audioPlayer.duration) * 100;
                progressFill.style.width = progress + '%';
                
                // Show circle indicator when there is progress
                if (progress > 0) {
                    progressFill.classList.add('has-progress');
                } else {
                    progressFill.classList.remove('has-progress');
                }
                
                currentTimeSpan.textContent = formatTime(audioPlayer.currentTime);
            }
        });
        
        // Song beendet
        audioPlayer.addEventListener('ended', function() {
            isPlaying = false;
            playBtn.innerHTML = `
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M8 5v14l11-7z" fill="currentColor"/>
                </svg>
            `;
            const progressFill = document.querySelector('.progress-fill');
            if (progressFill) {
                progressFill.style.width = '0%';
                progressFill.classList.remove('has-progress');
            }
        });
        
        // Progress Bar klickbar machen
        const progressBar = document.querySelector('.progress-bar');
        if (progressBar) {
            progressBar.addEventListener('click', function(e) {
                const rect = progressBar.getBoundingClientRect();
                const clickX = e.clientX - rect.left;
                const percentage = clickX / rect.width;
                audioPlayer.currentTime = percentage * audioPlayer.duration;
            });
        }
    }
    
    
    function formatTime(seconds) {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = Math.round(seconds % 60);
        return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
    }
    
    // Smooth Scroll für bessere UX
    function smoothScroll() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }
    
    // Bei Sektionswechsel nach oben scrollen
    navLinks.forEach(link => {
        link.addEventListener('click', smoothScroll);
    });
    
    // Hover-Effekte für Bilder
    const imageCards = document.querySelectorAll('.image-card');
    imageCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Gallery System
    const galleryCategories = document.querySelector('.gallery-categories');
    const galleryView = document.getElementById('galleryView');
    const galleryTitle = document.getElementById('galleryTitle');
    const galleryGrid = document.getElementById('galleryGrid');
    const backToCategories = document.getElementById('backToCategories');
    const lightbox = document.getElementById('lightbox');
    const lightboxImage = document.getElementById('lightboxImage');
    const lightboxClose = document.getElementById('lightboxClose');
    const lightboxPrev = document.getElementById('lightboxPrev');
    const lightboxNext = document.getElementById('lightboxNext');
    const lightboxCounter = document.getElementById('lightboxCounter');
    
    let currentGallery = [];
    let currentImageIndex = 0;
    
    // Gallery data
    const galleries = {
        standesamt: {
            title: 'Standesamt',
            images: [
                'Standesamt/DSC03673.jpg', 'Standesamt/DSC03681-Bearbeitet.jpg', 
                'Standesamt/DSC03687-Bearbeitet.jpg', 'Standesamt/DSC03709.jpg',
                'Standesamt/DSC03717.jpg', 'Standesamt/DSC03721-Bearbeitet-Bearbeitet.jpg',
                'Standesamt/DSC03722-Bearbeitet.jpg', 'Standesamt/DSC03724-Bearbeitet.jpg',
                'Standesamt/DSC03732-Bearbeitet.jpg', 'Standesamt/DSC03736-Bearbeitet.jpg',
                'Standesamt/DSC03760-Bearbeitet.jpg', 'Standesamt/DSC03764-Bearbeitet.jpg',
                'Standesamt/DSC03768-Bearbeitet.jpg', 'Standesamt/DSC03774-Bearbeitet.jpg',
                'Standesamt/DSC03783.jpg', 'Standesamt/DSC03804-Bearbeitet.jpg',
                'Standesamt/DSC03806.jpg', 'Standesamt/DSC03820-Bearbeitet.jpg',
                'Standesamt/DSC03823.jpg', 'Standesamt/DSC03836.jpg',
                'Standesamt/DSC03841.jpg', 'Standesamt/DSC03843-Bearbeitet.jpg'
            ]
        },
        hochzeitsfeier: {
            title: 'Hochzeitsfeier',
            images: ['foto1.jpg', 'foto2.jpg', 'foto3.jpg'] // Placeholder - add real images
        },
        paarfotos: {
            title: 'Paarfotos',
            images: ['foto1.jpg', 'foto2.jpg', 'foto3.jpg'] // Placeholder - add real images
        }
    };
    
    // Category card clicks
    const categoryCards = document.querySelectorAll('.category-card');
    categoryCards.forEach(card => {
        card.addEventListener('click', function() {
            const galleryType = this.dataset.gallery;
            openGallery(galleryType);
        });
    });
    
    // Back to categories
    if (backToCategories) {
        backToCategories.addEventListener('click', function() {
            galleryView.classList.remove('active');
            galleryCategories.style.display = 'grid';
        });
    }
    
    function openGallery(type) {
        const gallery = galleries[type];
        if (!gallery) return;
        
        currentGallery = gallery.images;
        galleryTitle.textContent = gallery.title;
        galleryGrid.innerHTML = '';
        
        // Create image grid
        gallery.images.forEach((imageSrc, index) => {
            const imageDiv = document.createElement('div');
            imageDiv.className = 'gallery-item';
            imageDiv.innerHTML = `<img src="${imageSrc}" alt="${gallery.title} ${index + 1}" loading="lazy">`;
            imageDiv.addEventListener('click', () => openLightbox(index));
            galleryGrid.appendChild(imageDiv);
        });
        
        // Show gallery view
        galleryCategories.style.display = 'none';
        galleryView.classList.add('active');
    }
    
    function openLightbox(index) {
        currentImageIndex = index;
        updateLightboxImage();
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
    
    function closeLightbox() {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
    }
    
    function updateLightboxImage() {
        if (currentGallery.length === 0) return;
        
        lightboxImage.src = currentGallery[currentImageIndex];
        lightboxCounter.textContent = `${currentImageIndex + 1} / ${currentGallery.length}`;
    }
    
    function nextImage() {
        currentImageIndex = (currentImageIndex + 1) % currentGallery.length;
        updateLightboxImage();
    }
    
    function prevImage() {
        currentImageIndex = (currentImageIndex - 1 + currentGallery.length) % currentGallery.length;
        updateLightboxImage();
    }
    
    // Lightbox controls
    if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
    if (lightboxNext) lightboxNext.addEventListener('click', nextImage);
    if (lightboxPrev) lightboxPrev.addEventListener('click', prevImage);
    
    // Close lightbox on background click
    lightbox.addEventListener('click', function(e) {
        if (e.target === lightbox) closeLightbox();
    });
    
    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (!lightbox.classList.contains('active')) return;
        
        switch(e.key) {
            case 'Escape':
                closeLightbox();
                break;
            case 'ArrowRight':
                nextImage();
                break;
            case 'ArrowLeft':
                prevImage();
                break;
        }
    });
    
    // Umfrage Vote Bars Animation beim Laden der Umfrage-Sektion
    function animateVoteBars() {
        const voteBars = document.querySelectorAll('.vote-left, .vote-right');
        voteBars.forEach((bar, index) => {
            setTimeout(() => {
                bar.style.opacity = '1';
                bar.style.transform = 'scaleX(1)';
            }, index * 200);
        });
    }
    
    // Vote Bars animieren wenn Umfrage-Sektion aktiv wird
    const umfrageLink = document.querySelector('a[href="#umfrage"]');
    if (umfrageLink) {
        umfrageLink.addEventListener('click', () => {
            setTimeout(animateVoteBars, 300);
        });
    }
    
    // Avatar Hover-Effekte
    const verenavatar = document.getElementById('verenavatar');
    const arturavatar = document.getElementById('arturavatar');
    
    if (arturavatar) {
        arturavatar.addEventListener('mouseenter', function() {
            this.src = 'Faultier2.jpg';
        });
        arturavatar.addEventListener('mouseleave', function() {
            this.src = 'Faultier.jpg';
        });
    }
    
    if (verenavatar) {
        verenavatar.addEventListener('mouseenter', function() {
            this.src = 'Panda2.jpg';
        });
        verenavatar.addEventListener('mouseleave', function() {
            this.src = 'Panda.jpg';
        });
    }
    
    // Intersection Observer für scroll-basierte Animationen
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    // Elemente für Animation beobachten
    const animateElements = document.querySelectorAll('.image-card, .category-card, .music-player, .survey-questions');
    animateElements.forEach(el => {
        observer.observe(el);
    });
});

// Responsive Navigation Toggle (falls erweitert werden soll)
function toggleMobileNav() {
    const nav = document.querySelector('.navigation');
    nav.classList.toggle('mobile-open');
}

// Utility: Debounce-Funktion für Performance
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Resize-Handler mit Debounce
const handleResize = debounce(() => {
    // Responsive Anpassungen bei Bedarf
    const isMobile = window.innerWidth <= 768;
    document.body.classList.toggle('mobile', isMobile);
}, 250);

window.addEventListener('resize', handleResize);

// Initial Setup
handleResize();