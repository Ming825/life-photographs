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
    document.getElementById("footer-address").textContent = SITE_DATA.lab.contact.address;
    document.getElementById("footer-email").textContent = SITE_DATA.lab.contact.email;
    document.getElementById("footer-email").href = "mailto:" + SITE_DATA.lab.contact.email;
    document.getElementById("footer-phone").textContent = SITE_DATA.lab.contact.phone;
    document.getElementById("footer-year").textContent = new Date().getFullYear();
  }

  function renderDirectionFilters() {
    const wrap = document.getElementById("direction-filters");
    SITE_DATA.directions.forEach((dir, i) => {
      const btn = el(
        "button",
        "btn btn-sm rounded-pill filter-btn" + (i === 0 ? " active" : ""),
        dir
      );
      btn.type = "button";
      btn.dataset.direction = dir;
      btn.addEventListener("click", () => {
        document
          .querySelectorAll("#direction-filters .filter-btn")
          .forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");
        filterStudents(dir);
      });
      wrap.appendChild(btn);
    });
  }

  function studentCard(student) {
    const col = el("div", "col-6 col-md-4 col-lg-3 student-item");
    col.dataset.direction = student.direction;
    col.innerHTML = `
      <div class="card student-card h-100 border-0 shadow-sm">
        <a href="${student.photo}" class="glightbox" data-gallery="students"
           data-title="${student.name}" data-description="${student.grade} · ${student.direction}<br>${student.bio}">
          <img src="${student.photo}" class="card-img-top student-photo" alt="${student.name}" loading="lazy">
        </a>
        <div class="card-body text-center">
          <h5 class="card-title mb-1">${student.name}</h5>
          <p class="card-text text-muted small mb-1">${student.grade}</p>
          <span class="badge direction-badge">${student.direction}</span>
        </div>
      </div>`;
    return col;
  }

  function renderStudents() {
    const grid = document.getElementById("students-grid");
    SITE_DATA.students.forEach((s) => grid.appendChild(studentCard(s)));
  }

  function filterStudents(direction) {
    document.querySelectorAll(".student-item").forEach((item) => {
      const match = direction === "全部" || item.dataset.direction === direction;
      item.style.display = match ? "" : "none";
    });
  }

  function photoCard(photo, galleryName) {
    const col = el("div", "col-md-6 col-lg-4 photo-item");
    col.innerHTML = `
      <div class="card photo-card h-100 border-0 shadow-sm">
        <a href="${photo.photo}" class="glightbox" data-gallery="${galleryName}"
           data-title="${photo.title}" data-description="${photo.date}<br>${photo.desc}">
          <img src="${photo.photo}" class="card-img-top group-photo" alt="${photo.title}" loading="lazy">
        </a>
        <div class="card-body">
          <h6 class="card-title mb-1">${photo.title}</h6>
          <p class="card-text text-muted small mb-0">${photo.date}</p>
        </div>
      </div>`;
    return col;
  }

  function renderGroupPhotos() {
    const grid = document.getElementById("group-grid");
    SITE_DATA.groupPhotos.forEach((p) => grid.appendChild(photoCard(p, "group")));
  }

  function renderActivities() {
    const grid = document.getElementById("activities-grid");
    SITE_DATA.activities.forEach((p) => grid.appendChild(photoCard(p, "activities")));
  }

  document.addEventListener("DOMContentLoaded", function () {
    renderLabInfo();
    renderDirectionFilters();
    renderStudents();
    renderGroupPhotos();
    renderActivities();

    GLightbox({ selector: ".glightbox", loop: true });

    // 导航栏滚动阴影
    const nav = document.getElementById("main-nav");
    window.addEventListener("scroll", () => {
      nav.classList.toggle("scrolled", window.scrollY > 20);
    });
  });
})();
