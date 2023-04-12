const express = require('express');
const app = express()
const http = require('http').Server(app);
const User = require('./Schema/User')
const dbconnect = require('./db')
app.use(express.json());
dbconnect()
const io = require('socket.io')(http, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"]
    }
});
const port = 8000;
const cors = require('cors')
app.use(cors())
let count=0;
io.on('connection', (socket) => {
    
    console.log(`connected ${count++}`);

    socket.on('new user',(user)=>{
        console.log(`new user ${user.name}`)
        io.emit('user',user)
    })

    socket.on('chat message', (data) => {
        console.log('testEvent received:', data);
        io.emit('message',data);
    });
});

app.post('/user',async (req,res)=>{
    const obj = {
        name:req.body.name,
        email:req.body.email
    }
    const result = await User.create(obj)
    if(!result) return res.status(501).send({msg:'unsuccessfull',user:obj})
    res.status(501).send({msg:'successfull', user:obj,success:true})
})

http.listen(port, () => {
    console.log('Server running on port 8000');
});