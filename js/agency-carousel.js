document.addEventListener('DOMContentLoaded', () => {
    const carousel = document.querySelector('.carousel-inner');
    const cards = document.querySelectorAll('.card');
    
    let isDragging = false;
    let startPos = 0;
    let currentTranslate = 0;
    let prevTranslate = 0;
    let currentIndex = 0;

    // Ajouter les événements pour chaque carte
    cards.forEach((card, index) => {
        // Empêcher le drag de l'image
        card.addEventListener('dragstart', (e) => e.preventDefault());

        // Touch events
        card.addEventListener('touchstart', touchStart(index));
        card.addEventListener('touchend', touchEnd);
        card.addEventListener('touchmove', touchMove);

        // Mouse events
        card.addEventListener('mousedown', touchStart(index));
        card.addEventListener('mouseup', touchEnd);
        card.addEventListener('mousemove', touchMove);
        card.addEventListener('mouseleave', touchEnd);
    });

    function touchStart(index) {
        return function(event) {
            isDragging = true;
            currentIndex = index;
            startPos = getPositionX(event);
            carousel.style.cursor = 'grabbing';
        }
    }

    function touchMove(event) {
        if (isDragging) {
            const currentPosition = getPositionX(event);
            currentTranslate = prevTranslate + currentPosition - startPos;
            setSliderPosition();
        }
    }

    function touchEnd() {
        isDragging = false;
        carousel.style.cursor = 'grab';
        
        const movedBy = currentTranslate - prevTranslate;
        
        // Si déplacé suffisamment à droite ou à gauche, changer de carte
        if (Math.abs(movedBy) > 100) {
            if (movedBy > 0) {
                currentIndex -= 1;
            } else {
                currentIndex += 1;
            }
        }

        // Gérer le défilement infini
        if (currentIndex < 0) {
            currentIndex = cards.length - 1;
        }
        if (currentIndex > cards.length - 1) {
            currentIndex = 0;
        }

        setPositionByIndex();
        updateActiveCard();
    }

    function getPositionX(event) {
        return event.type.includes('mouse') ? event.pageX : event.touches[0].clientX;
    }

    function setSliderPosition() {
        carousel.style.transform = `translateX(${currentTranslate}px)`;
    }

    function setPositionByIndex() {
        const cardWidth = cards[0].offsetWidth + 32; // 32 est le gap (2rem)
        currentTranslate = currentIndex * -cardWidth;
        prevTranslate = currentTranslate;
        setSliderPosition();
    }

    function updateActiveCard() {
        cards.forEach((card, index) => {
            card.classList.toggle('active', index === currentIndex);
        });
    }

    // Initialiser la première carte comme active
    updateActiveCard();

    // Empêcher le menu contextuel sur le clic droit
    window.oncontextmenu = function(event) {
        event.preventDefault();
        event.stopPropagation();
        return false;
    }
}); 