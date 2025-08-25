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
    
    // Function to get 3 random images from a gallery
    function getRandomThumbnails(images, count = 3) {
        const shuffled = [...images].sort(() => 0.5 - Math.random());
        return shuffled.slice(0, Math.min(count, images.length));
    }
    
    // Initialize category thumbnails
    function initializeCategoryThumbnails() {
        const categoryImagesContainers = document.querySelectorAll('.category-images[data-gallery-type]');
        
        categoryImagesContainers.forEach(container => {
            const galleryType = container.dataset.galleryType;
            const gallery = galleries[galleryType];
            
            if (gallery && gallery.images.length > 0) {
                const randomImages = getRandomThumbnails(gallery.images);
                container.innerHTML = '';
                
                randomImages.forEach((imageSrc, index) => {
                    const img = document.createElement('img');
                    img.src = imageSrc;
                    img.alt = `${gallery.title} ${index + 1}`;
                    img.className = 'category-preview';
                    img.loading = 'lazy';
                    container.appendChild(img);
                });
            }
        });
    }
    
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
                'Standesamt/DSC03841.jpg', 'Standesamt/DSC03843-Bearbeitet.jpg',
                'Standesamt/DSC03849-Bearbeitet.jpg', 'Standesamt/DSC03854-Bearbeitet.jpg',
                'Standesamt/DSC03857-Bearbeitet-Bearbeitet.jpg', 'Standesamt/DSC03865-Bearbeitet.jpg',
                'Standesamt/DSC03868-Bearbeitet.jpg', 'Standesamt/DSC03870.jpg',
                'Standesamt/DSC03872.jpg', 'Standesamt/DSC03882.jpg',
                'Standesamt/DSC03889-Bearbeitet.jpg', 'Standesamt/DSC03900-Bearbeitet.jpg',
                'Standesamt/DSC03933-Bearbeitet.jpg', 'Standesamt/DSC03967.jpg',
                'Standesamt/DSC03975.jpg', 'Standesamt/DSC03983.jpg',
                'Standesamt/DSC04000-Bearbeitet.jpg', 'Standesamt/DSC04010.jpg',
                'Standesamt/DSC04034-Bearbeitet.jpg', 'Standesamt/DSC04050.jpg',
                'Standesamt/DSC04069.jpg', 'Standesamt/DSC04094.jpg',
                'Standesamt/DSC04101.jpg', 'Standesamt/DSC04135.jpg',
                'Standesamt/DSC04144.jpg', 'Standesamt/DSC04160.jpg',
                'Standesamt/DSC04175.jpg', 'Standesamt/DSC04192-Bearbeitet.jpg',
                'Standesamt/DSC04197-Bearbeitet.jpg', 'Standesamt/DSC04207-Bearbeitet.jpg'
            ]
        },
        hochzeitsfeier: {
            title: 'Hochzeitsfeier',
            images: [
                'Hochzeitsfeier/DSC04257.jpg', 'Hochzeitsfeier/DSC04289.jpg',
                'Hochzeitsfeier/DSC04298.jpg', 'Hochzeitsfeier/DSC04322-Bearbeitet.jpg',
                'Hochzeitsfeier/DSC04327.jpg', 'Hochzeitsfeier/DSC04328.jpg',
                'Hochzeitsfeier/DSC04330.jpg', 'Hochzeitsfeier/DSC04340.jpg',
                'Hochzeitsfeier/DSC04346.jpg', 'Hochzeitsfeier/DSC04349.jpg',
                'Hochzeitsfeier/DSC04362.jpg', 'Hochzeitsfeier/DSC04364.jpg',
                'Hochzeitsfeier/DSC04393.jpg', 'Hochzeitsfeier/DSC04405.jpg',
                'Hochzeitsfeier/DSC04408.jpg', 'Hochzeitsfeier/DSC04417.jpg',
                'Hochzeitsfeier/DSC04438.jpg', 'Hochzeitsfeier/DSC04457.jpg',
                'Hochzeitsfeier/DSC04476.jpg', 'Hochzeitsfeier/DSC04493.jpg',
                'Hochzeitsfeier/DSC04511.jpg', 'Hochzeitsfeier/DSC04520.jpg',
                'Hochzeitsfeier/DSC04523-Bearbeitet-Bearbeitet-Bearbeitet.jpg', 'Hochzeitsfeier/DSC04534-Bearbeitet.jpg'
            ]
        },
        'verena-artur': {
            title: 'Verena & Artur',
            images: [
                'V+A/07ef8768-a655-4921-a5f2-9fce66300fab.JPG', 'V+A/0b73417d-f3e1-450f-90ce-93c201f16f55.JPG',
                'V+A/25b4e922-97b6-4688-a3d8-b976014e3dbf.JPG', 'V+A/4c7e235c-6d1d-4411-b80c-010a601cfabf.JPG',
                'V+A/6c6ea6e7-2764-43e1-8508-7f00afdc14d6.JPG', 'V+A/929d618e-d2d8-4d90-af5f-3fd919e3f0e2.JPG',
                'V+A/9f480385-afbe-460f-b708-77406458bbce.JPG', 'V+A/DSC00326-2.jpg',
                'V+A/DSC00371.jpg', 'V+A/DSC00424.jpg', 'V+A/DSC00437.jpg', 'V+A/DSC00459.jpg',
                'V+A/DSC00755.jpg', 'V+A/DSC00933.jpg', 'V+A/DSC00983.jpg', 'V+A/DSC01189.jpg',
                'V+A/DSC01232.jpg', 'V+A/DSC01264.jpg', 'V+A/DSC01325.jpg', 'V+A/DSC01400.jpg',
                'V+A/DSC01951.jpg', 'V+A/DSC02139.jpg', 'V+A/DSC02218-2.jpg', 'V+A/DSC02262.jpg',
                'V+A/DSC02349.jpg', 'V+A/DSC02595.jpg', 'V+A/DSC02610.jpg', 'V+A/DSC03319.jpg',
                'V+A/DSC03408.jpg', 'V+A/IMG_0013.jpg', 'V+A/IMG_0101.jpg', 'V+A/IMG_0733.jpg',
                'V+A/IMG_0848.jpg', 'V+A/IMG_0862.jpg', 'V+A/IMG_1007.jpg', 'V+A/IMG_1575.jpg',
                'V+A/IMG_1616.jpg', 'V+A/IMG_20211219_132011.jpg', 'V+A/IMG_20220423_101524.jpg',
                'V+A/IMG_20220430_200740.jpg', 'V+A/IMG_20220501_195819.jpg', 'V+A/IMG_20220605_000735.jpg',
                'V+A/IMG_20220614_125951.jpg', 'V+A/IMG_20220701_200107.jpg', 'V+A/IMG_20220928_215832.jpg',
                'V+A/IMG_20230323_223513.jpg', 'V+A/IMG_20231026_195129.jpg', 'V+A/IMG_20240214_191424.jpg',
                'V+A/IMG_5342.jpg', 'V+A/IMG_6099.jpg', 'V+A/IMG_6489.jpg', 'V+A/IMG_6969.jpg',
                'V+A/IMG_7371.jpg', 'V+A/IMG_8456.jpg', 'V+A/IMG_9017.jpg', 'V+A/IMG_9047.jpg',
                'V+A/IMG_9397.jpg', 'V+A/IMG_9723.jpg', 'V+A/IMG_9727.jpg', 'V+A/PXL_20241005_165925167.jpg',
                'V+A/PXL_20241010_140738254.RAW-01.COVER.jpg', 'V+A/a5678323-048c-46fb-b5f4-02cca6dd16e5.JPG',
                'V+A/bdb2df81-d6f1-4ce9-845c-e1bebc09c239.JPG', 'V+A/bdc07418-e4e5-4c5d-a843-3b05803b6c25.JPG',
                'V+A/c14383ce-9772-4297-8e01-8eea7c65f26c.JPG', 'V+A/c43dab5e-df52-46f5-a8b0-f4f59fb6385e.JPG',
                'V+A/dbecf32b-1cc0-4076-a16f-54803ff467c7.JPG'
            ]
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
    
    // Initialize category thumbnails on page load
    initializeCategoryThumbnails();
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