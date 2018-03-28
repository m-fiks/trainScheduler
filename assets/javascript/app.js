// Initialize Firebase
  var config = {
    apiKey: "AIzaSyATMVgxtXap6Z-GYYuIfKDR4DMvj_Z9QiI",
    authDomain: "choochoo-c114a.firebaseapp.com",
    databaseURL: "https://choochoo-c114a.firebaseio.com",
    projectId: "choochoo-c114a",
    storageBucket: "",
    messagingSenderId: "556178921727"
  };
  firebase.initializeApp(config);

let database = firebase.database();

//add trains
$('button').on("click", function () {
    event.preventDefault();

    let newName = $('#namearea').val();
    let newDestination = $('#destinationarea').val();
    let newFirstTime = $('#firsttimearea').val();
    let newFrequency = $('#frequencyarea').val();

    // console.log(newName)
    // console.log(newDestination)
    // console.log(newFirstTime)
    // console.log(newFrequency)

    database.ref().push({
        trainName: newName,
        trainDestination: newDestination,
        trainFirstTime: newFirstTime,
        trainFrequency: newFrequency
    });

    //clear the form
    $('#namearea').val("");
    $('#destinationarea').val("");
    $('#firsttimearea').val("");
    $('#frequencyarea').val("");
});

database.ref().orderByChild("dateAdded").limitToLast(1).on("child_added", function(snapshot){
    let sv = snapshot.val();
    console.log(sv);
   
    let storedName= sv.trainName;
    console.log(storedName)
    let storedDest =sv.trainDestination;
    console.log(storedDest);
    let storedFreq = sv.trainFrequency
    console.log(storedFreq);
    $('#addingName').append(`<tr><td> ${storedName} </td></tr>`);
    $('#addingDest').append(`<tr><td> ${storedDest} </td></tr>`);
    $('#addingFreq').append(`<tr><td> ${storedFreq} </td></tr>`);

    let storedFirstTime = sv.trainFirstTime;
    console.log(storedFirstTime);

    //getting difference of times & other moment business
    let format = "HH:mm";

    //obtain unix value for storedFirstTime
    console.log(moment(storedFirstTime, format).unix());
    console.log(moment("15:30", format).unix());
    //console.log(moment.unix(today));
    //console.log(moment(today).format("DD/MM/YY/hh:mm"));
});
