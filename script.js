// JavaScript für Hochzeits-Website Fotogalerien

document.addEventListener('DOMContentLoaded', function() {
    // Smooth Scrolling für Navigation
    const navLinks = document.querySelectorAll('nav a[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Fotogalerie initialisieren
    initializeGalleries();
    
    // Lightbox initialisieren
    initializeLightbox();
});

function initializeGalleries() {
    // Beispielfotos für Demonstration (später durch echte Fotos ersetzen)
    const galleries = {
        'standesamt': [
            { src: 'Standesamt/foto1.jpg', alt: 'Standesamtliche Trauung 1', caption: 'Der große Moment' },
            { src: 'Standesamt/foto2.jpg', alt: 'Standesamtliche Trauung 2', caption: 'Ja, ich will!' },
            { src: 'Standesamt/foto3.jpg', alt: 'Standesamtliche Trauung 3', caption: 'Glückliche Gesichter' }
        ],
        'hochzeitsfeier': [
            { src: 'Hochzeitsfeier/foto1.jpg', alt: 'Hochzeitsfeier 1', caption: 'Die Feier beginnt' },
            { src: 'Hochzeitsfeier/foto2.jpg', alt: 'Hochzeitsfeier 2', caption: 'Erster Tanz' },
            { src: 'Hochzeitsfeier/foto3.jpg', alt: 'Hochzeitsfeier 3', caption: 'Ausgelassene Stimmung' }
        ],
        'va': [
            { src: 'V+A/foto1.jpg', alt: 'Veren und Artur 1', caption: 'Unser Glück' },
            { src: 'V+A/foto2.jpg', alt: 'Veren und Artur 2', caption: 'Für immer zusammen' },
            { src: 'V+A/foto3.jpg', alt: 'Veren und Artur 3', caption: 'Unsere Liebe' }
        ]
    };

    // Galerien in HTML einfügen
    Object.keys(galleries).forEach(galleryId => {
        const section = document.getElementById(galleryId);
        if (section) {
            const galleryContainer = document.createElement('div');
            galleryContainer.className = 'gallery';
            
            galleries[galleryId].forEach((photo, index) => {
                const galleryItem = createGalleryItem(photo, galleryId, index);
                galleryContainer.appendChild(galleryItem);
            });
            
            section.appendChild(galleryContainer);
        }
    });
}

function createGalleryItem(photo, galleryId, index) {
    const item = document.createElement('div');
    item.className = 'gallery-item';
    item.dataset.gallery = galleryId;
    item.dataset.index = index;
    
    item.innerHTML = `
        <img src="${photo.src}" alt="${photo.alt}" loading="lazy" 
             onerror="this.src='data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjI1MCIgdmlld0JveD0iMCAwIDMwMCAyNTAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIzMDAiIGhlaWdodD0iMjUwIiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik0xMjUgMTAwSDEyNVYxNTBIMTc1VjEwMEgxMjVaIiBmaWxsPSIjOUI5QkEzIi8+CjxwYXRoIGQ9Ik0xNTAgMTI1QzE1NiAxMjUgMTYwIDEyMSAxNjAgMTE1QzE2MCAxMDkgMTU2IDEwNSAxNTAgMTA1QzE0NCAxMDUgMTQwIDEwOSAxNDAgMTE1QzE0MCAxMjEgMTQ0IDEyNSAxNTAgMTI1WiIgZmlsbD0iIzlCOUJBMyIvPgo8L3N2Zz4K'">
        <div class="gallery-overlay">
            <p>${photo.caption}</p>
        </div>
    `;
    
    // Click-Event für Lightbox
    item.addEventListener('click', () => openLightbox(galleryId, index));
    
    return item;
}

function initializeLightbox() {
    // Lightbox HTML erstellen
    const lightbox = document.createElement('div');
    lightbox.className = 'lightbox';
    lightbox.id = 'lightbox';
    
    lightbox.innerHTML = `
        <span class="lightbox-close" onclick="closeLightbox()">&times;</span>
        <span class="lightbox-nav lightbox-prev" onclick="navigateLightbox(-1)">&#10094;</span>
        <img id="lightbox-img" src="" alt="">
        <span class="lightbox-nav lightbox-next" onclick="navigateLightbox(1)">&#10095;</span>
    `;
    
    document.body.appendChild(lightbox);
    
    // ESC-Taste zum Schließen
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeLightbox();
        } else if (e.key === 'ArrowLeft') {
            navigateLightbox(-1);
        } else if (e.key === 'ArrowRight') {
            navigateLightbox(1);
        }
    });
    
    // Click außerhalb des Bildes zum Schließen
    lightbox.addEventListener('click', function(e) {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });
}

let currentGallery = '';
let currentIndex = 0;
let currentPhotos = [];

function openLightbox(galleryId, index) {
    const galleries = {
        'standesamt': [
            { src: 'Standesamt/foto1.jpg', alt: 'Standesamtliche Trauung 1' },
            { src: 'Standesamt/foto2.jpg', alt: 'Standesamtliche Trauung 2' },
            { src: 'Standesamt/foto3.jpg', alt: 'Standesamtliche Trauung 3' }
        ],
        'hochzeitsfeier': [
            { src: 'Hochzeitsfeier/foto1.jpg', alt: 'Hochzeitsfeier 1' },
            { src: 'Hochzeitsfeier/foto2.jpg', alt: 'Hochzeitsfeier 2' },
            { src: 'Hochzeitsfeier/foto3.jpg', alt: 'Hochzeitsfeier 3' }
        ],
        'va': [
            { src: 'V+A/foto1.jpg', alt: 'Veren und Artur 1' },
            { src: 'V+A/foto2.jpg', alt: 'Veren und Artur 2' },
            { src: 'V+A/foto3.jpg', alt: 'Veren und Artur 3' }
        ]
    };
    
    currentGallery = galleryId;
    currentIndex = index;
    currentPhotos = galleries[galleryId];
    
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    
    lightboxImg.src = currentPhotos[currentIndex].src;
    lightboxImg.alt = currentPhotos[currentIndex].alt;
    
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeLightbox() {
    const lightbox = document.getElementById('lightbox');
    lightbox.classList.remove('active');
    document.body.style.overflow = 'auto';
}

function navigateLightbox(direction) {
    if (currentPhotos.length === 0) return;
    
    currentIndex += direction;
    
    if (currentIndex >= currentPhotos.length) {
        currentIndex = 0;
    } else if (currentIndex < 0) {
        currentIndex = currentPhotos.length - 1;
    }
    
    const lightboxImg = document.getElementById('lightbox-img');
    lightboxImg.src = currentPhotos[currentIndex].src;
    lightboxImg.alt = currentPhotos[currentIndex].alt;
}

// Lazy Loading für bessere Performance
function observeImages() {
    const images = document.querySelectorAll('img[loading="lazy"]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src || img.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        images.forEach(img => imageObserver.observe(img));
    }
}

// Foto-Upload Hilfsfunktion (für später)
function addPhotoToGallery(galleryId, photoFile, caption) {
    // Diese Funktion kann später erweitert werden, um neue Fotos hinzuzufügen
    console.log(`Foto zu ${galleryId} hinzufügen:`, photoFile.name, caption);
}

// Animation beim Scrollen
function animateOnScroll() {
    const sections = document.querySelectorAll('section');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });
    
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(section);
    });
}

// Initialisierung nach DOM-Load
document.addEventListener('DOMContentLoaded', function() {
    observeImages();
    animateOnScroll();
});

