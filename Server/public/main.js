const socket = io();

const clients = [];
const cCont = document.querySelector("#clients"); 
socket.on("newclient", host => {
    if (!clients.includes(host))
    {
        clients.push(host);
        let a = document.createElement("a");
        a.innerText = host;
        a.href = window.location.href + `connect/${host}`;
        cCont.appendChild(a);
    }
})