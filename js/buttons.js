document.addEventListener('DOMContentLoaded', () => {
    const buttonContainer = document.querySelector('.button-container');
    const buttons = document.querySelectorAll('.btn');
    const background = document.querySelector('.button-background');

    buttons.forEach(button => {
        button.addEventListener('click', () => {
            buttons.forEach(b => b.classList.remove('active'));
            button.classList.add('active');
            
            if (button.dataset.type === 'vendeur') {
                background.style.transform = 'translateX(100%)';
            } else {
                background.style.transform = 'translateX(0)';
            }
        });
    });
});