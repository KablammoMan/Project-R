const socket = io();

const hostname = window.location.href.split('/')[4];

const img = document.querySelector("#screen");

socket.emit("manage-host", hostname);

socket.on("imgb64", b64dat => {
    img.setAttribute("src", "data:image/jpg;base64,"+b64dat);
    let rat = Math.min(window.innerWidth/img.width, window.innerHeight/img.height);
    img.width *= rat;
});

window.addEventListener("resize", e => {
    let rat = Math.min(window.innerWidth/img.width, window.innerHeight/img.height);
    img.width *= rat;
});