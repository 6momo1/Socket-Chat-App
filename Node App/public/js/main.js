const chatForm = document.getElementById("chat-form")
const chatMessages = document.querySelector('.chat-messages')
const socket = io()

//Handling message from server
socket.on('message', message =>{
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