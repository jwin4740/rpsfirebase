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
var playerOneWins = 0;
var playerOneLosses = 0;
var playerTwoName = "";
var playerTwoWins = 0;
var playerTwoLosses = 0;
var playerOneValue = "";
var playerTwoValue = "";
var playerTwoPick = false;
var IdPlayer = ""
var playerOneChat = "";
var playerTwoChat = "";
var novoMessages = "";
var startName = true;
var amPlayer1 = true;
var firePlayerOneChoice = "";
var firePlayerTwoChoice = "";
var gameInPlay = false;
var ties = 0;
var winner = "";
var tie = false;
var showWinner = false;

// Get a reference to the database service
var database = firebase.database();

var pOneRef = database.ref("/RPSgame/player1");
var pTwoRef = database.ref("/RPSgame/player2");
var pGameRef = database.ref("/RPSgame/game");



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
playerOne.playerOneWins = 0;
playerOne.playerOneLosses = 0;
playerTwo.playerTwoWins = 0;
playerTwo.playerTwoLosses = 0;




database.ref("/RPSgame/game").on("value", function(snapshot) {

    playerTwoPick = snapshot.val();
});

pTwoRef.on("value", function(snapshot) {
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
        pOneRef.set({
            player: 1,
            name: playerOne.playerOneName,
            choice: "",
            wins: playerOne.playerOneWins,
            losses: playerOne.playerOneLosses,
            dateAdded: firebase.database.ServerValue.TIMESTAMP

        });
    }

    if (playerTwoPick) {

        playerTwo.playerTwoName = $("#playername").val();
        console.log(playerTwo.playerTwoName);
        amPlayer1 = false;
        pTwoRef.set({
            player: 2,
            name: playerTwo.playerTwoName,
            choice: "",
            wins: playerTwo.playerTwoWins,
            losses: playerTwo.playerTwoLosses,
            dateAdded: firebase.database.ServerValue.TIMESTAMP
        });


    }
    pGameRef.set({
        playerTwoPick: true,
        tie: tie,
        roundwinner: winner
    });

    console.log(IdPlayer);
    console.log()
    $("#notification").remove();

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





$("#playerone").on("click", "h4", function() {

    if (amPlayer1 === true) {
        playerOne.playerOneChoice = $(this).attr("data-value");
        console.log(playerOne.playerOneChoice);
        pOneRef.set({
            player: 1,
            name: playerOne.playerOneName,
            choice: playerOne.playerOneChoice,
            wins: playerOne.playerOneWins,
            losses: playerOne.playerOneLosses,
            dateAdded: firebase.database.ServerValue.TIMESTAMP

        });
        checkForBothSubmitted();
        console.log("this is player one");
        gameInPlay = true;
    }




});
$("#playertwo").on("click", "h4", function() {
    if (amPlayer1 === false) {

        playerTwo.playerTwoChoice = $(this).attr("data-value");
        console.log(playerTwo.playerTwoChoice);
        database.ref("/RPSgame/player2").set({
            player: 2,
            name: playerTwo.playerTwoName,
            choice: playerTwo.playerTwoChoice,
            wins: playerTwo.playerTwoWins,
            losses: playerTwo.playerTwoLosses,
            dateAdded: firebase.database.ServerValue.TIMESTAMP
        });
        console.log("this is player two");
        checkForBothSubmitted();
    }


});



database.ref("/RPSgame/player1").on("value", function(snapshot) {
    if (snapshot.val() != null) {
        playerOne.playerOneChoice = snapshot.val().choice;

    }


});

database.ref("/RPSgame/player2").on("value", function(snapshot) {
    if (snapshot.val() != null) {
        playerTwo.playerTwoChoice = snapshot.val().choice;

    }

});





function checkForBothSubmitted() {
    if ((playerOne.playerOneChoice === "rock" || playerOne.playerOneChoice === "paper" || playerOne.playerOneChoice === "scissors") && (playerTwo.playerTwoChoice === "rock" || playerTwo.playerTwoChoice === "paper" || playerTwo.playerTwoChoice === "scissors")) {
        console.log("lets move on");
        showdown();
    }
}








function showdown() {
    if ((playerOne.playerOneChoice === "rock") || (playerOne.playerOneChoice === "paper") || (playerOne.playerOneChoice === "scissors")) {

        // This logic determines the outcome of the game (win/loss/tie), and increments the appropriate counter.
        if ((playerOne.playerOneChoice === "rock") && (playerTwo.playerTwoChoice === "scissors")) {
            playerOne.playerOneWins++;
            playerTwo.playerTwoLosses++;
            pGameRef.set({
                playerTwoPick: true,
                tie: tie,
                roundwinner: 1
            });

        } else if ((playerOne.playerOneChoice === "rock") && (playerTwo.playerTwoChoice === "paper")) {

            playerOne.playerOneLosses++;
            playerTwo.playerTwoWins++;
            pGameRef.set({
                playerTwoPick: true,
                tie: tie,
                roundwinner: 2
            });
        } else if ((playerOne.playerOneChoice === "scissors") && (playerTwo.playerTwoChoice === "rock")) {
            playerOne.playerOneLosses++;
            playerTwo.playerTwoWins++;
            pGameRef.set({
                playerTwoPick: true,
                tie: tie,
                roundwinner: 2
            });
        } else if ((playerOne.playerOneChoice === "scissors") && (playerTwo.playerTwoChoice === "paper")) {
            playerOne.playerOneWins++;
            playerTwo.playerTwoLosses++;
            pGameRef.set({
                playerTwoPick: true,
                tie: tie,
                roundwinner: 1
            });
        } else if ((playerOne.playerOneChoice === "paper") && (playerTwo.playerTwoChoice === "rock")) {
            playerOne.playerOneWins++;
            playerTwo.playerTwoLosses++;
            pGameRef.set({
                playerTwoPick: true,
                tie: tie,
                roundwinner: 1
            });
        } else if ((playerOne.playerOneChoice === "paper") && (playerTwo.playerTwoChoice === "scissors")) {
            playerOne.playerOneLosses++;
            playerTwo.playerTwoWins++;
            pGameRef.set({
                playerTwoPick: true,
                tie: tie,
                roundwinner: 2
            });
        } else if (playerOne.playerOneChoice === playerTwo.playerTwoChoice) {
            ties++;
            tie = true;
            pGameRef.set({
                playerTwoPick: true,
                tie: tie,
                roundwinner: "no winner"
            });
        }

        pOneRef.set({
            player: 1,
            choice: playerOne.playerOneChoice,
            wins: playerOne.playerOneWins,
            losses: playerOne.playerOneLosses,
            ties: ties,
            dateAdded: firebase.database.ServerValue.TIMESTAMP

        });

        pTwoRef.set({
            player: 2,
            choice: playerTwo.playerTwoChoice,
            wins: playerTwo.playerTwoWins,
            losses: playerTwo.playerTwoLosses,
            ties: ties,
            dateAdded: firebase.database.ServerValue.TIMESTAMP

        });

        showWinner = true;


    }
}


pGameRef.on("value", function(snapshot) {

    if (showWinner) {
        winner = parseInt(snapshot.val().roundwinner);
        if (winner === 1) {
            $("#gamenotify").html(playerOne.playerOneName + " wins!!!");

        }

        if (winner === 2) {
            $("#gamenotify").html(playerTwo.playerTwoName + " wins!!!");

        }

        if (winner != 1 || winner != 2) {
            $("#gamenotify").html("It's a tie");
        }
    }

});



$("#resetfirebase").on("click", function() {

    database.ref().set(0);

});













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
