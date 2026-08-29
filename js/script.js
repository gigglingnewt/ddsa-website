// ============================================
// Dover & District Skittles Association
// Main JavaScript File
// ============================================

// Page Navigation
const navLinks = document.querySelectorAll('.nav-menu a');
const pages = document.querySelectorAll('.page');
const menuToggle = document.querySelector('.menu-toggle');
const navMenu = document.querySelector('.nav-menu');

// Initialize page on load
document.addEventListener('DOMContentLoaded', function () {
  // Set home as active page
  showPage('home');
  setActiveNav('home');

  // Add click listeners to nav links
  navLinks.forEach((link) => {
    link.addEventListener('click', function (e) {
      e.preventDefault();
      const pageId = this.getAttribute('data-page');
      showPage(pageId);
      setActiveNav(pageId);
      // Close mobile menu
      navMenu.classList.remove('active');
    });
  });

  // Mobile menu toggle
  if (menuToggle) {
    menuToggle.addEventListener('click', function () {
      navMenu.classList.toggle('active');
    });
  }

  // Initialize EmailJS
  emailjs.init('sXhVK0HWYwzsxk0XN'); // Replace with your EmailJS public key

  // Contact form submission
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();
      const name = document.getElementById('name').value;
      const email = document.getElementById('email').value;
      const subject = document.getElementById('subject').value;
      const message = document.getElementById('message').value;

      if (name && email && subject && message) {
        // Send email using EmailJS
        emailjs.send('service_ov0pw11', 'template_il16l2o', {
          from_name: name,
          from_email: email,
          subject: subject,
          message: message,
          to_email: 'sjamesabbott@hotmail.co.uk'
        }).then(function(response) {
          alert('Thank you for your message! We will get back to you soon.');
          contactForm.reset();
        }).catch(function(error) {
          alert('Failed to send message. Please try again later.');
          console.error('EmailJS error:', error);
        });
      } else {
        alert('Please fill in all fields.');
      }
    });
  }

  // (PDF opening handled by global openPdf helper)
});

// Show specific page
function showPage(pageId) {
  pages.forEach((page) => {
    page.classList.remove('active');
  });
  const activePage = document.getElementById(pageId);
  if (activePage) {
    activePage.classList.add('active');
  }
  // Scroll to top when changing pages
  window.scrollTo(0, 0);
}

// Set active navigation link
function setActiveNav(pageId) {
  navLinks.forEach((link) => {
    link.classList.remove('active');
    if (link.getAttribute('data-page') === pageId) {
      link.classList.add('active');
    }
  });
}

// Open a PDF (or other file) in a new tab using a programmatic link click.
// Use `openPdf('pdfs/filename.pdf')` from HTML buttons.
function openPdf(path) {
  const url = encodeURI(path);
  const a = document.createElement('a');
  a.href = url;
  a.target = '_blank';
  a.rel = 'noopener';
  // Some browsers require the element to be in the document to open.
  document.body.appendChild(a);
  a.click();
  a.remove();
}

// Smooth scroll to section (if needed)
function scrollToSection(sectionId) {
  const section = document.getElementById(sectionId);
  if (section) {
    section.scrollIntoView({ behavior: 'smooth' });
  }
}

// Format date for display
function formatDate(dateString) {
  const options = { year: 'numeric', month: 'short', day: 'numeric' };
  return new Date(dateString).toLocaleDateString('en-GB', options);
}

// Close mobile menu when clicking outside
document.addEventListener('click', function (e) {
  if (navMenu && menuToggle && !navMenu.contains(e.target) && !menuToggle.contains(e.target)) {
    navMenu.classList.remove('active');
  }
});
