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
