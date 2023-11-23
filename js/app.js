let albumsList = document.querySelector("#albums");
let photosList = document.querySelector("#photos");
let mainTitle = document.querySelector("#main-title");

let params = new URLSearchParams(window.location.search);
let id = params.get("id");

if (id) {
    fetch("https://jsonplaceholder.typicode.com/albums/" + id).then((res) =>
        res.json().then((album) => {
            fetch(
                `https://jsonplaceholder.typicode.com/photos?_limit=50&_start=${
                    album.id * 50 - 50
                }&albumId + ${album.id}`
            )
                .then((res) => res.json())
                .then((photos) => {
                    photos.forEach((photo) => {
                        let card = document.createElement("div");
                        card.classList.add("card");

                        let img = document.createElement("img");
                        img.setAttribute("src", photo.url);
                        img.classList.add("card-img-top");
                        card.append(img);

                        let cardBody = document.createElement("div");
                        cardBody.classList.add("card-body");

                        let imgTitle = document.createElement("h5");
                        imgTitle.classList.add("card-title");
                        cardBody.append(imgTitle);

                        let a = document.createElement("a");
                        a.innerText = `${photo.id}. ` + photo.title;
                        a.setAttribute("href", "#");
                        a.classList.add("btn", "btn-primary");
                        cardBody.append(a);

                        card.append(cardBody);

                        photosList.append(card);
                    });
                });
            mainTitle.innerText = `PHOTOS GROUP ${album.id}`;
        })
    );
} else {
    fetch("https://jsonplaceholder.typicode.com/albums/")
        .then((res) => res.json())
        .then((albums) => {
            albums.forEach((album) => {
                let a = document.createElement("a");
                a.innerText = `${album.id}. ` + album.title;
                a.setAttribute("href", `/?id=${album.id}`);
                a.classList.add(
                    "list-group-item",
                    "list-group-item-action",
                    "border-1",
                    "rounded-2"
                );
                albumsList.append(a);
            });
            mainTitle.innerText = "ALBUMS";
        });
}
