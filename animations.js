/**
 * ZYTRAH Luxury Attars - Interactive FX & Canvas Engine
 * File: animations.js
 * Description: Powers floating gold dust particle canvas, hero slider,
 * scroll-triggered element reveals, and navbar scroll effects.
 */

document.addEventListener("DOMContentLoaded", () => {
  initParticleCanvas();
  initHeroSlider();
  initScrollAnimations();
  initNavbarScrollEffect();
});

/* ==========================================================================
   1. Floating Gold Dust Particle Canvas Engine
   ========================================================================== */
function initParticleCanvas() {
  const canvas = document.getElementById("particle-canvas");
  if (!canvas) return;

  const ctx = canvas.getContext("2d");
  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  const particleCount = Math.floor(width < 768 ? 30 : 65);
  const particles = [];

  class GoldParticle {
    constructor() {
      this.reset();
    }

    reset() {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.size = Math.random() * 2 + 0.5;
      this.speedY = -(Math.random() * 0.4 + 0.1);
      this.speedX = Math.random() * 0.3 - 0.15;
      this.opacity = Math.random() * 0.7 + 0.2;
      this.fadeSpeed = Math.random() * 0.005 + 0.002;
    }

    update() {
      this.y += this.speedY;
      this.x += this.speedX;

      // Pulse opacity
      this.opacity += Math.sin(Date.now() * 0.002) * this.fadeSpeed;

      // Wrap around screen top/bottom
      if (this.y < -10 || this.x < -10 || this.x > width + 10) {
        this.y = height + 10;
        this.x = Math.random() * width;
      }
    }

    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(212, 175, 55, ₹{Math.max(0.1, Math.min(1, this.opacity))})`;
      ctx.shadowBlur = 8;
      ctx.shadowColor = "rgba(212, 175, 55, 0.8)";
      ctx.fill();
    }
  }

  // Populate particle array
  for (let i = 0; i < particleCount; i++) {
    particles.push(new GoldParticle());
  }

  // Animation Loop
  function animateParticles() {
    ctx.clearRect(0, 0, width, height);
    particles.forEach(p => {
      p.update();
      p.draw();
    });
    requestAnimationFrame(animateParticles);
  }

  animateParticles();

  // Resize canvas on window resize
  window.addEventListener("resize", () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });
}

/* ==========================================================================
   2. Hero Banner Slider Engine
   ========================================================================== */
let currentSlideIndex = 0;
let sliderInterval = null;

function initHeroSlider() {
  const slides = document.querySelectorAll(".hero-slide");
  if (slides.length <= 1) return;

  startSlideTimer();
}

function startSlideTimer() {
  sliderInterval = setInterval(() => {
    const slides = document.querySelectorAll(".hero-slide");
    currentSlideIndex = (currentSlideIndex + 1) % slides.length;
    switchHeroSlide(currentSlideIndex);
  }, 6000); // Change banner every 6 seconds
}

function switchHeroSlide(index) {
  const slides = document.querySelectorAll(".hero-slide");
  const dots = document.querySelectorAll(".slider-dots .dot");

  if (!slides.length) return;

  slides.forEach((slide, i) => {
    slide.classList.toggle("active", i === index);
  });

  dots.forEach((dot, i) => {
    dot.classList.toggle("active", i === index);
  });

  currentSlideIndex = index;

  // Reset timer on manual dot click
  clearInterval(sliderInterval);
  startSlideTimer();
}

/* ==========================================================================
   3. Scroll Reveal Animation Observer
   ========================================================================== */
function initScrollAnimations() {
  const revealElements = document.querySelectorAll(
    ".section-header, .glass-card, .policy-card, .about-text-col, .contact-form-box"
  );

  // Add initial inline style transition properties
  revealElements.forEach(el => {
    el.style.opacity = "0";
    el.style.transform = "translateY(30px)";
    el.style.transition = "opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1), transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)";
  });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.15
  });

  revealElements.forEach(el => observer.observe(el));
}

/* ==========================================================================
   4. Navbar Sticky Glass Scroll Effect
   ========================================================================== */
function initNavbarScrollEffect() {
  const navbar = document.getElementById("navbar");
  if (!navbar) return;

  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      navbar.style.padding = "10px 0";
      navbar.style.background = "rgba(5, 5, 5, 0.95)";
      navbar.style.boxShadow = "0 10px 30px rgba(0,0,0,0.8)";
    } else {
      navbar.style.padding = "16px 0";
      navbar.style.background = "rgba(10, 10, 10, 0.85)";
      navbar.style.boxShadow = "none";
    }
  });
}