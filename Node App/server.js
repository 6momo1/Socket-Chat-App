const path = require('path')
const express = require('express')
const http = require('http')
const socketio = require('socket.io')
const formatMessage = require('./functions/messages')
const { newUser, getCurrentUser,userLeave, getRoomUsers } = require('./functions/users')

const app = express()
const server = http.createServer(app) //access createServer in order to use SocketIO
const io = socketio(server)

const serverName= 'SERVER'

//set static folder
app.use(express.static(path.join(__dirname,'public')))




//Run when client connects
io.on('connection', socket => {
    socket.on('joinRoom',({username, room}) => {

        const user = newUser(socket.id,username,room)

        socket.join(user.room)

        //Welcome the current user
        socket.emit('message', formatMessage(serverName,'Welcome to the server.'))

        //Broadcast to all other users
        socket.broadcast.to(user.room).emit('message',formatMessage(user.username,`${user.username} has joined the chat.`))

        //update the room user list
        io.to(user.room).emit('roomUsers', {
            room:user.room,
            userList: getRoomUsers(user.room)
        })
       
    })
    //Inform established connection
    socket.emit("message",formatMessage(serverName,`You are connected to the Server on port: ${PORT}.`))

    //listen for a single chat message from the current user
    socket.on('chatMessage', msg => {
        user = getCurrentUser(socket.id)
        io.to(user.room).emit('message',formatMessage(user.username,msg)) //emit the message from the user to its room
    })

    //Emit message when user has disconnected
    socket.on('disconnect', () => {
        const user = userLeave(socket.id)
        if(user){
            io.emit('message',formatMessage(user.username,`${user.username} has left the chat.`))

            //update the room user list
            io.to(user.room).emit('roomUsers', {
                room:user.room,
                userList: getRoomUsers(user.room)
            })
        }
    })


})

const PORT = process.env.PORT || 3000

server.listen(PORT, () => console.log(`Server running on port ${PORT}`))