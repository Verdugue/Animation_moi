document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.card');
    
    window.addEventListener('scroll', () => {
        cards.forEach((card) => {
            const rect = card.getBoundingClientRect();
            const scrollPercent = 1 - (rect.top / window.innerHeight);
            
            if (scrollPercent > 0 && scrollPercent < 1) {
                card.style.setProperty('--scroll', scrollPercent);
            }
        });
    });
});