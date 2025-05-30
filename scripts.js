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

  // Start the animation
  document.addEventListener("DOMContentLoaded", () => {
    typeEffect();
  });
  document.querySelectorAll('.project-images-wrapper').forEach((wrapper) => {
  const inner = wrapper.querySelector('.project-images-inner');
  const images = inner.querySelectorAll('img');
  const dotsContainer = wrapper.querySelector('.dots');
  let currentIndex = 0;
  const total = images.length;
  const wrapperWidth = wrapper.querySelector('.project-images').offsetWidth;

  // Set width for inner container and each image
  inner.style.width = `${wrapperWidth * total}px`;
  images.forEach(img => {
    img.style.width = `${wrapperWidth}px`;
    img.style.flexShrink = '0';
  });

  // Create dots dynamically
  for (let i = 0; i < total; i++) {
    const dot = document.createElement('span');
    dot.classList.add('dot');
    dot.addEventListener('click', () => goToImage(i));
    dotsContainer.appendChild(dot);
  }

  const dots = dotsContainer.querySelectorAll('span');

  function updateDots() {
    dots.forEach((dot, i) => {
      dot.classList.toggle('active', i === currentIndex);
    });
  }

  function goToImage(index) {
    currentIndex = index;
    inner.style.transform = `translateX(-${wrapperWidth * index}px)`;
    updateDots();
    resetTimer();
  }

  function nextImage() {
    currentIndex = (currentIndex + 1) % total;
    goToImage(currentIndex);
  }

  let timer = setInterval(nextImage, 5000);

  function resetTimer() {
    clearInterval(timer);
    timer = setInterval(nextImage, 5000);
  }

  // Initial setup
  goToImage(0);
});
