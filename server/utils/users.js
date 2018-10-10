class Users{

    constructor(){
        // Global users array
        this.UsersArr = [];
    }

    addNewUser(id, name, room){
        let newUser = {
            id,
            name,
            room
        }

        this.UsersArr.push(newUser);
    }

    getUsersList(room){
        // Returns list of users in specified room
        let users = this.UsersArr.filter((user) => user.room === room);

        return this.stringifyUsersList(users);
    }

    removeUser(id){
        // Updates global user array
        let updatedUsersList = this.UsersArr.filter((user) => user.id !== id);

        this.UsersArr = updatedUsersList;
    }

    stringifyUsersList(usersArr){
        return usersArr.map((user) => user.name);
    }


}

module.exports = {
    Users
}