// $(document).ready(function(){
// 		var socket = io.connect('http://127.0.0.1:5000')

// 		socket.on('connect', function(){
// 			socket.send("User has connected!")
// 		})

// 		socket.on('message',function(msg){
// 			$('#messages').append('<li>'+msg+'</li>')
// 			console.log("Message received.")
// 		})

// 		// $('sendMessage').on('click', function(){
// 		// 	socket.send($('#myMessage').val())
// 		// 	$('#myMessage').val('')
// 		// 	console.log("Message sent.")
// 		// })

// 		// $('sendMessage').on('click',sendMessage())

	
// })


var socket = io.connect('http://127.0.0.1:5000')

socket.on('connect', function(){
	socket.send("User has connected!")
})

socket.on('message',function(msg){
	$('#messages').append('<li>'+msg+'</li>')
	console.log("Message received.")
})


function sendMessage(){
			socket.send($('#myMessage').val())
			$('#myMessage').val('')
			console.log("Message sent.")
		}