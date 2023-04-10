const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"]
    }
});
const port = 8000;
const cors = require('cors')
app.use(cors())
// app.get('/', (req, res) => {
//   res.sendFile(__dirname + '/index.html');
// });

io.on('connection', (socket) => {
    console.log('a user connected');

    socket.on('chat message', (data) => {
        console.log('testEvent received:', data);
        io.emit('message',data);
    });
});

http.listen(port, () => {

    console.log('Server running on port 8000');
});