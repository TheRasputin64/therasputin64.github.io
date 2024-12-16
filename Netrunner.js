document.addEventListener('DOMContentLoaded', () => {
    const netrunnerCard = document.getElementById('netrunner-card'), titleElement = netrunnerCard.querySelector('.project-title'), descriptionElement = netrunnerCard.querySelector('.project-description'), primaryLangElement = netrunnerCard.querySelector('.primary-lang'), secondaryLangsElement = netrunnerCard.querySelector('.secondary-langs'),
    originalElements = { title: 'NETRUNNER', description: 'X3 Encryption System', primaryLang: 'Python', secondaryLangs: 'CustomTinker - HTML/CSS/JS' },
    encryptedElements = { title: '8aa4934a418c4bd2eb9245', description: 'c62bd062bf1a79af5c45a0f53261ffa233de6da4', primaryLang: '9a5493fa45c0', secondaryLangs: 'd21f84d5ca2b1c691657ec7d48210be5c61e21e93ec38015eedf16' };
    netrunnerCard.style.cursor = 'pointer';
    const createTextContainer = (element) => {
        const container = document.createElement('div');
        container.style.position = 'relative';
        container.style.width = `${element.offsetWidth}px`;
        container.style.height = `${element.offsetHeight}px`;
        container.style.overflow = 'hidden';
        const wrapper = document.createElement('div');
        wrapper.style.position = 'absolute';
        wrapper.style.top = '0';
        wrapper.style.left = '0';
        wrapper.style.width = '100%';
        wrapper.style.height = '100%';
        element.parentNode.insertBefore(container, element);
        container.appendChild(wrapper);
        wrapper.appendChild(element);
        return { container, wrapper };
    };
    const titleContainer = createTextContainer(titleElement);
    const descriptionContainer = createTextContainer(descriptionElement);
    const primaryLangContainer = createTextContainer(primaryLangElement);
    const secondaryLangsContainer = createTextContainer(secondaryLangsElement);
    const typeWriter = (element, text, speed = 10) => new Promise(resolve => {element.textContent = '';let i = 0;const typing = setInterval(() => {if (i < text.length) {element.textContent += text.charAt(i);i++;} else {clearInterval(typing);resolve();}}, speed); });
    const animateText = async (elements) => {await Promise.all([typeWriter(titleElement, elements.title),typeWriter(descriptionElement, elements.description),typeWriter(primaryLangElement, elements.primaryLang),typeWriter(secondaryLangsElement, elements.secondaryLangs)]);};
    let isHovering = false, isAnimating = false;
    const performAnimation = async () => {if (isAnimating) return;isAnimating = true;try {await animateText(encryptedElements);await new Promise(resolve => {const checkHover = () => {if (!isHovering) resolve();else setTimeout(checkHover, 100);};checkHover();});await animateText(originalElements);} finally {isAnimating = false;if (isHovering) performAnimation();}};
    netrunnerCard.addEventListener('mouseenter', () => { isHovering = true; if (!isAnimating) performAnimation(); });
    netrunnerCard.addEventListener('mouseleave', () => { isHovering = false; });
    netrunnerCard.addEventListener('click', () => window.location.href = 'https://github.com/TheRasputin64/NETRUNNER');
});