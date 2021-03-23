const chatForm = document.getElementById("chat-form")
const chatMessages = document.querySelector('.chat-messages')
const roomName = document.getElementById("room-name")
const users = document.getElementById("users")

const socket = io()

const query = Qs.parse(location.search, {
    ignoreQueryPrefix:true
})
const {username, room} = query


//Update user room
socket.on('roomUsers', ({room, userList}) => {
    console.log(userList)
    updateRoomName(room)
    updateUserList(userList)
})


//join server room on joinRoom connection
socket.emit("joinRoom", {username,room})

//Handling message from server
socket.on('message', message => {
    console.log(message)
    updateMessage(message)
    
    //Scroll down
    chatMessages.scrollTop = chatMessages.scrollHeight
})

// Handle submit Button
chatForm.addEventListener('submit', e =>{
    e.preventDefault()

    //Get message text
    const msg = e.target.elements.msg.value

    //Emit message to server
    socket.emit('chatMessage',msg)

    e.target.elements.msg.value = ''
    e.target.elements.msg.focus()
    
})

function updateMessage(msg){
    const div = document.createElement('DIV')
    div.classList.add('message')
    div.innerHTML = `<p class="meta">${msg.username} <span>${msg.time}</span></p>
          <p class="text">
           ${msg.text}
          </p>`
    document.querySelector('.chat-messages').appendChild(div)
}

function updateUserList(userList){
    users.innerHTML = `
        ${userList.map( user => `<li>${user.username}</li>`).join("")}
    `
}

function updateRoomName(name){
    roomName.innerText = name
}

