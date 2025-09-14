const socket = io();

const clients = [];
const cCont = document.querySelector("#clients"); 
socket.on("newclient", (host, time) => {
    if (!clients.includes(host))
    {
        clients.push(host);
        let a = document.createElement("a");
        a.innerText = `${host} - Last Updated @ ${time}`;
        a.href = window.location.href + `connect/${host}`;
        cCont.appendChild(a);
    }
})