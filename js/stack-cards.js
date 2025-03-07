document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.card');
    const transitionCard = document.querySelector('.transition-card');
    
    window.addEventListener('scroll', () => {
        cards.forEach((card) => {
            const rect = card.getBoundingClientRect();
            const scrollPercent = 1 - (rect.top / window.innerHeight);
            
            if (scrollPercent > 0 && scrollPercent < 1) {
                card.style.setProperty('--scroll', scrollPercent);
            }
        });

        // Gestion spéciale pour la carte de transition
        if (transitionCard) {
            const rect = transitionCard.getBoundingClientRect();
            const transitionPoint = window.innerHeight - rect.top;
            
            if (transitionPoint > 0) {
                const progress = Math.min(1, transitionPoint / window.innerHeight);
                const fadeContent = transitionCard.querySelector('.fade-content');
                
                // Appliquer l'effet de fondu
                fadeContent.style.opacity = 1 - progress;
                fadeContent.style.transform = `scale(${1 - (progress * 0.1)})`;
                
                // Ajouter la classe pour la transition
                if (progress > 0.5) {
                    transitionCard.classList.add('is-transitioning');
                } else {
                    transitionCard.classList.remove('is-transitioning');
                }
            }
        }
    });
}); 