//Rewrites the page with the grabber's page
document.write(`<head>
<title>Bolo's Schoology ID Grabber</title>
<style type="text/css">
/*CSS Created by MrTron @ https://mrtron.dev*/
/*Only set up for Desktops*/
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800&display=swap');
body {
    font-family: 'Poppins', sans-serif;
    color:white;
    background-color: #0F0D0F;
    
}
h4, p {
    text-align: center;
    font-size: 25px;
}
h2 {
    text-align: center;
    font-size: 30px;
    font-weight: 800;
}
button {
    margin-left: 48%;
    margin-right: 48%;
    font-size: 25px;
}
footer {
    background: #222;
    color: white;
    padding: 20px 20px;
    position:fixed;bottom:0;left:0;right:0;height:10px;
}
.copyright {
    font-weight: bold;
    color: white;
    font-size: 20px;
    position: relative;	
    top: -29px;
}
    </style>
</head>

<body>
<center>
    <img src="https://cdn.tronmc.com/img/BoliousHeart.png" style="width: 150px;">
</center>
<h2>Schoology ID Grabber</h2>
            <h4>Version 1.1.1</h4>
            <p>Subdomain: <input type="text" id="subinput"></p>
            <p>Range: <input type="number" id="rangemin"> to <input type="number" id="rangemax"></p>
            <p>Wait Time (ms): <input type="number" id="waitinput"></p>
            <br>
            <button onclick="start()">Start</button>
            <br><br>
            <button onclick="stop()">Stop</button>
    <footer>
        <p id="copyrightboi" class="copyright">&copy; 2021 BoloTech, Inc. All Rights Reserved.</p>
    </footer>
</body>`);

//Script by Bolo
//VARIABLES
var searches = 0;
var current = 0;

//Detects if the script was injected on a schoology page
if(window.location.href.indexOf("schoology") == -1){alert("You injected the script at a different origin. Make sure you're running this script on a .schoology.com site.")}
//ATTEMPS to autofill the subdomain
document.getElementById("subinput").value = window.location.href.substring(8,window.location.href.indexOf("."));

function start () {
    //Grabs values from the inputs on the page
    subdomain = document.getElementById("subinput").value;
    rangemin = document.getElementById("rangemin").value;
    rangemax = document.getElementById("rangemax").value;
    waittime = document.getElementById("waitinput").value;
    array = [];
    
    console.log(`-Params Set- \nSubdomain: ${subdomain} \nRange: ${rangemin} to ${rangemax} \nLoad Delay: ${waittime}ms`);
    current = rangemin;
    loop(); //Now comes the real stuff
}

function loop(){
    
    //Opens window with the given id
    console.log(`Testing For ${current}`);
    var schWindow = window.open(`https://${subdomain}.schoology.com/user/${current}/info`);
    
    setTimeout(() => {
        //Finds the html element that stores the name of the profile
        //Side Note: this element's class has a space in it for no reason, don't ask me why
        var rawname = schWindow.document.getElementsByClassName("page-title ")[0];
        if (rawname != null){
            var name = rawname.innerHTML;
            var schoologyID = schWindow.window.location.href.substring(32,40);
            console.log(`Name: ${name} \nSchoology ID: ${schoologyID}`);
            array.push({name: name, id: schoologyID});
        } else {
            //If the name element is missing, set it to "NONE"
            var schoologyID = schWindow.window.location.href.substring(32,40);
            console.log(`Name: NONE \nSchoology ID: ${schoologyID}`);
            array.push({name: "NONE", id: schoologyID});
        }
        searches++;
        schWindow.close();

        //If the end of the range has been reached, log that it's done. If not, run this whole function again
        if(current >= rangemax){
            console.log("Search Completed.")
        } else {
            current++;
            loop();
        }

    }, waittime);
}

//Searches the array for a given name and logs a link to it if it's found
function search(arg){
    for(var i=0; i < array.length; i++)
    {
        if(array[i].name == arg){console.log(`User Found: https://${subdomain}.schoology.com/user/${array[i].id}/info`)}
    }
}

let stop = () => {
    //This is a very bad way to do this but it works for now
    console.log("Force Stopping Script!!!!");
    current = rangemax;
}

console.log("Successfully Injected!");
