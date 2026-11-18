
document.addEventListener("DOMContentLoaded", () => {
    "use strict";

    const root = document.documentElement;
    const body = document.body;

    const reducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;

    // Enable JavaScript-specific animation styles.
    root.classList.add("js");


    // ==========================================
    // 1. PRELOADER
    // ==========================================

    const preloader = document.getElementById("preloader");

    function hidePreloader() {
        if (!preloader) return;

        preloader.classList.add("loaded");
        preloader.classList.add("hide");
    }

    window.addEventListener("load", hidePreloader);

    if (document.readyState === "complete") {
        hidePreloader();
    }

    setTimeout(hidePreloader, 2000);


    // ==========================================
    // 2. THEME SWITCHER
    // Dark -> Light -> Emerald -> Dark
    // ==========================================

    const themeToggle = document.getElementById("themeToggle");
    const themeIcon = document.getElementById("themeIcon");

    const themes = ["dark", "light", "emerald"];

    const themeIcons = {
        dark: "☾",
        light: "☀",
        emerald: "✦"
    };

    function applyTheme(theme) {
        if (!themes.includes(theme)) {
            theme = "dark";
        }

        root.setAttribute("data-theme", theme);

        try {
            localStorage.setItem("ja-theme", theme);
        } catch (error) {
            console.warn("Theme preference could not be saved.");
        }

        if (themeIcon) {
            themeIcon.textContent = themeIcons[theme];
        }

        if (themeToggle) {
            themeToggle.setAttribute(
                "aria-label",
                `Current theme: ${theme}. Change theme`
            );

            themeToggle.setAttribute(
                "title",
                `Theme: ${theme}`
            );
        }
    }

    let savedTheme = "dark";

    try {
        savedTheme = localStorage.getItem("ja-theme") || "dark";
    } catch (error) {
        console.warn("Saved theme could not be accessed.");
    }

    applyTheme(savedTheme);

    if (themeToggle) {
        themeToggle.addEventListener("click", () => {
            const currentTheme =
                root.getAttribute("data-theme") || "dark";

            const currentIndex = themes.indexOf(currentTheme);

            const nextTheme =
                themes[(currentIndex + 1) % themes.length];

            applyTheme(nextTheme);
        });
    }


    // ==========================================
    // 3. MOBILE NAVIGATION
    // ==========================================

    const menuToggle = document.getElementById("menuToggle");
    const navMenu = document.getElementById("navMenu");

    const navLinks = document.querySelectorAll(".nav-link");

    function closeMenu() {
        if (!menuToggle || !navMenu) return;

        menuToggle.classList.remove("active");
        navMenu.classList.remove("open");

        menuToggle.setAttribute("aria-expanded", "false");
    }

    function openMenu() {
        if (!menuToggle || !navMenu) return;

        menuToggle.classList.add("active");
        navMenu.classList.add("open");

        menuToggle.setAttribute("aria-expanded", "true");
    }

    if (menuToggle && navMenu) {
        menuToggle.setAttribute("aria-expanded", "false");

        menuToggle.addEventListener("click", () => {
            if (navMenu.classList.contains("open")) {
                closeMenu();
            } else {
                openMenu();
            }
        });

        navLinks.forEach(link => {
            link.addEventListener("click", closeMenu);
        });

        document.addEventListener("click", event => {
            if (
                !navMenu.contains(event.target) &&
                !menuToggle.contains(event.target)
            ) {
                closeMenu();
            }
        });
    }


    // ==========================================
    // 4. HEADER SCROLL ANIMATION
    // ==========================================

    const header = document.getElementById("header");

    function updateHeader() {
        if (!header) return;

        header.classList.toggle(
            "scrolled",
            window.scrollY > 50
        );
    }


    // ==========================================
    // 5. SCROLL PROGRESS
    // ==========================================

    const scrollProgress =
        document.getElementById("scrollProgress");

    function updateScrollProgress() {
        if (!scrollProgress) return;

        const totalHeight =
            document.documentElement.scrollHeight -
            window.innerHeight;

        if (totalHeight <= 0) {
            scrollProgress.style.width = "0%";
            return;
        }

        const progress =
            (window.scrollY / totalHeight) * 100;

        scrollProgress.style.width =
            `${Math.min(progress, 100)}%`;
    }


    // ==========================================
    // 6. FLOATING BACK TO TOP
    // ==========================================

    const backToTop =
        document.getElementById("floatingBackToTop");

    function updateBackToTop() {
        if (!backToTop) return;

        backToTop.classList.toggle(
            "show",
            window.scrollY > 400
        );
    }

    if (backToTop) {
        backToTop.addEventListener("click", event => {
            event.preventDefault();

            window.scrollTo({
                top: 0,
                behavior: reducedMotion ? "auto" : "smooth"
            });
        });
    }


    // ==========================================
    // 7. COMBINED SCROLL HANDLER
    // ==========================================

    let scrollScheduled = false;

    function handleScroll() {
        if (scrollScheduled) return;

        scrollScheduled = true;

        window.requestAnimationFrame(() => {
            updateHeader();
            updateScrollProgress();
            updateBackToTop();

            scrollScheduled = false;
        });
    }

    window.addEventListener("scroll", handleScroll, {
        passive: true
    });

    window.addEventListener("resize", handleScroll);

    handleScroll();


    // ==========================================
    // 8. HERO TYPING ANIMATION
    // ==========================================

    const typingText =
        document.getElementById("typingText");

    const typingWords = [
        "Technology Enthusiast",
        "Computer Science Graduate",
        "Developer",
        "Problem Solver"
    ];

    if (typingText) {
        if (reducedMotion) {
            typingText.textContent = typingWords[0];
        } else {
            let wordIndex = 0;
            let characterIndex = 0;
            let deleting = false;

            function typeEffect() {
                const currentWord =
                    typingWords[wordIndex];

                if (!deleting) {
                    characterIndex++;

                    typingText.textContent =
                        currentWord.substring(0, characterIndex);

                    if (characterIndex === currentWord.length) {
                        deleting = true;

                        setTimeout(typeEffect, 1500);
                        return;
                    }
                } else {
                    characterIndex--;

                    typingText.textContent =
                        currentWord.substring(0, characterIndex);

                    if (characterIndex === 0) {
                        deleting = false;

                        wordIndex =
                            (wordIndex + 1) % typingWords.length;
                    }
                }

                setTimeout(
                    typeEffect,
                    deleting ? 45 : 85
                );
            }

            typeEffect();
        }
    }


    // ==========================================
    // 9. CINEMATIC SCROLL REVEAL
    // ==========================================

    const revealSelectors = [
        ".section-header",
        ".journey-card",
        ".skill-category",
        ".project-card",
        ".interest-category",
        ".interest-panel",
        ".interest-card",
        ".family-flip-card",
        ".hobby-card",
        ".contact-card"
    ];

    const revealElements = document.querySelectorAll(
        revealSelectors.join(",")
    );

    if (reducedMotion || !("IntersectionObserver" in window)) {
        revealElements.forEach(element => {
            element.classList.add("reveal", "visible");
        });
    } else {
        const revealObserver = new IntersectionObserver(
            entries => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("visible");

                        revealObserver.unobserve(entry.target);
                    }
                });
            },
            {
                threshold: 0.12,
                rootMargin: "0px 0px -45px 0px"
            }
        );

        revealElements.forEach((element, index) => {
            element.classList.add("reveal");

            // Small stagger for consecutive cards.
            element.style.transitionDelay =
                `${(index % 4) * 100}ms`;

            revealObserver.observe(element);
        });
    }


    // ==========================================
    // 10. SKILL BAR ANIMATION
    // ==========================================

    const skillBars = document.querySelectorAll(
        ".skill-bar span[data-width]"
    );

    function animateSkillBar(bar) {
        const targetWidth = Number.parseFloat(
            bar.getAttribute("data-width")
        );

        if (!Number.isFinite(targetWidth)) return;

        bar.style.width =
            `${Math.min(Math.max(targetWidth, 0), 100)}%`;
    }

    if (reducedMotion || !("IntersectionObserver" in window)) {
        skillBars.forEach(animateSkillBar);
    } else {
        const skillObserver = new IntersectionObserver(
            entries => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        animateSkillBar(entry.target);

                        skillObserver.unobserve(entry.target);
                    }
                });
            },
            {
                threshold: 0.3
            }
        );

        skillBars.forEach(bar => {
            skillObserver.observe(bar);
        });
    }


    // ==========================================
    // 11. FAMILY FLIP CARDS
    // ==========================================

    const familyCards = document.querySelectorAll(
        ".family-flip-card"
    );

    familyCards.forEach(card => {
        card.setAttribute("aria-pressed", "false");

        card.addEventListener("click", () => {
            const flipped =
                card.classList.toggle("flipped");

            card.setAttribute(
                "aria-pressed",
                String(flipped)
            );
        });
    });


    // ==========================================
    // 12. IMAGE LIGHTBOX
    // ==========================================

    const lightbox =
        document.getElementById("lightbox");

    const lightboxImage =
        document.getElementById("lightboxImage");

    const lightboxCaption =
        document.getElementById("lightboxCaption");

    const lightboxClose =
        document.getElementById("lightboxClose");

    const galleryImages = document.querySelectorAll(
        ".interest-item img, " +
        ".interest-card img, " +
        ".hobby-card img, " +
        ".project-image img"
    );

    let previouslyFocusedElement = null;

    function openLightbox(image) {
        if (!lightbox || !lightboxImage) return;

        previouslyFocusedElement = document.activeElement;

        lightboxImage.src =
            image.currentSrc || image.src;

        lightboxImage.alt =
            image.alt || "Gallery image";

        const parent = image.closest(
            ".interest-item, .interest-card, .hobby-card, .project-card"
        );

        const heading = parent?.querySelector("h3, h4");

        if (lightboxCaption) {
            lightboxCaption.textContent =
                heading?.textContent?.trim() ||
                image.alt ||
                "";
        }

        lightbox.classList.add("active");
        lightbox.setAttribute("aria-hidden", "false");

        body.style.overflow = "hidden";

        lightboxClose?.focus();
    }

    function closeLightbox() {
        if (!lightbox) return;

        lightbox.classList.remove("active");
        lightbox.setAttribute("aria-hidden", "true");

        body.style.overflow = "";

        if (lightboxImage) {
            lightboxImage.removeAttribute("src");
        }

        previouslyFocusedElement?.focus();

        previouslyFocusedElement = null;
    }

    galleryImages.forEach(image => {
        image.style.cursor = "zoom-in";

        image.addEventListener("click", () => {
            openLightbox(image);
        });
    });

    lightboxClose?.addEventListener(
        "click",
        closeLightbox
    );

    lightbox?.addEventListener("click", event => {
        if (event.target === lightbox) {
            closeLightbox();
        }
    });


    // ==========================================
    // 13. KEYBOARD ACCESSIBILITY
    // ==========================================

    document.addEventListener("keydown", event => {
        if (event.key === "Escape") {
            closeMenu();

            if (lightbox?.classList.contains("active")) {
                closeLightbox();
            }
        }

        if (
            event.key === "Tab" &&
            lightbox?.classList.contains("active")
        ) {
            const focusable = lightbox.querySelectorAll(
                'button, a[href], input, [tabindex]:not([tabindex="-1"])'
            );

            if (!focusable.length) return;

            const first = focusable[0];
            const last = focusable[focusable.length - 1];

            if (event.shiftKey && document.activeElement === first) {
                event.preventDefault();
                last.focus();
            } else if (
                !event.shiftKey &&
                document.activeElement === last
            ) {
                event.preventDefault();
                first.focus();
            }
        }
    });


    // ==========================================
    // 14. SMOOTH INTERNAL NAVIGATION
    // ==========================================

    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener("click", event => {
            const targetId =
                link.getAttribute("href");

            if (!targetId || targetId === "#") return;

            let target;

            try {
                target = document.querySelector(targetId);
            } catch (error) {
                return;
            }

            if (!target) return;

            event.preventDefault();

            target.scrollIntoView({
                behavior: reducedMotion ? "auto" : "smooth",
                block: "start"
            });
        });
    });


    // ==========================================
    // 15. FOOTER YEAR
    // ==========================================

    const currentYear =
        document.getElementById("currentYear");

    if (currentYear) {
        currentYear.textContent =
            new Date().getFullYear();
    }


    // ==========================================
    // 16. IMAGE LOADING ENHANCEMENT
    // ==========================================

    const images = document.querySelectorAll("img");

    images.forEach(image => {
        if (image.complete && image.naturalWidth > 0) {
            image.classList.add("image-loaded");
        } else {
            image.addEventListener("load", () => {
                image.classList.add("image-loaded");
            }, { once: true });
        }
    });


    // ==========================================
    // 17. INITIALIZATION
    // ==========================================

       // ==========================================
    // 17. INITIALIZATION
    // ==========================================

    body.classList.add("js-loaded");

});