document.addEventListener('DOMContentLoaded', () => {
  // Mendapatkan parameter URL
  const urlParams = new URLSearchParams(window.location.search);
  const animeId = urlParams.get('id'); // Mendapatkan ID anime dari parameter URL

  if (animeId) {
    // Mengambil detail anime dari Jikan API berdasarkan ID anime
    fetch(`https://api.jikan.moe/v4/anime/${animeId}`)
      .then(response => response.json()) // Mengurai respons sebagai JSON
      .then(data => {
        const animeDetails = document.getElementById('anime-details'); // Pilih elemen detail anime

        // Buat elemen untuk judul anime
        const animeTitle = document.createElement('h2');
        animeTitle.textContent = data.data.title; // Menetapkan teks judul anime

        // Buat elemen untuk gambar anime
        const animeImage = document.createElement('img');
        animeImage.src = data.data.images.jpg.image_url; // Mengatur sumber gambar

        // Buat kontainer untuk informasi anime
        const animeInfoContainer = document.createElement('div');
        animeInfoContainer.classList.add('anime-info'); // Menetapkan kelas untuk penataan

        // Buat elemen untuk tipe anime
        const animeType = document.createElement('p');
        animeType.textContent = `Type: ${data.data.type}`; // Menetapkan teks tipe anime

        // Buat elemen untuk status anime
        const animeStatus = document.createElement('p');
        animeStatus.textContent = `Status: ${data.data.status}`; // Menetapkan teks status anime

        // Buat elemen untuk total episode anime
        const animeEpisodes = document.createElement('p');
        animeEpisodes.textContent = `Total Episodes: ${data.data.episodes}`; // Menetapkan teks total episode anime

        // Buat elemen untuk durasi anime
        const animeDuration = document.createElement('p');
        animeDuration.textContent = `Duration: ${data.data.duration}`; // Menetapkan teks durasi anime

        // Buat elemen untuk tanggal rilis anime
        const animeReleaseDate = document.createElement('p');
        animeReleaseDate.textContent = `Release Date: ${data.data.aired.from ? new Date(data.data.aired.from).toLocaleDateString() : 'Unknown'}`; // Menetapkan teks tanggal rilis anime

        // Buat elemen untuk genre anime
        const animeGenres = document.createElement('p');
        animeGenres.textContent = `Genre: ${data.data.genres.map(genre => genre.name).join(', ')}`; // Menetapkan teks genre anime

        // Buat elemen untuk sinopsis anime
        const animeSynopsis = document.createElement('p');
        animeSynopsis.classList.add('anime-synopsis'); // Menetapkan kelas untuk penataan
        animeSynopsis.textContent = `Synopsis: ${data.data.synopsis}`; // Menetapkan teks sinopsis anime

        // Menambahkan elemen-elemen informasi ke dalam kontainer informasi anime
        animeInfoContainer.appendChild(animeTitle);
        animeInfoContainer.appendChild(animeType);
        animeInfoContainer.appendChild(animeStatus);
        animeInfoContainer.appendChild(animeEpisodes);
        animeInfoContainer.appendChild(animeDuration);
        animeInfoContainer.appendChild(animeReleaseDate);
        animeInfoContainer.appendChild(animeGenres);

        // Buat container untuk gambar dan teks
        const imageTextContainer = document.createElement('div');
        imageTextContainer.classList.add('image-text-container'); // Menetapkan kelas untuk penataan
        imageTextContainer.appendChild(animeImage);
        imageTextContainer.appendChild(animeInfoContainer);

        // Menambahkan video trailer jika tersedia di respons API
        if (data.data.trailer && data.data.trailer.embed_url) {
          const animeTrailer = document.createElement('iframe');
          animeTrailer.src = data.data.trailer.embed_url; // Mengatur sumber video trailer
          animeTrailer.width = '560';
          animeTrailer.height = '315';
          animeTrailer.allowFullscreen = true; // Mengizinkan tampilan layar penuh
          animeDetails.appendChild(animeTrailer); // Menambahkan video trailer ke elemen detail anime
        }

        animeDetails.appendChild(imageTextContainer); // Menambahkan container gambar dan teks ke elemen detail anime
        animeInfoContainer.appendChild(animeSynopsis); // Menambahkan sinopsis ke dalam container informasi anime
      })
      .catch(error => console.error('Error fetching the anime details:', error)); // Menangani kesalahan saat mengambil detail anime
  } else {
    console.error('No anime ID provided in the URL'); // Menangani kasus di mana tidak ada ID anime yang disediakan dalam URL
  }
});
