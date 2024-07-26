document.addEventListener("DOMContentLoaded", () => {
  // Mengambil data anime terpopuler dari Jikan API
  fetch("https://api.jikan.moe/v4/top/anime")
    .then((response) => response.json()) // Mengurai respons API menjadi format JSON
    .then((data) => {
      const animeList = document.getElementById("anime-list"); // Mengambil elemen dengan ID 'anime-list'
      data.data.forEach((anime) => {
        // VALIDASI VIDEO
        let validasiVideo = anime.trailer.youtube_id; // Memeriksa apakah ID trailer video tersedia
        if (validasiVideo != null) {
          const animeItem = document.createElement("div"); // Membuat elemen 'div' untuk item anime
          animeItem.className = "anime-item"; // Menetapkan kelas untuk item anime

          const animeImage = document.createElement("img"); // Membuat elemen 'img' untuk gambar anime
          animeImage.src = anime.images.jpg.image_url; // Mengatur sumber gambar

          const animeTitle = document.createElement("a"); // Membuat elemen 'a' untuk judul anime
          animeTitle.href = `anime-details.html?id=${anime.mal_id}`; // Menetapkan tautan ke halaman detail anime dengan ID sebagai parameter
          animeTitle.textContent = anime.title; // Menetapkan teks judul anime
          animeTitle.className = "anime-title"; // Menetapkan kelas untuk judul anime

          const animeScore = document.createElement("p"); // Membuat elemen 'p' untuk skor anime
          animeScore.textContent = `Score: ${anime.score}`; // Menetapkan teks skor anime
          animeScore.className = "anime-score"; // Menetapkan kelas untuk skor anime

          // Menambahkan elemen gambar, judul, dan skor ke dalam elemen item anime
          animeItem.appendChild(animeImage);
          animeItem.appendChild(animeTitle);
          animeItem.appendChild(animeScore);
          
          // Menambahkan elemen item anime ke dalam elemen daftar anime
          animeList.appendChild(animeItem);
        }
      });
    })
    .catch((error) => console.error("Error fetching the anime data:", error)); // Menangani kesalahan saat mengambil data anime
});
