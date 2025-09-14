const socket = io();

const clients = []
socket.on("newclient", host => {
    if (!clients.includes(host)) clients.push(host);
    
})