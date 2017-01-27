var config = {
    apiKey: "AIzaSyCYo9PGp7tCVZQ5zQ08GXau2Ic2AmcZw_E",
    authDomain: "rpsgame-adee5.firebaseapp.com",
    databaseURL: "https://rpsgame-adee5.firebaseio.com",
    storageBucket: "rpsgame-adee5.appspot.com",
    messagingSenderId: "919631435144"
};

firebase.initializeApp(config);
var choiceArray = ["rock", "paper", "scissors"];
var playerOneChoice = "";
var playerTwoChoice = "";
var playerOneName = "";
var playerOneWins = "";
var playerOneLosses = "";
var playerTwoName = "";
var playerTwoWins = "";
var playerTwoLosses = "";
var playerOneValue = "";
var playerTwoValue = "";
var playerTwoPick = false;
var IdPlayer = ""
var playerOneChat = "";
var playerTwoChat = "";
var novoMessages = "";
// Get a reference to the database service
var database = firebase.database();



function showTime() {
    var thetime = moment().format('MMMM Do YYYY, h:mm:ss a');
    $("#headerspan").html(thetime);
}
setInterval(showTime, 1000);

// player constructor object
function player(playerNumber, playerName, playerWins, playerLosses, playerChoice, playerChat) {
    this.playerNumber = playerNumber;
    this.playerName = playerName;
    this.playerWins = playerWins;
    this.playerLosses = playerLosses;
    this.playerChoice = playerChoice;
    this.playerChat = playerChat;
}

var playerOne = new player(1, playerOneName, playerOneWins, playerOneLosses, playerOneChoice, playerOneChat);
var playerTwo = new player(2, playerTwoName, playerTwoWins, playerTwoLosses, playerTwoChoice, playerTwoChat);





database.ref("/RPSgame/turn").on("value", function(snapshot) {

    playerTwoPick = snapshot.val();
});

database.ref("/RPSgame/player2").on("value", function(snapshot) {
    if (snapshot.val() != null) {

        IdPlayer = snapshot.val().name;
    }
});

database.ref("/chat").on("child_added", function(childSnapshot) {
    sender = childSnapshot.val().sender;
    message = childSnapshot.val().chatcontent;
    messagetimestamp = childSnapshot.val().messagetime;


    updateChatDisplay(sender, message, messagetimestamp);

});


function updateChatDisplay(sender, message, messagetime) {

    $("#chat").append("<p class='chatpara'><span class='boldname playerone'>" + sender + ": </span><span class='mainmessage'>" + message + " </span>" + " " + "<span class='momentstamp'>on " + messagetimestamp + "</span></p>");

}




$("#start").on("click", function() {
    if (!playerTwoPick) {
        playerOne.playerOneName = $("#playername").val();
        console.log(playerOne.playerOneName);

        database.ref("/RPSgame/player1").set({
            player: 1,
            name: playerOne.playerOneName,
            choice: "",
            wins: "",
            losses: "",
            dateAdded: firebase.database.ServerValue.TIMESTAMP
        });
    }

    if (playerTwoPick) {

        playerTwo.playerTwoName = $("#playername").val();
        console.log(playerTwo.playerTwoName);
        database.ref("/RPSgame/player2").set({
            player: 2,
            name: playerTwo.playerTwoName,
            choice: "",
            wins: "",
            losses: "",
            dateAdded: firebase.database.ServerValue.TIMESTAMP
        });


    }
    database.ref("/RPSgame/turn").set({
        playerTwoPick: true,
        turn: "",
    });

    console.log(IdPlayer);
    console.log()
});



$(".ingame").on("click", "h4", function() {
    console.log($(this).attr("data-value"));

});


$("#submitchat").on("click", function() {
    if (IdPlayer != playerTwo.playerTwoName) {
        var message = $("#message").val();
        var messagetimestamp = moment().format('MMMM Do YYYY, h:mm:ss a');
        console.log(message);
        database.ref("/chat").push({
            sender: playerOne.playerOneName,
            messagetime: messagetimestamp,
            chatcontent: message
        });
        $("#message").val("");
    }

    if (IdPlayer === playerTwo.playerTwoName) {

        var message = $("#message").val();
        var messagetimestamp = moment().format('MMMM Do YYYY, h:mm:ss a');
        database.ref("/chat").push({
            sender: playerTwo.playerTwoName,
            messagetime: messagetimestamp,
            chatcontent: message
        });
        $("#message").val("");
    }

});


$("#startgame").on("click", function() {

    startgamelogic();

});

function startgamelogic() {
    $("#playerone").on("click", "h4", function() {

        var player1choicer = $(this).attr("data-value");
        console.log(player1choicer);

    });
    $("#playertwo").on("click", "h4", function() {

        var player2choicer = $(this).attr("data-value");
        console.log(player2choicer);

    });
}












var connectionsRef = database.ref("/RPSgame/connections");

// '.info/connected' is a special location provided by Firebase that is updated every time
// the client's connection state changes.
// '.info/connected' is a boolean value, true if the client is connected and false if they are not.
var connectedRef = database.ref(".info/connected");

// When the client's connection state changes...
connectedRef.on("value", function(someoneNew) {

    // If they are connected..
    if (someoneNew.val()) {

        // Add user to the connections list.
        var con = connectionsRef.push(true);

        // Remove user from the connection list when they disconnect.
        con.onDisconnect().remove();
    }
});
