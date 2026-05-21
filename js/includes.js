document.addEventListener('DOMContentLoaded', function() {
    loadSharedPartials();
});

async function loadSharedPartials() {
    await Promise.all([
        loadPartial('site-header', 'header.html'),
        loadPartial('site-footer', 'footer.html')
    ]);

    setActiveNavLink();

    if (typeof initNavbar === 'function') {
        initNavbar();
    }

    if (typeof initBackToTop === 'function') {
        initBackToTop();
    }
}

async function loadPartial(elementId, url) {
    const target = document.getElementById(elementId);

    if (!target) {
        return;
    }

    try {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error('Failed to load ' + url);
        }

        target.innerHTML = await response.text();
    } catch (error) {
        console.error(error);
    }
}

function setActiveNavLink() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';

    document.querySelectorAll('#site-header .nav-menu a').forEach(function(link) {
        const href = link.getAttribute('href');
        link.classList.toggle('active', href === currentPage);
    });
}
