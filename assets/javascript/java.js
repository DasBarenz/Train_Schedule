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
    // var timeStart = moment($("#timeInput").val().trim(), "kk:mm");
    var timeStart = moment($("#timeInput").val().trim(), "HH:mm").format("X");
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
    console.log("name ", newTrain.name);
    console.log("where ", newTrain.where);
    console.log("start ", newTrain.start);
    console.log("freq ", newTrain.often);

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

    // train Info
    console.log("DB name ", theName);
    console.log("DB where ", theWhere);
    console.log("DB start ", theStart);
    console.log("DB freq ", theFrequency);

    //lisa
//   var startTimeConverted = moment(childSnapshot.val().startTime, "hh:mm").subtract(1, "years");
//   var timeDiff = moment().diff(moment(startTimeConverted), "minutes");
//   var timeRemain = timeDiff % childSnapshot.val().frequency;
//   var minToArrival = childSnapshot.val().frequency - timeRemain;
//   var nextTrain = moment().add(minToArrival, "minutes");
//   var key = childSnapshot.key;


    //just for console log viewability
    var startClean = moment.unix(theStart).format("HH:mm");
    console.log("start clean", startClean)

    //start time from DB and converted/manipulated
    var startPretty = moment(theStart, "HH:mm").subtract(1, "years");
    console.log("start pretty", startPretty)

    // Current Time
    var currentTime = moment().format("HH:mm");
    console.log("CURRENT TIME: " + currentTime);

    // Difference between the times
    // var diffTime = moment(currentTime).diff(moment(startPretty), "minutes");
    //var diffTime = moment().diff(moment(startPretty), "minutes");
    var diffTime = moment().diff(moment(startPretty), "minutes");
    console.log("DIFFERENCE IN TIME: ", moment(startPretty), "minutes");

    //divide DIFFERENCE by frequency,REMAINDER is MINUTESAWAY
    var minutesAway = diffTime % theFrequency;
    console.log("remainder " + minutesAway);

    //NEXTARRIVAL is current time plus MINUTESAWAY
    var nextArrival = moment().add(minutesAway, "minutes");
    console.log("ARRIVAL TIME: " + moment(nextArrival).format("HH:mm"));

    //moment.max --> help with train start in future -- look at this component when i am first updating DB with start time


    // Create the new row
    var newRow = $("<tr>").append(
        $("<td>").text(theName),
        $("<td>").text(theWhere),
        $("<td>").text(theFrequency),
        $("<td>").text(moment(nextArrival).format("HH:mm")),
        $("<td>").text(minutesAway),
    );

    // // Append the new row to the table ... the > means create this (after) inside this (before)
    $("#train-table > tbody").append(newRow);
});
