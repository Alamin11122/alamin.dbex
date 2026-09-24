const aboutButton = document.querySelector("#about-button");
const aboutResponse = document.querySelector("#about-response");
const contactForm = document.querySelector("#contact-form");
const formResponse = document.querySelector("#form-response");
const themeToggle = document.querySelector("#theme-toggle");
const themeIcon = document.querySelector("#theme-icon");
const projectFilters = document.querySelector("#project-filters");
const projectCards = [...document.querySelectorAll(".project-card")];
const projectDialog = document.querySelector("#project-dialog");
const dialogContent = document.querySelector("#dialog-content");
const closeDialog = document.querySelector("#close-dialog");
const copyEmailButton = document.querySelector("#copy-email");
const toast = document.querySelector("#toast");
const backToTop = document.querySelector("#back-to-top");
const skillsPanel = document.querySelector(".skills-panel");

formResponse.addEventlistener
const projectDetails = {
  portfolio: {
    title: "My personal portfolio",
    type: "DESIGN CONCEPT · HTML · CSS",
    description: "A personal website concept for introducing myself, sharing what I’m learning, and giving people a way to get in touch.",
    learning: "Practicing page structure, responsive layouts, and visual design."
  },
  movie: {
    title: "Movie finder",
    type: "GROUP PROJECT IDEA · HTML · CSS · JAVASCRIPT",
    description: "A movie discovery concept where people can search titles, filter genres, and save films they want to watch.",
    learning: "Practicing search, filtering, and interactive interface ideas."
  },
  focus: {
    title: "Little focus list",
    type: "LEARNING CONCEPT · JAVASCRIPT",
    description: "A small daily goals concept designed to make it easier to keep a few priorities in view.",
    learning: "Practicing JavaScript events, lists, and simple state."
  }
};

const rolePhrases = [
  "making the web a little better",
  "learning JavaScript",
  "building responsive pages",
  "turning ideas into interfaces"
];

let roleIndex = 0;
let toastTimer;

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(toastTimer);

  toastTimer = setTimeout(() => {
    toast.classList.remove("show");
  }, 2200);
}

aboutButton.addEventListener("click", () => {
  aboutResponse.textContent = "Hey! Thanks for stopping by. I’m glad you’re here.";
});

contactForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const name = document.querySelector("#name").value.trim();
  formResponse.textContent = `Thanks, ${name}! Your message is ready.`;
  contactForm.reset();
});

function applyTheme(theme) {
  document.documentElement.dataset.theme = theme;
  const lightMode = theme === "light";
  themeIcon.textContent = lightMode ? "☾" : "◐";
  themeToggle.setAttribute(
    "aria-label",
    lightMode ? "Switch to dark theme" : "Switch to light theme"
  );
  localStorage.setItem("alamin-theme", theme);
}

themeToggle.addEventListener("click", () => {
  const nextTheme = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
  applyTheme(nextTheme);
});

const savedTheme = localStorage.getItem("alamin-theme");
if (savedTheme === "light") applyTheme("light");

setInterval(() => {
  const roleElement = document.querySelector("#changing-role");
  roleElement.classList.add("fading");

  setTimeout(() => {
    roleIndex = (roleIndex + 1) % rolePhrases.length;
    roleElement.textContent = rolePhrases[roleIndex];
    roleElement.classList.remove("fading");
  }, 180);
}, 2600);

projectFilters.addEventListener("click", (event) => {
  const filterButton = event.target.closest("[data-filter]");
  if (!filterButton) return;

  const selectedFilter = filterButton.dataset.filter;

  projectFilters.querySelectorAll(".filter-chip").forEach((chip) => {
    chip.classList.toggle("active", chip === filterButton);
  });

  projectCards.forEach((card) => {
    const shouldShow =
      selectedFilter === "all" || card.dataset.category === selectedFilter;
    card.hidden = !shouldShow;
  });
});

projectCards.forEach((card) => {
  card.addEventListener("click", () => {
    const project = projectDetails[card.dataset.project];
    if (!project) return;

    dialogContent.innerHTML = `
      <p class="dialog-eyebrow">${project.type}</p>
      <h2 class="dialog-title">${project.title}</h2>
      <p class="dialog-copy">${project.description}</p>
      <p class="dialog-copy"><strong>What I’m learning:</strong> ${project.learning}</p>
    `;

    projectDialog.showModal();
  });
});

closeDialog.addEventListener("click", () => projectDialog.close());

projectDialog.addEventListener("click", (event) => {
  if (event.target === projectDialog) projectDialog.close();
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && projectDialog.open) projectDialog.close();
});

copyEmailButton.addEventListener("click", async () => {
  const email = "hello@alamin.dev";

  try {
    await navigator.clipboard.writeText(email);
    showToast("Email copied to clipboard");
  } catch {
    showToast(`Email: ${email}`);
  }
});

const skillObserver = new IntersectionObserver((entries) => {
  if (entries.some((entry) => entry.isIntersecting)) {
    skillsPanel.classList.add("in-view");

    skillsPanel.querySelectorAll(".skill-track i").forEach((bar) => {
      bar.style.setProperty("--skill-width", bar.dataset.width);
    });

    skillObserver.disconnect();
  }
}, { threshold: 0.3 });

skillObserver.observe(skillsPanel);

window.addEventListener("scroll", () => {
  backToTop.classList.toggle("visible", window.scrollY > 500);
}, { passive: true });

backToTop.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});