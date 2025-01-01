document.addEventListener('DOMContentLoaded', () => {
    const netCard = document.getElementById('net-card');
    let isPlaying = false;
    let progress = 0;
    let progressInterval;
    let isPaused = false;

    const style = document.createElement('style');
    style.textContent = `
        @keyframes glitchAnim {
            0% { clip-path: polygon(0 2%, 100% 2%, 100% 5%, 0 5%); transform: translate(0); }
            2% { clip-path: polygon(0 78%, 100% 78%, 100% 100%, 0 100%); transform: translate(-5px); }
            6% { clip-path: polygon(0 78%, 100% 78%, 100% 100%, 0 100%); transform: translate(5px); }
            8% { clip-path: polygon(0 78%, 100% 78%, 100% 100%, 0 100%); transform: translate(-5px); }
            9% { clip-path: polygon(0 78%, 100% 78%, 100% 100%, 0 100%); transform: translate(0); }
            10% { clip-path: polygon(0 54%, 100% 54%, 100% 44%, 0 44%); transform: translate3d(5px, 0, 0); }
            13% { clip-path: polygon(0 54%, 100% 54%, 100% 44%, 0 44%); transform: translateZ(0); }
            13.1% { clip-path: polygon(0 0, 0 0, 0 0, 0 0); transform: translate3d(5px, 0, 0); }
            15% { clip-path: polygon(0 60%, 100% 60%, 100% 40%, 0 40%); transform: translate3d(5px, 0, 0); }
            20% { clip-path: polygon(0 60%, 100% 60%, 100% 40%, 0 40%); transform: translate3d(-5px, 0, 0); }
            20.1% { clip-path: polygon(0 0, 0 0, 0 0, 0 0); transform: translate3d(5px, 0, 0); }
            25% { clip-path: polygon(0 85%, 100% 85%, 100% 40%, 0 40%); transform: translate3d(5px, 0, 0); }
            30% { clip-path: polygon(0 85%, 100% 85%, 100% 40%, 0 40%); transform: translate3d(-5px, 0, 0); }
            30.1% { clip-path: polygon(0 0, 0 0, 0 0, 0 0); }
            35% { clip-path: polygon(0 63%, 100% 63%, 100% 80%, 0 80%); transform: translate(-5px); }
            40% { clip-path: polygon(0 63%, 100% 63%, 100% 80%, 0 80%); transform: translate(5px); }
            45% { clip-path: polygon(0 63%, 100% 63%, 100% 80%, 0 80%); transform: translate(-5px); }
            50% { clip-path: polygon(0 63%, 100% 63%, 100% 80%, 0 80%); transform: translate(0); }
            55% { clip-path: polygon(0 10%, 100% 10%, 100% 0, 0 0); transform: translate3d(5px, 0, 0); }
            60% { clip-path: polygon(0 10%, 100% 10%, 100% 0, 0 0); transform: translateZ(0); }
            60.1% { clip-path: polygon(0 0, 0 0, 0 0, 0 0); }
            to { clip-path: polygon(0 0, 0 0, 0 0, 0 0); }
        }
    `;
    document.head.appendChild(style);

    const videoOverlay = document.createElement('div');
    videoOverlay.style.cssText = `
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(18, 18, 18, 0.8);
        opacity: 0;
        transition: opacity 0.3s;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        cursor: pointer;
    `;

    const playButton = document.createElement('div');
    playButton.style.cssText = `
        width: 80px;
        height: 80px;
        border: 3px solid var(--text-color);
        border-radius: 50%;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
        position: relative;
        background: transparent;
        transition: all 0.3s;
        z-index: 10;
    `;

    const buttonIcon = document.createElement('div');
    buttonIcon.style.cssText = `
        width: 30px;
        height: 30px;
        position: relative;
    `;

    const progressBar = document.createElement('div');
    progressBar.style.cssText = `
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 4px;
        background: rgba(152, 251, 152, 0.2);
    `;

    const progressFill = document.createElement('div');
    progressFill.style.cssText = `
        width: 0%;
        height: 100%;
        background: var(--text-color);
        transition: width 0.1s linear;
    `;

    const timer = document.createElement('div');
    timer.style.cssText = `
        position: absolute;
        bottom: 10px;
        right: 10px;
        color: var(--text-color);
        font-size: 1rem;
    `;
    timer.textContent = '0:05';

    function updateButtonIcon(state) {
        if (state === 'play') {
            buttonIcon.innerHTML = `
                <div style="
                    width: 0;
                    height: 0;
                    border-style: solid;
                    border-width: 15px 0 15px 25px;
                    border-color: transparent transparent transparent var(--text-color);
                    margin-left: 5px;
                "></div>
            `;
        } else if (state === 'pause') {
            buttonIcon.innerHTML = `
                <div style="
                    display: flex;
                    gap: 8px;
                ">
                    <div style="width: 8px; height: 30px; background: var(--text-color);"></div>
                    <div style="width: 8px; height: 30px; background: var(--text-color);"></div>
                </div>
            `;
        }
    }

    function triggerGlitch() {
        const glitchClone = videoOverlay.cloneNode(true);
        glitchClone.style.position = 'absolute';
        glitchClone.style.zIndex = '2';
        glitchClone.style.animation = 'glitchAnim 0.6s forwards';
        videoOverlay.appendChild(glitchClone);
        
        setTimeout(() => {
            videoOverlay.removeChild(glitchClone);
        }, 600);
    }

    updateButtonIcon('play');
    playButton.appendChild(buttonIcon);
    progressBar.appendChild(progressFill);
    videoOverlay.append(playButton, progressBar, timer);

    function togglePlayPause(e) {
        e.stopPropagation();
        triggerGlitch();
        
        if (!isPlaying) {
            isPlaying = true;
            isPaused = false;
            updateButtonIcon('pause');
            startProgress();
        } else {
            if (!isPaused) {
                isPaused = true;
                updateButtonIcon('play');
                stopProgress();
            } else {
                isPaused = false;
                updateButtonIcon('pause');
                continueProgress();
            }
        }
    }

    function startProgress() {
        progress = 0;
        progressInterval = setInterval(updateProgress, 100);
    }

    function continueProgress() {
        progressInterval = setInterval(updateProgress, 100);
    }

    function updateProgress() {
        progress += 2;
        progressFill.style.width = `${progress}%`;
        const timeLeft = Math.ceil((100 - progress) * 0.05);
        timer.textContent = `0:${timeLeft.toString().padStart(2, '0')}`;
        
        if (progress >= 100) {
            stopProgress();
            isPlaying = false;
            isPaused = false;
            updateButtonIcon('play');
            progress = 0;
            progressFill.style.width = '0%';
            timer.textContent = '0:05';
            triggerGlitch();
        }
    }

    function stopProgress() {
        clearInterval(progressInterval);
    }

    netCard.style.position = 'relative';
    netCard.style.cursor = 'pointer';
    netCard.appendChild(videoOverlay);

    netCard.addEventListener('mouseenter', () => {
        videoOverlay.style.opacity = '1';
    });

    netCard.addEventListener('click', () => {
        window.location.href = 'https://github.com/TheRasputin64/NetSync';
    });

    netCard.addEventListener('mouseleave', () => {
        videoOverlay.style.opacity = '0';
        if (isPlaying) {
            stopProgress();
            isPlaying = false;
            isPaused = false;
            updateButtonIcon('play');
            progress = 0;
            progressFill.style.width = '0%';
            timer.textContent = '0:05';
        }
    });

    playButton.addEventListener('click', togglePlayPause);
});