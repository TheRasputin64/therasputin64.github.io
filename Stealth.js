
document.addEventListener('DOMContentLoaded', () => {
    const stealthCard = document.getElementById('stealth-card');
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    // Expanded and more diverse character set
    const asciiArt = [
        '🖼️', '🔐', '📂', '🕵️', '🖤', '🧩', '🔒', 
        '🌐', '💾', '🔍', '🌈', '🚀', '🧠', '🛡️',
        '01', '10', '11', '00', '101', '111', '010',
        'DATA', 'CODE', 'HIDE', 'MASK', 'LOCK', 'BYTE', 
        'WAVE', 'SEED', 'CORE', 'NODE', 'LINK', 'SYNC'
    ];

    // Configure canvas
    canvas.style.position = 'absolute';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.zIndex = '0';
    canvas.style.pointerEvents = 'none';
    canvas.style.opacity = '0.8';

    // Configure stealth card
    stealthCard.style.position = 'relative';
    stealthCard.style.overflow = 'hidden';
    stealthCard.style.cursor = 'pointer';
    stealthCard.appendChild(canvas);

    let isHovering = false;
    let animationFrame = null;

    function resizeCanvas() {
        canvas.width = stealthCard.clientWidth;
        canvas.height = stealthCard.clientHeight;
    }

    class MatrixRain {
        constructor() {
            // More columns and staggered start positions
            this.columns = Math.floor(canvas.width / 40);
            this.drops = Array(this.columns).fill().map((_, colIndex) => ({
                x: colIndex * 40,  // Evenly spaced columns
                y: Math.random() * -canvas.height, // Random vertical start
                speed: Math.random() * 5 + 2,     // Varied falling speed
                char: this.getRandomChar(),
                color: this.getColorForColumn(colIndex),
                opacity: Math.random() * 0.7 + 0.3 // Random initial opacity
            }));
        }

        getRandomChar() {
            return asciiArt[Math.floor(Math.random() * asciiArt.length)];
        }

        getColorForColumn(colIndex) {
            const greenVariants = [
                `rgba(0, 255, 70, ${Math.random() * 0.7 + 0.3})`,   // Bright green
                `rgba(50, 205, 50, ${Math.random() * 0.7 + 0.3})`,  // Lime green
                `rgba(0, 128, 0, ${Math.random() * 0.7 + 0.3})`     // Dark green
            ];
            const blueVariants = [
                `rgba(0, 191, 255, ${Math.random() * 0.7 + 0.3})`,  // Deep sky blue
                `rgba(65, 105, 225, ${Math.random() * 0.7 + 0.3})`, // Royal blue
                `rgba(0, 0, 255, ${Math.random() * 0.7 + 0.3})`     // Blue
            ];
            const redVariants = [
                `rgba(255, 99, 71, ${Math.random() * 0.7 + 0.3})`,  // Tomato red
                `rgba(220, 20, 60, ${Math.random() * 0.7 + 0.3})`,  // Crimson
                `rgba(255, 0, 0, ${Math.random() * 0.7 + 0.3})`     // Red
            ];

            const colorSets = [greenVariants, blueVariants, redVariants];
            return colorSets[colIndex % colorSets.length][colIndex % 3];
        }

        animate() {
            if (!isHovering) return;

            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            this.drops.forEach(drop => {
                // Set dynamic font and color
                ctx.font = `${Math.random() * 10 + 10}px monospace`;
                ctx.fillStyle = drop.color;
                ctx.textAlign = 'center';

                // Draw character
                ctx.fillText(drop.char, drop.x, drop.y);

                // Move drop down
                drop.y += drop.speed;

                // Reset drop when it falls off screen
                if (drop.y > canvas.height) {
                    drop.y = 0;
                    drop.char = this.getRandomChar();
                    drop.speed = Math.random() * 5 + 2;
                }
            });

            animationFrame = requestAnimationFrame(() => this.animate());
        }

        stop() {
            if (animationFrame) {
                cancelAnimationFrame(animationFrame);
            }
            ctx.clearRect(0, 0, canvas.width, canvas.height);
        }
    }

    let matrixRain;

    function startAnimation() {
        isHovering = true;
        resizeCanvas();
        matrixRain = new MatrixRain();
        matrixRain.animate();
    }

    function stopAnimation() {
        isHovering = false;
        if (matrixRain) {
            matrixRain.stop();
        }
    }

    // Event listeners
    stealthCard.addEventListener('mouseenter', startAnimation);
    stealthCard.addEventListener('mouseleave', stopAnimation);
    window.addEventListener('resize', resizeCanvas);
});
