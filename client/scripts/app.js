// YOUR CODE HERE:

var app = {};
app.init = function(){
  app.url = "http://127.0.0.1:3000/classes/messages";
  app.user = document.URL.slice(document.URL.lastIndexOf("username=") + 9);
  app.roomName = '';
  app.roomSet = {};
  app.friends = {};
}
app.send = function(){
  var message = {
    username: app.user,
    text: $('#input').val(),
    roomname: $('#roomName').text()
  }
  $.ajax({
    type: 'POST',
    url: app.url,
    data: JSON.stringify(message),
    contentType: 'application/json',
    success: function(data){
      alert('chatterbox: message sent');
      $('#input').val('');
    },
    error: function(data){
      console.error('chatterbox: failed to send');
    }
  });
};

app.fetch = function(){
  $.ajax({
    //url: "https://api.parse.com/1/classes/chatterbox",
    url: app.url,
    type: 'GET',
    contentType: 'application/json',
    success: function(data, status, settings){
      console.log('chatterbox: message sent');
      console.log(data);
      console.log(settings);
      //alert('fetch');
      app.updateDOM(data.results);
    },
    error: function(data){
      console.error('chatterbox: failed to send');
    }
  });
};

app.clearMessages = function(){
  $(".message").remove();
  $(".room").remove();

};

app.addMessage = function(message){
  var append = function(message){
    var string = app.messageToString(message);
    var index = string.indexOf(':');
    var name = string.slice(0, index);
    var $span = $('<span/>')
      .attr('class', 'name')
      .text(name)
      .on('click', function(){
        app.friends[name] = true;
        alert('Added ' + name + ' as a friend!');
      });
    var $elem = $('<div/>')
      .attr('class', 'elem message')
      .text(string.slice(index));
    $elem.prepend($span);
    if (name in app.friends){
      $elem.attr('class', 'elem message friend');
    }
    $('#messages').append($elem);

  }
  if ($("#roomName").text()){
    if ($("#roomName").text() === message['roomname']){
      append(message);
    }

  }else{
    append(message);
  }
};

app.addRoom = function(name){
  $('#rooms').append(
    $('<div/>')
      .attr('class', 'elem room')
      .text(name)
      .on('click', function(){
        //alert('clicked a room');
        $('#roomName').text(name);
        app.clearMessages();
      })
  );
};

app.addFriend = function(){

};

app.handleSubmit = function(){

};

app.messageToString = function(message){
  //var date = new Date(message['createdAt']);
  var string = '';
  string += message['username'] + ': ' + message['text'];
  //string += ' @ ' + date.toLocaleString();
  return string;
};

app.updateDOM = function(results){
  app.clearMessages();
  //list messages on right panel
  for (var i = 0; i < results.length; i++){
    app.addMessage(results[i]);
    var room = results[i].roomname;
    if(room && room.length){
      app.roomSet[room] = true
    }
  }
  for (var key in app.roomSet){
    app.addRoom(key);
  }
};

$('document').ready(function(){
  app.init();
  $('#createRoom').on('click', function(){
    var name = $('#roomInput').val()
    if (!(name in app.roomSet)){
      app.addRoom(name);
      app.roomSet[name] = true;
    }
  });

});
