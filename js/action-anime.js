// Fungsi untuk mengambil data anime dari Jikan API
async function fetchAnime() {
    const response = await fetch(
      "https://api.jikan.moe/v4/anime?q=&genres=1&order_by=popularity"
    );
    const data = await response.json(); // Mengurai respons sebagai JSON
    return data.data; // Mengembalikan data anime
}

// Fungsi untuk menampilkan daftar anime
function displayAnime(animeList) {
    // Urut daftar anime berdasarkan skor dari tinggi ke rendah
    animeList.sort((a, b) => b.score - a.score);

    // Pilih elemen daftar anime dengan ID 'anime-action'
    const animeListElement = document.getElementById("anime-action");
    animeList.forEach((anime) => {
      
      // VALIDASI VIDEO
      let validasiVideo = anime.trailer.youtube_id; // Meriksa apakah anime memiliki trailer video
      if (validasiVideo != null) {
        // Buat elemen 'div' untuk setiap item anime
        const animeItem = document.createElement("div");
        animeItem.className = "anime-item"; // Menetapkan kelas untuk penataan

        // Buat elemen 'img' untuk gambar anime
        const animeImage = document.createElement("img");
        animeImage.src = anime.images.jpg.image_url; // Mengatur sumber gambar
        animeImage.alt = anime.title; // Mengatur teks alternatif dengan judul anime

        // Buat elemen 'a' untuk judul anime yang dapat diklik
        const animeTitleLink = document.createElement("a");
        animeTitleLink.className = "anime-title"; // Menetapkan kelas untuk penataan
        animeTitleLink.textContent = anime.title; // Menetapkan teks tautan dengan judul anime
        animeTitleLink.href = `anime-details.html?id=${anime.mal_id}`; // Halaman baru dengan ID anime 

        // Buat elemen 'p' untuk skor anime
        const animeScore = document.createElement("p");
        animeScore.className = "anime-score"; // Menetapkan kelas untuk penataan
        animeScore.textContent = `Score: ${anime.score}`; // Mengatur teks dengan skor anime

        // Menambahkan gambar, judul, dan skor ke dalam elemen item anime
        animeItem.appendChild(animeImage);
        animeItem.appendChild(animeTitleLink);
        animeItem.appendChild(animeScore);

        // Menambahkan elemen item anime ke dalam elemen daftar anime
        animeListElement.appendChild(animeItem);
      }
    });
}

// Event listener yang dijalankan saat konten halaman selesai dimuat
document.addEventListener("DOMContentLoaded", async () => {
    const animeList = await fetchAnime(); // Ambil daftar anime
    displayAnime(animeList); // Tampilkan daftar anime
});
