(function () {
  "use strict";

  function el(tag, className, html) {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (html !== undefined) node.innerHTML = html;
    return node;
  }

  function renderLabInfo() {
    document.getElementById("lab-name").textContent = SITE_DATA.lab.name;
    document.getElementById("lab-slogan").textContent = SITE_DATA.lab.slogan;
    document.getElementById("lab-intro").textContent = SITE_DATA.lab.intro;
    document.getElementById("nav-lab-name").textContent = SITE_DATA.lab.name;
    document.getElementById("footer-lab-name").textContent = SITE_DATA.lab.name;
    document.getElementById("footer-closing").textContent = SITE_DATA.lab.closing;
    document.getElementById("footer-year").textContent = new Date().getFullYear();

    const emailWrap = document.getElementById("footer-email-wrap");
    if (SITE_DATA.lab.email) {
      document.getElementById("footer-email").textContent = SITE_DATA.lab.email;
      document.getElementById("footer-email").href = "mailto:" + SITE_DATA.lab.email;
    } else {
      emailWrap.style.display = "none";
    }
  }

  function studentCard(student, rotateIdx) {
    const rotates = ["-2deg", "1.5deg", "-1deg", "2deg", "-1.5deg"];
    const rotate = rotates[rotateIdx % rotates.length];
    const col = el("div", "col-6 col-md-4 col-lg-3 student-item");
    col.innerHTML = `
      <a href="${student.photo}" class="glightbox polaroid d-block" data-gallery="students"
         data-title="${student.name}" data-description="${student.note || ""}"
         style="--rotate: ${rotate};">
        <img src="${student.photo}" class="polaroid-photo" alt="${student.name}" loading="lazy">
        <span class="polaroid-caption">${student.name}</span>
      </a>`;
    return col;
  }

  function renderStudentsByYear() {
    const container = document.getElementById("students-by-year");
    const years = [...new Set(SITE_DATA.students.map((s) => s.year))].sort((a, b) =>
      b.localeCompare(a)
    );

    years.forEach((year) => {
      const section = el("div", "year-block mb-5");
      section.innerHTML = `
        <div class="year-divider d-flex align-items-center mb-4">
          <span class="year-label">${year}</span>
          <span class="year-line flex-grow-1"></span>
        </div>`;
      const grid = el("div", "row g-4 justify-content-center");
      SITE_DATA.students
        .filter((s) => s.year === year)
        .forEach((s, i) => grid.appendChild(studentCard(s, i)));
      section.appendChild(grid);
      container.appendChild(section);
    });
  }

  function photoCard(photo, galleryName, rotateIdx) {
    const rotates = ["-1.5deg", "1deg", "-1deg", "1.5deg"];
    const rotate = rotates[rotateIdx % rotates.length];
    const col = el("div", "col-md-6 col-lg-4 photo-item");
    col.innerHTML = `
      <a href="${photo.photo}" class="glightbox polaroid polaroid-wide d-block" data-gallery="${galleryName}"
         data-title="${photo.title}" data-description="${photo.date}<br>${photo.desc}"
         style="--rotate: ${rotate};">
        <img src="${photo.photo}" class="polaroid-photo" alt="${photo.title}" loading="lazy">
        <span class="polaroid-caption">
          <span class="d-block fw-semibold">${photo.title}</span>
          <span class="d-block small text-muted">${photo.date}</span>
        </span>
      </a>`;
    return col;
  }

  function renderGroupPhotos() {
    const grid = document.getElementById("group-grid");
    SITE_DATA.groupPhotos.forEach((p, i) => grid.appendChild(photoCard(p, "group", i)));
  }

  function renderActivities() {
    const grid = document.getElementById("activities-grid");
    SITE_DATA.activities.forEach((p, i) => grid.appendChild(photoCard(p, "activities", i)));
  }

  document.addEventListener("DOMContentLoaded", function () {
    renderLabInfo();
    renderStudentsByYear();
    renderGroupPhotos();
    renderActivities();

    GLightbox({ selector: ".glightbox", loop: true });

    const nav = document.getElementById("main-nav");
    window.addEventListener("scroll", () => {
      nav.classList.toggle("scrolled", window.scrollY > 20);
    });
  });
})();
