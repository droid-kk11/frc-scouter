var deferredPrompt;
var scoutData = [];
var numberOfScouts;
var current_scout = {};
var ss1_label = "Totes closed";
var ss2_label = "Totes opened";
var ss3_label = "Totes moved";
var ss4_label = "Tote score";
var ss5_label = "LZ score";
var ss6_label = "Minibot totes closed";
var ss7_label = "Minibot totes opened";
var ss8_label = "Minibot totes moved";
var ss9_label = "Minibot tote score";
var ss10_label = "Minibot LZ score";
var ss11_label = "Bunny LZ score";
var ss12_label = "Bunny tote score";
var ss13_label = "Strategy";

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
    let usels = document.getElementById("ls").checked ? "yes" : "no";
    let clearls = document.getElementById("cls").checked ? "yes" : "no";
    let toReturn;
    let ss4 = document.getElementById("ss4").value;
    let ss5 = document.getElementById("ss5").value;
    let ss9 = document.getElementById("ss9").value;
    let ss10 = document.getElementById("ss10").value;
    let ss11 = document.getElementById("ss11").value;
    let ss12 = document.getElementById("ss12").value;
    let ss13 = document.getElementById("ss13").value;

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
        {name: "Speed", value: speed},
        {name: ss4_label, value: ss4},
        {name: ss5_label, value: ss5},
        {name: ss9_label, value: ss9},
        {name: ss10_label, value: ss10},
        {name: ss11_label, value: ss11},
        {name: ss12_label, value: ss12},
        {name: ss13_label, value: ss13}
    ];

    let unanswered = [];

    for (let i = 0; i < required.length; i++) {
        if (required[i].value == "" || required[i].value == null) {
            unanswered.push(required[i].name);
        }
    }

    if (unanswered.length == 0) {
        toReturn = [true, unanswered];
    } else {
        toReturn = [false, unanswered];
    }

    if (usels == "yes" || clearls == "yes"){
        toReturn.push(true);
    }

    else {
        toReturn.push(false);
    }

    return toReturn;
}

function generateFile() {
    let usels = document.getElementById("ls").checked ? "yes" : "no";
    let clearls = document.getElementById("cls").checked ? "yes" : "no";

    let current_date = new Date();
    let datetime = current_date.getFullYear() + "-"
        + addLeadingZero(current_date.getMonth() + 1) + "-"
        + addLeadingZero(current_date.getDate()) + "@"
        + addLeadingZero(current_date.getHours()) + ":"
        + addLeadingZero(current_date.getMinutes()) + ":"
        + addLeadingZero(current_date.getSeconds());
    

    let csv_output = "";

    let i;
    let j;

    const [allAnswered, unanswered_qs, bypass] = checkIfUnanswered();
    let csv_labels;
    if (Object.keys(scoutData[0]) === undefined) {
        console.log("No object keys!");
        csv_labels = ["Foobar"];
    }
    else {
        console.log("YAY! Object keys found!");
        csv_labels = Object.keys(scoutData[0]);
    }
    console.log(csv_labels);

    i=0;

    for (i=0; i< csv_labels.length; i++){
        csv_output = csv_output + csv_labels[i] + ","
    }

    csv_output = csv_output + "\n";
    createScoutingData();

    i=0;
    labels = ["Location","First name",
        "Last name","Team number",
        "Match number","Swerve",
        "Defense", "Offense",
        "Score", "Drive",
        "ss1_label", "ss2_label", "ss3_label",
        "ss4_label", "ss5_label", "ss6_label",
        "ss7_label", "ss8_label", "ss9_label",
        "ss10_label", "ss11_label",
        "ss12_label", "ss13_label",
        "Robot died",
        "Dropped items"];

    if (allAnswered == false && usels == "yes") {
        for (i=0; i<scoutData.length; i++){
            for (j=0; j<(csv_labels.length); j++){
                console.log(`i: ${i}, j: ${j}`);
                scoutData[i][labels[j]].replace(",", " ");
                csv_output = csv_output + scoutData[i][labels[j]] + ","
            }
            csv_output = csv_output + "\n";
        }
    } else if (allAnswered == true && usels == "no"){
        for (j=0; j<csv_labels.length; j++){
            current_scout[j].replace(",", " ");
            csv_output = csv_output + current_scout[j] + ","
        }
        csv_output = csv_output + "\n";
    } else if (allAnswered == true && usels == "yes"){
        for (i=0; i<scoutData.length; i++){
            for (j=0; j<(csv_labels.length); j++){
                console.log(`i: ${i}, j: ${j}`);
                scoutData[i][labels[j]].replace(",", " ");
                console.log(scoutData[i][labels[j]]);
                csv_output = csv_output + scoutData[i][labels[j]] + ","
            }
            csv_output = csv_output + "\n";
        }
        for (k=0; k<csv_labels.length; k++){
            current_scout[k].replace(",", " ");
            csv_output = csv_output + current_scout[k] + ","
        }
        csv_output = csv_output + "\n";
        csv_output = csv_output.split("\n");
        csv_output.splice(csv_output.length-1,csv_output.length-1);
        csv_output = csv_output.join("\n");
    }

    if (allAnswered || usels == "yes") {
        csv_output = csv_output.replace(/\?/g, "");
        const file = new Blob([csv_output], { type: 'text/csv' });
        const url = URL.createObjectURL(file);

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
    }
    else if (bypass) {
        console.log("Bypass detected!");
    } else {
        let message = `The following questions are required:\n${unanswered_qs.join(", ")}`;
        alert(message);
    }

    if (clearls == "yes") {
        localStorage.clear();
        alert("Local storage has been cleared. Now reloading.");
        window.location.reload();
    }

    document.getElementById('file-dialog').style.display='none';

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
        console.log("Good news! Scouter data exists!");
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
    console.log(location);
    location.replace(",", " ");
    console.log(location);
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
    let ss2 = document.getElementById("ss2").checked ? "yes" : "no";
    let ss3 = document.getElementById("ss3").checked ? "yes" : "no";
    let ss4 = document.getElementById("ss4").value;
    let ss5 = document.getElementById("ss5").value;
    let died = document.getElementById("died").checked ? "yes" : "no";
    let ss6 = document.getElementById("ss6").checked ? "yes" : "no";
    let ss7 = document.getElementById("ss7").checked ? "yes" : "no";
    let ss8 = document.getElementById("ss8").checked ? "yes" : "no";
    let ss9 = document.getElementById("ss9").value;
    let ss10 = document.getElementById("ss10").value;
    let ss11 = document.getElementById("ss11").value;
    let ss12 = document.getElementById("ss12").value;
    let ss13 = document.getElementById("ss13").value;
    let dropped = document.getElementById("dropped").checked ? "yes" : "no";

    let data_dict = {
        "Location": location,"First name": first_name,
        "Last name": last_name,"Team number": team_number,
        "Match number": match_number,"Swerve": swerve,
        "Defense": defense, "Offense": offense,
        "Score": score, "Drive": drive,
        ss1_label: ss1, ss2_label: ss2, ss3_label: ss3,
        ss4_label: ss4, ss5_label: ss5, ss6_label: ss6,
        ss7_label: ss7, ss8_label: ss8, ss9_label: ss9,
        ss10_label: ss10, ss11_label: ss11,
        ss12_label: ss12, ss13_label: ss13,
        "Robot died": died,
        "Dropped items": dropped
    }
    if (numberOfScouts == 0){
        scoutData = [];
        scoutData.push(data_dict);
    }

    else {
        scoutData.push(data_dict);
    }

    current_scout = data_dict;
}

function exportScoutingData(){
    createScoutingData();
    numberOfScouts = numberOfScouts + 1;
    let scoutNumber = ["scouts", numberOfScouts];
    let scoutingData = scoutData;
    localStorage.setItem("scoutnumber", JSON.stringify(scoutNumber));
    localStorage.setItem("scoutdata", JSON.stringify(scoutingData));
    alert("Scouting data exported!");
    
}

function importScoutingData(){
    numberOfScouts = JSON.parse(localStorage.getItem("scoutnumber"));
    numberOfScouts = numberOfScouts[1];
    scoutData = JSON.parse(localStorage.getItem("scoutdata"));
    document.getElementById("lsavailability").innerHTML = `(${numberOfScouts} scout(s) available)`;
}

function importFiles(){
    let file_upload = document.getElementById("uploaded-files");
    let reader = new FileReader();
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
    let ss1 = document.getElementById("ss1").checked;
    let ss2 = document.getElementById("ss2").checked;
    let ss3 = document.getElementById("ss3").checked;
    let ss4 = document.getElementById("ss4").value;
    let ss5 = document.getElementById("ss5").value;
    let died = document.getElementById("died").checked;
    let ss6 = document.getElementById("ss6").checked;
    let ss7 = document.getElementById("ss7").checked;
    let ss8 = document.getElementById("ss8").checked;
    let ss9 = document.getElementById("ss9").value;
    let ss10 = document.getElementById("ss10").value;
    let ss11 = document.getElementById("ss11").value;
    let ss12 = document.getElementById("ss12").value;
    let ss13 = document.getElementById("ss13").value;
    let dropped = document.getElementById("dropped").checked ? "yes" : "no";
    let files = file_upload.files;
    let file_lines;
    let headers;
    let file_data;

    if (files.length == 0){
        alert("No files were selected. Please use the 'Upload' button to select files");
    }

    else {
        for (const file of files) {
            reader.readAsText(file, "UTF-8");
            reader.onload = function(e) {
                file_lines = e.target.result.split("\n");
                headers = file_lines[0].split(",");
                if (headers[11] != ss1_label){
                    alert("One or more files was/were not imported due to them being from a previous season.");
                }

                else {
                    for (line in file_lines) {
                        file_data = line.split(",");
                        location = file_data[0];
                        first_name = file_data[1];
                        last_name = file_data[2];
                        team_number = file_data[3];
                        match_number = file_data[4];
                        swerve = file_data[5];
                        defense = file_data[6];
                        offense = file_data[7];
                        score = file_data[8];
                        drive = file_data[9];
                        speed = file_data[10];
                        ss1 = (file_data[12] == "yes") ? true : false;
                        ss2 = (file_data[13] == "yes") ? true : false;
                        ss3 = (file_data[14] == "yes") ? true : false;
                        ss4 = file_data[16];
                        ss5 = file_data[17];
                        ss6 = (file_data[18] == "yes") ? true : false;
                        ss7 = (file_data[19] == "yes") ? true : false;
                        ss8 = (file_data[20] == "yes") ? true : false;
                        ss9 = file_data[21];
                        ss10 = file_data[22];
                        ss11 = file_data[23];
                        ss12 = file_data[24];
                        ss13 = file_data[25];
                        dropped = file_data[26];
                    }
                    exportScoutingData();
                }

                alert("SUCCESS! All uploaded file(s) has/have been successfully imported to local storage.");
                

            }
            reader.onerror = function(e) {
                alert("Error reading files");
            }
        }
    }
}