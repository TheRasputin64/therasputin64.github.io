document.addEventListener('DOMContentLoaded', () => {
    const voidCard = document.getElementById('void-card');
    voidCard.style.cursor = 'pointer';
    const titleElement = voidCard.querySelector('.project-title');
    const primaryLangElement = voidCard.querySelector('.primary-lang');
    const secondaryLangsElement = voidCard.querySelector('.secondary-langs');
    const descriptionElement = voidCard.querySelector('.project-description');
    const students = ['TheRasputin64', 'ihatemylife', 'whatislove?', 'babydon\'thurtme', 'don\'thurtme', 'NO MOOOOOO!'];
    const certificates = [
        { title: 'Netrunner Protocol', experience: 'Cyber Infiltration', date: 'Neon Epoch 2077' },
        { title: 'Quantum Breach Mastery', experience: 'Digital Shadow Ops', date: 'Cyberspace 2080' },
        { title: 'Kingdom of Code', experience: 'Medieval Software Warfare', date: 'Realm of Algorithms' },
        { title: 'Mercenary Dev License', experience: 'Code Mercenary Tactics', date: 'Borderlands Chronicle' },
        { title: 'Cyber Samurai Scroll', experience: 'Neural Network Mastery', date: 'Silicon Shogunate' },
        { title: 'Rogue Programmer Decree', experience: 'Anarcho-Tech Rebellion', date: 'Underground Network' }
    ];
    const defaultState = {
        title: 'Void-Certificates',
        description: 'Certificates Generator',
        experience: 'Node.js',
        langs: 'Express.js - Multer - Cors - HTML/CSS/JS'
    };
    const createMorphingText = (el) => {
        let currentText = el.textContent;
        let targetText = currentText;
        let progress = 1;
        let animationFrame = null;
    const interpolate = () => {if (progress < 1) {progress += 0.05;el.textContent = currentText.split('').map((char, i) => {if (i >= targetText.length) return '';if (Math.random() < progress) return targetText[i];return String.fromCharCode(char.charCodeAt(0) + Math.floor(Math.random() * 10) * (Math.random() > 0.5 ? 1 : -1));}).join('');animationFrame = requestAnimationFrame(interpolate);} else {el.textContent = targetText;animationFrame = null;}};
    return {morph: (text) => {if (animationFrame) {cancelAnimationFrame(animationFrame);}currentText = el.textContent;targetText = text;progress = 0;interpolate();},reset: () => {if (animationFrame) {cancelAnimationFrame(animationFrame);}el.textContent = currentText;}};};
    const titleMorph = createMorphingText(titleElement);
    const descMorph = createMorphingText(descriptionElement);
    const langMorph = createMorphingText(primaryLangElement);
    const langsMorph = createMorphingText(secondaryLangsElement);let studentIndex = 0;let certIndex = 0;let studentInterval = null;let certInterval = null;
    const startMorph = () => {const cert = certificates[certIndex];const student = students[studentIndex];titleMorph.morph(cert.title);descMorph.morph(student);langMorph.morph(cert.experience);langsMorph.morph(cert.date);};
    const updateStudent = () => {studentIndex = (studentIndex + 1) % students.length;descMorph.morph(students[studentIndex]);};
    const updateCert = () => {certIndex = (certIndex + 1) % certificates.length;const cert = certificates[certIndex];titleMorph.morph(cert.title);langMorph.morph(cert.experience);langsMorph.morph(cert.date);};
    const stopMorph = () => {if (studentInterval) clearInterval(studentInterval);if (certInterval) clearInterval(certInterval);titleMorph.morph(defaultState.title);descMorph.morph(defaultState.description);langMorph.morph(defaultState.experience);langsMorph.morph(defaultState.langs);};
    const debounce = (func, delay) => {let timeoutId;return () => {clearTimeout(timeoutId);timeoutId = setTimeout(func, delay);};};
    const handleMouseEnter = debounce(() => {if (studentInterval) clearInterval(studentInterval);if (certInterval) clearInterval(certInterval);startMorph();studentInterval = setInterval(updateStudent, 1200);certInterval = setInterval(updateCert, 3600);}, 50);
    const handleMouseLeave = debounce(() => {if (studentInterval) clearInterval(studentInterval);if (certInterval) clearInterval(certInterval);stopMorph();}, 50);
    voidCard.addEventListener('mouseenter', handleMouseEnter);
    voidCard.addEventListener('mouseleave', handleMouseLeave);
    voidCard.addEventListener('click', () => {window.location.href = 'https://github.com/TheRasputin64/Void-Certificates';});
});