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