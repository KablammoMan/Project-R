const socket = io();
const hostname = window.location.href.split('/')[4];
const img = document.querySelector("#screen");
const keyMap = {
    "Meta": "Win",
    "Control": "Ctrl",
    "ArrowUp": "Up",
    "ArrowLeft": "Left",
    "ArrowRight": "Right",
    "ArrowDown": "Down"
}

let lastMDown = -1;

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

img.addEventListener("mousemove", e => {
    e.preventDefault();
    let rect = e.target.getBoundingClientRect();
    let x = e.clientX - rect.left;
    let y = e.clientY - rect.top;
    let sx = x/img.width;
    let sy = y/img.height;
    socket.emit("mmove", hostname, sx, sy);
});

img.addEventListener("mousedown", e => {
    e.preventDefault();
    let type = "left";
    if (e.button == 1) type = "middle";
    if (e.button == 2) type = "right";
    socket.emit("mdown", hostname, type);
});

img.addEventListener("mouseup", e => {
    e.preventDefault();
    let type = "left";
    if (e.button == 1) type = "middle";
    if (e.button == 2) type = "right";
    socket.emit("mup", hostname, type);
});

img.addEventListener("wheel", e => {
    e.preventDefault();
    socket.emit("mscroll", hostname, e.deltaY);
});

window.addEventListener("keyup", e => {
    e.preventDefault();
    let key = e.key;
    if (Object.keys(keyMap).includes(key)) key = keyMap[key];
    socket.emit("kup", hostname, key);
})

window.addEventListener("keydown", e => {
    e.preventDefault();
    let key = e.key;
    if (Object.keys(keyMap).includes(key)) key = keyMap[key];
    socket.emit("kdown", hostname, key);
});