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
  // ➤ Type effect (if any)
  if (typeof typeEffect === 'function') typeEffect();

  // ➤ Project Image Sliders
  document.querySelectorAll('.project-images-wrapper').forEach((wrapper) => {
    const inner = wrapper.querySelector('.project-images-inner');
    const images = inner.querySelectorAll('img');
    const dotsContainer = wrapper.querySelector('.dots');
    let projIndex = 0;
    const total = images.length;
    const wrapperWidth = wrapper.querySelector('.project-images').offsetWidth;

    inner.style.width = `${wrapperWidth * total}px`;
    images.forEach(img => {
      img.style.width = `${wrapperWidth}px`;
      img.style.flexShrink = '0';
    });

    for (let i = 0; i < total; i++) {
      const dot = document.createElement('span');
      dot.classList.add('dot');
      dot.addEventListener('click', () => goToImage(i));
      dotsContainer.appendChild(dot);
    }

    const dots = dotsContainer.querySelectorAll('span');

    function updateDots() {
      dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === projIndex);
      });
    }

    function goToImage(index) {
      projIndex = index;
      inner.style.transform = `translateX(-${wrapperWidth * index}px)`;
      updateDots();
      resetTimer();
    }

    function nextImage() {
      projIndex = (projIndex + 1) % total;
      goToImage(projIndex);
    }

    let timer = setInterval(nextImage, 5000);

    function resetTimer() {
      clearInterval(timer);
      timer = setInterval(nextImage, 5000);
    }

    goToImage(0);
  });

  // ➤ Certificate Carousel
  const container = document.getElementById('certsContainer');
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');

  const cardWidth = 340;
  const cards = Array.from(container.children);
  const totalCards = cards.length;
  let certIndex = 1;

  const firstClone = cards[0].cloneNode(true);
  const lastClone = cards[totalCards - 1].cloneNode(true);
  container.insertBefore(lastClone, cards[0]);
  container.appendChild(firstClone);

  const allCards = container.children;
  const updatedTotal = allCards.length;

  function setInitialPosition() {
    const offset = (container.parentElement.offsetWidth / 2) - (cardWidth / 2);
    container.style.transition = "none";
    container.style.transform = `translateX(${-certIndex * cardWidth + offset}px)`;
  }

  function updateScroll(animated = true) {
    const offset = (container.parentElement.offsetWidth / 2) - (cardWidth / 2);
    container.style.transition = animated ? "transform 0.4s ease" : "none";
    container.style.transform = `translateX(${-certIndex * cardWidth + offset}px)`;

    Array.from(allCards).forEach((card, index) => {
      card.classList.toggle('active', index === certIndex);
    });
  }

  function scrollNext() {
    certIndex++;
    updateScroll();
    if (certIndex === updatedTotal - 1) {
      setTimeout(() => {
        certIndex = 1;
        updateScroll(false);
      }, 400);
    }
  }

  function scrollPrev() {
    certIndex--;
    updateScroll();
    if (certIndex === 0) {
      setTimeout(() => {
        certIndex = totalCards;
        updateScroll(false);
      }, 400);
    }
  }

  nextBtn.addEventListener('click', () => {
    scrollNext();
    resetAutoScroll();
  });

  prevBtn.addEventListener('click', () => {
    scrollPrev();
    resetAutoScroll();
  });

  let autoScroll = setInterval(scrollNext, 5000);

  function resetAutoScroll() {
    clearInterval(autoScroll);
    autoScroll = setInterval(scrollNext, 5000);
  }

  setInitialPosition();
  updateScroll(false);
});
