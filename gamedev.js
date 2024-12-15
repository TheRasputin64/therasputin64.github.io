document.addEventListener('DOMContentLoaded', () => {
    const overlay = document.querySelector('.transition-overlay');
    const projects = document.querySelectorAll('.project');

    const pageTransition = (href) => {
        overlay.style.transform = 'translateX(0)';
        overlay.style.transition = 'transform 0.5s ease-in-out';
        
        setTimeout(() => {
            window.location.href = href;
        }, 500);
    };

    projects.forEach(project => {
        project.addEventListener('click', (e) => {
            e.preventDefault();
            const href = project.getAttribute('data-href');
            if (href) {
                pageTransition(href);
            }
        });

        project.addEventListener('mouseenter', () => {
            project.style.transform = 'translateY(-10px)';
            project.style.transition = 'all 0.3s ease';
        });

        project.addEventListener('mouseleave', () => {
            project.style.transform = 'translateY(0)';
        });
    });

    window.addEventListener('pageshow', (event) => {
        if (event.persisted) {
            overlay.style.transform = 'translateX(100%)';
            overlay.style.transition = 'none';
        }
    });

    setTimeout(() => {
        overlay.style.transform = 'translateX(100%)';
        overlay.style.transition = 'transform 0.5s ease-in-out';
    }, 100);

    const cvLink = document.querySelector('a[href="CV.pdf"]');
    if (cvLink) {
        cvLink.addEventListener('click', (e) => {
            e.preventDefault();
            const href = cvLink.getAttribute('href');
            pageTransition(href);
        });
    }

    const revealProjects = () => {
        projects.forEach(project => {
            const projectTop = project.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;

            if (projectTop < windowHeight * 0.85) {
                project.style.opacity = '1';
                project.style.transform = 'translateY(0)';
            }
        });
    };

    projects.forEach(project => {
        project.style.opacity = '0';
        project.style.transform = 'translateY(30px)';
        project.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });

    window.addEventListener('scroll', revealProjects);
    revealProjects();

    window.addEventListener('popstate', () => {
        overlay.style.transform = 'translateX(100%)';
        overlay.style.transition = 'none';
    });

    window.addEventListener('error', () => {
        overlay.style.transform = 'translateX(100%)';
        overlay.style.transition = 'none';
    });
});
