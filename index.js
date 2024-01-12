// nodejs + socketio

const httpServer = require("http").createServer();
const io = require("socket.io")(httpServer, {
    connectionStateRecovery: {},
    cors: {
        origin: "http://localhost:3001",
        methods: ["GET", "POST"]
      }
  });



let frndlist = []


io.on('connection', (socket) => {
    console.log('A user connected', socket.id)

    socket.on('join', (data) => {
        console.log(data)
        frndlist.push(data)
        console.log(frndlist)
        io.emit('frndlist', frndlist)
    })

    socket.on('sendto', (data) => {
        console.log(data)
        io.to(data.to).emit('msg', data.msg)
    })





    socket.on('disconnect', () => {
        console.log('A user disconnected')

        frndlist = frndlist.filter((item) => item !== socket.id)
        io.emit('frndlist', frndlist)

        
    })

    socket.on('message', (message) => {
        console.log(message)
        io.emit('message', `${socket.id.substr(0, 2)} said ${message}`)
    })
})


httpServer.listen(3000, () => {
    console.log('listening on *:3000');
})
