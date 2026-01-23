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
    const fname = document.getElementById("fname").value;
    const lname = document.getElementById("lname").value;
    const email = document.getElementById("email").value;

   // Shows sending state
    message.textContent = "Sending...";
    message.style.color = "#38bdf8";

    // This is where the Formspree fetch will go next!
     try {
      const res = await fetch("https://formspree.io/f/xvzkqyev", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          firstName: fname,
          lastName: lname,
          email: email
        })
      });

      if (res.ok) {
        message.textContent = `Thanks ${fname}, you're on the list!`;
        message.style.color = "#38bdf8";
        form.reset();
      } else {
        message.textContent = "Something went wrong. Please try again.";
        message.style.color = "#f87171";
      }
    } catch (error) {
      message.textContent = "Network error. Please try again later.";
      message.style.color = "#f87171";
    }
  });
}
