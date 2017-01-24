var config = {
    apiKey: "AIzaSyCYo9PGp7tCVZQ5zQ08GXau2Ic2AmcZw_E",
    authDomain: "rpsgame-adee5.firebaseapp.com",
    databaseURL: "https://rpsgame-adee5.firebaseio.com",
    storageBucket: "rpsgame-adee5.appspot.com",
    messagingSenderId: "919631435144"
};

firebase.initializeApp(config);



// Get a reference to the database service
var database = firebase.database();

var number = "";
var name = "";
var destination = "";
var frequency = "";
var nextArrival = "";
var minutesAway = "";
var min = "";
var hour = "";
var frequencyDisplay = "";
var minutesAwayDisplay = "";
var frequencyHour = "";
var frequencyMinutes = "";
var hourCount = "";
var hourMinutesAway = "";
var hourMinutes = "";
var hourCountMin = "";
var winCount = "";
var lossCount = "";

function showTime() {
    var thetime = moment().format('MMMM Do YYYY, h:mm:ss a');
    $("#headerspan").html(thetime);
}
setInterval(showTime, 1000);


$("#start").on("click", function() {

    name = $("#playername").val();


    database.ref(("/players/1")).set({
        playerName: name,
        wins: winCount,
        losses: lossCount

    });

});




// var trainRef = database.ref(("/trainschedule"));

// trainRef.on("child_added", function(childSnapshot) {

//     number = childSnapshot.val().trainNumber;
//     name = childSnapshot.val().trainName;
//     destination = childSnapshot.val().trainDestination;
//     frequency = childSnapshot.val().trainFrequency;

//     min = moment().minute();
//     console.log(min);

//     minutesAway = (frequency - (min % frequency));
//     console.log(minutesAway);
//     hour = moment().hour();
//     nextArrival = moment().add(minutesAway, 'minutes').format("h:mm a");

//     frequencyHour = frequency;
//     frequencyMinutes = "";
//     hourCount = 0;

//     hourMinutesAway = minutesAway;
//     hourMinutes = "";
//     hourCountMin = 0;


//     if (frequency > 59) {

//         do {
//             frequencyHour = frequencyHour - 60;

//             hourCount++;
//         }
//         while (frequencyHour > 59);


//         frequencyMinutes = frequencyHour;
//         frequencyDisplay = "every " + hourCount + " hr " + frequencyMinutes + " min";
//     }

//     if (minutesAway > 59) {

//         do {
//             hourMinutesAway = hourMinutesAway - 60;
//             hourCountMin++;
//         }
//         while (hourMinutesAway > 59);


//         hourMinutes = hourMinutesAway;
//         minutesAwayDisplay = hourCountMin + " hr " + hourMinutes + " min";
//     }



//     updateDisplay(name, destination, frequency, nextArrival, minutesAway, number);

// }, function(errorObject) {
//     console.log("Errors handled: " + errorObject.code);
// });








// function updateDisplay(name, destination, frequency, nextArrival, minutesAway, number) {

//     var novoTableRow = $("<tr class='row" + number + "' data-value='" + number + "'>");
//     var novoTableDsix = $("<td class='trainrow'>" + number + "</td>");
//     var novoTableDone = $("<td class='trainrow'>" + name + "</td>");
//     var novoTableDtwo = $("<td class='trainrow'>" + destination + "</td>");
//     var novoTableDthree = $("<td class='trainrow'>" + frequency + " minutes</td>");
//     var novoTableDfour = $("<td class='trainrow'>" + nextArrival + "</td>");
//     var novoTableDfive = $("<td class='trainrow'>" + minutesAway + " minutes</td>");

//     novoTableRow.append(novoTableDfour);
//     novoTableRow.append(novoTableDsix);
//     novoTableRow.append(novoTableDone);

//     novoTableRow.append(novoTableDtwo);

//     novoTableRow.append(novoTableDthree);

//     novoTableRow.append(novoTableDfive);

//     $("#tablebody").append(novoTableRow);
// }
