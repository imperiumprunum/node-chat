let socket = io();

//  Built in events

socket.on('connect', function(){
    console.log('Connected to servers');
});

socket.on('disconnect', function(){
    console.log('Disconnected from the servers');
});

//  Custom events

//  Prints message to the chat window
socket.on('newMessage', function(message){
    console.log(message);
    let li = $('<li></li>');
    li.text(message.from+""+message.text);
    $('#messages').append(li); 
});


//  Overwrite default behaviour - refreshing page
$('#submitButton').on('click', function(e){
    e.preventDefault();

    //  Emitting data from the form to the server
    socket.emit('createNewMessage', 
    {from: 'Root', 
    text: $('[name=message]').val() },
    // text: 'test' },
     function(){
    console.log('Got the message');
});

});