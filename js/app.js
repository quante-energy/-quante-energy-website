// Initialize GSAP ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

// Navigation toggle for mobile
const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');

navToggle.addEventListener('click', () => {
  navLinks.classList.toggle('active');
  navToggle.classList.toggle('active');
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
  if (!navToggle.contains(e.target) && !navLinks.contains(e.target)) {
    navLinks.classList.remove('active');
    navToggle.classList.remove('active');
  }
});

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      window.scrollTo({
        top: target.offsetTop - 80,
        behavior: 'smooth'
      });
      // Close mobile menu after clicking
      navLinks.classList.remove('active');
      navToggle.classList.remove('active');
    }
  });
});

// Hero animations
window.addEventListener('load', () => {
  const heroElements = document.querySelectorAll('.fade-in');
  heroElements.forEach((el, index) => {
    setTimeout(() => {
      el.classList.add('visible');
    }, index * 200);
  });
});

// Scroll animations
const animateOnScroll = () => {
  // Problem cards animation
  gsap.from('.problem-card', {
    scrollTrigger: {
      trigger: '.problem-grid',
      start: 'top center+=100',
    },
    y: 50,
    opacity: 0,
    duration: 0.6,
    stagger: 0.2
  });

  // Solution items animation
  gsap.from('.solution-item', {
    scrollTrigger: {
      trigger: '.solution-wrapper',
      start: 'top center+=100',
    },
    x: -50,
    opacity: 0,
    duration: 0.6,
    stagger: 0.2
  });

  // Benefits animation
  gsap.from('.benefit-card', {
    scrollTrigger: {
      trigger: '.benefits-grid',
      start: 'top center+=100',
    },
    y: 50,
    opacity: 0,
    duration: 0.6,
    stagger: 0.2
  });

  // Process steps animation
  gsap.from('.process-step', {
    scrollTrigger: {
      trigger: '.process-timeline',
      start: 'top center+=100',
    },
    y: 50,
    opacity: 0,
    duration: 0.6,
    stagger: 0.2
  });

  gsap.from('.process-step3', {
    scrollTrigger: {
      trigger: '.process-timeline3',
      start: 'top center+=100',
    },
    y: 50,
    opacity: 0,
    duration: 0.6,
    stagger: 0.2
  });

  // About stats animation
  gsap.from('.about-stats .stat', {
    scrollTrigger: {
      trigger: '.about-stats',
      start: 'top center+=100',
    },
    scale: 0.5,
    opacity: 0,
    duration: 0.6,
    stagger: 0.2
  });
};

// Initialize animations
animateOnScroll();

// Form handling
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const submitButton = contactForm.querySelector('button[type="submit"]');
    const originalText = submitButton.textContent;
    submitButton.textContent = 'Sending...';
    submitButton.disabled = true;

    // Collect form data
    const formData = new FormData(contactForm);
    const data = Object.fromEntries(formData.entries());

    try {
      // Here you would typically send the data to your backend
      // For now, we'll just simulate a delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Show success message
      alert('Thank you for your message! We will get back to you soon.');
      contactForm.reset();
    } catch (error) {
      alert('Sorry, there was an error sending your message. Please try again.');
    } finally {
      submitButton.textContent = originalText;
      submitButton.disabled = false;
    }
  });
}

// Navbar scroll behavior
let lastScroll = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
  const currentScroll = window.pageYOffset;
  
  if (currentScroll <= 0) {
    navbar.classList.remove('scroll-up');
    return;
  }
  
  if (currentScroll > lastScroll && !navbar.classList.contains('scroll-down')) {
    // Scrolling down
    navbar.classList.remove('scroll-up');
    navbar.classList.add('scroll-down');
  } else if (currentScroll < lastScroll && navbar.classList.contains('scroll-down')) {
    // Scrolling up
    navbar.classList.remove('scroll-down');
    navbar.classList.add('scroll-up');
  }
  
  lastScroll = currentScroll;
});