var config = {
    apiKey: "AIzaSyCYo9PGp7tCVZQ5zQ08GXau2Ic2AmcZw_E",
    authDomain: "rpsgame-adee5.firebaseapp.com",
    databaseURL: "https://rpsgame-adee5.firebaseio.com",
    storageBucket: "rpsgame-adee5.appspot.com",
    messagingSenderId: "919631435144"
};

firebase.initializeApp(config);

const messaging = firebase.messaging();
console.log("hello world");
messaging.requestPermission()
.then(function() {

    console.log("You have permission");
})

.catch(function(err) {
    console.log("No permission");

});
