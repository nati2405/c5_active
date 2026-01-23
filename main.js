/* ================================
   SCROLL REVEAL ANIMATION
================================ */
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
    }
  });
}, { threshold: 0.15 });

document.querySelectorAll("[data-animate]").forEach(el => {
  observer.observe(el);
});

function scrollToLearnMore() {
  const aboutSection = document.querySelector(".about");

  if (aboutSection) {
    aboutSection.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });
  }
}


/* ================================
   MODAL LOGIC
================================ */
const modal = document.getElementById("signup-modal");
const openBtn = document.querySelector(".cta-btn");
const closeBtn = document.querySelector(".close-modal");

openBtn.addEventListener("click", (e) => {
  e.preventDefault();
  modal.style.display = "flex";
});

closeBtn.addEventListener("click", () => {
  modal.style.display = "none";
});

window.addEventListener("click", (e) => {
  if (e.target === modal) modal.style.display = "none";
});

/* ================================
   30-DAY COUNTDOWN TIMER
================================ */
const launchDate = new Date();
launchDate.setDate(launchDate.getDate() + 30);

function updateCountdown() {
  const now = new Date().getTime();
  const distance = launchDate - now;

  if (distance <= 0) {
    modal.style.display = "flex"; // Show popup when done
    return;
  }

  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor((distance / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((distance / (1000 * 60)) % 60);
  const seconds = Math.floor((distance / 1000) % 60);

  document.getElementById("days").textContent = days;
  document.getElementById("hours").textContent = String(hours).padStart(2, "0");
  document.getElementById("minutes").textContent = String(minutes).padStart(2, "0");
  document.getElementById("seconds").textContent = String(seconds).padStart(2, "0");
}

updateCountdown();
setInterval(updateCountdown, 1000);

/* ================================
   SIGNUP FORM HANDLER
================================ */
const form = document.getElementById("signup-form");
const message = document.getElementById("message");

if (form) {
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
         // Grabs values from inputs
    
     // Grabs values from inputs
    const fname = document.getElementById("fname").value.trim();
    const lname = document.getElementById("lname").value.trim();
    const email = document.getElementById("email").value.trim();

   // Shows sending state
    message.textContent = "Sending...";
    message.style.color = "#38bdf8";

    // This is where the emailJS fetch will go next!
    try {
  await emailjs.send(
    "service_ji3cppf",
    "template_05a7008",
    {
      firstName: fname,
      email: email
    }
  );

  message.textContent = `Thanks ${fname}, you're on the list!`;
  message.style.color = "#38bdf8";
  form.reset();

} catch (error) {
  message.textContent = "Email failed. Please try again later.";
  message.style.color = "#f87171";
  console.error(error);
}
  });
}