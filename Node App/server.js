
const path = require('path')
const express = require('express')
const http = require('http')
const socketio = require('socket.io')
const formatMessage = require('./functions/messages')

const app = express()
const server = http.createServer(app) //access createServer in order to use SocketIO
const io = socketio(server)

const serverName= 'SERVER'

//set tatic folder
app.use(express.static(path.join(__dirname,'public')))

//Run when client connects
io.on('connection',socket => {

    //Welcome the current user
    socket.emit('message', formatMessage(serverName,'Welcome to the server.'))

    //Broadcast to all other users
    socket.broadcast.emit('message',formatMessage(serverName,'A user has joined the chat.'))

    //Inform established connection
    socket.emit("message",formatMessage(serverName,`You are connected to the Server on port: ${PORT}.`))

    //Emit message when user has disconnected
    socket.on('disconnect',() =>{
        io.emit('message',formatMessage('USER','A user has left the chat.'))
    })

    //listen for chat message
    socket.on('chatMessage', msg => {
        console.log(msg)
        io.emit('message',msg)
    })

})



const PORT = process.env.PORT || 3000

server.listen(PORT, () => console.log(`Server running on port ${PORT}`))