var deferredPrompt;
var scoutData;
var numberOfScouts;
var current_scout;

window.addEventListener("beforeinstallprompt", (e) => {
    e.preventDefault();
    deferredPrompt = e;
    showInstallPromotion();
    console.log("Install promoted!");
});

window.addEventListener("appinstalled", () => {
    hideInstallPromotion();
    deferredPrompt = null;
    console.log("App installed!");
});

function addLeadingZero(num) {
    return num < 10 ? '0' + num : num;
}

function generateFile() {
    let location = document.getElementById("location").value;
    let first_name = document.getElementById("first").value;
    let last_name = document.getElementById("last").value;
    let team_number = document.getElementById("teamno").value;
    let match_number = document.getElementById("match").value;
    let swerve = document.getElementById("swerve").value;
    let defense = document.getElementById("defense").value;
    let offense = document.getElementById("offense").value;
    let score = document.getElementById("score").value;
    let drive = document.getElementById("drive").value;
    let speed = document.getElementById("speed").value;
    let ss1 = document.getElementById("ss1").checked ? "yes" : "no";
    let ss1_label = "Speaker?";
    let ss2 = document.getElementById("ss2").checked ? "yes" : "no";
    let ss2_label = "Amp?";
    let ss3 = document.getElementById("ss3").checked ? "yes" : "no";
    let ss3_label = "Harmony?";
    let ss4 = document.getElementById("ss4").checked ? "yes" : "no";
    let ss4_label = "Climb?";
    let ss5 = document.getElementById("ss5").checked ? "yes" : "no";
    let ss5_label = "Trap?";
    let died = document.getElementById("died").checked ? "yes" : "no";
    let dropped = document.getElementById("dropped").checked ? "yes" : "no";

    let current_date = new Date();
    let datetime = current_date.getFullYear() + "-"
        + addLeadingZero(current_date.getMonth() + 1) + "-"
        + addLeadingZero(current_date.getDate()) + "@"
        + addLeadingZero(current_date.getHours()) + ":"
        + addLeadingZero(current_date.getMinutes()) + ":"
        + addLeadingZero(current_date.getSeconds());

    var csv_output = `2898_SCOUTER
Date,Location,First,Last,Match,Team,Swerve,Defense,Offense,Score,${ss1_label},${ss2_label},${ss3_label},${ss4_label},${ss5_label},Drive(0-10),Speed(0-10),Died,Dropped
${datetime},${location},${first_name},${last_name},${match_number},${team_number},${swerve},${defense},${offense},${score},${ss1},${ss2},${ss3},${ss4},${ss5},${drive},${speed},${died},${dropped}
END_DATA`;

    const [allAnswered, unanswered_qs] = checkIfUnanswered();
    //alert(allAnswered);
    //alert(unanswered_qs);

    if (allAnswered) {
        csv_output = csv_output.replace(/\?/g, "");
        const file = new Blob([csv_output], { type: 'text/csv' });
        const url = URL.createObjectURL(file);
        //alert(csv_output);

        const a = document.createElement("a");
        a.href = url;
        document.body.appendChild(a);
        var filename = datetime.replace(/\:/g, "");
        filename = filename.replace(/\-/g, "");
        filename = filename + ".csv";
        a.download = filename;
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    } else {
        let message = `The following questions are required:\n${unanswered_qs.join("\n")}`;
        alert(message);
    }
}

function checkIfUnanswered() {
    let location = document.getElementById("location").value;
    let first_name = document.getElementById("first").value;
    let last_name = document.getElementById("last").value;
    let team_number = document.getElementById("teamno").value;
    let match_number = document.getElementById("match").value;
    let swerve = document.getElementById("swerve").value;
    let defense = document.getElementById("defense").value;
    let offense = document.getElementById("offense").value;
    let score = document.getElementById("score").value;
    let drive = document.getElementById("drive").value;
    let speed = document.getElementById("speed").value;

    let required = [
        {name: "Event location", value: location},
        {name: "First name", value: first_name},
        {name: "Last name", value: last_name},
        {name: "Team number", value: team_number},
        {name: "Match number", value: match_number},
        {name: "Swerve", value: swerve},
        {name: "Defense", value: defense},
        {name: "Offense", value: offense},
        {name: "Score", value: score},
        {name: "Drive", value: drive},
        {name: "Speed", value: speed}
    ];

    let unanswered = [];

    for (let i = 0; i < required.length; i++) {
        if (required[i].value == "" || required[i].value == null) {
            unanswered.push(required[i].name);
        }
    }

    if (unanswered.length == 0) {
        return [true, unanswered];
    } else {
        return [false, unanswered];
    }
}

function fileStart() {
    // Your code here
}

function help() {
    var message = `Select one of the buttons based on what you wish to do:
Add to local storage: Adds the current scout data to local storage, so a file does not have to be generated on every scout. The file can be generated later.
Create file: Uses the current scout data and data in local storage (if applicable) and generates a CSV file. Local storage will be cleared.
    `;
    alert(message);
}

function checkIfLocalStorageInitialized(){
    if (localStorage.getItem("scoutnumber") != null && localStorage.getItem("scoutdata") != null){
        console.log("Scouter data exists!");
    }

    else {
        console.log("Creating scouter data...");
        let scoutNumber = ["scouts", 0];
        let scoutingData = {
            "data": []
        }
        console.log(scoutNumber);
        console.log(scoutingData);
        localStorage.setItem("scoutnumber", JSON.stringify(scoutNumber));
        localStorage.setItem("scoutdata", JSON.stringify(scoutingData));
    }
}

function createScoutingData(){
    let location = document.getElementById("location").value;
    let first_name = document.getElementById("first").value;
    let last_name = document.getElementById("last").value;
    let team_number = document.getElementById("teamno").value;
    let match_number = document.getElementById("match").value;
    let swerve = document.getElementById("swerve").value;
    let defense = document.getElementById("defense").value;
    let offense = document.getElementById("offense").value;
    let score = document.getElementById("score").value;
    let drive = document.getElementById("drive").value;
    let speed = document.getElementById("speed").value;
    let ss1 = document.getElementById("ss1").checked ? "yes" : "no";
    let ss1_label = "Speaker?";
    let ss2 = document.getElementById("ss2").checked ? "yes" : "no";
    let ss2_label = "Amp?";
    let ss3 = document.getElementById("ss3").checked ? "yes" : "no";
    let ss3_label = "Harmony?";
    let ss4 = document.getElementById("ss4").checked ? "yes" : "no";
    let ss4_label = "Climb?";
    let ss5 = document.getElementById("ss5").checked ? "yes" : "no";
    let ss5_label = "Trap?";
    let died = document.getElementById("died").checked ? "yes" : "no";
    let dropped = document.getElementById("dropped").checked ? "yes" : "no";

    let data_dict = {
        "location": location,"first_name": first_name,
        "last_name": last_name,"team_number": team_number,
        "match_number": match_number,"swerve": swerve,
        "defense": defense, "offense": offense,
        "score": score, "drive": drive,
        ss1_label: ss1, ss2_label: ss2, ss3_label: ss3,
        ss4_label: ss4, ss5_label: ss5, "died": died,
        "dropped": dropped
    }
    if (numberOfScouts == 0){
        scoutData = [];
        scoutData.push(data_dict);
    }

    else {
        scoutData.push(data_dict);
    }
    alert(data_dict);

    current_scout = data_dict;
}

function exportScoutingData(){
    let scoutNumber = ["scouts", numberOfScouts];
    let scoutingData = scoutData;
    alert(scoutNumber);
    alert(scoutingData);
    localStorage.setItem("scoutnumber", JSON.stringify(scoutNumber));
    localStorage.setItem("scoutdata", JSON.stringify(scoutingData));
    
}

function importScoutingData(){
    numberOfScouts = JSON.parse(localStorage.getItem("scoutnumber"));
    numberOfScouts = numberOfScouts[1];
    scoutData = JSON.parse(localStorage.getItem("scoutdata"));
    document.getElementById("lsavailability").innerHTML = `(${numberOfScouts} scout(s) available)`;
}