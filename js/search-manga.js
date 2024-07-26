document.addEventListener('DOMContentLoaded', function () {
    // Pilih elemen formulir pencarian, input pencarian, daftar manga, dan elemen pencarian
    const searchForm = document.getElementById('search-engine-manga');
    const searchInput = document.getElementById('value-search-manga');
    const mangaList = document.getElementById('manga-list');
    const pencarian = document.getElementById('pencarian-manga');

    // Tampilkan kata kunci pencarian dari localStorage
    const storedKeyword = localStorage.getItem('keyword');
    if (storedKeyword) {
        pencarian.textContent = `Search Result For '${storedKeyword}'`;
        searchManga(storedKeyword); // Panggil fungsi pencarian dengan kata kunci yang tersimpan
    }

    // Tambahkan event listener untuk formulir pencarian
    searchForm.addEventListener('submit', function (event) {
        event.preventDefault(); // Mencegah pengiriman formulir secara default
        const query = searchInput.value.trim(); // Ambil nilai input dan hapus spasi ekstra
        if (query) {
            // Simpan kata kunci pencarian di localStorage
            localStorage.setItem('keyword', query);
            // Perbarui tampilan hasil pencarian
            pencarian.textContent = `Search Result For '${query}'`;
            searchManga(query); // Panggil fungsi pencarian dengan kata kunci baru
        }
    });

    // Fungsi untuk mencari manga berdasarkan kata kunci
    async function searchManga(query) {
        try {
            const response = await fetch(`https://api.jikan.moe/v4/manga?q=${query}&limit=10`); // Mengambil data manga dari API
            const data = await response.json(); // Mengurai respons sebagai JSON
            displayManga(data.data); // Tampilkan manga
        } catch (error) {
            console.error('Error fetching manga data:', error); // Menangani kesalahan saat mengambil data manga
        }
    }

    // Fungsi untuk menampilkan manga
    function displayManga(mangas) {
        // Hapus hasil sebelumnya
        while (mangaList.firstChild) {
            mangaList.removeChild(mangaList.firstChild);
        }

        // Loop melalui setiap item manga dalam data yang diambil
        mangas.forEach(manga => {
            const mangaItem = document.createElement('div');
            mangaItem.className = 'manga-item'; // Menetapkan kelas untuk penataan

            const mangaImage = document.createElement('img');
            mangaImage.src = manga.images.jpg.image_url; // Mengatur sumber gambar
            mangaImage.alt = manga.title; // Mengatur teks alternatif dengan judul manga

            const mangaDetails = document.createElement('div');
            mangaDetails.className = 'manga-details'; // Menetapkan kelas untuk penataan

            const mangaTitle = document.createElement('a');
            mangaTitle.className = 'manga-title'; // Menetapkan kelas untuk penataan
            mangaTitle.href = manga.url; // Mengatur URL tautan
            mangaTitle.target = '_blank'; // Membuka tautan di tab baru
            mangaTitle.textContent = manga.title; // Menetapkan teks tautan dengan judul manga

            const mangaRank = document.createElement('p');
            mangaRank.className = 'manga-rank'; // Menetapkan kelas untuk penataan
            mangaRank.textContent = `Rank: ${manga.rank || 'N/A'}`; // Mengatur teks dengan peringkat manga (jika ada)

            // Menambahkan elemen judul dan peringkat ke dalam elemen detail manga
            mangaDetails.appendChild(mangaTitle);
            mangaDetails.appendChild(mangaRank);

            // Menambahkan gambar dan detail manga ke dalam elemen item manga
            mangaItem.appendChild(mangaImage);
            mangaItem.appendChild(mangaDetails);

            // Menambahkan elemen item manga ke dalam elemen daftar manga
            mangaList.appendChild(mangaItem);
        });
    }
});
