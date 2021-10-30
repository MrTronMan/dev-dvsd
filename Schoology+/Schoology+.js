//Schoology+ | A Customization Plugin | Created by Bolo
//Initial Startup with default settings
//Settings Vars (Will eventually yoink values from a config file)
var custom_color = true;
var color = "#7cd1eb";

var hide_overdue = true;
var hide_assist = true;
var remove_bubble = true;

var id_tab = true;

document.title += "+";

$("ol.sgy-tabbed-navigation").append(`<li style="cursor: pointer;" onclick="settingspopup()">Schoology+</li>`);
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

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////END OF INITIAL STARTUP////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function settingspopup(){
	console.log("Settings shown");
  //The Background blur
  $("body").append(`<div id="popups-overlay" class="plus-popup" style="opacity: 0.4; width: 1920px; height: 775px;"></div>`);
  //Actual popup that i totally didn't steal from schoology yep
  $("body").append(`<div id="popups-0" class="popups-box plus-popup popups-large my-courses-item-list-popup" role="dialog" style="height: 421px; top: 49px; left: 383px;">
  <div class="popups-title">
    <div class="popups-close"><a onclick="closepopup(false)"><span class="visually-hidden">Close</span></a></div>
    <div class="title">Schoology+ Settings</div>
    <div class="clear-block"></div>
  </div>
  <div class="popups-body" tabindex="0">
    <div class="item-list">
    	
      Background Color <input type="color" id="plus-color"> <br>
      Drop Shadows <input type="checkbox" id="plus-shadow"> <br>
      ID Grabber Tab <input type="checkbox" id="plus-id-tab" checked> <br>
      Hide Overdue <input type="checkbox" id="plus-hide-overdue" checked> <br>
      Hide Assist Bubble <input type="checkbox" id="plus-hide-assist" checked> <br>
    
    </div>
    <div class="submit-buttons" onclick="closepopup(true)"><a class="cancel-btn">Save Changes</a></div>
  </div>
  <div class="popups-buttons tabindex=" 0"=""></div>
  <div class="popups-footer"></div>
`);
}

function closepopup(savechanges){
	  if(savechanges)
  {
  	console.log("Saving Changes");
    let tempcolor = document.getElementById("plus-color");
    let tempidtab = document.getElementById("plus-id-tab");
    let tempshadow = document.getElementById("plus-shadow");
    let tempoverdue = document.getElementById("plus-hide-overdue");
    let tempassist = document.getElementById("plus-hide-assist");
    
    color = tempcolor.value;
    $("style.plus-custom-style").replaceWith(`	
   <style class="plus-custom-style"> 
  		body { background: ${color}; } 
      div#main-inner { background: ${color}; }
      ol.sgy-tabbed-navigation { border-bottom: 1px solid #000000; }
  </style>
  		`);
   if(tempshadow.checked){$(".plus-custom-style").append(`.sgy-card { box-shadow: 0px 0px 20px 5px #000000; }`);}
      
    if(tempidtab.checked){$("#id-tab").show();} else {$("#id-tab").hide();}
    if(tempoverdue.checked){$("div#overdue-submissions").hide();} else {$("div#overdue-submissions").show();}
    if(tempassist.checked){$("svg.sgy-inline-icon ").hide();} else {$("svg.sgy-inline-icon ").show();}
    
    
  }
  $(".plus-popup").remove();
}

function idgrabber(){
	//Simply runs the ID Grabber Injection
	document.write(`<script src="https://bolious.com/freemod/SchoologyIDGrabber.js"></script>`);
}