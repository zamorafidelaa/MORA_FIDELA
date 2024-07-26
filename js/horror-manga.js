document.addEventListener("DOMContentLoaded", () => {
    // Pilih elemen container tempat manga akan ditampilkan
    const container = document.getElementById("manga-horror");

    // Mengambil data dari Jikan API untuk manga dengan genre horor
    fetch('https://api.jikan.moe/v4/manga?genres=14') // 14 adalah ID genre untuk horor
        .then(response => response.json()) // Mengurai respons sebagai JSON
        .then(data => {
            // Loop melalui setiap item manga dalam data yang diambil
            data.data.forEach((manga, index) => {
                // Buat elemen div untuk menampung informasi setiap manga
                const mangaDiv = document.createElement('div');
                mangaDiv.className = 'horror-manga'; // Menetapkan kelas untuk penataan

                // Buat elemen img untuk gambar sampul manga
                const img = document.createElement('img');
                img.src = manga.images.jpg.image_url; // Mengatur sumber gambar
                img.alt = manga.title; // Mengatur teks alternatif dengan judul manga

                // Buat elemen anchor untuk tautan judul manga
                const titleLink = document.createElement('a');
                titleLink.href = manga.url; // Mengatur URL tautan
                titleLink.target = '_blank'; // Membuka tautan di tab baru
                titleLink.className = 'title-horror'; // Menetapkan kelas untuk penataan
                titleLink.textContent = manga.title; // Menetapkan teks tautan dengan judul manga

                // Buat elemen p untuk menampilkan peringkat manga
                const rank = document.createElement('p');
                rank.className = 'rank-horror'; // Menetapkan kelas untuk penataan
                rank.textContent = `Peringkat: ${index + 1}`; // Mengatur teks dengan peringkat manga

                // Menambahkan elemen-elemen ke dalam div manga
                mangaDiv.appendChild(img); // Menambahkan gambar ke dalam div manga
                mangaDiv.appendChild(titleLink); // Menambahkan tautan judul ke dalam div manga
                mangaDiv.appendChild(rank); // Menambahkan peringkat ke dalam div manga
                container.appendChild(mangaDiv); // Menambahkan div manga ke dalam container
            });
        })
        .catch(error => console.error('Error fetching manga:', error)); // Menangani kesalahan saat mengambil data manga
});
