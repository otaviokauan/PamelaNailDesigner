document.addEventListener("DOMContentLoaded", () => {
  const ease = "cubic-bezier(0.4, 0, 0.2, 1)";
  const navToggle = document.getElementById("nav-toggle");
  const navMenu = document.getElementById("nav-menu");
  const navbar = document.querySelector(".navbar");

  // --- Mobile Nav Toggle ---
  if (navToggle && navMenu) {
    const bars = navToggle.querySelectorAll(".bar");
    bars.forEach(bar => {
      bar.style.transition = `transform 0.3s ${ease}, opacity 0.3s ${ease}`;
      bar.style.transformOrigin = "center";
    });

    navToggle.addEventListener("click", () => {
      navMenu.classList.toggle("active");
      navToggle.classList.toggle("active");

      bars.forEach((bar, i) => {
        if (navToggle.classList.contains("active")) {
          if (i === 0) bar.style.transform = "rotate(45deg) translate(5px, 5px)";
          if (i === 1) bar.style.opacity = "0";
          if (i === 2) bar.style.transform = "rotate(-45deg) translate(7px, -6px)";
        } else {
          bar.style.transform = "none";
          bar.style.opacity = "1";
        }
      });
    });
  }

  // --- Close mobile menu on link click ---
  document.querySelectorAll(".nav-link").forEach(link => {
    link.addEventListener("click", () => {
      navMenu.classList.remove("active");
      navToggle.classList.remove("active");
      const bars = navToggle.querySelectorAll(".bar");
      bars.forEach(bar => {
        bar.style.transform = "none";
        bar.style.opacity = "1";
      });
    });
  });

  // --- Smooth scroll ---
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", e => {
      e.preventDefault();
      const target = document.querySelector(anchor.getAttribute("href"));
      if (target) {
        const offsetTop = target.offsetTop - 80;
        window.scrollTo({ top: offsetTop, behavior: "smooth" });
      }
    });
  });

  // --- Navbar scroll effect ---
  let lastScrollTop = 0;
  window.addEventListener("scroll", () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    if (scrollTop > 50) {
      navbar.style.background = "rgba(255, 255, 255, 0.98)";
      navbar.style.boxShadow = "0 4px 20px rgba(0, 0, 0, 0.1)";
    } else {
      navbar.style.background = "rgba(255, 255, 255, 0.95)";
      navbar.style.boxShadow = "none";
    }

    navbar.style.transition = `transform 0.4s ${ease}`;

    if (scrollTop > lastScrollTop && scrollTop > 100) {
      navbar.style.transform = "translateY(-100%)";
    } else {
      navbar.style.transform = "translateY(0)";
    }
    lastScrollTop = scrollTop;
  });

  // --- Intersection Observer for animations ---
  const observerOptions = { threshold: 0.1, rootMargin: "0px 0px -50px 0px" };
  const fadeInObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("animate-in");
        fadeInObserver.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // --- Animate portfolio and section headers (sem animação nos contatos) ---
  const animateElements = document.querySelectorAll(".portfolio-card, .section-header");
  animateElements.forEach(el => {
    el.style.opacity = "0";
    el.style.transform = "translateY(25px) scale(0.98)";
    el.style.transition = `opacity 0.5s ${ease}, transform 0.5s ${ease}`;
    fadeInObserver.observe(el);
  });

  // --- Remover animação das contact-card ---
  const contactCards = document.querySelectorAll(".contact-card");
  contactCards.forEach(card => {
    card.style.opacity = "1";
    card.style.transform = "none";
    card.style.transition = "none";
  });

  // --- Styles for animate-in and navbar ---
  const style = document.createElement("style");
  style.textContent = `
    .animate-in {
      opacity: 1 !important;
      transform: translateY(0) scale(1) !important;
      will-change: opacity, transform;
    }
    .navbar {
      transition: background 0.3s ${ease}, box-shadow 0.3s ${ease}, transform 0.4s ${ease};
      will-change: transform, background, box-shadow;
    }
    #nav-toggle .bar {
      transition: transform 0.3s ${ease}, opacity 0.3s ${ease};
      will-change: transform, opacity;
    }
    /* Contato: botões com hover elegante */
    .contact-card {
      background: #fff;
      border-radius: 12px;
      box-shadow: 0 6px 18px rgba(0,0,0,0.08);
      transition: box-shadow 0.4s ${ease}, transform 0.4s ${ease};
      cursor: default;
      will-change: transform, box-shadow;
    }
    .contact-card:hover {
      box-shadow: 0 12px 30px rgba(0,0,0,0.15);
      transform: translateY(-6px);
    }
    .contact-btn {
      background: var(--primary);
      color: #fff;
      border: none;
      padding: 0.75em 1.8em;
      border-radius: 30px;
      font-weight: 600;
      font-size: 1rem;
      cursor: pointer;
      box-shadow: 0 6px 12px rgba(0,0,0,0.12);
      transition: background-color 0.3s ${ease}, box-shadow 0.3s ${ease}, transform 0.3s ${ease};
      will-change: background-color, box-shadow, transform;
      user-select: none;
    }
    .contact-btn:hover {
      background-color: var(--primary-dark);
      box-shadow: 0 10px 20px rgba(0,0,0,0.2);
      transform: scale(1.05);
    }
    .contact-btn:active {
      transform: scale(0.95);
      box-shadow: 0 6px 12px rgba(0,0,0,0.15);
    }
  `;
  document.head.appendChild(style);

  // --- Portfolio card hover ---
  const portfolioCards = document.querySelectorAll(".portfolio-card");
  portfolioCards.forEach(card => {
    card.style.transition = `transform 0.3s ${ease}, box-shadow 0.3s ${ease}`;
    card.style.willChange = "transform, box-shadow";
    card.addEventListener("mouseenter", () => {
      card.style.transform = "translateY(-8px) scale(1.05)";
      card.style.boxShadow = "0 12px 24px rgba(0,0,0,0.15)";
    });
    card.addEventListener("mouseleave", () => {
      card.style.transform = "translateY(0) scale(1)";
      card.style.boxShadow = "0 4px 12px rgba(0,0,0,0.08)";
    });
  });

  // --- Contact buttons functionality ---
  if (contactCards[0]) {
    const whatsappBtn = contactCards[0].querySelector(".contact-btn");
    if (whatsappBtn) {
      whatsappBtn.addEventListener("click", e => {
        e.preventDefault();
        const message = encodeURIComponent("Olá! Gostaria de agendar um horário para fazer as unhas.");
        window.open(`https://wa.me/5542999892979?text=${message}`, "_blank");
      });
    }
  }

  if (contactCards[1]) {
    const instagramBtn = contactCards[1].querySelector(".contact-btn");
    if (instagramBtn) {
      instagramBtn.addEventListener("click", e => {
        e.preventDefault();
        window.open("https://instagram.com/pamelaa_feltrin", "_blank");
      });
    }
  }

  // --- Parallax suave ---
  const heroImage = document.querySelector(".profile-img");
  const heroText = document.querySelector(".hero-text");
  let latestScroll = 0;
  let ticking = false;

  function updateParallax() {
    if (heroImage && latestScroll < window.innerHeight) {
      heroImage.style.transform = `translateY(${latestScroll * 0.2}px)`;
      heroImage.style.transition = "transform 0.3s ease-out";
    }
    if (heroText && latestScroll < window.innerHeight) {
      heroText.style.transform = `translateY(${latestScroll * 0.07}px)`;
      heroText.style.transition = "transform 0.3s ease-out";
    }
    ticking = false;
  }

  window.addEventListener("scroll", () => {
    latestScroll = window.pageYOffset;
    if (!ticking) {
      window.requestAnimationFrame(updateParallax);
      ticking = true;
    }
  });

  // --- Typing effect lento no início e acelerando depois ---
  const heroTitle = document.querySelector(".title-main");
  if (heroTitle) {
    const text = heroTitle.textContent.trim();
    heroTitle.textContent = "";
    heroTitle.style.borderRight = "2px solid var(--primary)";
    let i = 0;

    function typeWriter() {
      if (i < text.length) {
        heroTitle.textContent += text.charAt(i);
        i++;
        let delay = i < 5 ? 200 : 60;
        setTimeout(typeWriter, delay);
      } else {
        setTimeout(() => {
          heroTitle.style.borderRight = "none";
        }, 1000);
      }
    }

    setTimeout(typeWriter, 1000);
  }

  // --- Loading animation suave ---
  const loadedStyle = document.createElement("style");
  loadedStyle.textContent = `
    body {
      opacity: 0;
      transition: opacity 0.5s ${ease};
    }
    body.loaded {
      opacity: 1;
    }
  `;
  document.head.appendChild(loadedStyle);

  window.addEventListener("load", () => {
    document.body.classList.add("loaded");
  });

  // --- Scroll indicator ---
  const scrollIndicator = document.querySelector(".hero-scroll");
  if (scrollIndicator) {
    scrollIndicator.style.transition = `opacity 0.4s ${ease}, transform 0.4s ${ease}`;
    window.addEventListener("scroll", () => {
      const scrolled = window.pageYOffset;
      if (scrolled > 100) {
        scrollIndicator.style.opacity = "0";
        scrollIndicator.style.transform = "translateX(-50%) translateY(20px)";
      } else {
        scrollIndicator.style.opacity = "1";
        scrollIndicator.style.transform = "translateX(-50%) translateY(0)";
      }
    });
  }

  // --- Cursor trail sutil ---
  let mouseX = 0, mouseY = 0;
  let trailX = 0, trailY = 0;

  document.addEventListener("mousemove", e => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  const trail = document.createElement("div");
  trail.style.cssText = `
    position: fixed;
    width: 18px;
    height: 18px;
    background: radial-gradient(circle, var(--primary) 0%, transparent 70%);
    border-radius: 50%;
    pointer-events: none;
    z-index: 9999;
    opacity: 0.25;
    transition: opacity 0.3s ease;
    will-change: transform, opacity;
  `;
  document.body.appendChild(trail);

  function animateTrail() {
    trailX += (mouseX - trailX) * 0.12;
    trailY += (mouseY - trailY) * 0.12;

    trail.style.transform = `translate3d(${trailX - 9}px, ${trailY - 9}px, 0)`;

    requestAnimationFrame(animateTrail);
  }
  animateTrail();

  if (window.innerWidth <= 768) {
    trail.style.display = "none";
  }
});
