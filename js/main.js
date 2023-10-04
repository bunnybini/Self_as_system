// scrolling beginning
const zoom = document.querySelector(".zoom");
const zoomText = document.querySelector(".zoomtext"); // Add this line to select the text element
const minZoom = 1;
const maxZoom = 2;

addEventListener("scroll", (e) => {
  const vh = window.innerHeight / 100;
  const scrollTop = document.documentElement.scrollTop;
  console.log(scrollTop);
  const start = 80 * vh;
  const stop = 500 * vh;
  const scrolltext = 500;
  if (scrollTop > start && scrollTop < stop) {
    const scale = Math.max(2.2 - (scrollTop - start) / 500, 1);
    zoom.style.transform = `scale(${scale})`;
    // zoom.style.transformtext = `scale(${scale})`;
    // Adjust the font size of the text based on the scale
    // const fontSize = 10 - (scrollTop - start) / 500;
    // zoomText.style.fontSize = `${fontSize}rem`;
    const textPosition = -(scrollTop - scrolltext);
    zoomText.style.transform = `translateY(${textPosition}px)`;
  }

  if (3052 < scrollTop && scrollTop <= 3743) {
  }
});

// hidden item showing
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    console.log(entry);
    if (entry.isIntersecting) {
      // Typo: Should be entry.isIntersecting
      entry.target.classList.add("show");
    } else {
      entry.target.classList.remove("show");
    }
  });
});

const hiddenElements = document.querySelectorAll(".hidden");
hiddenElements.forEach((el) => observer.observe(el));
