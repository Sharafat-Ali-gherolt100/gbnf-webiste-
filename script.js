/* =========================================================
   GBNF - Gilgit Baltistan Natural Fruits
   Phase 1 Interactivity
   ========================================================= */

// 1. FRUIT DATA (All major GB fruits with Unsplash image URLs)
const FRUITS = [
  {
    name: "Apricot (Khubani)",
    tag: "Most Famous",
    desc: "The crown jewel of Gilgit-Baltistan. Known for its sweet, rich flavor and sun-dried varieties.",
    img: "https://images.unsplash.com/photo-1595054372084-3b3e29b1554a?q=80&w=800&auto=format&fit=crop"
  },
  {
    name: "Apple (Saib)",
    tag: "Crisp & Sweet",
    desc: "Grown in the high altitudes, our apples are exceptionally crisp, juicy, and naturally sweet.",
    img: "https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?q=80&w=800&auto=format&fit=crop"
  },
  {
    name: "Cherry (Cheri)",
    tag: "Summer Delight",
    desc: "Deep red, plump cherries harvested in the short summer season. A true seasonal delicacy.",
    img: "https://images.unsplash.com/photo-1528821128474-27f963b062bf?q=80&w=800&auto=format&fit=crop"
  },
  {
    name: "Walnut (Akhrot)",
    tag: "Premium Quality",
    desc: "Rich in Omega-3, our walnuts are harvested from ancient trees and are highly sought after.",
    img: "https://images.unsplash.com/photo-1563636619-e9143da7973b?q=80&w=800&auto=format&fit=crop"
  },
  {
    name: "Pear (Nashpati)",
    tag: "Juicy & Fresh",
    desc: "Soft, buttery texture with a honey-like sweetness, grown in the cooler valleys.",
    img: "https://images.unsplash.com/photo-1615485925600-97237c4fc1ec?q=80&w=800&auto=format&fit=crop"
  },
  {
    name: "Grapes (Angoor)",
    tag: "Valley Grown",
    desc: "Sweet and seedless varieties that thrive in the micro-climates of the northern areas.",
    img: "https://images.unsplash.com/photo-1537640538966-79f369143f8f?q=80&w=800&auto=format&fit=crop"
  },
  {
    name: "Peach (Aaru)",
    tag: "Soft & Fragrant",
    desc: "Incredibly fragrant and juicy peaches that melt in your mouth.",
    img: "https://images.unsplash.com/photo-1629828874514-1e1e4a8cff48?q=80&w=800&auto=format&fit=crop"
  },
  {
    name: "Pomegranate (Anar)",
    tag: "Rich in Antioxidants",
    desc: "Ruby-red seeds with a perfect balance of sweet and tart flavors.",
    img: "https://images.unsplash.com/photo-1541344999736-83eca272f6fc?q=80&w=800&auto=format&fit=crop"
  }
];

// 2. UTILITY FUNCTIONS
const $ = (s, ctx=document) => ctx.querySelector(s);
const $$ = (s, ctx=document) => [...ctx.querySelectorAll(s)];

// 3. SET CURRENT YEAR IN FOOTER
$("#year").textContent = new Date().getFullYear();

// 4. STICKY HEADER SHADOW
const header = $("#siteHeader");
window.addEventListener("scroll", () => {
  header.classList.toggle("scrolled", window.scrollY > 20);
}, { passive: true });

// 5. MOBILE NAVIGATION
const hamburger = $("#hamburger");
const mainNav = $("#mainNav");

hamburger.addEventListener("click", () => {
  const isOpen = mainNav.classList.toggle("open");
  hamburger.classList.toggle("open", isOpen);
  hamburger.setAttribute("aria-expanded", String(isOpen));
});

// Close mobile menu when a link is clicked
$$(".nav-link", mainNav).forEach(link => {
  link.addEventListener("click", () => {
    mainNav.classList.remove("open");
    hamburger.classList.remove("open");
    hamburger.setAttribute("aria-expanded", "false");
  });
});

// 6. ACTIVE NAV LINK ON SCROLL (Scroll Spy)
const sections = $$("section[id]");
const navLinks = $$(".nav-link");

const spy = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      navLinks.forEach(l => l.classList.toggle("active",
        l.getAttribute("href") === "#" + e.target.id));
    }
  });
}, { rootMargin: "-40% 0px -50% 0px" });

sections.forEach(s => spy.observe(s));

// 7. SCROLL REVEAL ANIMATIONS
const revealObs = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add("in");
      revealObs.unobserve(e.target); // Reveal only once
    }
  });
}, { threshold: 0.15 });

$$(".reveal").forEach(el => revealObs.observe(el));

// 8. RENDER FRUIT GALLERY DYNAMICALLY
const fruitGrid = $("#fruitGrid");

function renderFruits() {
  fruitGrid.innerHTML = FRUITS.map((fruit, index) => `
    <article class="fruit-card reveal in" style="transition-delay: ${index * 0.1}s">
      <div class="fruit-img-wrapper">
        <img src="${fruit.img}" alt="${fruit.name}" loading="lazy" />
        <span class="fruit-tag">${fruit.tag}</span>
      </div>
      <div class="fruit-info">
        <h3>${fruit.name}</h3>
        <p>${fruit.desc}</p>
      </div>
    </article>
  `).join("");
}

// Initialize the gallery
renderFruits();