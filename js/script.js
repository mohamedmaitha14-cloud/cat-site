const PURRFECT_SUPABASE = {
  url: "https://jagdnzvzypcvieqbrjnt.supabase.co/",
  publishableKey: "sb_publishable_nk8GVjO8hM-NxvTAd930XQ_SxvuY2QI",
};

const cats = [
  {
    id: "luna",
    name: "Luna",
    breed: "Persian",
    age: 2,
    ageLabel: "2 years",
    activity: "Low",
    grooming: "High",
    status: "Available",
    personality: "Gentle, cuddly, and calm",
    description:
      "A fluffy sweetheart who loves cozy naps and gentle attention.",
    featured: true,
  },
  {
    id: "milo",
    name: "Milo",
    breed: "Siamese",
    age: 1,
    ageLabel: "1 year",
    activity: "High",
    grooming: "Low",
    status: "Available",
    personality: "Curious, chatty, and playful",
    description: "A little explorer who wants to be part of everything you do.",
    featured: true,
  },
  {
    id: "coco",
    name: "Coco",
    breed: "Ragdoll",
    age: 3,
    ageLabel: "3 years",
    activity: "Low",
    grooming: "Medium",
    status: "Available",
    personality: "Sweet, relaxed, and affectionate",
    description:
      "A loving companion who enjoys quiet evenings and soft blankets.",
    featured: true,
  },
  {
    id: "oliver",
    name: "Oliver",
    breed: "Maine Coon",
    age: 4,
    ageLabel: "4 years",
    activity: "Medium",
    grooming: "High",
    status: "Available",
    personality: "Friendly, confident, and gentle",
    description: "A big-hearted, fluffy friend with a curious personality.",
    featured: true,
  },
  {
    id: "peaches",
    name: "Peaches",
    breed: "British Shorthair",
    age: 0.25,
    ageLabel: "3-month-old kitten",
    activity: "Medium",
    grooming: "Low",
    status: "Available",
    personality: "Curious, cuddly, and still learning about the world",
    description:
      "A tiny, round-faced kitten who is discovering toys, cozy naps, and new people.",
    featured: true,
  },
  {
    id: "simba",
    name: "Simba",
    breed: "Bengal",
    age: 0.25,
    ageLabel: "3-month-old kitten",
    activity: "High",
    grooming: "Low",
    status: "Pending",
    personality: "Energetic, curious, and adventurous",
    description:
      "A tiny Bengal kitten with lots of energy who loves gentle play and interactive toys.",
    featured: true,
  },
  {
    id: "misty",
    name: "Misty",
    breed: "Scottish Fold",
    age: 5,
    ageLabel: "5 years",
    activity: "Low",
    grooming: "Medium",
    status: "Available",
    personality: "Quiet, observant, and affectionate",
    description:
      "A gentle friend who enjoys peaceful spaces and companionship.",
  },
  {
    id: "pepper",
    name: "Pepper",
    breed: "Sphynx",
    age: 2,
    ageLabel: "2 years",
    activity: "High",
    grooming: "High",
    status: "Available",
    personality: "Social, warm, and mischievous",
    description:
      "A people-loving cat who enjoys warmth and plenty of attention.",
  },
  {
    id: "ginger",
    name: "Ginger",
    breed: "Abyssinian",
    age: 3,
    ageLabel: "3 years",
    activity: "High",
    grooming: "Low",
    status: "Available",
    personality: "Active, curious, and intelligent",
    description: "A bright little adventurer who loves exploring new things.",
  },
  {
    id: "mochi",
    name: "Mochi",
    breed: "American Shorthair",
    age: 6,
    ageLabel: "6 years",
    activity: "Medium",
    grooming: "Low",
    status: "Available",
    personality: "Easygoing, friendly, and loyal",
    description:
      "A relaxed companion who would love a comfortable forever home.",
  },
  {
    id: "pumpkin",
    name: "Pumpkin",
    breed: "Domestic Shorthair",
    age: 8,
    ageLabel: "8 years",
    activity: "Low",
    grooming: "Low",
    status: "Available",
    personality: "Patient, affectionate, and mellow",
    description:
      "A senior sweetheart who deserves a peaceful home and soft bed.",
  },
  {
    id: "cloud",
    name: "Cloud",
    breed: "Domestic Longhair",
    age: 0.5,
    ageLabel: "6 months",
    activity: "High",
    grooming: "High",
    status: "Available",
    personality: "Playful, fluffy, and curious",
    description:
      "A fluffy kitten who is ready for a lifetime of love and play.",
  },
];
const photoTemplate = document.getElementById("catPhotoPaths");
const photoPaths = new Map(
  [...(photoTemplate?.content.querySelectorAll("img[data-cat-id]") || [])].map(
    (img) => [img.dataset.catId, img.getAttribute("src")],
  ),
);
cats.forEach((cat) => {
  cat.image = photoPaths.get(cat.id) || "";
});
const STORAGE_KEY = "purrfectPawsFavorites";
function getFavorites() {
  try {
    const a = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
    return Array.isArray(a)
      ? a.filter((id) => cats.some((c) => c.id === id))
      : [];
  } catch {
    return [];
  }
}
let favorites = getFavorites();
function saveFavorites() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
  } catch {
    alert(
      "Your browser could not save favorites. Check browser storage settings.",
    );
  }
  updateFavoriteCount();
  updateFavoriteButtons();
}
function updateFavoriteCount() {
  document
    .querySelectorAll("[data-favorite-count]")
    .forEach((e) => (e.textContent = favorites.length));
}
function toggleFavorite(id) {
  favorites = favorites.includes(id)
    ? favorites.filter((x) => x !== id)
    : [...favorites, id];
  saveFavorites();
  renderCats();
  renderFeaturedCats();
  renderFavorites();
}
function updateFavoriteButtons() {
  document.querySelectorAll("[data-favorite-id]").forEach((b) => {
    const yes = favorites.includes(b.dataset.favoriteId);
    b.classList.toggle("saved", yes);
    b.textContent = yes ? "♥" : "♡";
    b.setAttribute(
      "aria-label",
      yes ? "Remove from favorites" : "Add to favorites",
    );
    b.setAttribute("aria-pressed", String(yes));
  });
}
function esc(v) {
  return String(v).replace(
    /[&<>"']/g,
    (c) =>
      ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#039;",
      })[c],
  );
}
function catCard(c) {
  return `<article class="cat-card"><div class="cat-image-wrap"><span class="badge">${c.status === "Available" ? "Looking for a Home" : "Inquiry Pending"}</span><button class="heart-btn cat-favorite-top" type="button" data-favorite-id="${c.id}" aria-label="Add to favorites">♡</button><img class="cat-image" src="${c.image}" alt="Photo of ${esc(c.name)}, a ${esc(c.breed)} cat" loading="lazy"></div><div class="cat-info"><h3>${esc(c.name)}</h3><div class="cat-meta"><span class="tag">${esc(c.breed)}</span><span class="tag">${esc(c.ageLabel)}</span><span class="tag ${c.status === "Available" ? "available" : "pending"}">${esc(c.status)}</span></div><p>${esc(c.description)}</p><p class="small-text">Personality: ${esc(c.personality)}</p><div class="cat-actions"><button class="btn btn-small btn-primary" type="button" data-cat-details="${c.id}">Meet ${esc(c.name)}</button><button class="btn btn-small btn-secondary" type="button" data-inquire="${c.id}">Ask about me</button></div></div></article>`;
}
function renderCats() {
  const grid = document.getElementById("catGrid");
  if (!grid) return;
  const q = (document.getElementById("catSearch")?.value || "")
      .trim()
      .toLowerCase(),
    breed = document.getElementById("breedFilter")?.value || "all",
    age = document.getElementById("ageFilter")?.value || "all",
    activity = document.getElementById("activityFilter")?.value || "all",
    status = document.getElementById("statusFilter")?.value || "all",
    sort = document.getElementById("sortFilter")?.value || "featured";
  let a = cats.filter(
    (c) =>
      `${c.name} ${c.breed} ${c.personality}`.toLowerCase().includes(q) &&
      (breed === "all" || c.breed === breed) &&
      (age === "all" ||
        (age === "kitten" && c.age < 1) ||
        (age === "young" && c.age >= 1 && c.age < 3) ||
        (age === "adult" && c.age >= 3 && c.age < 8) ||
        (age === "senior" && c.age >= 8)) &&
      (activity === "all" || c.activity === activity) &&
      (status === "all" || c.status === status),
  );
  if (sort === "name") a.sort((x, y) => x.name.localeCompare(y.name));
  if (sort === "age") a.sort((x, y) => x.age - y.age);
  if (sort === "recent") a.reverse();
  grid.innerHTML = a.length
    ? a.map(catCard).join("")
    : `<div class="empty-state"><span>🐾</span><h3>No kitties found!</h3><p>Try changing your search or filters.</p></div>`;
  updateFavoriteButtons();
}
function renderFeaturedCats() {
  const grid = document.getElementById("featuredCats");
  if (grid) {
    grid.innerHTML = cats
      .filter((c) => c.featured)
      .slice(0, 3)
      .map(catCard)
      .join("");
    updateFavoriteButtons();
  }
}
function renderFavorites() {
  const list = document.getElementById("favoritesList");
  if (!list) return;
  const saved = cats.filter((c) => favorites.includes(c.id));
  list.innerHTML = saved.length
    ? saved
        .map(
          (c) =>
            `<div class="favorite-item"><img src="${c.image}" alt="${esc(c.name)}"><div><h4>${esc(c.name)}</h4><p>${esc(c.breed)} · ${esc(c.ageLabel)}</p><p>${esc(c.status)}</p><button class="btn btn-small" data-cat-details="${c.id}" type="button">View cat</button></div><button class="remove-favorite" type="button" data-remove-favorite="${c.id}" aria-label="Remove ${esc(c.name)}">×</button></div>`,
        )
        .join("")
    : `<div class="empty-state"><span>😻</span><h3>Your heart is waiting!</h3><p>Tap a heart on any cat to save it here.</p><button class="btn" type="button" data-close-favorites>Explore cats</button></div>`;
}
function openFavorites() {
  const d = document.getElementById("favoritesDrawer"),
    b = document.getElementById("drawerBackdrop");
  if (!d || !b) return;
  renderFavorites();
  d.classList.add("open");
  b.classList.add("open");
  d.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
  document.getElementById("closeFavorites")?.focus();
}
function closeFavorites() {
  document.getElementById("favoritesDrawer")?.classList.remove("open");
  document.getElementById("drawerBackdrop")?.classList.remove("open");
  document
    .getElementById("favoritesDrawer")
    ?.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
}
function showCatDetails(id) {
  const c = cats.find((x) => x.id === id),
    modal = document.getElementById("catModal"),
    content = document.getElementById("catModalContent");
  if (!c || !modal || !content) return;
  content.innerHTML = `<img class="rounded-image" src="${c.image}" alt="${esc(c.name)}" style="height:260px;margin-bottom:20px"><span class="tag">${esc(c.breed)}</span> <span class="tag">${esc(c.ageLabel)}</span> <span class="tag">${esc(c.status)}</span><h2 style="margin-top:18px">${esc(c.name)}</h2><p>${esc(c.description)}</p><p><strong>Personality:</strong> ${esc(c.personality)}</p><p><strong>Activity level:</strong> ${esc(c.activity)}</p><p><strong>Grooming needs:</strong> ${esc(c.grooming)}</p><div class="hero-actions"><button class="btn" type="button" data-favorite-id="${c.id}">♡ Save to Favorites</button><button class="btn btn-primary" type="button" data-inquire="${c.id}">Ask about ${esc(c.name)}</button></div>`;
  modal.hidden = false;
  modal.classList.add("open");
  document.body.style.overflow = "hidden";
  updateFavoriteButtons();
}
function closeCatDetails() {
  const m = document.getElementById("catModal");
  if (m) {
    m.hidden = true;
    m.classList.remove("open");
  }
  document.body.style.overflow = "";
}
function goToInquiry(id) {
  closeCatDetails();
  closeFavorites();
  const c = cats.find((x) => x.id === id);
  if (!c) return;
  const form = document.getElementById("contactForm");
  if (form) {
    const breed = document.getElementById("catInterest"),
      specific = document.getElementById("specificCat"),
      comments = document.getElementById("comments");
    if (breed) breed.value = c.breed;
    if (specific) specific.value = c.id;
    if (comments) comments.value = `I would like to know more about ${c.name}.`;
    form.scrollIntoView({ behavior: "smooth", block: "start" });
  } else location.href = `contact.html?cat=${encodeURIComponent(id)}`;
}
function setupPage() {
  const toggle = document.getElementById("menuToggle"),
    links = document.getElementById("navLinks");
  toggle?.addEventListener("click", () => {
    const open = links.classList.toggle("open");
    toggle.setAttribute("aria-expanded", String(open));
  });
  links?.querySelectorAll("a").forEach((a) =>
    a.addEventListener("click", () => {
      links.classList.remove("open");
      toggle?.setAttribute("aria-expanded", "false");
    }),
  );
  document
    .querySelectorAll("[data-open-favorites]")
    .forEach((b) => b.addEventListener("click", openFavorites));
  document
    .getElementById("closeFavorites")
    ?.addEventListener("click", closeFavorites);
  document
    .getElementById("drawerBackdrop")
    ?.addEventListener("click", closeFavorites);
  document
    .getElementById("closeCatModal")
    ?.addEventListener("click", closeCatDetails);
  document.getElementById("catModal")?.addEventListener("click", (e) => {
    if (e.target.id === "catModal") closeCatDetails();
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      closeFavorites();
      closeCatDetails();
    }
  });
  document.addEventListener("click", (e) => {
    const f = e.target.closest("[data-favorite-id]");
    if (f) {
      const id = f.dataset.favoriteId;
      toggleFavorite(id);
      if (f.closest("#catModal")) showCatDetails(id);
      return;
    }
    const detail = e.target.closest("[data-cat-details]");
    if (detail) {
      showCatDetails(detail.dataset.catDetails);
      return;
    }
    const remove = e.target.closest("[data-remove-favorite]");
    if (remove) {
      toggleFavorite(remove.dataset.removeFavorite);
      return;
    }
    const inquiry = e.target.closest("[data-inquire]");
    if (inquiry) {
      goToInquiry(inquiry.dataset.inquire);
      return;
    }
    if (e.target.closest("[data-close-favorites]")) closeFavorites();
  });
  [
    "catSearch",
    "breedFilter",
    "ageFilter",
    "activityFilter",
    "statusFilter",
    "sortFilter",
  ].forEach((id) => {
    document.getElementById(id)?.addEventListener("input", renderCats);
    document.getElementById(id)?.addEventListener("change", renderCats);
  });
  renderFeaturedCats();
  renderCats();
  renderFavorites();
  updateFavoriteCount();
  const params = new URLSearchParams(location.search),
    requested = cats.find((c) => c.id === params.get("cat"));
  if (requested) {
    const b = document.getElementById("catInterest"),
      s = document.getElementById("specificCat"),
      comments = document.getElementById("comments");
    if (b) b.value = requested.breed;
    if (s) s.value = requested.id;
    if (comments)
      comments.value = `I would like to know more about ${requested.name}.`;
  }
  const form = document.getElementById("contactForm");
  form?.addEventListener("submit", async (e) => {
    e.preventDefault();
    if (!form.reportValidity()) return;
    const msg = document.getElementById("formMessage");
    const button = form.querySelector('button[type="submit"]');
    const config = PURRFECT_SUPABASE;
    const show = (message, error = false) => {
      msg.textContent = message;
      msg.classList.add("show");
      msg.setAttribute("role", error ? "alert" : "status");
      msg.style.background = error ? "#7d254d" : "";
      msg.scrollIntoView({ behavior: "smooth", block: "nearest" });
    };
    if (form.elements.website?.value) return;
    if (
      !config.url ||
      !config.publishableKey ||
      config.url.includes("YOUR_PROJECT") ||
      config.publishableKey.includes("YOUR_PUBLIC")
    ) {
      show(
        "The adoption form is not connected yet. Please configure Supabase in js/script.js.",
        true
      );
      return;
    }
    const record = {
      full_name: form.elements.fullName.value.trim(),
      email: form.elements.email.value.trim(),
      phone: form.elements.phone.value.trim(),
      cat_breed: form.elements.catInterest.value,
      specific_cat: form.elements.specificCat.value || null,
      home_address: form.elements.address.value.trim(),
      comments: form.elements.comments.value.trim(),
      preferred_contact_method: form.elements.contactMethod.value,
      privacy_consent: form.elements.privacyConsent.checked,
    };
    button.disabled = true;
    const original = button.textContent;
    button.textContent = "Sending inquiry…";
    try {
      const response = await fetch(
        config.url.replace(/\/$/, "") + "/rest/v1/adoption_inquiries",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            apikey: config.publishableKey,
            Authorization: "Bearer " + config.publishableKey,
            Prefer: "return=minimal",
          },
          body: JSON.stringify(record),
        },
      );
      if (!response.ok)
        throw new Error("Supabase returned HTTP " + response.status);
      show(
        "🐾 Thank you! Your adoption inquiry was submitted successfully. We'll be in touch soon.",
      );
      form.reset();
    } 
    catch (error) {
      console.error("Supabase submission error:", error);

      show(
        "We couldn't submit your inquiry. Please try again later.",
        true
      );
    }

    finally {
      button.disabled = false;
      button.textContent = original;
    }
  });
}
document.addEventListener("DOMContentLoaded", setupPage);
