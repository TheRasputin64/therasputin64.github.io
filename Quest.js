document.addEventListener('DOMContentLoaded', () => {
    const questCard = document.getElementById('quest-card');
    questCard.style.cssText = 'position: relative; overflow: hidden; cursor: pointer';
    
    const message = document.createElement('div');
    message.style.cssText = `
        position: absolute;
        top: 0;
        right: -100%;
        width: 55%;
        height: 100%;
        background: #f5e6d3;
        border-left: 4px solid #a17c6b;
        opacity: 0;
        transition: all 0.3s ease;
        display: flex;
        padding: 20px;
    `;

    const status = document.createElement('div');
    status.style.cssText = `
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        background: #a17c6b;
        color: #f5e6d3;
        text-align: center;
        transform: translateY(-100%);
        transition: all 0.3s ease;
        opacity: 0;
        font-size: 20px;
        padding: 5px;
    `;
    status.textContent = '⚔️ Quest Started ⚔️';
    
    message.innerHTML = `
        <div style="text-align: center; width: 100%;">
            <p style="color: #795548; font-size: 18px; line-height: 1.6;">
                <strong> <span class="quest-text" style="margin-top:25px;">Main features:</span><br> </strong>
                ✦ Makes folders for different coding<br>
                ✦ Adds starter files automatically<br>
                ✦ Opens your project in VS Code<br>
                 <strong><span class="quest-text">The Quest:</span><br></strong>
                A lockpicking challenge appears!
            </p>
        </div>
        <style>
            .quest-text {
                position: relative;
                display: inline-block;
            }
            .quest-text::after {
                content: '';
                position: absolute;
                width: 100%;
                height: 2px;
                bottom: -2px;
                left: 0;
                background: #a17c6b;
                transform: scaleX(0);
                transition: transform 1.5s ease;
                transform-origin: right;
            }
            #quest-card:hover .quest-text::after {
                transform: scaleX(1);
                transform-origin: left;
            }
        </style>
    `;
    
    questCard.append(message, status);
    
    questCard.addEventListener('mouseenter', () => {
        message.style.cssText += 'opacity: 1; right: 0;';
        status.style.cssText += 'opacity: 1; transform: translateY(0);';
    });
    questCard.addEventListener('click', () => {window.location.href = 'https://github.com/TheRasputin64/TheQuest';});
    questCard.addEventListener('mouseleave', () => {
        message.style.cssText += 'opacity: 0; right: -100%;';
        status.style.cssText += 'opacity: 0; transform: translateY(-100%);';
    });
});