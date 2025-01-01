
document.addEventListener('DOMContentLoaded', () => {
    const dataCard = document.getElementById('data-card');
    const logContainer = document.createElement('div');
    const overlay = document.createElement('div');
    const statsContainer = document.createElement('div');

    overlay.style.cssText = 'position:absolute;top:0;left:0;width:100%;height:100%;background:rgba(0, 0, 0, 0.79);opacity:0;transition:opacity 0.2s';
    logContainer.style.cssText = 'position:absolute;top:0;left:0;width:70%;height:103%;font-size:13px;line-height:1.2;pointer-events:none;opacity:0;transition:opacity 0.2s;z-index:1;overflow:hidden;padding: 20px';
    statsContainer.style.cssText = 'position:absolute;top:15px;right:15px;font-size:12px;color:#00ff8c;opacity:0;transition:opacity 0.2s;z-index:1;display:flex;flex-direction:column;align-items:flex-end;gap:5px;padding-right:15px;padding:10px;border-radius:5px';
    dataCard.style.cssText += 'position:relative;cursor:pointer';

    const initialLogs = [
        { text: '> Initializing system...', color: '#00ff8c', delay: 100 },
        { text: '> Accessing database...', color: '#00ccff', delay: 150 },
        { text: '> Bypassing security...', color: '#ff3366', delay: 200 },
        { text: '> Security breach successful', color: '#ffcc00', delay: 100 },
        { text: '> Starting file extraction...', color: '#00ff8c', delay: 50 }
    ];

    const fileTypes = [
        { ext: '.mp3', size: '3.4MB', time: 300 },
        { ext: '.jpg', size: '2.1MB', time: 200 },
        { ext: '.pdf', size: '8.7MB', time: 500 },
        { ext: '.doc', size: '1.2MB', time: 100 },
        { ext: '.zip', size: '15.6MB', time: 800 },
        { ext: '.exe', size: '5.3MB', time: 400 },
        { ext: '.png', size: '0.8MB', time: 50 }
    ];

    let stats = {
        filesExtracted: 0,
        dataSize: 0,
        speed: 0
    };

    const updateStats = () => {
        statsContainer.innerHTML = `
            <div style="display:flex;justify-content:space-between;width:100%">
                <span style="color:#888">Files:</span>
                <span style="margin-left:10px">${stats.filesExtracted}</span>
            </div>
            <div style="display:flex;justify-content:space-between;width:100%">
                <span style="color:#888">Data:</span>
                <span style="margin-left:10px">${stats.dataSize.toFixed(1)}MB</span>
            </div>
            <div style="display:flex;justify-content:space-between;width:100%">
                <span style="color:#888">Speed:</span>
                <span style="margin-left:10px">${stats.speed.toFixed(1)}MB/s</span>
            </div>
        `;
    };

    let currentIndex = 0;
    let isActive = false;
    let startTime;

    const addLog = (text, color) => {
        const log = document.createElement('div');
        log.textContent = text;
        log.style.color = color;
        logContainer.appendChild(log);
        logContainer.scrollTop = logContainer.scrollHeight;
    };

    const generateFileName = () => {
        const chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
        const length = Math.floor(Math.random() * 8) + 4;
        return Array(length).fill().map(() => chars[Math.floor(Math.random() * chars.length)]).join('');
    };

    const startInitialLogs = async () => {
        startTime = Date.now();
        for (const log of initialLogs) {
            if (!isActive) return;
            addLog(log.text, log.color);
            await new Promise(resolve => setTimeout(resolve, log.delay));
        }
        startFileExtraction();
    };

    const startFileExtraction = async () => {
        while (isActive) {
            const file = fileTypes[Math.floor(Math.random() * fileTypes.length)];
            const fileName = generateFileName() + file.ext;
            const fileSize = parseFloat(file.size);
            addLog(`> Extracting ${fileName} [${file.size}]`, '#00ff8c');
            await new Promise(resolve => setTimeout(resolve, file.time));
            if (!isActive) return;
            addLog(`> ${fileName} extracted successfully`, '#00ccff');
            stats.filesExtracted++;
            stats.dataSize += fileSize;
            const elapsedSeconds = (Date.now() - startTime) / 1000;
            stats.speed = stats.dataSize / elapsedSeconds;
            updateStats();
            await new Promise(resolve => setTimeout(resolve, 50));
        }
    };

    dataCard.appendChild(overlay);
    dataCard.appendChild(logContainer);
    dataCard.appendChild(statsContainer);
    dataCard.addEventListener('click', () => {window.location.href = 'https://github.com/TheRasputin64/DataLink';});

    dataCard.addEventListener('mouseenter', () => {
        isActive = true;
        logContainer.innerHTML = '';
        stats = { filesExtracted: 0, dataSize: 0, speed: 0 };
        overlay.style.opacity = '1';
        logContainer.style.opacity = '1';
        statsContainer.style.opacity = '1';
        startInitialLogs();
    });

    dataCard.addEventListener('mouseleave', () => {
        isActive = false;
        overlay.style.opacity = '0';
        logContainer.style.opacity = '0';
        statsContainer.style.opacity = '0';
        setTimeout(() => {
            logContainer.innerHTML = '';
            statsContainer.innerHTML = '';
        }, 200);
    });
});