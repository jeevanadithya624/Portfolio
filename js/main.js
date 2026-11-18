
/* =========================================
   JEEVAN ADITHYA - PORTFOLIO JAVASCRIPT
   ========================================= */

document.addEventListener("DOMContentLoaded", () => {

    const body = document.body;
    const root = document.documentElement;

    /* =====================================
       1. PRELOADER
       ===================================== */

    const preloader = document.getElementById("preloader");

    function hidePreloader() {
        preloader?.classList.add("hide");
    }

    window.addEventListener("load", hidePreloader);

    // Fallback
    setTimeout(hidePreloader, 2500);


    /* =====================================
       2. MOBILE NAVIGATION
       ===================================== */

    const menuToggle = document.getElementById("menuToggle");
    const navMenu = document.getElementById("navMenu");
    const navLinks = document.querySelectorAll(".nav-link");

    function closeMenu() {
        navMenu?.classList.remove("open");

        menuToggle?.setAttribute("aria-expanded", "false");
        menuToggle?.setAttribute(
            "aria-label",
            "Open navigation menu"
        );
    }

    menuToggle?.addEventListener("click", () => {

        const isOpen = navMenu.classList.toggle("open");

        menuToggle.setAttribute(
            "aria-expanded",
            String(isOpen)
        );

        menuToggle.setAttribute(
            "aria-label",
            isOpen ? "Close navigation menu" : "Open navigation menu"
        );

    });

    navLinks.forEach(link => {
        link.addEventListener("click", closeMenu);
    });


    /* =====================================
       3. HEADER SCROLL EFFECT
       ===================================== */

    const header = document.getElementById("header");
    const scrollProgress = document.getElementById("scrollProgress");

    function handleScroll() {

        const scrollTop = window.scrollY;

        const scrollableHeight =
            document.documentElement.scrollHeight -
            window.innerHeight;

        const progress = scrollableHeight > 0
            ? (scrollTop / scrollableHeight) * 100
            : 0;

        if (scrollProgress) {
            scrollProgress.style.width = `${progress}%`;
        }

        header?.classList.toggle(
            "scrolled",
            scrollTop > 40
        );

    }

    window.addEventListener(
        "scroll",
        handleScroll,
        { passive: true }
    );

    handleScroll();


    /* =====================================
       4. ACTIVE NAVIGATION LINK
       ===================================== */

    const sections = document.querySelectorAll(
        "main section[id]"
    );

    if ("IntersectionObserver" in window) {

        const sectionObserver = new IntersectionObserver(
            entries => {

                entries.forEach(entry => {

                    if (entry.isIntersecting) {

                        const currentId = entry.target.id;

                        navLinks.forEach(link => {

                            const isActive =
                                link.getAttribute("href") ===
                                `#${currentId}`;

                            link.classList.toggle(
                                "active",
                                isActive
                            );

                        });

                    }

                });

            },
            {
                rootMargin: "-35% 0px -55% 0px"
            }
        );

        sections.forEach(section => {
            sectionObserver.observe(section);
        });

    }


    /* =====================================
       5. TYPING ANIMATION
       ===================================== */

    const typingText = document.getElementById("typingText");

    const typingWords = [
        "Computer Science Graduate",
        "Developer",
        "Problem Solver",
        "Technology Enthusiast"
    ];

    let wordIndex = 0;
    let characterIndex = 0;
    let deleting = false;

    function typeEffect() {

        if (!typingText) return;

        const currentWord = typingWords[wordIndex];

        if (deleting) {
            characterIndex--;
        } else {
            characterIndex++;
        }

        typingText.textContent =
            currentWord.substring(0, characterIndex);

        let delay = deleting ? 45 : 85;

        if (
            !deleting &&
            characterIndex === currentWord.length
        ) {

            deleting = true;
            delay = 1400;

        } else if (
            deleting &&
            characterIndex === 0
        ) {

            deleting = false;

            wordIndex =
                (wordIndex + 1) % typingWords.length;

            delay = 400;

        }

        setTimeout(typeEffect, delay);

    }

    if (typingText) {
        typeEffect();
    }


    /* =====================================
       6. SCROLL REVEAL ANIMATION
       ===================================== */

    const revealElements = document.querySelectorAll(
        ".reveal"
    );

    if ("IntersectionObserver" in window) {

        const revealObserver = new IntersectionObserver(
            entries => {

                entries.forEach(entry => {

                    if (entry.isIntersecting) {

                        entry.target.classList.add("visible");

                        revealObserver.unobserve(
                            entry.target
                        );

                    }

                });

            },
            {
                threshold: 0.12
            }
        );

        revealElements.forEach(element => {
            revealObserver.observe(element);
        });

    } else {

        revealElements.forEach(element => {
            element.classList.add("visible");
        });

    }


    /* =====================================
       7. SKILL BAR ANIMATION
       ===================================== */

    const skillBars = document.querySelectorAll(".skill-progress");

    function fillBar(bar) {
        bar.style.setProperty("--w", bar.dataset.width || "0%");
        bar.classList.add("filled");
    }

    if ("IntersectionObserver" in window) {

        const skillObserver = new IntersectionObserver(
            entries => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        fillBar(entry.target);
                        skillObserver.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.3 }
        );

        skillBars.forEach(bar => skillObserver.observe(bar));

    } else {
        skillBars.forEach(fillBar);
    }


    /* =====================================
       8. THEME SWITCHER
       ===================================== */

    const themeToggle = document.getElementById(
        "themeToggle"
    );

    const themeIcon = document.getElementById(
        "themeIcon"
    );

    const themes = [
        "dark",
        "light",
        "emerald"
    ];

    const themeIcons = {
        dark: "☾",
        light: "☀",
        emerald: "✦"
    };

    function applyTheme(name) {
        root.setAttribute("data-theme", name);
        if (themeIcon) {
            themeIcon.textContent = themeIcons[name];
        }
    }

    let savedTheme = null;
    try {
        savedTheme = localStorage.getItem("portfolio-theme");
    } catch (error) {
        savedTheme = null;
    }

    applyTheme(themes.includes(savedTheme) ? savedTheme : "dark");

    themeToggle?.addEventListener("click", () => {

        const currentTheme =
            root.getAttribute("data-theme") || "dark";

        const nextTheme =
            themes[(themes.indexOf(currentTheme) + 1) % themes.length];

        applyTheme(nextTheme);

        try {
            localStorage.setItem("portfolio-theme", nextTheme);
        } catch (error) {
            /* storage unavailable - theme still changes for this visit */
        }

    });


    /* =====================================
       9. LIGHTBOX / HOBBY MODAL
       ===================================== */

    const lightbox = document.getElementById("lightbox");
    const lightboxImage = document.getElementById("lightboxImage");
    const lightboxClose = document.getElementById("lightboxClose");
    const lightboxCaption = document.getElementById("lightboxCaption");
    const lightboxTitle = document.getElementById("lightboxTitle");
    const lightboxText = document.getElementById("lightboxText");

    let previousFocus = null;

    function openLightbox(image, title = "", text = "") {

        if (!lightbox || !lightboxImage) return;

        previousFocus = document.activeElement;

        lightboxImage.src = image.currentSrc || image.src;
        lightboxImage.alt = image.alt || "Expanded photograph";

        const hasCaption = Boolean(title || text);

        if (lightboxCaption) {
            lightboxCaption.hidden = !hasCaption;
            lightboxTitle.textContent = title;
            lightboxText.textContent = text;
        }

        lightbox.classList.add("open");
        lightbox.setAttribute("aria-hidden", "false");
        body.classList.add("no-scroll");

        lightboxClose?.focus();

    }

    function closeLightbox() {

        if (!lightbox || !lightbox.classList.contains("open")) return;

        lightbox.classList.remove("open");
        lightbox.setAttribute("aria-hidden", "true");
        body.classList.remove("no-scroll");

        previousFocus?.focus();

    }

    // Plain photo zoom (interests, banner, projects)
    document.querySelectorAll(
        ".interest-item img, .family-banner img, .project-card img"
    ).forEach(image => {

        image.classList.add("zoomable");

        image.addEventListener("click", () => openLightbox(image));

    });

    // Hobby cards open the modal with a short write-up
    document.querySelectorAll(".hobby-card").forEach(card => {

        const open = () => {
            const image = card.querySelector("img");
            if (image) {
                openLightbox(
                    image,
                    card.dataset.title,
                    card.dataset.text
                );
            }
        };

        card.addEventListener("click", open);

        card.addEventListener("keydown", event => {
            if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                open();
            }
        });

    });

    lightboxClose?.addEventListener("click", closeLightbox);

    lightbox?.addEventListener("click", event => {
        if (event.target === lightbox) {
            closeLightbox();
        }
    });


    /* =====================================
       10. KEYBOARD CONTROLS
       ===================================== */

    document.addEventListener("keydown", event => {

        if (event.key === "Escape") {
            closeMenu();
            closeLightbox();
        }

    });


    /* =====================================
       10b. FAMILY FLIP CARDS
       ===================================== */

    document.querySelectorAll(".flip-card").forEach(card => {

        const toggle = () => {
            const flipped = card.classList.toggle("flipped");
            card.setAttribute("aria-pressed", String(flipped));
        };

        card.addEventListener("click", toggle);

        card.addEventListener("keydown", event => {
            if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                toggle();
            }
        });

    });


    /* =====================================
       10c. JOURNEY "SHOW MORE" TOGGLES
       ===================================== */

    document.querySelectorAll(".show-more").forEach(button => {

        button.addEventListener("click", () => {

            const card = button.closest(".timeline-card");

            const expanded = card.classList.toggle("expanded");

            button.setAttribute("aria-expanded", String(expanded));
            button.textContent = expanded ? "Show less" : "Show more";

        });

    });


    /* =====================================
       11. BACK TO TOP
       ===================================== */

    const backToTop = document.querySelector(
        ".back-to-top"
    );

    backToTop?.addEventListener("click", event => {

        event.preventDefault();

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    });


    /* =====================================
       12. CURRENT YEAR
       ===================================== */

    const currentYear = document.getElementById(
        "currentYear"
    );

    if (currentYear) {

        currentYear.textContent =
            new Date().getFullYear();

    }


    /* =====================================
       13. BACKGROUND PARTICLES
       ===================================== */

    const particlesContainer = document.getElementById(
        "particles"
    );

    const reducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;

    if (particlesContainer && !reducedMotion) {

        for (let i = 0; i < 22; i++) {

            const particle = document.createElement("span");

            particle.className = "particle";

            particle.style.left =
                `${Math.random() * 100}%`;

            particle.style.animationDelay =
                `${Math.random() * 8}s`;

            particle.style.animationDuration =
                `${6 + Math.random() * 7}s`;

            particlesContainer.appendChild(particle);

        }

    }


    /* =====================================
       14. CUSTOM CURSOR
       ===================================== */

    const customCursor = document.getElementById(
        "customCursor"
    );

    const finePointer = window.matchMedia(
        "(pointer: fine)"
    ).matches;

    if (customCursor && finePointer) {

        customCursor.classList.add("active");

        document.addEventListener("mousemove", event => {
            customCursor.style.left = `${event.clientX}px`;
            customCursor.style.top = `${event.clientY}px`;
        });

        document.querySelectorAll("a, button").forEach(element => {

            element.addEventListener("mouseenter", () => {
                customCursor.classList.add("hovering");
            });

            element.addEventListener("mouseleave", () => {
                customCursor.classList.remove("hovering");
            });

        });

    }


    /* =====================================
       15. IMAGE ERROR FALLBACK
       ===================================== */

    document.querySelectorAll("main img").forEach(image => {

        image.addEventListener("error", () => {

            image.hidden = true;

            const parent = image.parentElement;

            if (parent && !parent.querySelector(".image-fallback")) {

                const fallback = document.createElement("div");

                fallback.className = "image-fallback";
                fallback.textContent = "Image unavailable";

                parent.prepend(fallback);

            }

        });

    });


    /* =====================================
       16. INTEREST CATEGORY ANIMATIONS
       ===================================== */

    const interestCategories = document.querySelectorAll(
        ".interest-category"
    );

    interestCategories.forEach((category, index) => {

        category.style.transitionDelay =
            `${index * 80}ms`;

    });


});
