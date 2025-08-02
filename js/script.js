// DOM Content Loaded
document.addEventListener("DOMContentLoaded", function () {
  // Initialize all functionality
  initNavigation();
  initPortfolioFilter();
  initContactForm();
  initScrollAnimations();
  initSmoothScrolling();

  // Initialize advanced features with delay
  setTimeout(() => {
    initCounterAnimation();
  }, 500);
});

// Window load event
window.addEventListener("load", function () {
  // Hide loading spinner if exists
  const loader = document.querySelector(".loader");
  if (loader) {
    loader.style.opacity = "0";
    setTimeout(() => (loader.style.display = "none"), 500);
  }

  // Start typing animation
  setTimeout(initTypingAnimation, 1000);
});

// Navigation Functionality
function initNavigation() {
  const navToggle = document.getElementById("nav-toggle");
  const navMenu = document.getElementById("nav-menu");
  const navLinks = document.querySelectorAll(".nav-link");

  // Mobile menu toggle
  if (navToggle) {
    navToggle.addEventListener("click", function () {
      navMenu.classList.toggle("active");

      // Animate hamburger menu
      const bars = navToggle.querySelectorAll(".bar");
      bars.forEach((bar, index) => {
        if (navMenu.classList.contains("active")) {
          if (index === 0) bar.style.transform = "rotate(-45deg) translate(-5px, 6px)";
          if (index === 1) bar.style.opacity = "0";
          if (index === 2) bar.style.transform = "rotate(45deg) translate(-5px, -6px)";
        } else {
          bar.style.transform = "none";
          bar.style.opacity = "1";
        }
      });
    });
  }

  // Close mobile menu when clicking on a link
  navLinks.forEach((link) => {
    link.addEventListener("click", function () {
      if (navMenu.classList.contains("active")) {
        navMenu.classList.remove("active");
        const bars = navToggle.querySelectorAll(".bar");
        bars.forEach((bar) => {
          bar.style.transform = "none";
          bar.style.opacity = "1";
        });
      }
    });
  });

  // Active nav link on scroll
  window.addEventListener("scroll", function () {
    const sections = document.querySelectorAll("section[id]");
    const scrollPos = window.scrollY + 100;

    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute("id");
      const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

      if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
        navLinks.forEach((link) => link.classList.remove("active"));
        if (navLink) navLink.classList.add("active");
      }
    });

    // Navbar background on scroll
    const navbar = document.querySelector(".navbar");
    if (window.scrollY > 50) {
      navbar.style.background = "rgba(10, 10, 10, 0.98)";
    } else {
      navbar.style.background = "rgba(10, 10, 10, 0.95)";
    }
  });
}

// Portfolio Filter Functionality
function initPortfolioFilter() {
  const filterButtons = document.querySelectorAll(".filter-btn");
  const portfolioItems = document.querySelectorAll(".portfolio-item");

  filterButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const filter = this.getAttribute("data-filter");

      // Update active button
      filterButtons.forEach((btn) => btn.classList.remove("active"));
      this.classList.add("active");

      // Filter portfolio items
      portfolioItems.forEach((item) => {
        const category = item.getAttribute("data-category");

        if (filter === "all" || category === filter) {
          item.classList.remove("hidden");
          item.classList.add("visible");
          setTimeout(() => {
            item.style.display = "block";
          }, 10);
        } else {
          item.classList.remove("visible");
          item.classList.add("hidden");
          setTimeout(() => {
            if (item.classList.contains("hidden")) {
              item.style.display = "none";
            }
          }, 300);
        }
      });
    });
  });
}

// Contact Form Functionality
function initContactForm() {
  const contactForm = document.getElementById("contactForm");

  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();

      // Get form data
      const formData = new FormData(this);
      const data = Object.fromEntries(formData);

      // Basic validation
      if (!validateForm(data)) {
        return;
      }

      // Show loading state
      const submitBtn = this.querySelector('button[type="submit"]');
      const originalText = submitBtn.textContent;
      submitBtn.textContent = "Sending...";
      submitBtn.disabled = true;

      // Simulate form submission (replace with actual submission logic)
      setTimeout(() => {
        showNotification("Thank you! Your message has been sent successfully.", "success");
        contactForm.reset();
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
      }, 2000);
    });
  }
}

// Form Validation
function validateForm(data) {
  const requiredFields = ["name", "email", "service", "message"];
  const errors = [];

  requiredFields.forEach((field) => {
    if (!data[field] || data[field].trim() === "") {
      errors.push(`${field.charAt(0).toUpperCase() + field.slice(1)} is required`);
    }
  });

  // Email validation
  if (data.email && !isValidEmail(data.email)) {
    errors.push("Please enter a valid email address");
  }

  if (errors.length > 0) {
    showNotification(errors.join("<br>"), "error");
    return false;
  }

  return true;
}

// Email validation helper
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Notification System
function showNotification(message, type = "info") {
  // Remove existing notifications
  const existingNotification = document.querySelector(".notification");
  if (existingNotification) {
    existingNotification.remove();
  }

  // Create notification element
  const notification = document.createElement("div");
  notification.className = `notification notification-${type}`;
  notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-message">${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;

  // Add styles
  Object.assign(notification.style, {
    position: "fixed",
    top: "20px",
    right: "20px",
    background: type === "success" ? "#4CAF50" : type === "error" ? "#f44336" : "#2196F3",
    color: "white",
    padding: "15px 20px",
    borderRadius: "10px",
    boxShadow: "0 4px 20px rgba(0,0,0,0.3)",
    zIndex: "10000",
    maxWidth: "400px",
    fontSize: "14px",
    lineHeight: "1.5",
    opacity: "0",
    transform: "translateX(100%)",
    transition: "all 0.3s ease",
  });

  // Add to page
  document.body.appendChild(notification);

  // Animate in
  setTimeout(() => {
    notification.style.opacity = "1";
    notification.style.transform = "translateX(0)";
  }, 10);

  // Close button functionality
  const closeBtn = notification.querySelector(".notification-close");
  closeBtn.style.cssText = `
        background: none;
        border: none;
        color: white;
        font-size: 18px;
        cursor: pointer;
        margin-left: 10px;
        padding: 0;
        float: right;
    `;

  closeBtn.addEventListener("click", () => {
    notification.style.opacity = "0";
    notification.style.transform = "translateX(100%)";
    setTimeout(() => notification.remove(), 300);
  });

  // Auto remove after 5 seconds
  setTimeout(() => {
    if (notification.parentNode) {
      notification.style.opacity = "0";
      notification.style.transform = "translateX(100%)";
      setTimeout(() => notification.remove(), 300);
    }
  }, 5000);
}

// Scroll Animations
function initScrollAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  }, observerOptions);

  // Observe elements for animation
  const animatedElements = document.querySelectorAll(
    ".service-card, .portfolio-item, .testimonial-card, .about-text, .contact-info, .contact-form"
  );
  animatedElements.forEach((el) => {
    el.classList.add("fade-in");
    observer.observe(el);
  });
}

// Smooth Scrolling
function initSmoothScrolling() {
  const links = document.querySelectorAll('a[href^="#"]');

  links.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();

      const targetId = this.getAttribute("href").substring(1);
      const targetElement = document.getElementById(targetId);

      if (targetElement) {
        const offsetTop = targetElement.offsetTop - 80; // Account for fixed navbar

        window.scrollTo({
          top: offsetTop,
          behavior: "smooth",
        });
      }
    });
  });
}

// Typing Animation for Hero Title
function initTypingAnimation() {
  const titleElement = document.querySelector(".hero-title");
  if (!titleElement) return;

  const originalText = titleElement.textContent;
  titleElement.textContent = "";

  let i = 0;
  const typeInterval = setInterval(() => {
    titleElement.textContent += originalText.charAt(i);
    i++;

    if (i >= originalText.length) {
      clearInterval(typeInterval);
    }
  }, 100);
}

// Counter Animation for Stats
function initCounterAnimation() {
  const counters = document.querySelectorAll(".stat-number");

  const animateCounter = (counter) => {
    const target = parseInt(counter.textContent.replace("+", ""));
    const increment = target / 50;
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        counter.textContent = target + "+";
        clearInterval(timer);
      } else {
        counter.textContent = Math.ceil(current) + "+";
      }
    }, 50);
  };

  // Use Intersection Observer to trigger animation when visible
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        observer.unobserve(entry.target);
      }
    });
  });

  counters.forEach((counter) => {
    observer.observe(counter);
  });
}

// Utility Functions
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Optimized scroll handler
const optimizedScrollHandler = debounce(function () {
  // Add any scroll-based functionality here
}, 10);

window.addEventListener("scroll", optimizedScrollHandler);

// Error handling
window.addEventListener("error", function (e) {
  console.error("JavaScript error:", e.error);
});

// Console welcome message
console.log(`
🎨 ABC Sri Lanka - Creative Marketing Agency
👋 Welcome to our portfolio website!
📧 Contact: aja.kumara@gmail.com
📱 Phone: +94 71 5312 611

Built with ❤️ using HTML, CSS & JavaScript
`);
