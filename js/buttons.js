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

    buttonContainer.addEventListener('mousemove', (e) => {
        const rect = buttonContainer.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const buttonWidth = rect.width / 2;
        
        if (x > buttonWidth) {
            background.style.transform = 'translateX(100%)';
            buttons[1].classList.add('active');
            buttons[0].classList.remove('active');
        } else {
            background.style.transform = 'translateX(0)';
            buttons[0].classList.add('active');
            buttons[1].classList.remove('active');
        }
    });
});