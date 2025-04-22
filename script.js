// DOM Elements
const header = document.querySelector('header');
const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('nav');
const themeToggle = document.querySelector('.theme-toggle');
const backToTop = document.querySelector('.back-to-top');
const navLinks = document.querySelectorAll('nav a');
const contactForm = document.getElementById('contactForm');

// Function to check if dark mode is preferred
function checkDarkMode() {
  const isDarkMode = localStorage.getItem('darkMode') === 'true';
  if (isDarkMode) {
    document.body.classList.add('dark-mode');
    themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
  } else {
    document.body.classList.remove('dark-mode');
    themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
  }
}

// Function to handle scroll events
function handleScroll() {
  // Change header background on scroll
  if (window.scrollY > 50) {
    header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    header.style.height = '60px';
  } else {
    header.style.boxShadow = 'none';
    header.style.height = '70px';
  }

  // Show/hide back to top button
  if (window.scrollY > 500) {
    backToTop.classList.add('visible');
  } else {
    backToTop.classList.remove('visible');
  }

  // Active menu item on scroll
  const sections = document.querySelectorAll('section');
  let currentSection = '';

  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    
    if (window.scrollY >= (sectionTop - 200)) {
      currentSection = section.getAttribute('id');
    }
  });

  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${currentSection}`) {
      link.classList.add('active');
    }
  });
}

// Function to handle mobile menu
function toggleMobileMenu() {
  nav.classList.toggle('active');
  menuToggle.innerHTML = nav.classList.contains('active') 
    ? '<i class="fas fa-times"></i>' 
    : '<i class="fas fa-bars"></i>';
}

// Function to toggle theme
function toggleTheme() {
  document.body.classList.toggle('dark-mode');
  const isDarkMode = document.body.classList.contains('dark-mode');
  localStorage.setItem('darkMode', isDarkMode);
  
  themeToggle.innerHTML = isDarkMode 
    ? '<i class="fas fa-sun"></i>' 
    : '<i class="fas fa-moon"></i>';
}

// Function to close mobile menu when link is clicked
function closeMobileMenuOnClick() {
  if (window.innerWidth <= 768) {
    nav.classList.remove('active');
    menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
  }
}

// Function to animate skill bars on scroll
function animateSkillBars() {
  const skillSection = document.querySelector('.skills');
  const skillItems = document.querySelectorAll('.skill-progress');
  
  const sectionPos = skillSection.getBoundingClientRect().top;
  const screenPosition = window.innerHeight / 1.3;
  
  if (sectionPos < screenPosition) {
    skillItems.forEach(item => {
      item.style.width = item.style.width; // Retrigger animation
    });
  }
}

// Function to handle contact form submission
function handleFormSubmit(e) {
  e.preventDefault();
  
  // Get form values
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const subject = document.getElementById('subject').value;
  const message = document.getElementById('message').value;
  
  // Validate form (basic validation)
  if (name.trim() === '' || email.trim() === '' || subject.trim() === '' || message.trim() === '') {
    alert('Please fill in all fields');
    return;
  }
  
  // Email format validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    alert('Please enter a valid email address');
    return;
  }
  
  // Here you would normally send the form data to a server
  // For this example, we'll just log and reset the form
  console.log({ name, email, subject, message });
  alert('Thank you for your message! I will get back to you soon.');
  contactForm.reset();
}

// Function to create a typing animation for the hero title
function setupTypingAnimation() {
  const heroTitle = document.querySelector('.hero-text h1');
  const originalText = heroTitle.innerHTML;
  const highlight = heroTitle.querySelector('.highlight');
  const highlightText = highlight.textContent;
  
  // Skip animation if it's already been played
  if (sessionStorage.getItem('animationPlayed')) {
    return;
  }
  
  heroTitle.innerHTML = `Hi, I'm <span class="highlight"></span>`;
  const highlightElement = heroTitle.querySelector('.highlight');
  
  let index = 0;
  const typeInterval = setInterval(() => {
    highlightElement.textContent += highlightText.charAt(index);
    index++;
    
    if (index >= highlightText.length) {
      clearInterval(typeInterval);
      sessionStorage.setItem('animationPlayed', 'true');
    }
  }, 150);
}

// Function to reveal elements on scroll
function revealOnScroll() {
  const revealElements = document.querySelectorAll('.section-header, .skill-category, .project-card, .certification-card, .hackathon-card, .research-item');
  
  revealElements.forEach(element => {
    const elementTop = element.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;
    
    if (elementTop < windowHeight - 100) {
      element.style.opacity = 1;
      element.style.transform = 'translateY(0)';
    }
  });
}

// Function to initialize styling for reveal animations
function initRevealAnimations() {
  const elements = document.querySelectorAll('.section-header, .skill-category, .project-card, .certification-card, .hackathon-card, .research-item');
  
  elements.forEach(element => {
    element.style.opacity = 0;
    element.style.transform = 'translateY(20px)';
    element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
  });
}

// Initialize when DOM is fully loaded
document.addEventListener('DOMContentLoaded', function() {
  // Check for dark mode preference
  checkDarkMode();
  
  // Add scroll event listener
  window.addEventListener('scroll', function() {
    handleScroll();
    animateSkillBars();
    revealOnScroll();
  });
  
  // Mobile menu toggle
  menuToggle.addEventListener('click', toggleMobileMenu);
  
  // Theme toggle
  themeToggle.addEventListener('click', toggleTheme);
  
  // Smooth scrolling for navigation links
  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const href = this.getAttribute('href');
      const offsetTop = document.querySelector(href).offsetTop;
      
      window.scrollTo({
        top: offsetTop - 70,
        behavior: 'smooth'
      });
      
      closeMobileMenuOnClick();
    });
  });
  
  // Contact form submission
  if (contactForm) {
    contactForm.addEventListener('submit', handleFormSubmit);
  }
  
  // Initialize animations
  initRevealAnimations();
  setupTypingAnimation();
  
  // Trigger initial scroll functions
  handleScroll();
  revealOnScroll();
});