document.addEventListener('DOMContentLoaded', () => {
    class WaterNotificationSystem {
        constructor(cardId, config = {}) {
            this.cardId = cardId;
            this.config = { maxNotifications: 4, notificationInterval: 1000, animationDuration: 300, ...config };
            this.styles = {
                container: { position: 'absolute', right: '0', top: '0', width: '250px', display: 'flex', flexDirection: 'column', alignItems: 'flex-end', pointerEvents: 'none', overflow: 'hidden', padding: '5px', zIndex: '1000', gap: '3px' },
                notification: { background: 'var(--bg-color)', color: 'var(--text-color)', padding: '7.2px 10px', opacity: '0', transform: 'translateX(100%)', transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)', display: 'flex', alignItems: 'center', fontSize: '12px', boxShadow: '0 3px 5px rgba(0,0,0,0.2)' },
                icon: { fontSize: '18px', marginRight: '8px', opacity: '0.9' }
            };
            this.templates = [
                { icon: '💧', category: 'Hydration', color: 'var(--highlight-color)', messages: ['Wake up, samurai. Drink some water.', 'Your cybernetics need water.', 'ERROR 404: Hydration not found.', 'System shutdown imminent. Hydrate now.'] },
                { icon: '🏋️', category: 'Performance', color: 'var(--highlight-color)', messages: ['Time to train, samurai!', 'Initiate workout protocol.', 'Running push-ups...', 'Boost strength, choom!'] },
                { icon: '🌊', category: 'Wellness', color: 'var(--highlight-color)', messages: ['Hydrate for wellness!', 'Water: Your health potion!', 'Refresh your system!'] },
                { icon: '🔋', category: 'Energy', color: 'var(--highlight-color)', messages: ['Recharge with each sip.', 'Maximize energy now!', 'Water equals vitality.'] }
            ];
            this.waterCard = document.getElementById(this.cardId);
            this.container = this.createContainer();
            this.notifications = [];
            this.notificationInterval = null;
            this.initialize();
        }
        createContainer() {
            const container = document.createElement('div');
            Object.assign(container.style, this.styles.container);
            this.waterCard.style.position = 'relative';
            this.waterCard.style.overflow = 'hidden';
            this.waterCard.appendChild(container);
            return container;
        }
        createNotification(template) {
            const notification = document.createElement('div');
            Object.assign(notification.style, this.styles.notification);
            notification.innerHTML = `<div style="font-size:18px; margin-right:8px;">${template.icon}</div><div style="flex-grow:1; display:flex; flex-direction:column;"><div style="color:${template.color}; font-weight:bold; margin-bottom:2px;">${template.category}</div><div style="color:var(--secondary-text); line-height:1.3;">${template.messages[Math.floor(Math.random() * template.messages.length)]}</div></div>`;
            return notification;
        }
        pushNotification(notificationElement) {
            if (this.notifications.length >= this.config.maxNotifications) {
                const lastNotification = this.notifications.pop();
                lastNotification.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
                lastNotification.style.transform = 'translateX(100%)';
                lastNotification.style.opacity = '0';
                setTimeout(() => {
                    this.container.removeChild(lastNotification);
                }, this.config.animationDuration);
            }
            this.container.insertBefore(notificationElement, this.container.firstChild);
            this.notifications.unshift(notificationElement);
            requestAnimationFrame(() => {
                this.notifications.forEach((n, i) => {
                    if (i === 0) {
                        n.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
                        n.style.transform = 'translateX(0)';
                        n.style.opacity = '1';
                    } else {
                        n.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
                        n.style.transform = `translateX(0) translateY(${i * 3}px)`;
                        n.style.opacity = '1';
                    }
                });
            });
        }
        addNotification() {
            const categories = ['Hydration', 'Performance', 'Wellness', 'Energy'];
            const lastCategory = this.notifications.length > 0 ? this.notifications[0].querySelector('div').innerText : '';
            const availableCategories = categories.filter(cat => !lastCategory.includes(cat));
            const category = availableCategories[Math.floor(Math.random() * availableCategories.length)];
            const template = this.templates.find(t => t.category === category);
            this.pushNotification(this.createNotification(template));
        }
        start() {
            if (this.notificationInterval) return;
            this.addNotification();
            this.notificationInterval = setInterval(() => this.addNotification(), this.config.notificationInterval);
        }
        stop() {
            if (!this.notificationInterval) return;
            clearInterval(this.notificationInterval);
            this.notificationInterval = null;
            this.notifications.forEach(n => {
                n.style.transform = 'translateX(100%)';
                n.style.opacity = '0';
                setTimeout(() => this.container.removeChild(n), this.config.animationDuration);
            });
            this.notifications = [];
        }
        initialize() {
            Object.assign(this.waterCard.style, { position: 'relative', cursor: 'pointer', zIndex: '1' });
            this.waterCard.addEventListener('mouseenter', () => this.start());
            this.waterCard.addEventListener('mouseleave', () => this.stop());
            this.waterCard.addEventListener('click', () => window.location.href = 'https://github.com/TheRasputin64/WaterReminder');
        }
    }
    const waterNotificationSystem = new WaterNotificationSystem('water-card');
});