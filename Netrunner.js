document.addEventListener('DOMContentLoaded', () => {
    const netrunnerCard = document.getElementById('netrunner-card');
    const originalElements = {
        title: 'NETRUNNER', description: 'X3 Encryption System', primaryLang: 'Python', secondaryLangs: 'CustomTinker - HTML/CSS/JS'
    };
    const encryptedElements = {
        title: '8aa4934a418c4bd2eb9245', description: 'c62bd062bf1a79af5c45a0f53261ffa233de6da4', primaryLang: '9a5493fa45c0', secondaryLangs: 'd21f84d5ca2b1c691657ec7d48210be5c61e21e93ec38015eedf16'
    };
    const titleElement = netrunnerCard.querySelector('.project-title'),
        descriptionElement = netrunnerCard.querySelector('.project-description'),
        primaryLangElement = netrunnerCard.querySelector('.primary-lang'),
        secondaryLangsElement = netrunnerCard.querySelector('.secondary-langs');
    netrunnerCard.style.cursor = 'pointer';
    let isHovering = false, animationRunning = false;

    const typeWriter = (element, text, speed = 10) => new Promise(resolve => {
        element.textContent = ''; let i = 0; const typing = setInterval(() => {
            if (i < text.length) element.textContent += text.charAt(i), i++;
            else clearInterval(typing), resolve();
        }, speed);
    });

    const resetToOriginal = async () => await Promise.all([
        typeWriter(titleElement, originalElements.title),
        typeWriter(descriptionElement, originalElements.description),
        typeWriter(primaryLangElement, originalElements.primaryLang),
        typeWriter(secondaryLangsElement, originalElements.secondaryLangs)
    ]);

    const encryptAndDecrypt = async () => {
        if (!isHovering || animationRunning) return;
        animationRunning = true;
        await Promise.all([
            typeWriter(titleElement, encryptedElements.title),
            typeWriter(descriptionElement, encryptedElements.description),
            typeWriter(primaryLangElement, encryptedElements.primaryLang),
            typeWriter(secondaryLangsElement, encryptedElements.secondaryLangs)
        ]);
        await new Promise(resolve => setTimeout(resolve, 1000));
        if (!isHovering) { await resetToOriginal(), animationRunning = false; return; }
        await Promise.all([
            typeWriter(titleElement, originalElements.title),
            typeWriter(descriptionElement, originalElements.description),
            typeWriter(primaryLangElement, originalElements.primaryLang),
            typeWriter(secondaryLangsElement, originalElements.secondaryLangs)
        ]);
        await new Promise(resolve => setTimeout(resolve, 1000));
        animationRunning = false;
        if (isHovering) encryptAndDecrypt();
        else await resetToOriginal();
    };

    netrunnerCard.addEventListener('mouseenter', () => { isHovering = true; encryptAndDecrypt(); });
    netrunnerCard.addEventListener('mouseleave', () => { isHovering = false; });
});
