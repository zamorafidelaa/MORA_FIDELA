function tampil(){
        fetch("https://api.jikan.moe/v4/anime?q=anime&sfw").then(response => response.json())
        .then((data) => {
        const result = data.data;
        result.map((item) => {
            const img = document.createElement("img");
            img.src = item.images.jpg.image_url;
            const div = document.getElementById("image");
            div.appendChild(img);

            const pp = document.createElement("a");
            pp.textContent = item.titles[0].title;
            pp.href = item.trailer.url;
            div.appendChild(pp);
        });
        console.log(result);
    })
}
tampil();

//         for(let i = 0; i < link.length; i++){
//             const menu_kiri = document.getElementById("menu-kiri");
//             const div = document.createElement("div");
//             div.className = "menu";
//             menu_kiri.appendChild(div);
//             const img = document.createElement("img");
//             img.src = data.data[i].images.jpg.image_url;
//             const a = document.createElement("a");
//             a.href =  data.data[i].url;
//             a.appendChild(img);
//             div.appendChild(a);
//             const p = document.createElement("p");
//             p.innerText = data.data[i].title;
//             a.appendChild(p);
//         }
// })
// Event
// const variabel = document.getElementById("form");
// const value = document.getElementById("search1");
// variabel.addEventListener("submit",function(e){ 
//     // e.preventDefault();
//     // const v = value.value
//     // console.log(v)
//     fetch(link).then(response => response.json()).then(result => {
//         const search = value.value;
//         const splt = search.split(" ");
//         const lwr = splt[0].toLowerCase();
//         const link1 = result.data[1].title;
//         const array = link1.split(" ");
//         const array1 = array[1].toLowerCase();
//         console.log(array1);
//         if(lwr == array1){
//             document.write("aaaaaaaaaaaaaaaaaaaaaaaaaaa")
//         }
//     })
// })