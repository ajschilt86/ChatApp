// Initialize Firebase
var config = {
    apiKey: "AIzaSyDjxLo-PPsSsfcCfLx2CHs8oc_Gmo92SzM",
    authDomain: "chatapp-8abc7.firebaseapp.com",
    databaseURL: "https://chatapp-8abc7.firebaseio.com",
    projectId: "chatapp-8abc7",
    storchatBucket: "chatapp-8abc7.appspot.com",
    messagingSenderId: "106645640951"
};
firebase.initializeApp(config);

// Create a variable to reference the database
var database = firebase.database();

// Initial Variables (SET the first set IN FIREBASE FIRST)
// Note remember to create these same variables in Firebase!
var name = "";
var chat = "";

var userName = prompt("Enter your name");
localStorage.setItem("name", userName);

// Click Button changes what is stored in firebase
$("#click-button").on("click", function (event) {
    // Prevent the chat from refreshing
    event.preventDefault();

    // Get inputs
    name = localStorage.getItem("name")
    chat = $("#chat-input").val().trim();

    localStorage.setItem("name", name);

    // Change what is saved in firebase
    database.ref().push({
        name: name,
        chat: chat,
    });

    var addChat = $("#chat-input").val().trim();
    if (addChat === "") {
        return false;
    }
    else {
        document.forms["inputForm"].reset();
    }
});

$(document).keydown(function (e) {
    var key_one = 13;

    if (e.keyCode == key_one) {
        // Prevent the pchat from refreshing
        event.preventDefault();
        // Get inputs
        name = localStorage.getItem("name")
        chat = $("#chat-input").val().trim();

        localStorage.setItem("name", name);

        // Change what is saved in firebase
        database.ref().push({
            name: name,
            chat: chat,
        });

        var addChat = $("#chat-input").val().trim();
        if (addChat === "") {
            return false;
        }
        else {
            document.forms["inputForm"].reset();
        }
    }
});

// Firebase is always watching for changes to the data.
// When changes occurs it will print them to console and html
database.ref().on("child_added", function (snapshot) {

    // Print the initial data to the console.
    console.log(snapshot.val());

    // Log the value of the various properties
    console.log(snapshot.val().name);
    console.log(snapshot.val().chat);

    // Change the HTML    
    $("#displayed-data").append("<div>" + snapshot.val().name + ": " + snapshot.val().chat + "</div>");

    // If any errors are experienced, log them to console.
}, function (errorObject) {
    console.log("The read failed: " + errorObject.code);
});