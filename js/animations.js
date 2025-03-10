const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('slide-in');
            entry.target.classList.remove('slide-out');
        } else {
            entry.target.classList.add('slide-out');
            entry.target.classList.remove('slide-in');
        }
    });
}, {
    threshold: 0.1 // L'animation se déclenche quand 10% de l'élément est visible
});

// Observer toutes les images
document.querySelectorAll('.verticale, .cube').forEach(img => {
    observer.observe(img);
}); 