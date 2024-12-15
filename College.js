
class ZoomTextBackground {
    constructor(element) {
        this.element = element; this.canvas = document.createElement('canvas'); this.ctx = this.canvas.getContext('2d'); this.setupCanvas();
        this.academicTerms = ['GPA', 'Quiz', 'Exam', 'Labs', 'Dorms', 'Study', 'Class', 'Notes', 'Books', 'Clubs', 'Fees', 'Major', 'Minor', 'Dean', 'Prof', 'Grad', 'Essay', 'Marks', 'Pass', 'Fail', 'A+', 'A', 'A-', 'B+', 'B', 'B-', 'C+', 'C', 'C-', 'D+', 'D', 'D-', 'F', 'Credits', 'Enroll', 'Schedule', 'Test', 'Report', 'Rank', 'Grade', 'Score', 'Result', 'Term'];
        this.colors = ['rgba(41, 128, 185, 0.7)', 'rgba(52, 152, 219, 0.7)', 'rgba(26, 188, 156, 0.7)', 'rgba(22, 160, 133, 0.7)', 'rgba(192, 57, 43, 0.7)', 'rgba(231, 76, 60, 0.7)'];
        this.activeTerms = []; this.animationFrameId = null; this.isAnimating = false; this.lastTermAddTime = 0;
    }
    setupCanvas() {
        Object.assign(this.canvas.style, { position: 'absolute', top: '0', left: '0', width: '100%', height: '100%', zIndex: '0', pointerEvents: 'none' });
        Object.assign(this.element.style, { position: 'relative', cursor: 'pointer' });
        this.element.appendChild(this.canvas);
    }
    resize() { this.canvas.width = this.element.offsetWidth; this.canvas.height = this.element.offsetHeight; }
    getRandom(array) { return array[Math.floor(Math.random() * array.length)]; }
    createTermAnimation(term) {
        const { width: x, height: y } = this.canvas;
        const positions = [
            { x: x * 0.6, y: y * 0.3 }, 
            { x: x * 0.4, y: y * 0.3 }, 
            { x: x * 0.8, y: y * 0.8 }, 
            { x: x * 0.65, y: y * 0.3 }, 
            { x: x * 0.55, y: y * 0.2 }, 
            { x: x * 0.7, y: y * 0.7 }, 
            { x: x * 0.75, y: y * 0.8 }, 
            { x: x * 0.85, y: y * 0.9 }
        ];
        return { term, x: this.getRandom(positions).x, y: this.getRandom(positions).y, color: this.getRandom(this.colors), scale: 0, opacity: 0, completed: false, lifetime: 0, maxLifetime: 800, fontSize: 20 + Math.random() * 20, verticalOffset: Math.random() * 20 - 10, addInterval: 100 + Math.random() * 300, animate(ctx) {
            const fastZoom = 200, stay = 200, fade = 400;
            if (this.lifetime < fastZoom) { const p = this.lifetime / fastZoom; this.scale = p * 1.2; this.opacity = p; }
            else if (this.lifetime < fastZoom + stay) { this.scale = 1.2; this.opacity = 1; }
            else if (this.lifetime < this.maxLifetime) { const p = (this.lifetime - (fastZoom + stay)) / fade; this.scale = 1.2 * (1 - p); this.opacity = 1 - p; }
            else this.completed = true;
            ctx.save(); ctx.globalAlpha = this.opacity; ctx.fillStyle = this.color; ctx.font = `${this.fontSize + (this.scale * 20)}px VT323`; ctx.textAlign = 'center'; ctx.fillText(this.term, this.x, this.y + this.verticalOffset); ctx.restore(); this.lifetime += 16;
        }};
    }
    addNewTerm() {
        const currentTime = Date.now();
        if (this.activeTerms.length < 5) {
            const lastTerm = this.activeTerms[this.activeTerms.length - 1], interval = lastTerm ? lastTerm.addInterval : 0;
            if (currentTime - this.lastTermAddTime > interval) {
                this.activeTerms.push(this.createTermAnimation(this.getRandom(this.academicTerms)));
                this.lastTermAddTime = currentTime;
            }
        }
    }
    draw() {
        if (!this.isAnimating) return;
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.activeTerms = this.activeTerms.filter(term => !term.completed);
        this.addNewTerm();
        this.activeTerms.forEach(term => term.animate(this.ctx));
        this.animationFrameId = requestAnimationFrame(() => this.draw());
    }
    start() { if (this.isAnimating) return; this.isAnimating = true; this.resize(); window.addEventListener('resize', () => this.resize()); this.draw(); }
    stop() { if (this.animationFrameId) { cancelAnimationFrame(this.animationFrameId); this.animationFrameId = null; } this.isAnimating = false; this.activeTerms = []; this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height); }
}

const collegeCard = document.getElementById('college-card'), collegeZoomBackground = new ZoomTextBackground(collegeCard);
Object.assign(collegeCard.style, { position: 'relative', zIndex: '1' });
collegeCard.addEventListener('mouseenter', () => collegeZoomBackground.start());
collegeCard.addEventListener('mouseleave', () => collegeZoomBackground.stop());
collegeCard.addEventListener('click', () => window.location.href = 'https://github.com/TheRasputin64/');