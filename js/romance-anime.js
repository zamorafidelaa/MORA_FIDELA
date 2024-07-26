async function fetchRomanceAnime() {
    const API_URL = "https://api.jikan.moe/v4/anime";
    const genreId = 22; // ID untuk genre Romance
    const response = await fetch(
      `${API_URL}?genres=${genreId}&order_by=popularity` // Mengambil anime dengan genre Romance dan mengurutkan berdasarkan popularitas
    );
    const data = await response.json(); // Mengurai respons API menjadi format JSON
    return data.data; // Mengembalikan data anime
  }
  
  function displayRomanceAnime(animeList) {
    animeList.sort((a, b) => b.score - a.score); // Mengurutkan daftar anime berdasarkan skor dari yang tertinggi
  
    const animeListElement = document.getElementById("anime-romance"); // Mengambil elemen dengan ID 'anime-romance'
    animeList.forEach((anime) => {
      let validasiVideo = anime.trailer.youtube_id; // Memeriksa apakah ID trailer video tersedia
      if (validasiVideo != null) {
        const animeItem = document.createElement("div"); // Membuat elemen 'div' untuk item anime
        animeItem.className = "item-romance"; // Menetapkan kelas untuk item anime

        const animeImage = document.createElement("img"); // Membuat elemen 'img' untuk gambar anime
        animeImage.src = anime.images.jpg.image_url; // Mengatur sumber gambar
        animeImage.alt = anime.title; // Menetapkan teks alternatif gambar

        const animeTitleLink = document.createElement("a"); // Membuat elemen 'a' untuk judul anime
        animeTitleLink.className = "title-romance"; // Menetapkan kelas untuk judul anime
        animeTitleLink.textContent = anime.title; // Menetapkan teks judul anime
        animeTitleLink.href = `anime-details.html?id=${anime.mal_id}`; // Tautan ke halaman detail anime dengan ID sebagai parameter

        const animeScore = document.createElement("p"); // Membuat elemen 'p' untuk skor anime
        animeScore.className = "score-romance"; // Menetapkan kelas untuk skor anime
        animeScore.textContent = `Score: ${anime.score}`; // Menetapkan teks skor anime

        // Menambahkan elemen gambar, judul, dan skor ke dalam elemen item anime
        animeItem.appendChild(animeImage);
        animeItem.appendChild(animeTitleLink);
        animeItem.appendChild(animeScore);

        // Menambahkan elemen item anime ke dalam elemen daftar anime
        animeListElement.appendChild(animeItem);
      }
    });
  }
  
  document.addEventListener("DOMContentLoaded", async () => {
    const romanceAnimeList = await fetchRomanceAnime(); // Mengambil daftar anime romance
    displayRomanceAnime(romanceAnimeList); // Menampilkan daftar anime romance
  });
