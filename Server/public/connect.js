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

img.addEventListener("click", e => {
    let rect = e.target.getBoundingClientRect();
    let x = e.clientX - rect.left;
    let y = e.clientY - rect.top;
    let sx = x/img.width;
    let sy = y/img.height;
    socket.emit("click", hostname, sx, sy);
})