const roles = [
    "Full Stack Developer",
    "ML Enthusiast",
    "IoT Innovator",
    "Python Programmer",
    "Tech Explorer"
  ];

  const roleText = document.getElementById("role-text");
  const cursor = document.querySelector(".cursor");

  let roleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;

  function typeEffect() {
    const currentRole = roles[roleIndex];
    
    if (isDeleting) {
      charIndex--;
      roleText.innerHTML = currentRole.substring(0, charIndex) + '<span class="cursor">|</span>';
    } else {
      charIndex++;
      roleText.innerHTML = currentRole.substring(0, charIndex) + '<span class="cursor">|</span>';
    }

    let speed = isDeleting ? 80 : 120;

    if (!isDeleting && charIndex === currentRole.length) {
      speed = 2000; // pause before deleting
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      speed = 500;
    }

    setTimeout(typeEffect, speed);
  }
  typeEffect()

// ========== SECTION SWITCHING ==========
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', function(e) {
    e.preventDefault();
    const targetId = this.getAttribute('href').substring(1);

    // Hide all sections
    document.querySelectorAll('.section').forEach(sec => sec.classList.remove('active'));

    // Show clicked section
    document.getElementById(targetId).classList.add('active');
  });
});

// ========== PROJECTS SLIDER ==========
// Function to init carousel for all projects
document.querySelectorAll('.project-card').forEach(card => {
  const track = card.querySelector('.project-images-inner');
  const images = track.querySelectorAll('img');
  const dotsContainer = card.querySelector('.dots');

  let currentIndex = 0;
  let total = images.length;

  // Create dots dynamically
  dotsContainer.innerHTML = '';
  images.forEach((_, i) => {
    const dot = document.createElement('span');
    dot.classList.add('dot');
    if (i === 0) dot.classList.add('active');
    dotsContainer.appendChild(dot);
  });
  const dots = dotsContainer.querySelectorAll('.dot');

  // Function to go to a specific slide
  function goToSlide(index) {
    track.style.transform = `translateX(-${index * 100}%)`;
    dots.forEach(d => d.classList.remove('active'));
    dots[index].classList.add('active');
  }

  // Auto slide
  setInterval(() => {
    currentIndex = (currentIndex + 1) % total;
    goToSlide(currentIndex);
  }, 5000); // Change every 3 seconds
});


window.addEventListener('resize', updateProjectSlider);

// ========== CERTIFICATES CAROUSEL ==========
const certTrack = document.querySelector('.certificate-track');
const certCards = document.querySelectorAll('.certificate-card');
const certPrev = document.querySelector('.certificate-prev');
const certNext = document.querySelector('.certificate-next');

let certIndex = 0;

function updateCertSlider() {
  const cardWidth = certCards[0].offsetWidth + 20;
  certTrack.style.transform = `translateX(-${certIndex * cardWidth}px)`;
}

if (certNext) {
  certNext.addEventListener('click', () => {
    if (certIndex < certCards.length - 1) {
      certIndex++;
      updateCertSlider();
    }
  });
}

if (certPrev) {
  certPrev.addEventListener('click', () => {
    if (certIndex > 0) {
      certIndex--;
      updateCertSlider();
    }
  });
}

window.addEventListener('resize', updateCertSlider);

// ========== INITIAL LOAD ==========
updateProjectSlider();
updateCertSlider();

