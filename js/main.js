(function () {
  "use strict";

  const albums = new Map();
  let activeAlbum = null;
  let activeIndex = 0;
  let isTurning = false;
  let lastFocusedElement = null;
  let touchStartX = null;
  let albumUi = null;

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

  function getCoverPhoto(entry) {
    const firstAlbumPhoto =
      Array.isArray(entry.photos) && entry.photos.length ? entry.photos[0] : null;
    if (entry.cover) return entry.cover;
    if (entry.photo) return entry.photo;
    if (typeof firstAlbumPhoto === "string") return firstAlbumPhoto;
    return firstAlbumPhoto?.src || firstAlbumPhoto?.photo || "";
  }

  function getAlbumItems(entry, defaults) {
    const sourcePhotos =
      Array.isArray(entry.photos) && entry.photos.length ? entry.photos : [entry.photo];

    return sourcePhotos
      .map((photo) => {
        if (typeof photo === "string") {
          return {
            src: photo,
            title: defaults.title,
            meta: defaults.meta || "",
            description: defaults.description || "",
          };
        }

        return {
          src: photo?.src || photo?.photo || "",
          title: photo?.title || defaults.title,
          meta: photo?.date || photo?.meta || defaults.meta || "",
          description:
            photo?.desc || photo?.description || defaults.description || "",
        };
      })
      .filter((photo) => photo.src);
  }

  function studentCard(student, rotateIdx, albumKey, photoCount) {
    const rotates = ["-2deg", "1.5deg", "-1deg", "2deg", "-1.5deg"];
    const rotate = rotates[rotateIdx % rotates.length];
    const col = el("div", "col-6 col-md-4 col-lg-3 student-item");
    const button = el("button", "polaroid album-card d-block");
    button.type = "button";
    button.dataset.albumKey = albumKey;
    button.setAttribute("aria-label", `打开${student.name}的相册，共${photoCount}张`);
    button.style.setProperty("--rotate", rotate);
    button.innerHTML = `
        <img src="${getCoverPhoto(student)}" class="polaroid-photo" alt="${student.name}" loading="lazy">
        <span class="polaroid-caption">${student.name}</span>`;
    col.appendChild(button);
    return col;
  }

  function renderStudentsByYear() {
    const container = document.getElementById("students-by-year");
    const years = [...new Set(SITE_DATA.students.map((s) => s.year))].sort((a, b) =>
      b.localeCompare(a)
    );

    years.forEach((year) => {
      const students = SITE_DATA.students.filter((student) => student.year === year);
      const section = el("div", "year-block mb-5");
      const divider = el("div", "year-divider d-flex align-items-center mb-4");
      const label = el("span", "year-label");
      label.textContent = year;
      divider.append(label, el("span", "year-line flex-grow-1"));
      section.appendChild(divider);

      const grid = el("div", "row g-4 justify-content-center");
      students.forEach((student, index) => {
        const albumKey = `student-${year}-${index}`;
        const items = getAlbumItems(student, {
          title: student.name,
          meta: student.year,
          description: student.note || "",
        });
        albums.set(albumKey, {
          title: `${student.name}的相册`,
          items,
        });
        grid.appendChild(studentCard(student, index, albumKey, items.length));
      });
      section.appendChild(grid);
      container.appendChild(section);
    });
  }

  function photoCard(photo, albumKey, rotateIdx, photoCount) {
    const rotates = ["-1.5deg", "1deg", "-1deg", "1.5deg"];
    const rotate = rotates[rotateIdx % rotates.length];
    const col = el("div", "col-md-6 col-lg-4 photo-item");
    const button = el("button", "polaroid polaroid-wide album-card d-block");
    button.type = "button";
    button.dataset.albumKey = albumKey;
    button.setAttribute("aria-label", `打开${photo.title}相册，共${photoCount}张`);
    button.style.setProperty("--rotate", rotate);
    button.innerHTML = `
        <img src="${getCoverPhoto(photo)}" class="polaroid-photo" alt="${photo.title}" loading="lazy">
        <span class="polaroid-caption">
          <span class="d-block fw-semibold">${photo.title}</span>
          <span class="d-block small text-muted">${photo.date}</span>
        </span>`;
    col.appendChild(button);
    return col;
  }

  function renderGroupPhotos() {
    const grid = document.getElementById("group-grid");
    SITE_DATA.groupPhotos.forEach((photo, index) => {
      const albumKey = `group-${index}`;
      const items = getAlbumItems(photo, {
        title: photo.title,
        meta: photo.date,
        description: photo.desc || "",
      });
      albums.set(albumKey, { title: photo.title, items });
      grid.appendChild(photoCard(photo, albumKey, index, items.length));
    });
  }

  function renderActivities() {
    const grid = document.getElementById("activities-grid");
    SITE_DATA.activities.forEach((photo, index) => {
      const albumKey = `activity-${index}`;
      const items = getAlbumItems(photo, {
        title: photo.title,
        meta: photo.date,
        description: photo.desc || "",
      });
      albums.set(albumKey, { title: photo.title, items });
      grid.appendChild(photoCard(photo, albumKey, index, items.length));
    });
  }

  function cacheAlbumElements() {
    albumUi = {
      root: document.getElementById("photo-album"),
      title: document.getElementById("album-title"),
      counter: document.getElementById("album-counter"),
      stage: document.getElementById("album-stage"),
      book: document.querySelector(".album-book"),
      page: document.getElementById("album-page"),
      photoMat: document.querySelector(".album-photo-mat"),
      image: document.getElementById("album-image"),
      caption: document.querySelector(".album-caption"),
      photoTitle: document.getElementById("album-photo-title"),
      photoMeta: document.getElementById("album-photo-meta"),
      description: document.getElementById("album-photo-description"),
      thumbnails: document.getElementById("album-thumbnails"),
      previous: document.getElementById("album-prev"),
      next: document.getElementById("album-next"),
      close: document.querySelector(".album-close"),
    };
  }

  function fitAlbumToPhoto() {
    if (!activeAlbum || !albumUi.image.naturalWidth || !albumUi.image.naturalHeight) {
      return;
    }

    const stageWidth = albumUi.stage.clientWidth;
    const stageHeight = albumUi.stage.clientHeight;
    if (!stageWidth || !stageHeight) return;

    const isMobile = window.matchMedia("(max-width: 767.98px)").matches;
    const controlSpace = isMobile ? 92 : 132;
    const maxBookWidth = Math.min(Math.max(stageWidth - controlSpace, 180), 820);
    const maxBookHeight = Math.max(Math.min(stageHeight, 610), 180);
    const pageStyle = window.getComputedStyle(albumUi.page);
    const captionStyle = window.getComputedStyle(albumUi.caption);
    const horizontalFrame =
      parseFloat(pageStyle.paddingLeft) +
      parseFloat(pageStyle.paddingRight) +
      parseFloat(pageStyle.borderLeftWidth) +
      parseFloat(pageStyle.borderRightWidth);
    const verticalFrame =
      parseFloat(pageStyle.paddingTop) +
      parseFloat(pageStyle.paddingBottom) +
      parseFloat(pageStyle.borderTopWidth) +
      parseFloat(pageStyle.borderBottomWidth);
    const captionHeight = Math.max(
      parseFloat(captionStyle.minHeight) || 0,
      albumUi.caption.scrollHeight
    );
    const maxPhotoWidth = Math.max(maxBookWidth - horizontalFrame, 120);
    const maxPhotoHeight = Math.max(
      maxBookHeight - verticalFrame - captionHeight,
      140
    );
    const scale = Math.min(
      maxPhotoWidth / albumUi.image.naturalWidth,
      maxPhotoHeight / albumUi.image.naturalHeight
    );
    const photoWidth = Math.round(albumUi.image.naturalWidth * scale);
    const photoHeight = Math.round(albumUi.image.naturalHeight * scale);

    albumUi.photoMat.style.setProperty(
      "--photo-aspect",
      `${albumUi.image.naturalWidth} / ${albumUi.image.naturalHeight}`
    );
    albumUi.book.style.width = `${Math.round(photoWidth + horizontalFrame)}px`;
    albumUi.book.style.height = `${Math.round(
      photoHeight + verticalFrame + captionHeight
    )}px`;
  }

  function buildThumbnails() {
    albumUi.thumbnails.replaceChildren();
    activeAlbum.items.forEach((item, index) => {
      const button = el("button", "album-thumbnail");
      button.type = "button";
      button.dataset.albumThumbnail = index;
      button.setAttribute("aria-label", `查看第${index + 1}张：${item.title}`);

      const image = document.createElement("img");
      image.src = item.src;
      image.alt = "";
      image.loading = "lazy";
      button.appendChild(image);
      albumUi.thumbnails.appendChild(button);
    });
  }

  function preloadAdjacentPhotos() {
    if (activeAlbum.items.length < 2) return;
    [-1, 1].forEach((offset) => {
      const index =
        (activeIndex + offset + activeAlbum.items.length) % activeAlbum.items.length;
      const image = new Image();
      image.src = activeAlbum.items[index].src;
    });
  }

  function renderAlbumPage() {
    const item = activeAlbum.items[activeIndex];
    albumUi.image.src = item.src;
    albumUi.image.alt = item.title;
    albumUi.photoTitle.textContent = item.title;
    albumUi.photoMeta.textContent = item.meta || "";
    albumUi.description.textContent = item.description || "";
    albumUi.description.hidden = !item.description;
    albumUi.counter.textContent = `${activeIndex + 1} / ${activeAlbum.items.length}`;
    if (albumUi.image.complete) {
      window.requestAnimationFrame(fitAlbumToPhoto);
    }

    albumUi.thumbnails.querySelectorAll(".album-thumbnail").forEach((thumbnail, index) => {
      const isActive = index === activeIndex;
      thumbnail.classList.toggle("is-active", isActive);
      thumbnail.setAttribute("aria-current", isActive ? "true" : "false");
      if (isActive) {
        thumbnail.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
      }
    });

    preloadAdjacentPhotos();
  }

  function openAlbum(albumKey, startIndex) {
    const album = albums.get(albumKey);
    if (!album || !album.items.length) return;

    activeAlbum = album;
    activeIndex = Math.min(Math.max(Number(startIndex) || 0, 0), album.items.length - 1);
    lastFocusedElement = document.activeElement;
    albumUi.title.textContent = album.title;
    albumUi.previous.disabled = album.items.length < 2;
    albumUi.next.disabled = album.items.length < 2;
    buildThumbnails();
    renderAlbumPage();

    albumUi.root.setAttribute("aria-hidden", "false");
    albumUi.root.classList.add("is-open");
    document.body.classList.add("album-open");
    window.requestAnimationFrame(() => {
      fitAlbumToPhoto();
      albumUi.close.focus();
    });
  }

  function closeAlbum() {
    if (!albumUi.root.classList.contains("is-open")) return;
    albumUi.root.classList.remove("is-open");
    albumUi.root.setAttribute("aria-hidden", "true");
    document.body.classList.remove("album-open");
    activeAlbum = null;
    isTurning = false;
    if (lastFocusedElement) lastFocusedElement.focus();
  }

  function turnTo(targetIndex, direction) {
    if (!activeAlbum || isTurning || activeAlbum.items.length < 2) return;

    const length = activeAlbum.items.length;
    const nextIndex = (targetIndex + length) % length;
    if (nextIndex === activeIndex) return;

    isTurning = true;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const duration = reducedMotion ? 0 : 520;
    const turnClass = direction < 0 ? "is-turning-back" : "is-turning-forward";

    albumUi.page.classList.remove("is-turning-forward", "is-turning-back");
    void albumUi.page.offsetWidth;
    albumUi.page.classList.add(turnClass);

    window.setTimeout(() => {
      activeIndex = nextIndex;
      renderAlbumPage();
    }, duration * 0.48);

    window.setTimeout(() => {
      albumUi.page.classList.remove(turnClass);
      isTurning = false;
    }, duration + 30);
  }

  function turnPrevious() {
    turnTo(activeIndex - 1, -1);
  }

  function turnNext() {
    turnTo(activeIndex + 1, 1);
  }

  function handleAlbumKeyboard(event) {
    if (!albumUi.root.classList.contains("is-open")) return;

    if (event.key === "Escape") {
      closeAlbum();
    } else if (event.key === "ArrowLeft") {
      event.preventDefault();
      turnPrevious();
    } else if (event.key === "ArrowRight") {
      event.preventDefault();
      turnNext();
    } else if (event.key === "Home") {
      event.preventDefault();
      turnTo(0, -1);
    } else if (event.key === "End") {
      event.preventDefault();
      turnTo(activeAlbum.items.length - 1, 1);
    } else if (event.key === "Tab") {
      const focusable = [
        ...albumUi.root.querySelectorAll(
          'button:not([disabled]):not([tabindex="-1"]), [href], [tabindex]:not([tabindex="-1"])'
        ),
      ];
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }
  }

  function bindAlbumEvents() {
    document.addEventListener("click", (event) => {
      const closeTrigger = event.target.closest("[data-album-close]");
      if (closeTrigger) {
        closeAlbum();
        return;
      }

      const albumTrigger = event.target.closest("[data-album-key]");
      if (albumTrigger) {
        openAlbum(albumTrigger.dataset.albumKey, albumTrigger.dataset.albumIndex);
        return;
      }

      const thumbnail = event.target.closest("[data-album-thumbnail]");
      if (thumbnail && activeAlbum) {
        const index = Number(thumbnail.dataset.albumThumbnail);
        turnTo(index, index < activeIndex ? -1 : 1);
      }
    });

    albumUi.previous.addEventListener("click", turnPrevious);
    albumUi.next.addEventListener("click", turnNext);
    albumUi.image.addEventListener("load", fitAlbumToPhoto);
    document.addEventListener("keydown", handleAlbumKeyboard);
    window.addEventListener("resize", fitAlbumToPhoto);

    albumUi.stage.addEventListener(
      "touchstart",
      (event) => {
        touchStartX = event.changedTouches[0].clientX;
      },
      { passive: true }
    );
    albumUi.stage.addEventListener(
      "touchend",
      (event) => {
        if (touchStartX === null) return;
        const distance = event.changedTouches[0].clientX - touchStartX;
        touchStartX = null;
        if (Math.abs(distance) < 45) return;
        if (distance > 0) turnPrevious();
        else turnNext();
      },
      { passive: true }
    );
  }

  document.addEventListener("DOMContentLoaded", function () {
    renderLabInfo();
    renderStudentsByYear();
    renderGroupPhotos();
    renderActivities();
    cacheAlbumElements();
    bindAlbumEvents();

    const nav = document.getElementById("main-nav");
    window.addEventListener("scroll", () => {
      nav.classList.toggle("scrolled", window.scrollY > 20);
    });
  });
})();
