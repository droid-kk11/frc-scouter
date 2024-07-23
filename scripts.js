function generateQRCode(){
    let location = document.getElementById("location").value;
    let first_name = document.getElementById("first").value;
    let last_name = document.getElementById("last").value;
    let team_number = document.getElementById("teamno").value;
    let match_number = document.getElementById("match").value;
    let swerve = document.getElementById("swerve").checked ? "yes" : "no";
    let defense = document.getElementById("defense").checked ? "yes" : "no";
    let offense = document.getElementById("offense").checked ? "yes" : "no";
    let score = docment.getElementById("score").value;
    let ss1 = document.getElementById("ss1").checked ? "yes" : "no";
    let ss1_label = document.getElementById("ss1-label").innerHTML;
    let ss2 = document.getElementById("ss2").checked ? "yes" : "no";
    let ss2_label = document.getElementById("ss2-label").innerHTML;
    let ss3 = document.getElementById("ss3").checked ? "yes" : "no";
    let ss3_label = document.getElementById("ss3-label").innerHTML;
    let ss4 = document.getElementById("ss4").checked ? "yes" : "no";
    let ss4_label = document.getElementById("ss4-label").innerHTML;
    let ss5 = document.getElementById("ss5").checked ? "yes" : "no";
    let ss5_label = document.getElementById("ss5-label").innerHTML;

    function addLeadingZero(num) {
        return num < 10 ? '0' + num : num;
    }
    
    let current_date = new Date();
    let datetime = current_date.getFullYear() + "-"
                    + addLeadingZero(current_date.getMonth() + 1) + "-"
                    + addLeadingZero(current_date.getDate()) + "@"
                    + addLeadingZero(current_date.getHours()) + ":"  
                    + addLeadingZero(current_date.getMinutes()) + ":" 
                    + addLeadingZero(current_date.getSeconds());

    /*let qr_output = `SCOUTING DATA:
Date: ${datetime}
Event location: ${location}
Scouter's name: ${first_name} ${last_name}
Team: ${team_number}, match ${match_number}
Swerve: ${swerve}
Defense: ${defense}
Offense: ${offense}
${ss1_label} ${ss1}
${ss2_label} ${ss2}
${ss3_label} ${ss3}
${ss4_label} ${ss4}
${ss5_label} ${ss5}
USING SCOUTING APP BY TEAM 2898`;*/
    let csv_output = `2898 SCOUTING APP
Date,Location,Scouter First,Scouter Last,Match,Team,Swerve,Defense,Offense
${datetime},${location},${first_name},${last_name},${match_number},${team_number},${swerve},${defense},${offense}
Score,${ss1_label},${ss2_label},${ss3_label},${ss4_label},${ss5_label}
${score},${ss1},${ss2},${ss3},${ss4},${ss5}
END SCOUTING DATA`

    csv_output = qr_output.replace(/\?/g, ":");

    //alert(output);
    /*const blob = new Blob([output], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);*/
    alert(csv_output);
}