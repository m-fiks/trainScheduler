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
    // console.log(storedName)
    let storedDest =sv.trainDestination;
    // console.log(storedDest);
    let storedFreq = sv.trainFrequency
    // console.log(storedFreq);
    let storedFirstTime = sv.trainFirstTime;
    //console.log(storedFirstTime);
    $('#addingName').append(`<tr><td> ${storedName} </td></tr>`);
    $('#addingDest').append(`<tr><td> ${storedDest} </td></tr>`);
    $('#addingFreq').append(`<tr><td> ${storedFreq} </td></tr>`);

    //getting difference of times & other moment business
    let format = "HH:mm";

    //obtain unix value for storedFirstTime and current time
    let firstUnix = moment(storedFirstTime, format).unix();
    //console.log(firstUnix)

    let nowUnix = moment().unix();
    //console.log(nowUnix);

    //difference between NOW and firsttraintime
    let difference = moment(nowUnix).diff(moment(firstUnix));

    // //divide by 60 to get to minutes?
    let diffMinutes = difference/60;
    //console.log('Difference in time: ' + diffMinutes + ' minutes');
    

    //minutes until next train
    let remainder =  diffMinutes % storedFreq;
    //console.log(remainder);
    let minsAway = storedFreq - remainder;
    // console.log(minsAway);

    //calculate next arrival
    let nextArrival = moment().add(minsAway, 'm');
    //console.log(nextArrival)
    //append to DOM
    $('#addingMinutesAway').append(`<tr><td> ${Math.ceil(minsAway)} </td></tr>`);
    $('#addingNext').append(`<tr><td> ${moment(nextArrival).format("HH:mm")} </td></tr>`);

});