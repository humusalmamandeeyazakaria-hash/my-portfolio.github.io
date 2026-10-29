/* ==========================================================
   SCRIPT.JS — all the interactivity of the portfolio
   ----------------------------------------------------------
   WHAT IS INSIDE (in order):
     1. Mobile hamburger menu (open / close)
     2. Scroll-reveal animations (fade & slide up)
     3. Highlight the menu link of the section you're viewing
     4. "Back to top" floating button
     5. Automatic year in the footer
     6. Contact form -> opens the visitor's email app

   Every feature is independent: delete a block and the rest
   of the site keeps working.
   ========================================================== */


/* ----------------------------------------------------------
   1. MOBILE HAMBURGER MENU
   Clicking the burger adds/removes the class "open" on the
   menu list (the CSS slides it in and out).
   ---------------------------------------------------------- */
const navToggle = document.getElementById("navToggle");
const navLinks  = document.getElementById("navLinks");

navToggle.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("open");
  navToggle.classList.toggle("open", isOpen);
  navToggle.setAttribute("aria-expanded", isOpen); // for screen readers
});

// Close the menu again when a link inside it is clicked
navLinks.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
    navToggle.classList.remove("open");
    navToggle.setAttribute("aria-expanded", "false");
  });
});


/* ----------------------------------------------------------
   2. SCROLL-REVEAL ANIMATIONS
   Every element with class="reveal" in the HTML starts hidden.
   IntersectionObserver watches them and adds class="visible"
   the moment they scroll into view -> they fade & slide up.
   ---------------------------------------------------------- */
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        revealObserver.unobserve(entry.target); // animate only once
      }
    });
  },
  { threshold: 0.15 } // trigger when 15% of the element is visible
);

document.querySelectorAll(".reveal").forEach((el) => revealObserver.observe(el));


/* ----------------------------------------------------------
   3. ACTIVE MENU LINK + 4. BACK-TO-TOP BUTTON
   Both react to scrolling, so they share one scroll listener.
   ---------------------------------------------------------- */
const sections  = document.querySelectorAll("main section[id]");
const menuItems = document.querySelectorAll(".nav-links a");
const backToTop = document.getElementById("backToTop");

function onScroll() {
  // 3. Which section are we in right now?
  let current = "home";
  sections.forEach((section) => {
    if (window.scrollY >= section.offsetTop - 140) {
      current = section.id;
    }
  });

  // … then highlight the matching menu link
  menuItems.forEach((link) => {
    link.classList.toggle("active", link.getAttribute("href") === "#" + current);
  });

  // 4. Show the "back to top" button after scrolling down a bit
  backToTop.classList.toggle("show", window.scrollY > 500);
}

window.addEventListener("scroll", onScroll);
onScroll(); // run once on page load

// Smoothly scroll back to the top when the button is clicked
backToTop.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});


/* ----------------------------------------------------------
   5. FOOTER YEAR
   Keeps "© 2026 …" always up to date automatically.
   ---------------------------------------------------------- */
document.getElementById("year").textContent = new Date().getFullYear();


/* ----------------------------------------------------------
   6. CONTACT FORM -> EMAIL APP
   A static website has no server to receive form data, so we
   build a "mailto:" link from the form fields. Clicking Send
   opens the visitor's own email app (Gmail, Outlook, Apple
   Mail…) with the message already typed.
   ---------------------------------------------------------- */
const contactForm = document.getElementById("contactForm");

contactForm.addEventListener("submit", (event) => {
  event.preventDefault();                // stop the page from reloading

  const name    = document.getElementById("formName").value.trim();
  const email   = document.getElementById("formEmail").value.trim();
  const message = document.getElementById("formMessage").value.trim();

  const subject = `Portfolio message from ${name}`;
  const body    = `${message}\n\n— ${name} (${email})`;

  // encodeURIComponent makes spaces & special characters URL-safe
  window.location.href =
    `mailto:humusalmamandeeyazakaria@gmail.com` +
    `?subject=${encodeURIComponent(subject)}` +
    `&body=${encodeURIComponent(body)}`;
});
