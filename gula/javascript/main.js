// Gúla Szerviz KFT - Modern UI interactions
document.addEventListener("DOMContentLoaded", () => {
    // 1. Page Loader
    const loader = document.getElementById("loader");
    if (loader) {
        window.addEventListener("load", () => {
            setTimeout(() => {
                loader.style.opacity = "0";
                loader.style.visibility = "hidden";
            }, 800); // Gentle transitions
        });
        
        // Safety timeout if window.load doesn't fire immediately
        setTimeout(() => {
            loader.style.opacity = "0";
            loader.style.visibility = "hidden";
        }, 3000);
    }

    // 2. Sticky Glassmorphic Navbar on Scroll
    const header = document.querySelector(".main-header");
    if (header) {
        window.addEventListener("scroll", () => {
            if (window.scrollY > 50) {
                header.classList.add("sticky");
            } else {
                header.classList.remove("sticky");
            }
        });
        
        // Set state immediately on load if page loaded scrolled
        if (window.scrollY > 50) {
            header.classList.add("sticky");
        }
    }

    // 3. Modern Responsive Mobile Menu Drawer
    const menuToggle = document.getElementById("menuToggle");
    const navDrawer = document.getElementById("navDrawer");
    const drawerClose = document.getElementById("drawerClose");
    const drawerOverlay = document.getElementById("drawerOverlay");

    if (menuToggle && navDrawer) {
        const toggleMenu = () => {
            navDrawer.classList.toggle("open");
            if (drawerOverlay) drawerOverlay.classList.toggle("active");
            document.body.classList.toggle("no-scroll");
            menuToggle.classList.toggle("active");
        };

        const closeMenu = () => {
            navDrawer.classList.remove("open");
            if (drawerOverlay) drawerOverlay.classList.remove("active");
            document.body.classList.remove("no-scroll");
            menuToggle.classList.remove("active");
        };

        menuToggle.addEventListener("click", toggleMenu);
        if (drawerClose) drawerClose.addEventListener("click", closeMenu);
        if (drawerOverlay) drawerOverlay.addEventListener("click", closeMenu);

        // Close menu drawer when clicking on navigation links
        const navLinks = navDrawer.querySelectorAll(".nav-link, .menu-links");
        navLinks.forEach(link => {
            link.addEventListener("click", closeMenu);
        });
    }

    // 4. Scroll Reveal Counters (No jQuery or Waypoints required!)
    const counters = document.querySelectorAll(".statistic-counter, .stat-number");
    if (counters.length > 0) {
        const speed = 60; // Higher is slower animation

        const animateCounter = (counter) => {
            // Read target value from content or data-target
            let targetAttr = counter.getAttribute("data-target");
            let targetText = targetAttr ? targetAttr : counter.textContent.trim();
            const target = parseFloat(targetText.replace(/[^0-9.]/g, ''));
            const suffix = targetText.replace(/[0-9.]/g, ''); // Extract % or + signs if any

            if (isNaN(target)) return;

            let count = 0;
            const isDecimal = target % 1 !== 0;
            const increment = target / speed;

            const update = () => {
                count += increment;
                if (count < target) {
                    if (isDecimal) {
                        counter.textContent = count.toFixed(1) + suffix;
                    } else {
                        counter.textContent = Math.ceil(count) + suffix;
                    }
                    requestAnimationFrame(update);
                } else {
                    if (isDecimal) {
                        counter.textContent = target.toFixed(1) + suffix;
                    } else {
                        counter.textContent = target + suffix;
                    }
                }
            };
            
            update();
        };

        const observerOptions = {
            threshold: 0.6,
            rootMargin: "0px"
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const counter = entry.target;
                    if (!counter.classList.contains("counted")) {
                        counter.classList.add("counted");
                        animateCounter(counter);
                    }
                }
            });
        }, observerOptions);

        counters.forEach(counter => {
            // Keep original values saved in attributes if they aren't already
            if (!counter.getAttribute("data-target")) {
                counter.setAttribute("data-target", counter.textContent.trim());
            }
            counter.textContent = "0"; // Reset before animation triggers
            observer.observe(counter);
        });
    }

    // 5. Scroll to Top Button
    const scrollTopBtn = document.getElementById("scrollTopBtn");
    if (scrollTopBtn) {
        window.addEventListener("scroll", () => {
            if (window.scrollY > 400) {
                scrollTopBtn.classList.add("show");
            } else {
                scrollTopBtn.classList.remove("show");
            }
        });

        scrollTopBtn.addEventListener("click", (e) => {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        });
    }

    // 6. Smooth Scroll for Anchor Links
    const anchorLinks = document.querySelectorAll('a[href^="#"]:not([href="#"]):not(.plans-btn)');
    anchorLinks.forEach(link => {
        link.addEventListener("click", function(e) {
            const targetId = this.getAttribute("href");
            const targetEl = document.querySelector(targetId);
            if (targetEl) {
                e.preventDefault();
                const headerHeight = header ? header.offsetHeight : 80;
                const elementPosition = targetEl.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerHeight - 15;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });
            }
        });
    });
});
