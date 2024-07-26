let search = document.getElementById("search-engine");
search.addEventListener("submit", (e) => {
  let input = document.getElementById("value-search");
  // Jika input pencarian kosong, mencegah form disubmit
  if (input.value == "") {
    e.preventDefault();
  } else {
    // Menyimpan kata kunci pencarian ke localStorage
    localStorage.setItem("keyword", input.value);
    console.log(input);
  }
});

// Menampilkan hasil pencarian dari localStorage
let pencarian = document.getElementById("pencarian");
pencarian.textContent = `Search Result For '${localStorage.getItem("keyword")}'`;

// Menyimpan URL API pencarian ke localStorage
let APIsearch = `https://api.jikan.moe/v4/anime?q=${localStorage.getItem("keyword")}&limit=25`;
localStorage.setItem("API", APIsearch);

// BAGIAN CONTENT HASIL SEARCH //
// Fungsi untuk mengambil data anime dari API
async function fetchTopAnime() {
    // Mengambil data dari endpoint API Jikan 
    const response = await fetch(APIsearch);
    // Mengonversi respons menjadi format JSON
    const data = await response.json();
    // Mendapatkan elemen div dengan ID 'anime-list' untuk menampilkan daftar anime
    const animeList = document.getElementById('anime-list');

    // Iterasi dari data anime yang diterima API
    data.data.forEach(anime => {
        // Validasi rating dan video anime
        let keamanan = anime.rating;
        let validasiVideo = anime.trailer.youtube_id;
        localStorage.setItem("keamanan", keamanan);
        // Jika rating bukan "Rx - Hentai" dan ID video tidak null, tampilkan anime
        if(keamanan != "Rx - Hentai" && validasiVideo != null){
            const animeDiv = document.createElement('div');
            animeDiv.className = 'anime';
        
            // Membuat elemen img untuk gambar anime
            const animeImg = document.createElement('img');
            animeImg.src = anime.images.jpg.image_url;
            animeImg.alt = anime.title;
        
            // Membuat elemen a untuk judul anime
            const animeTitleLink = document.createElement('a');
            animeTitleLink.href = `anime-details.html?id=${anime.mal_id}`;
            animeTitleLink.textContent = anime.title;
        
            // Membuat elemen p untuk skor anime
            const animeScore = document.createElement('p');
            animeScore.textContent = `Score: ${anime.score}`;
            // Jika skor anime tidak ada, tampilkan "Nothing Score"
            if (anime.score == null || anime.score == undefined) {
                animeScore.textContent = `Nothing Score`;
            }

            // Menambah elemen gambar, judul, dan skor ke dalam div anime
            animeDiv.appendChild(animeImg);
            animeDiv.appendChild(animeTitleLink);
            animeDiv.appendChild(animeScore);

            // Menambahkan div anime ke dalam elemen daftar anime
            animeList.appendChild(animeDiv);
        }
    });
}

// Memanggil fungsi untuk menjalankan pengambilan data dan menampilkan anime
fetchTopAnime();
