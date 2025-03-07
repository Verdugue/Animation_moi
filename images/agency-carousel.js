document.addEventListener('DOMContentLoaded', () => {
    const track = document.querySelector('.carousel-track');
    const cards = document.querySelectorAll('.carousel-card');
    const cardWidth = cards[0].offsetWidth + 30; // 30 est le gap
    
    let startX;
    let scrollLeft;
    let isDown = false;
    let currentIndex = 0;
    let autoScrollInterval;

    // Fonction pour mettre à jour la carte active
    function updateActiveCard() {
        const center = track.offsetWidth / 2;
        let closest = Infinity;
        let closestCard = null;
        let closestIndex = 0;

        cards.forEach((card, index) => {
            const rect = card.getBoundingClientRect();
            const distance = Math.abs(rect.left + (rect.width / 2) - center);
            
            if (distance < closest) {
                closest = distance;
                closestCard = card;
                closestIndex = index;
            }
            
            card.classList.remove('active');
        });

        if (closestCard) {
            closestCard.classList.add('active');
            currentIndex = closestIndex;
        }
    }

    // Gestionnaires d'événements pour le drag
    track.addEventListener('mousedown', (e) => {
        isDown = true;
        track.style.cursor = 'grabbing';
        startX = e.pageX - track.offsetLeft;
        scrollLeft = track.scrollLeft;
        stopAutoScroll();
    });

    track.addEventListener('mouseleave', () => {
        isDown = false;
        track.style.cursor = 'grab';
    });

    track.addEventListener('mouseup', () => {
        isDown = false;
        track.style.cursor = 'grab';
        snapToCard();
        startAutoScroll();
    });

    track.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - track.offsetLeft;
        const walk = (x - startX);
        track.scrollLeft = scrollLeft - walk;
        updateActiveCard();
    });

    // Fonction pour snapper à la carte la plus proche
    function snapToCard() {
        const scrollPosition = track.scrollLeft;
        const targetPosition = Math.round(scrollPosition / cardWidth) * cardWidth;
        
        track.scrollTo({
            left: targetPosition,
            behavior: 'smooth'
        });
        
        updateActiveCard();
    }

    // Défilement automatique
    function startAutoScroll() {
        autoScrollInterval = setInterval(() => {
            currentIndex = (currentIndex + 1) % cards.length;
            track.scrollTo({
                left: currentIndex * cardWidth,
                behavior: 'smooth'
            });
            updateActiveCard();
        }, 5000);
    }

    function stopAutoScroll() {
        clearInterval(autoScrollInterval);
    }

    // Initialisation
    updateActiveCard();
    startAutoScroll();

    // Gestion du défilement infini
    track.addEventListener('scroll', () => {
        if (track.scrollLeft === 0) {
            track.scrollLeft = track.scrollWidth / 2;
        } else if (track.scrollLeft >= track.scrollWidth - track.offsetWidth) {
            track.scrollLeft = track.scrollWidth / 2 - track.offsetWidth;
        }
        updateActiveCard();
    });
});