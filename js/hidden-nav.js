// Menambahkan event listener ke elemen dengan id 'menu-icon'
// Ketika elemen ini di klik, fungsi ini jalan
document.getElementById('menu-icon').addEventListener('click', function() {
    // dapat elemen dengan id 'navbar-links' dan menyimpannya dalam variabel 'menuList'
    const menuList = document.getElementById('navbar-links');
    
    // Mengubah kelas 'show' pada elemen 'menuList'
    // Jika elemen sudah memiliki kelas 'show', maka kelas tersebut akan dihapus
    // Jika elemen tidak memiliki kelas 'show', maka kelas tersebut akan ditambahkan
    menuList.classList.toggle('show');
});
