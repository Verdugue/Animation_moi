document.addEventListener('DOMContentLoaded', () => {
    const burgerToggle = document.getElementById('burger-toggle');
    const menu = document.querySelector('.menu');
    
    burgerToggle.addEventListener('change', () => {
        document.body.style.overflow = burgerToggle.checked ? 'hidden' : '';
    });
});