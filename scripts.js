document.addEventListener('DOMContentLoaded', function() {
    const header = document.getElementById('header');
    const loader = document.getElementById('loader');

    // Remove loader after page load
    window.addEventListener('load', function() {
        document.body.classList.remove('loading');
        loader.style.display = 'none';
    });

    // Throttle function to improve performance
    function throttle(fn, wait) {
        let time = Date.now();
        return function() {
            if ((time + wait - Date.now()) < 0) {
                fn();
                time = Date.now();
            }
        };
    }

    // Scroll event listener
    window.addEventListener('scroll', throttle(function() {
        if (window.scrollY > 50) {
            header.classList.add('shrink');
        } else {
            header.classList.remove('shrink');
        }
    }, 100));
});
