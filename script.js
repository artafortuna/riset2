// Fungsi untuk menghilangkan Popup Onboarding saat tombol X diklik
function closePopup() {
    const popup = document.getElementById('onboarding-popup');
    popup.style.opacity = '0'; // Animasi fade out
    setTimeout(() => {
        popup.style.display = 'none';
    }, 300); // Menunggu animasi selesai sebelum hilang sepenuhnya
}

// Fungsi untuk mengganti Halaman
function showPage(pageId, clickedButton) {
    // 1. Sembunyikan semua halaman
    let pages = document.querySelectorAll('.page');
    pages.forEach(function(page) {
        page.classList.remove('active');
    });

    // 2. Tampilkan halaman yang dituju
    document.getElementById(pageId).classList.add('active');
    
    // 3. Hapus warna aktif dari semua tombol navigasi
    let buttons = document.querySelectorAll('.nav-btn');
    buttons.forEach(function(btn) {
        btn.classList.remove('active-btn');
    });

    // 4. Berikan warna aktif pada tombol yang sedang diklik (jika diklik dari navigasi/daftar isi)
    if (clickedButton) {
        clickedButton.classList.add('active-btn');
    }

    // 5. Scroll ke bagian atas (sangat berguna setelah membaca teks panjang)
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// =========================================================
// FITUR TAMBAHAN: PROTEKSI & DARK MODE (AUTO-INJECT - REVISI)
// =========================================================

document.addEventListener("DOMContentLoaded", () => {
    // 1. Membuat & Menyisipkan Tombol Dark Mode ke HTML
    const toggleBtn = document.createElement("button");
    toggleBtn.id = "darkModeToggle";
    toggleBtn.innerHTML = "🌙";
    document.body.appendChild(toggleBtn);

    // 2. Menyisipkan CSS Proteksi & Tema Dark Mode ke Halaman
    const style = document.createElement("style");
    style.innerHTML = `
        /* -- PROTEKSI KONTEN -- */
        body {
            -webkit-user-select: none;
            -ms-user-select: none;
            user-select: none;
            -webkit-tap-highlight-color: transparent;
        }
        img { pointer-events: none; }
        /* Pengecualian agar elemen interaktif tetap berfungsi */
        .close-btn, .nav-btn, button, a { pointer-events: auto; }

        /* -- TOMBOL DARK MODE MENGAPUNG -- */
        #darkModeToggle {
            position: fixed;
            bottom: 30px;
            right: 30px;
            z-index: 9999;
            background-color: #2d3748; /* Warna gelap elegan */
            color: #f7fafc;
            border: none;
            border-radius: 50%;
            width: 50px;
            height: 50px;
            font-size: 24px;
            cursor: pointer;
            box-shadow: 0 4px 12px rgba(0,0,0,0.2);
            transition: all 0.3s ease;
            display: flex;
            justify-content: center;
            align-items: center;
        }
        #darkModeToggle:hover { transform: scale(1.1); box-shadow: 0 6px 16px rgba(0,0,0,0.3); }

        /* =======================================================
           TEMA DARK MODE UNIVERSAL (NYAMAN DI MATA)
           ======================================================= */
           
        /* Background utama: Abu-abu arang gelap (bukan hitam pekat) */
        body.dark-mode { 
            background-color: #121212 !important; 
            color: #e2e8f0 !important; 
        }

        /* Menghapus background putih pada kontainer artikel/div jika ada */
        body.dark-mode div:not(.nav-btn):not(.modal-content):not(.toc-card), 
        body.dark-mode section, 
        body.dark-mode article, 
        body.dark-mode main {
            background-color: transparent !important;
        }

        /* Navigasi Bar */
        body.dark-mode nav { 
            background-color: #1a202c !important; 
            box-shadow: 0 2px 10px rgba(0,0,0,0.6) !important; 
            border-bottom: 1px solid #2d3748 !important; 
        }
        body.dark-mode .nav-btn { color: #a0aec0 !important; }
        body.dark-mode .nav-btn:hover { background-color: #2d3748 !important; color: #edf2f7 !important; }
        body.dark-mode .nav-btn.active-btn { background-color: #4a5568 !important; color: #ffffff !important; }

        /* Modal Popup & Kartu (Elemen mengambang) */
        body.dark-mode .modal-content, 
        body.dark-mode .toc-card { 
            background-color: #1e293b !important; 
            color: #e2e8f0 !important; 
            border: 1px solid #334155 !important;
            box-shadow: 0 8px 25px rgba(0,0,0,0.7) !important; 
        }

        /* TIPOGRAFI & TEKS */
        /* Judul dan Teks Tebal (Kontras lebih tinggi agar menonjol) */
        body.dark-mode h1, 
        body.dark-mode h2, 
        body.dark-mode h3, 
        body.dark-mode h4,
        body.dark-mode strong,
        body.dark-mode b { 
            color: #f8fafc !important; 
        }
        
        /* Teks Paragraf dan List (Kontras menengah agar mata tidak lelah membaca naskah panjang) */
        body.dark-mode p, 
        body.dark-mode li, 
        body.dark-mode span,
        body.dark-mode i,
        body.dark-mode em { 
            color: #cbd5e1 !important; 
        }

        /* Link & Tautan */
        body.dark-mode a { color: #60a5fa !important; }

        /* Media / Gambar (Meredupkan sedikit agar tidak menyilaukan dalam gelap) */
        body.dark-mode img { filter: brightness(0.85) contrast(1.1) !important; }

        /* Tombol Toggle saat Dark Mode Aktif (Menjadi Terang) */
        body.dark-mode #darkModeToggle { 
            background-color: #f1f5f9 !important; 
            color: #0f172a !important; 
        }
    `;
    document.head.appendChild(style);

    // 3. Logika Klik Tombol Dark Mode
    toggleBtn.addEventListener("click", () => {
        document.body.classList.toggle("dark-mode");
        // Ubah simbol berdasarkan status tema
        toggleBtn.innerHTML = document.body.classList.contains("dark-mode") ? "☀️" : "🌙";
    });
});

// 4. LOGIKA PROTEKSI MAKSIMAL (Anti Klik Kanan & Shortcut)
document.addEventListener("contextmenu", e => e.preventDefault());
document.addEventListener("dragstart", e => e.preventDefault());
document.addEventListener("keydown", e => {
    if (e.key === "F12") e.preventDefault();
    if (e.ctrlKey || e.metaKey) {
        const forbiddenKeys = ["c", "u", "s", "p", "a", "x"];
        if (forbiddenKeys.includes(e.key.toLowerCase())) e.preventDefault();
        if (e.shiftKey && ["i", "j", "c"].includes(e.key.toLowerCase())) e.preventDefault();
    }
});

// Memuat halaman Pengantar secara otomatis saat website pertama kali dibuka
window.onload = function() {
    // Mencari tombol navigasi pertama (Pengantar) yang ada di urutan ke-0
    const tombolPengantar = document.querySelectorAll('.nav-btn')[0];
    
    // Memicu fungsi klik pada tombol tersebut secara otomatis
    if (tombolPengantar) {
        tombolPengantar.click();
    }
};
