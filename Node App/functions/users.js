const users = []

//create new User
function newUser(id, username, room){
    const user = {id, username, room}
    users.push(user)
    return user
}

//Get user by ID
function getCurrentUser(id){
    return users.find(user => user.id === id)
}

//Delete user from array
function userLeave(id){
    const index = users.findIndex(user => user.id === id)

    if (index !== -1){
        return users.splice(index,1)[0]
    }
}


//Get room users
function getRoomUsers(room){
    return users.filter(user => user.room === room)
}


module.exports = {
    newUser,
   getCurrentUser,
   userLeave,
   getRoomUsers
}