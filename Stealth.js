document.addEventListener('DOMContentLoaded', () => {
    const stealthCard = document.getElementById('stealth-card'),
        canvas = document.createElement('canvas'),
        ctx = canvas.getContext('2d');
    const asciiArt = ['🖼️', '🔐', '📂', '🕵️', '🖤', '🧩', '🔒', '🌐', '💾', '🔍', '🌈', '🚀', '🧠', '🛡️', '01', '10', '11', '00', '101', '111', '010', 'DATA', 'CODE', 'HIDE', 'MASK', 'LOCK', 'BYTE', 'WAVE', 'SEED', 'CORE', 'NODE', 'LINK', 'SYNC'];
    canvas.style.position = 'absolute'; canvas.style.top = '0'; canvas.style.left = '0'; canvas.style.width = '100%'; canvas.style.height = '100%'; canvas.style.zIndex = '0'; canvas.style.pointerEvents = 'none'; canvas.style.opacity = '0.8';
    stealthCard.style.position = 'relative'; stealthCard.style.overflow = 'hidden'; stealthCard.style.cursor = 'pointer'; stealthCard.appendChild(canvas);
    let isHovering = false, animationFrame = null;
    const resizeCanvas = () => { canvas.width = stealthCard.clientWidth; canvas.height = stealthCard.clientHeight; };

    class MatrixRain {
        constructor() {
            this.columns = Math.floor(canvas.width / 40);
            this.drops = Array(this.columns).fill().map((_, colIndex) => ({
                x: colIndex * 40, y: Math.random() * -canvas.height, speed: Math.random() * 5 + 2, char: this.getRandomChar(), color: this.getColorForColumn(colIndex), opacity: Math.random() * 0.7 + 0.3
            }));
        }
        getRandomChar() { return asciiArt[Math.floor(Math.random() * asciiArt.length)]; }
        getColorForColumn(colIndex) {
            const greenVariants = [`rgba(0, 255, 70, ${Math.random() * 0.7 + 0.3})`, `rgba(50, 205, 50, ${Math.random() * 0.7 + 0.3})`, `rgba(0, 128, 0, ${Math.random() * 0.7 + 0.3})`],
                blueVariants = [`rgba(0, 191, 255, ${Math.random() * 0.7 + 0.3})`, `rgba(65, 105, 225, ${Math.random() * 0.7 + 0.3})`, `rgba(0, 0, 255, ${Math.random() * 0.7 + 0.3})`],
                redVariants = [`rgba(255, 99, 71, ${Math.random() * 0.7 + 0.3})`, `rgba(220, 20, 60, ${Math.random() * 0.7 + 0.3})`, `rgba(255, 0, 0, ${Math.random() * 0.7 + 0.3})`];
            return [greenVariants, blueVariants, redVariants][colIndex % 3][colIndex % 3];
        }
        animate() {
            if (!isHovering) return;
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            this.drops.forEach(drop => {
                ctx.font = `${Math.random() * 10 + 10}px monospace`;
                ctx.fillStyle = drop.color;
                ctx.textAlign = 'center';
                ctx.fillText(drop.char, drop.x, drop.y);
                drop.y += drop.speed;
                if (drop.y > canvas.height) {
                    drop.y = 0;
                    drop.char = this.getRandomChar();
                    drop.speed = Math.random() * 5 + 2;
                }
            });
            animationFrame = requestAnimationFrame(() => this.animate());
        }
        stop() {
            if (animationFrame) cancelAnimationFrame(animationFrame);
            ctx.clearRect(0, 0, canvas.width, canvas.height);
        }
    }

    let matrixRain;
    const startAnimation = () => { isHovering = true; resizeCanvas(); matrixRain = new MatrixRain(); matrixRain.animate(); };
    const stopAnimation = () => { isHovering = false; if (matrixRain) matrixRain.stop(); };

    stealthCard.addEventListener('mouseenter', startAnimation);
    stealthCard.addEventListener('mouseleave', stopAnimation);
    window.addEventListener('resize', resizeCanvas);
});
