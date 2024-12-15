const quizlessCard = document.getElementById('quizless-card');

class MatrixBackground {
    constructor(element) {
        this.element = element; this.canvas = document.createElement('canvas'); this.ctx = this.canvas.getContext('2d'); this.setupCanvas();
        this.characters = ['اختبار', 'امتحان', 'الوقت', 'السؤال', 'خطأ', 'اجابة صحيحة', '100%', '1+1', 'quiz', 'test', 'exam', 'النتيجة', 'الدرجة', 'الطلاب', '?', '✦', 'ناجح', 'راسب'];
        this.colors = ['rgba(0, 255, 65, 0.7)', 'rgba(255, 0, 65, 0.7)', 'rgba(0, 65, 255, 0.7)', 'rgba(255, 255, 0, 0.7)', 'rgba(255, 0, 255, 0.7)'];
        this.columns = 0; this.drops = []; this.isAnimating = false;
    }
    setupCanvas() {
        Object.assign(this.canvas.style, { position: 'absolute', top: '0', left: '0', width: '100%', height: '100%', zIndex: '0', pointerEvents: 'none' });
        Object.assign(this.element.style, { position: 'relative', cursor: 'pointer' });
        this.element.appendChild(this.canvas);
    }
    resize() {
        this.canvas.width = this.element.offsetWidth; this.canvas.height = this.element.offsetHeight; this.columns = Math.floor(this.canvas.width / 20);
        this.drops = Array(this.columns).fill().map(() => ({ y: Math.random() * -this.canvas.height, speed: Math.random() * 2 + 1, char: this.getRandomChar(), color: this.getRandomColor(), scale: 0, rotation: Math.random() * 360 }));
    }
    getRandomChar() { return this.characters[Math.floor(Math.random() * this.characters.length)]; }
    getRandomColor() { return this.colors[Math.floor(Math.random() * this.colors.length)]; }
    draw() {
        if (!this.isAnimating) return; this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.drops.forEach((drop, index) => {
            this.ctx.save(); this.ctx.translate(index * 20, drop.y); drop.scale = Math.min(drop.scale + 0.05, 1); drop.rotation += 5;
            this.ctx.scale(drop.scale, drop.scale); this.ctx.rotate(drop.rotation * Math.PI / 180); this.ctx.fillStyle = drop.color; this.ctx.font = '12px monospace'; this.ctx.fillText(drop.char, 0, 0); this.ctx.restore();
            drop.y += drop.speed;
            if (drop.y > this.canvas.height) { drop.y = 0; drop.char = this.getRandomChar(); drop.color = this.getRandomColor(); drop.speed = Math.random() * 2 + 1; drop.scale = 0; drop.rotation = Math.random() * 360; }
        });
        requestAnimationFrame(() => this.draw());
    }
    start() { if (this.isAnimating) return; this.isAnimating = true; this.resize(); window.addEventListener('resize', () => this.resize()); this.draw(); }
    stop() { this.isAnimating = false; this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height); }
}

const matrixBackground = new MatrixBackground(quizlessCard);
Object.assign(quizlessCard.style, { position: 'relative', zIndex: '1' });
quizlessCard.addEventListener('mouseenter', () => matrixBackground.start());
quizlessCard.addEventListener('mouseleave', () => matrixBackground.stop());
