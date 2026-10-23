
/* =========================================
   KECEBUR FC
   Satu Tim, Satu Keluarga
   Dusun Kecebur, Desa Karangtengah
   Berdiri: 22 Juni 2018
========================================= */

// 1. KONFIGURASI INSTAGRAM
const INSTAGRAM_URL = "https://www.instagram.com/cebur_generation/";

// 2. DATA PERTANDINGAN
// Tambahkan data pertandingan asli di dalam array ini.
const matches = {
  upcoming: [
    // Contoh:
    // {
    //   date: "15 NOV",
    //   day: "SABTU",
    //   opponent: "Nama Tim Lawan",
    //   time: "15.30 WIB",
    //   venue: "Lapangan Desa",
    //   status: "Akan datang"
    // }
  ],

  results: [
    // Contoh:
    // {
    //   date: "20 OKT",
    //   day: "MINGGU",
    //   opponent: "Nama Tim Lawan",
    //   score: "2 - 1",
    //   venue: "Lapangan Desa",
    //   status: "Selesai"
    // }
  ]
};

// 3. MENU NAVIGASI UNTUK HP
const menuToggle = document.getElementById("menuToggle");
const mainNav = document.getElementById("mainNav");

if (menuToggle && mainNav) {
  menuToggle.addEventListener("click", () => {
    const isOpen = mainNav.classList.toggle("open");

    menuToggle.setAttribute(
      "aria-expanded",
      String(isOpen)
    );

    menuToggle.setAttribute(
      "aria-label",
      isOpen ? "Tutup menu" : "Buka menu"
    );

    menuToggle.textContent = isOpen ? "✕" : "☰";
  });

  mainNav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      mainNav.classList.remove("open");
      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.textContent = "☰";
    });
  });
}

// 4. TOMBOL INSTAGRAM
const instagramLink = document.getElementById("instagramLink");

if (instagramLink) {
  instagramLink.href = INSTAGRAM_URL;
  instagramLink.target = "_blank";
  instagramLink.rel = "noopener noreferrer";
}

// 5. MENAMPILKAN JADWAL DAN HASIL
const fixtureList = document.getElementById("fixtureList");
const tabButtons = document.querySelectorAll(".tab-button");

function escapeHTML(value) {
  return String(value ?? "").replace(/[&<>"']/g, (char) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;"
  })[char]);
}

function renderMatches(tab) {
  if (!fixtureList) return;

  const items = matches[tab] || [];

  if (items.length === 0) {
    fixtureList.innerHTML = `
      <div class="empty-fixtures">
        <div class="empty-icon">⚽</div>
        <h3>
          ${
            tab === "upcoming"
              ? "JADWAL BELUM DITAMBAHKAN"
              : "HASIL BELUM TERSEDIA"
          }
        </h3>
        <p>
          ${
            tab === "upcoming"
              ? "Jadwal pertandingan Kecebur FC akan ditampilkan di sini setelah tersedia."
              : "Hasil pertandingan akan ditampilkan setelah data pertandingan dimasukkan."
          }
        </p>
      </div>
    `;
    return;
  }

  fixtureList.innerHTML = items.map((match) => `
    <article class="fixture-card">
      <div class="fixture-date">
        <strong>${escapeHTML(match.date || "TBA")}</strong>
        <span>${escapeHTML(match.day || "")}</span>
      </div>

      <div>
        <div class="fixture-match">
          <div class="fixture-team">
            <span class="mini-crest">KFC</span>
            <span>KECEBUR FC</span>
          </div>

          <span class="vs">
            ${
              tab === "results"
                ? escapeHTML(match.score || "-")
                : "VS"
            }
          </span>

          <div class="fixture-team">
            <span class="mini-crest opponent-crest">FC</span>
            <span>${escapeHTML(match.opponent || "Tim Lawan")}</span>
          </div>
        </div>

        <p class="fixture-meta">
          ${escapeHTML(match.time || "")}
          ${match.time && match.venue ? " · " : ""}
          ${escapeHTML(match.venue || "")}
        </p>
      </div>

      <div class="fixture-status">
        ${
          tab === "results"
            ? `
              <div class="status-result">
                ${escapeHTML(match.score || "-")}
              </div>
              <span class="status-label">
                ${escapeHTML(match.status || "Selesai")}
              </span>
            `
            : `
              <span class="status-label">
                ${escapeHTML(match.status || "Akan datang")}
              </span>
            `
        }
      </div>
    </article>
  `).join("");
}

// Tombol untuk berpindah tab Jadwal dan Hasil
tabButtons.forEach((button) => {
  button.addEventListener("click", () => {
    tabButtons.forEach((item) => {
      item.classList.toggle("active", item === button);
    });

    renderMatches(button.dataset.tab);
  });
});

// 6. TAHUN OTOMATIS DI FOOTER
const yearElement = document.getElementById("year");

if (yearElement) {
  yearElement.textContent = new Date().getFullYear();
}

// 7. TAMPILKAN JADWAL SAAT HALAMAN DIBUKA
renderMatches("upcoming");
