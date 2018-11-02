var config = {
    apiKey: "AIzaSyBfIbPb2HyGbVBcEvZ3grpSpkJ03hFWMo4",
    authDomain: "firstproject-107b4.firebaseapp.com",
    databaseURL: "https://firstproject-107b4.firebaseio.com",
    projectId: "firstproject-107b4",
    storageBucket: "firstproject-107b4.appspot.com",
    messagingSenderId: "1018512885254"
  };
  firebase.initializeApp(config);

var database = firebase.database();

// 2. Button for adding Employees
$("#trainSubmit").on("click", function (event) {
    event.preventDefault();

    // Grabs user input
    var trainName = $("#trainInput").val().trim();
    var destination = $("#destinationInput").val().trim();
    // var timeStart = moment($("#timeInput").val().trim(), "kk:mm"); BROKE M'SHTUFF
    var timeStart = moment($("#timeInput").val().trim(), "kk:mm").format("X");
    var frequency = $("#frequencyInput").val().trim();

    // Creates local "temporary" object for holding employee data
    var newTrain = {
        name: trainName,
        where: destination,
        start: timeStart,
        often: frequency
    };

    // Uploads employee data to the database
    database.ref().push(newTrain);

    // Logs everything to console
    console.log("name " + newTrain.name);
    console.log("where " + newTrain.where);
    console.log("start " + newTrain.start);
    console.log("freq " + newTrain.often);

    // alert("Employee successfully added");
    //add an added notification on the screen

    // Clears all of the text-boxes
    $("#trainInput").val("");
    $("#destinationInput").val("");
    $("#timeInput").val("");
    $("#frequencyInput").val("");
});

// 3. Create Firebase event for adding employee to the database and a row in the html when a user adds an entry
database.ref().on("child_added", function (childSnapshot) {
    console.log(childSnapshot.val());

    // Store everything into a variable.
    var theName = childSnapshot.val().name;
    var theWhere = childSnapshot.val().where;
    var theStart = childSnapshot.val().start;
    var theFrequency = childSnapshot.val().often;

    // Employee Info
    console.log("DB name " + theName);
    console.log("DB where " + theWhere);
    console.log("DB start " + theStart);
    console.log("DB freq " + theFrequency);

    // Prettify the employee start
    var startPretty = moment.unix(theStart).format("kk:mm");

    // Calculate the months worked using hardcore math
    // To calculate the months worked
    var nextArrival = moment().diff(moment(theStart, "kk:mm"), "months");
    console.log("nextArrival " + nextArrival);

    // Calculate the total billed rate
    var minutesAway = theStart & theFrequency;
    console.log("minutesAway " + minutesAway);

    // Create the new row
    var newRow = $("<tr>").append(
        $("<td>").text(theName),
        $("<td>").text(theWhere),
        $("<td>").text(startPretty),
        $("<td>").text(nextArrival),
        $("<td>").text(minutesAway),
        //   $("<td>").text(empBilled)
    );

    // Append the new row to the table ... the > means create this (after) inside this (before)
    $("#employee-table > tbody").append(newRow);
});

  // Example Time Math
  // -----------------------------------------------------------------------------
  // Assume Employee start date of January 1, 2015
  // Assume current date is March 1, 2016

  // We know that this is 15 months.
  // Now we will create code in moment.js to confirm that any attempt we use meets this test case
