//Schoology+ | A Customization Plugin | Created by Bolo
//Settings Vars
var custom_color = true;
var color = "#7cd1eb";

var hide_overdue = true;
var hide_assist = true;
var remove_bubble = true;

var id_tab = true;

var version = "Alpha"

//Adds a "+" to the end of the title
document.title += "+";

$("ol.sgy-tabbed-navigation").append(`<li style="cursor: pointer;" onclick="credits()">Schoology+</li>`);
//Watermark tab list thing
if (id_tab) {
		$("ol.sgy-tabbed-navigation").append(`<li style="cursor: pointer;" id="id-tab" onclick="idgrabber()">ID Grabber</li>`);
	}

//Removes overdue and assist bubble 
if (hide_overdue){$("div#overdue-submissions").hide();}
if (hide_assist){$("svg.sgy-inline-icon ").hide();}
if (remove_bubble){$("div._pendo-launcher-badge-bottom-right_").remove();}

//Custom Colors
if(custom_color){
$("body").append(`
	<style class="plus-custom-style"> 
  		body { background: ${color}; } 
      div#main-inner { background: ${color}; }
      ol.sgy-tabbed-navigation { border-bottom: 1px solid #000000; }
      .sgy-card { box-shadow: 0px 0px 20px 5px #000000; }
  </style>
`);
}

function credits(){
	alert(`Schoology+ | ${version} | Created by Bolo`)
}


//Due to weird jsfiddle bugs, all code written after this appears as text on the page on jsfiddle.
//This doesn't affect the code on schoology, so it doesn't need to be fixed

function idgrabber(){
	//Simply runs the ID Grabber Injection
	document.write("<script src='https://bolious.com/freemod/SchoologyIDGrabber.js'></script>");
}
