document.addEventListener('DOMContentLoaded', () => {
    const codeCard = document.getElementById('code-card');
    let hoverInterval;

    const style = document.createElement('style');
    style.textContent = `
        @keyframes depressedGlitch {
            0%, 100% { transform: translate(0); filter: none; }
            10% { transform: translate(-3px, 2px); filter: blur(1px) brightness(0.7); }
            20% { transform: translate(3px, -2px); filter: blur(1.5px) brightness(0.6); }
            30% { transform: translate(-2px, -2px); filter: blur(2px) brightness(0.5); }
            40% { transform: translate(2px, 2px); filter: blur(1px) brightness(0.4); }
            50% { transform: translate(-3px, -1px); filter: blur(2px) brightness(0.3); }
            60% { transform: translate(1px, 3px); filter: blur(1.5px) brightness(0.4); }
            70% { transform: translate(-2px, -3px); filter: blur(2px) brightness(0.5); }
            80% { transform: translate(3px, 1px); filter: blur(1px) brightness(0.6); }
            90% { transform: translate(-1px, -2px); filter: blur(1.5px) brightness(0.7); }
        }

        .void-text {
            position: absolute;
            color: var(--text-color);
            opacity: 0;
            pointer-events: none;
            transition: all 0.1s;
            text-shadow: 0 0 5px rgba(0,0,0,0.5);
        }
    `;
    document.head.appendChild(style);

    const voidWords = [
        'void', 'null', 'empty', '!hope', 'undefined', 'dark', '0x00',
        'despair', 'abyss', 'alone', 'forgotten', 'error', 'panic', 'anxiety',
        '404', 'darkness', 'glitch', 'lost', 'broken', 'corrupt'
    ];

    function spawnVoidText() {
        const text = document.createElement('div');
        text.className = 'void-text';
        text.textContent = voidWords[Math.floor(Math.random() * voidWords.length)];
        text.style.cssText = `
            left: ${Math.random() * 80 + 10}%;
            top: ${Math.random() * 80 + 10}%;
            opacity: 0;
            transform: translateY(0) rotate(${Math.random() * 40 - 20}deg);
            font-size: ${Math.random() * 10 + 10}px;
        `;
        
        codeCard.appendChild(text);
        requestAnimationFrame(() => {
            text.style.opacity = '0.6';
            text.style.transform = `translateY(-10px) rotate(${Math.random() * 40 - 20}deg)`;
        });

        setTimeout(() => {
            text.style.opacity = '0';
            text.style.transform = `translateY(10px) rotate(${Math.random() * 40 - 20}deg)`;
            setTimeout(() => text.remove(), 200);
        }, 700);
    }

    function startDepression() {
        const elements = codeCard.children;
        for (let el of elements) {
            el.style.animation = 'depressedGlitch 1s infinite';
        }
        
        codeCard.style.filter = 'brightness(0.6) contrast(1.2)';
        codeCard.style.boxShadow = 'inset 0 0 30px rgba(0, 0, 0, 0.7)';
        
        hoverInterval = setInterval(spawnVoidText, 150);
    }

    function endDepression() {
        const elements = codeCard.children;
        for (let el of elements) {
            el.style.animation = '';
        }

        codeCard.style.filter = '';
        codeCard.style.boxShadow = '';
        
        clearInterval(hoverInterval);
        
        const voidTexts = codeCard.querySelectorAll('.void-text');
        voidTexts.forEach(text => {
            text.style.opacity = '0';
            setTimeout(() => text.remove(), 200);
        });
    }

    Object.assign(codeCard.style, {
        position: 'relative',
        overflow: 'hidden',
        cursor: 'pointer',
        transition: 'filter 0.15s, box-shadow 0.15s'
    });

    codeCard.addEventListener('mouseenter', startDepression);
    codeCard.addEventListener('mouseleave', endDepression);
    codeCard.addEventListener('click', () => window.location.href = 'https://github.com/TheRasputin64/DataExtractor');
});