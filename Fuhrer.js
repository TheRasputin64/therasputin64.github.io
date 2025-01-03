document.addEventListener('DOMContentLoaded', () => {
    const fuhrerCard = document.getElementById('fuhrer-card') || document.body;

    const messages = [
        'Compile Error: Unexpected token <',
        'Running script... Please wait',
        'Custom language detected',
        'Syntax Error: Missing semicolon',
        'Launching FuhrerMark Terminal...',
        'Parsing .fm file...',
        'Building FuhrerMark environment...',
        'Execution halted: Stack overflow',
        'Error: Unrecognized command',
        'Connecting to server...'
    ];

    const windowTypes = ['info', 'error', 'success', 'warning'];
    let activeWindowTimeout, isHovering = false;
    let isCongratsWindowShown = false;

    Object.assign(fuhrerCard.style, {
        position: 'relative',
        overflow: 'hidden',
        cursor: 'pointer'
    });

    const createWindow = (options = {}) => {
        const { 
            width = null, 
            height = null, 
            message = null, 
            type = null,
            title = 'FuhrerMark' 
        } = options;

        const windowDiv = document.createElement('div');
        windowDiv.classList.add('window');
        windowDiv.classList.add(type || windowTypes[Math.floor(Math.random() * windowTypes.length)]);
        
        const cardWidth = fuhrerCard.offsetWidth;
        const cardHeight = fuhrerCard.offsetHeight;

        const windowWidth = width || Math.min(Math.random() * 100 + 150, cardWidth * 0.7);
        const windowHeight = height || Math.min(Math.random() * 50 + 100, cardHeight * 0.6);
        
        const maxTop = Math.max(0, cardHeight - windowHeight);
        const maxLeft = Math.max(0, cardWidth - windowWidth);
        
        const top = Math.floor(Math.random() * maxTop);
        const left = Math.floor(Math.random() * maxLeft);

        windowDiv.style.cssText = `
            position: absolute;
            width: ${windowWidth}px;
            height: ${windowHeight}px;
            top: ${top}px;
            left: ${left}px;
            background-color: rgba(18, 18, 18, 0.95);
            border: 1px solid var(--text-color);
            border-radius: 4px;
            color: var(--text-color);
            font-family: VT323, monospace;
            z-index: 1;
            overflow: hidden;
            opacity: 0;
            transform: scale(0) rotate(45deg);
            transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        `;

        const header = document.createElement('div');
        header.style.cssText = `
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 5px;
            background-color: rgba(0, 0, 0, 0.8);
            border-bottom: 1px solid var(--text-color);
        `;

        const titleSpan = document.createElement('span');
        titleSpan.textContent = title;
        header.appendChild(titleSpan);

        const controls = document.createElement('div');
        controls.style.display = 'flex';

        const close = document.createElement('span');
        close.textContent = 'X';
        close.style.cursor = 'pointer';
        close.style.zIndex = '2';
        controls.appendChild(close);

        header.appendChild(controls);
        windowDiv.appendChild(header);

        const body = document.createElement('div');
        body.textContent = message || messages[Math.floor(Math.random() * messages.length)];
        body.style.padding = '10px';
        body.style.fontSize = `${Math.random() * 2 + 14}px`;
        body.style.lineHeight = '1.4';
        body.style.textAlign = 'center';
        windowDiv.appendChild(body);

        return { windowDiv, close };
    };

    const removeAllWindows = () => {
        const existingWindows = fuhrerCard.querySelectorAll('.window');
        existingWindows.forEach(windowDiv => {
            windowDiv.style.opacity = '0';
            windowDiv.style.transform = 'scale(0) rotate(45deg)';
            setTimeout(() => {
                windowDiv.parentNode?.removeChild(windowDiv);
            }, 300);
        });
    };

    const showCongratsWindow = () => {
        if (isCongratsWindowShown) return;

        const { windowDiv, close } = createWindow({
            width: 300,
            height: 200,
            message: '🎉 Congratulations! You\'ve successfully closed all windows! 🎊\n\nYou are a true FuhrerMark Terminal Master!',
            type: 'success',
            title: 'Mission Complete'
        });

        close.addEventListener('click', (e) => {
            e.stopPropagation();
            windowDiv.style.opacity = '0';
            windowDiv.style.transform = 'scale(0) rotate(45deg)';
            setTimeout(() => {
                windowDiv.parentNode?.removeChild(windowDiv);
                isCongratsWindowShown = false;
            }, 300);
        });

        fuhrerCard.appendChild(windowDiv);

        requestAnimationFrame(() => {
            windowDiv.style.opacity = '1';
            windowDiv.style.transform = 'scale(1) rotate(0deg)';
        });

        isCongratsWindowShown = true;
    };

    const showWindows = () => {
        if (!isHovering || isCongratsWindowShown) return;
        
        removeAllWindows();
        const windowCount = Math.floor(Math.random() * 4) + 1;
        let closedWindows = 0;
        
        for (let i = 0; i < windowCount; i++) {
            const { windowDiv, close } = createWindow();
            
            close.addEventListener('click', (e) => {
                e.stopPropagation();
                windowDiv.style.opacity = '0';
                windowDiv.style.transform = 'scale(0) rotate(45deg)';
                setTimeout(() => {
                    windowDiv.parentNode?.removeChild(windowDiv);
                    closedWindows++;
                    
                    if (closedWindows === windowCount) {
                        showCongratsWindow();
                    }
                }, 300);
            });

            fuhrerCard.appendChild(windowDiv);

            requestAnimationFrame(() => {
                windowDiv.style.opacity = '1';
                windowDiv.style.transform = 'scale(1) rotate(0deg)';
            });
        }
    };

    fuhrerCard.addEventListener('mouseenter', () => {
        isHovering = true;
        clearTimeout(activeWindowTimeout);
        activeWindowTimeout = setTimeout(showWindows, 100);
    });

    fuhrerCard.addEventListener('click', () => {
        window.location.href = 'https://github.com/TheRasputin64/FuhrerMark';
    });

    fuhrerCard.addEventListener('mouseleave', () => {
        isHovering = false;
        clearTimeout(activeWindowTimeout);
        removeAllWindows();
        isCongratsWindowShown = false;
    });
});