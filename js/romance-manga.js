document.addEventListener('DOMContentLoaded', () => {
    // Pilih elemen container manga dengan ID 'manga-container'
    const mangaContainer = document.getElementById('manga-container');

    // Mengambil data manga romantis dari Jikan API
    fetch('https://api.jikan.moe/v4/manga?q=&genres=22') // 22 adalah ID genre untuk romantis
        .then(response => response.json()) // Mengurai respons sebagai JSON
        .then(data => {
            const mangas = data.data; // Menyimpan daftar manga dari data yang diambil

            // Loop melalui setiap item manga dalam data yang diambil
            mangas.forEach(manga => {
                // Buat elemen 'div' untuk setiap kartu manga
                const mangaCard = document.createElement('div');
                mangaCard.classList.add('manga-card'); // Menetapkan kelas untuk penataan

                // Buat elemen 'img' untuk gambar manga
                const mangaImg = document.createElement('img');
                mangaImg.src = manga.images.jpg.image_url; // Mengatur sumber gambar
                mangaImg.alt = manga.title; // Mengatur teks alternatif dengan judul manga

                // Buat elemen 'div' untuk detail manga
                const mangaDetails = document.createElement('div');
                mangaDetails.className = 'manga-details'; // Menetapkan kelas untuk penataan

                // Buat elemen 'a' untuk judul manga yang dapat diklik
                const mangaTitleLink = document.createElement('a');
                mangaTitleLink.className = 'title-manga'; // Menetapkan kelas untuk penataan
                mangaTitleLink.href = manga.url; // Mengatur URL tautan
                mangaTitleLink.textContent = manga.title; // Menetapkan teks tautan dengan judul manga
                mangaTitleLink.target = '_blank'; // Membuka tautan di tab baru

                // Buat elemen 'p' untuk peringkat manga
                const mangaRank = document.createElement('p');
                mangaRank.className = 'rank-manga'; // Menetapkan kelas untuk penataan
                mangaRank.textContent = `Rank: ${manga.rank}`; // Mengatur teks dengan peringkat manga

                // Menambahkan elemen judul dan peringkat ke dalam elemen detail manga
                mangaDetails.appendChild(mangaTitleLink);
                mangaDetails.appendChild(mangaRank);

                // Menambahkan gambar dan detail manga ke dalam elemen kartu manga
                mangaCard.appendChild(mangaImg);
                mangaCard.appendChild(mangaDetails);

                // Menambahkan elemen kartu manga ke dalam elemen kontainer manga
                mangaContainer.appendChild(mangaCard);
            });
        })
        .catch(error => console.error('Error fetching data:', error)); // Menangani kesalahan saat mengambil data
});
