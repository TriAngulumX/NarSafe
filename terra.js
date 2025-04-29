// Page loading animation
window.addEventListener("load", function () {
  setTimeout(function () {
    document.querySelector(".loader").classList.add("hidden");
  }, 500);
});

// Navbar background change on scroll
window.addEventListener("scroll", function () {
  const navbar = document.querySelector(".navbar");
  if (window.scrollY > 50) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
});

// Scroll animation for elements
const fadeElements = document.querySelectorAll(".fade-in");

const fadeInObserver = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  },
  {
    root: null,
    threshold: 0.1,
    rootMargin: "-20px",
  }
);

fadeElements.forEach((element) => {
  fadeInObserver.observe(element);
});

// Active link highlighting
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".nav-link");

window.addEventListener("scroll", function () {
  let current = "";

  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 100;
    const sectionHeight = section.clientHeight;
    if (window.pageYOffset >= sectionTop) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("href") === `#${current}`) {
      link.classList.add("active");
    }
  });
});

// Show sections on button click
function showSection(sectionId) {
  const section = document.getElementById(sectionId);
  if (section) {
    section.scrollIntoView({ behavior: "smooth" });
  }
}

// Form submission handling
const reflectionForm = document.getElementById("reflectionForm");
if (reflectionForm) {
  reflectionForm.addEventListener("submit", function (e) {
    e.preventDefault();

    // Get current date if not selected
    if (!document.getElementById("reflectionDate").value) {
      const today = new Date().toISOString().split("T")[0];
      document.getElementById("reflectionDate").value = today;
    }

    // Here you would typically send the data to a server
    // For demo purposes, we'll show a success message

    // Create a success alert
    const alertDiv = document.createElement("div");
    alertDiv.className = "alert alert-success alert-dismissible fade show mt-3";
    alertDiv.setAttribute("role", "alert");
    alertDiv.innerHTML = `
        <strong>Success!</strong> Your reflection has been saved.
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
      `;

    // Insert the alert before the form
    reflectionForm.parentNode.insertBefore(alertDiv, reflectionForm);

    // Reset form
    reflectionForm.reset();

    // Hide alert after 3 seconds
    setTimeout(() => {
      alertDiv.classList.remove("show");
      setTimeout(() => alertDiv.remove(), 300);
    }, 3000);
  });
}

// Contact form handling
const contactForm = document.getElementById("contactForm");
if (contactForm) {
  contactForm.addEventListener("submit", function (e) {
    e.preventDefault();

    // Create a success alert
    const alertDiv = document.createElement("div");
    alertDiv.className = "alert alert-success alert-dismissible fade show mt-3";
    alertDiv.setAttribute("role", "alert");
    alertDiv.innerHTML = `
        <strong>Thank you!</strong> Your message has been sent. We'll get back to you soon.
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
      `;

    // Insert the alert before the form
    contactForm.parentNode.insertBefore(alertDiv, contactForm);

    // Reset form
    contactForm.reset();

    // Hide alert after 3 seconds
    setTimeout(() => {
      alertDiv.classList.remove("show");
      setTimeout(() => alertDiv.remove(), 300);
    }, 3000);
  });
}

// Dark mode toggle
const themeToggle = document.getElementById("theme-toggle");
if (themeToggle) {
  // Check for saved theme preference or use system preference
  const prefersDark =
    window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches;
  const savedTheme = localStorage.getItem("theme");

  if (savedTheme === "dark" || (!savedTheme && prefersDark)) {
    document.body.classList.add("dark-mode");
    themeToggle.checked = true;
  }

  themeToggle.addEventListener("change", function () {
    if (this.checked) {
      document.body.classList.add("dark-mode");
      localStorage.setItem("theme", "dark");
    } else {
      document.body.classList.remove("dark-mode");
      localStorage.setItem("theme", "light");
    }
  });
}

// Fungsi untuk memeriksa apakah elemen dalam viewport
function isElementInViewport(el) {
  const rect = el.getBoundingClientRect();
  return (
    rect.top <=
      (window.innerHeight || document.documentElement.clientHeight) * 0.8 &&
    rect.bottom >= 0
  );
}

// Fungsi untuk mengaktifkan animasi elemen timeline
function animateTimelineElements() {
  // Animasi untuk timeline itu sendiri
  const timeline = document.querySelector(".timeline");
  if (
    timeline &&
    isElementInViewport(timeline) &&
    !timeline.classList.contains("animate")
  ) {
    timeline.classList.add("animate");
  }

  // Animasi untuk item-item timeline
  const timelineItems = document.querySelectorAll(".timeline-item");
  timelineItems.forEach((item) => {
    if (isElementInViewport(item) && !item.classList.contains("animate")) {
      item.classList.add("animate");
    }
  });
}

// Tambahkan event listener untuk scroll
document.addEventListener("scroll", animateTimelineElements);

// Panggil fungsi saat halaman dimuat untuk mengecek apakah ada elemen yang sudah terlihat
document.addEventListener("DOMContentLoaded", function () {
  // Tunggu sedikit sebelum trigger animasi pertama kali
  setTimeout(animateTimelineElements, 300);
});

const h3Elements = document.querySelectorAll(".section .container .whyx");
const betaElements = document.querySelectorAll(".section .container .mb-4");
const titlex = document.querySelector(".header-section h1");
const teammemberx = document.querySelectorAll(".team-member");

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const target = entry.target;
        if (target.classList.contains("whyx")) {
          target.classList.add("whyx--visible");
        } else if (target.classList.contains("mb-4")) {
          target.classList.add("mb-4--visible");
        } else if (target === titlex) {
          target.classList.add("h1--visible");
        } else if (target.classList.contains("team-member")) {
          target.classList.add("team-member--visible");
        }
      }
    });
  },
  {
    root: null,
    rootMargin: "0px",
    threshold: 0.1,
  }
);

// Observe semua elemen
h3Elements.forEach((element) => observer.observe(element));
betaElements.forEach((element) => observer.observe(element));
teammemberx.forEach((element) => observer.observe(element));
if (titlex) observer.observe(titlex);
