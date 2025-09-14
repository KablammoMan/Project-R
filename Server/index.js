const express = require("express");
const { createServer } = require("node:http");
const { join } = require("node:path");
const { Server } = require("socket.io");


const app = express();
const server = createServer(app);
const io = new Server(server);

app.use(express.json({"limit":"1mb"}));


const storage = {};
const click = {};


app.get("/", (req, res) => {
    res.sendFile(join(__dirname, "public/index.html"));
});
app.get("/style.css", (req, res) => {
    res.sendFile(join(__dirname, "public/style.css"))
});
app.get("/main.js", (req, res) => {
    res.sendFile(join(__dirname, "public/main.js"));
});
app.get("/connect.js", (req, res) => {
    res.sendFile(join(__dirname, "public/connect.js"));
});
app.get("/connect/:hostname", (req, res) => {
    let host = req.params.hostname;
    if (!Object.keys(storage).includes(host))
    {
        res.redirect("/");
    }
    else
    {
        res.sendFile(join(__dirname, "public/connect.html"));
    }
});
app.post("/upload/:hostname", (req, res) => {
    let host = req.params.hostname;
    let scdt = req.body.screen;
    if (scdt != null)
    {
        let prevExist = Object.keys(storage).includes(host);
        storage[host] = scdt;
        io.to(`manage-${host}`).emit("imgb64", scdt);
        if (!prevExist)
        {
            click[host] = [-1,-1];
            io.emit("newclient", host);
        }
    }
    res.send(`${click[host]}`);
    click[host] = [-1,-1];
});


io.on("connection", (socket) => {
    for (let host in storage) socket.emit("newclient", host);
    socket.on("manage-host", host => {
        socket.join(`manage-${host}`);
        socket.emit("imgb64", storage[host]);
    });
    socket.on("click", (host, sx, sy) => {
        click[host] = [sx, sy];
    });
});

server.listen(8080, () => {console.log("Server Running on 8080");});