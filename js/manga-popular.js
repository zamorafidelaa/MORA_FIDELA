document.addEventListener('DOMContentLoaded', function() {
    // Pilih elemen daftar manga dengan ID 'manga-list'
    const mangaListElement = document.getElementById('manga-list');

    // Mengambil data manga teratas dari Jikan.moe API
    fetch('https://api.jikan.moe/v4/top/manga')
        .then(response => response.json()) // Mengurai respons sebagai JSON
        .then(data => {
            const mangaList = data.data; // Menyimpan daftar manga dari data yang diambil
            mangaList.forEach(manga => {
                // Buat elemen 'li' untuk setiap item manga
                const mangaItem = document.createElement('li');
                mangaItem.className = 'manga-item'; // Menetapkan kelas untuk penataan

                // Buat elemen 'img' untuk gambar manga
                const mangaImage = document.createElement('img');
                mangaImage.src = manga.images.jpg.image_url; // Mengatur sumber gambar
                mangaImage.alt = manga.title; // Mengatur teks alternatif dengan judul manga

                // Buat elemen 'div' untuk detail manga
                const mangaDetails = document.createElement('div');
                mangaDetails.className = 'manga-details'; // Menetapkan kelas untuk penataan

                // Buat elemen 'a' untuk judul manga yang dapat diklik
                const mangaTitle = document.createElement('a');
                mangaTitle.className = 'manga-title'; // Menetapkan kelas untuk penataan
                mangaTitle.href = manga.url; // Mengatur URL tautan
                mangaTitle.textContent = manga.title; // Menetapkan teks tautan dengan judul manga
                mangaTitle.target = '_blank'; // Membuka tautan di tab baru

                // Buat elemen 'div' untuk peringkat manga
                const mangaRank = document.createElement('div');
                mangaRank.className = 'manga-rank'; // Menetapkan kelas untuk penataan
                mangaRank.textContent = `Rank: ${manga.rank}`; // Mengatur teks dengan peringkat manga

                // Menambahkan elemen judul dan peringkat ke dalam elemen detail manga
                mangaDetails.appendChild(mangaTitle);
                mangaDetails.appendChild(mangaRank);

                // Menambahkan gambar dan detail manga ke dalam elemen item manga
                mangaItem.appendChild(mangaImage);
                mangaItem.appendChild(mangaDetails);

                // Menambahkan elemen item manga ke dalam elemen daftar manga
                mangaListElement.appendChild(mangaItem);
            });
        })
        .catch(error => {
            // Menangani kesalahan saat mengambil data manga
            console.error('Error fetching manga:', error);
        });
});
