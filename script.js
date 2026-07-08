/* ==========================================================
   EDUPRIME - SCRIPT
========================================================== */

document.addEventListener("DOMContentLoaded", () => {

    /* ======================================================
       NAVBAR BLUR
    ====================================================== */

    const navbar = document.getElementById("navbar");

    function updateNavbar() {

        if (window.scrollY > 80) {

            navbar.classList.add("scrolled");

        } else {

            navbar.classList.remove("scrolled");

        }

    }

    updateNavbar();

    window.addEventListener("scroll", updateNavbar);

    /* ======================================================
       CONTADORES
    ====================================================== */

    const counters = document.querySelectorAll(".counter");

    const startCounter = (counter) => {

        const target = Number(counter.dataset.target);

        let value = 0;

        const step = Math.max(1, Math.ceil(target / 80));

        const timer = setInterval(() => {

            value += step;

            if (value >= target) {

                value = target;

                clearInterval(timer);

            }

            if (target === 100) {

                counter.innerHTML = value + "%";

            }

            else if (target === 5) {

                counter.innerHTML = value + "★";

            }

            else {

                counter.innerHTML = value + "+";

            }

        }, 18);

    };

    const counterObserver = new IntersectionObserver((entries) => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                startCounter(entry.target);

                counterObserver.unobserve(entry.target);

            }

        });

    }, {

        threshold: .5

    });

    counters.forEach(counter => {

        counterObserver.observe(counter);

    });

    /* ======================================================
       REVEAL
    ====================================================== */

    const revealElements = document.querySelectorAll(".reveal");

    const revealObserver = new IntersectionObserver((entries) => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                entry.target.classList.add("active");

            }

        });

    }, {

        threshold: .15

    });

    revealElements.forEach(el => {

        revealObserver.observe(el);

    });

    /* ======================================================
       FAQ
    ====================================================== */

    document.querySelectorAll(".faq-item").forEach(item => {

        const button = item.querySelector(".faq-question");

        button.addEventListener("click", () => {

            document.querySelectorAll(".faq-item").forEach(other => {

                if (other !== item) {

                    other.classList.remove("active");

                    other.querySelector(".faq-answer").style.maxHeight = null;

                }

            });

            item.classList.toggle("active");

            const answer = item.querySelector(".faq-answer");

            if (item.classList.contains("active")) {

                answer.style.maxHeight = answer.scrollHeight + "px";

            } else {

                answer.style.maxHeight = null;

            }

        });

    });

    /* ======================================================
       HERO PARALLAX
    ====================================================== */

    const heroImage = document.querySelector(".hero-image");

    window.addEventListener("mousemove", (e) => {

        if (!heroImage) return;

        const x = (window.innerWidth / 2 - e.clientX) / 45;

        const y = (window.innerHeight / 2 - e.clientY) / 45;

        heroImage.style.transform = `translate(${x}px,${y}px)`;

    });

    /* ======================================================
       FLOATING CARDS
    ====================================================== */

    document.querySelectorAll(".floating-card").forEach((card, index) => {

        setInterval(() => {

            card.style.transform =
                `translateY(${Math.sin(Date.now()/700+index)*8}px)`;

        }, 25);

    });

    /* ======================================================
       BOTÕES
    ====================================================== */

    document.querySelectorAll(".btn-primary,.btn-whats").forEach(btn => {

        btn.addEventListener("mouseenter", () => {

            btn.style.transform = "translateY(-5px) scale(1.03)";

        });

        btn.addEventListener("mouseleave", () => {

            btn.style.transform = "";

        });

    });

    /* ======================================================
       CURSOS
    ====================================================== */

    document.querySelectorAll(".course-card").forEach(card => {

        card.addEventListener("mousemove", e => {

            const rect = card.getBoundingClientRect();

            const x = e.clientX - rect.left;

            const y = e.clientY - rect.top;

            const rotateY = (x - rect.width / 2) / 18;

            const rotateX = -(y - rect.height / 2) / 18;

            card.style.transform =

                `perspective(800px)
                 rotateX(${rotateX}deg)
                 rotateY(${rotateY}deg)
                 translateY(-8px)`;

        });

        card.addEventListener("mouseleave", () => {

            card.style.transform = "";

        });

    });

    /* ======================================================
       DEPOIMENTOS
    ====================================================== */

    const testimonials = document.querySelectorAll(".testimonial-card");

    if (testimonials.length) {

        let current = 0;

        setInterval(() => {

            testimonials.forEach(card => {

                card.style.opacity = ".45";

                card.style.transform = "scale(.96)";

            });

            testimonials[current].style.opacity = "1";

            testimonials[current].style.transform = "scale(1.03)";

            current++;

            if (current >= testimonials.length) current = 0;

        }, 3000);

    }

    /* ======================================================
       SCROLL SUAVE
    ====================================================== */

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {

        anchor.addEventListener("click", e => {

            e.preventDefault();

            const target = document.querySelector(anchor.getAttribute("href"));

            if (!target) return;

            target.scrollIntoView({

                behavior: "smooth"

            });

        });

    });

});