///////////////////////////////////////////////////////////////////////
// DEFINITIONEN *** DEFINITIONS
// http://www.mat-o-wahl.de

// FUNKTION / FUNCTION
// * Erstellt 1-x Buttons für die Kontaktaufnahme per E-Mail oder Telefon
// * Creates 1-x buttons for contact via mail or telephone  


// 1.) Allgemeine Angaben
// General Settings
var CONTACT_ACTIVE_EMAIL = 1
var CONTACT_ACTIVE_TEL = 1

var CONTACT_BUTTON_EMAIL = "Kontakt per E-Mail"
var CONTACT_BUTTON_TEL = "Kontakt per Telefon"

var CONTACT_ADDRESS_EMAIL = "info@meine-freiwilligenagentur.de"
var CONTACT_ADDRESS_TEL = "+49123456789"

var CONTACT_SUBJECT_EMAIL = "Mitwirk-o-Mat - Ich habe Interesse an folgendem Verein: "

var CONTACT_TEXT_EMAIL = "Hallo, \n\n\nich habe gerade den Mitwirk-o-Mat ausgeführt und interessiere mich für einen bestimmten Verein. \n\nBitte ruft mich doch mal an oder schreibt mir, so dass ich den Verein besser kennen lernen kann."
var CONTACT_TEXT_TEL = ""




// 2.) In der DEFINITION.JS in den Erweiterten Einstellungen das Add-On eintragen.
// Add the add-on to the advanced settings in DEFINITION.JS
// var addons = ["extras/addon_contacts_in_results.js"]

// 3.) Fertig. 
// That's it.


///////////////////////////////////////////////////////////////////////  


// Hier kommt nur noch Quellcode. Bitte gehen Sie weiter. Hier gibt es nichts zu sehen.
// That's just source code. Please move on. Nothing to see here.


///////////////////////////////////////////////////////////////////////


// MutationObserver starten - prüft Änderungen im DOM
// https://medium.com/better-programming/js-mutationobserver-1d7aed479da2
// https://developer.mozilla.org/de/docs/Web/API/MutationObserver
function mow_addon_contact_in_results_MutationObserver() {

	// zu überwachende Zielnode (target) auswählen
	var target = document.querySelector('#resultsHeading');
	 
	// eine Instanz des Observers erzeugen und Callback-Funktion aufrufen
	var observer = new MutationObserver(mow_addon_contacts_create_content)
	 
	// Konfiguration des Observers: alles melden - Änderungen an Daten, Kindelementen und Attributen
	var config = { 
		attributes: true, 
		childList: true, 
		subtree: true };
	 
	// eigentliche Observierung starten und Zielnode und Konfiguration übergeben
	observer.observe(target, config);
	 
	// später: Observation wieder einstellen
	// observer.disconnect();
}


// Buttons in Addon-DIV in INDEX.HTML schreiben
function mow_addon_contacts_create_content() {

	// id "#resultsHeading" wird in fnStart() am Anfang geleert (empty()).
	// -> mutationObserver erkennt Änderung und aktiviert diese Funktion :(
	// -> prüfen, ob Inhalt in DIV existiert 
	resultsHeadingContent = $("#resultsHeading").text()

	if (!resultsHeadingContent) {
		// nix. Noch keine Ergebnisse im DIV
	}
	// schreibe Kontakt-Buttons
	else {

		// gehe durch Array und schreibe Inhalt
		for (j = 0; j <= (intParties-1); j++)
		{
			var partyNum=arSortParties[j];	// aus "output.js" kopiert. :)
			
			var divContent = "";
	
			// neue Bootstrap-ROW-Zeile		
			divContent += '<div class="row" id="resultsShortPartyAddonContactsInResults'+partyNum+'">'

			// wenn die Variable auf 1 / aktiv gesetzt ist, schreibe Button
			if (CONTACT_ACTIVE_EMAIL > 0 ) {	
				
				divContent += ' <div class="col">'
				divContent += '  <a href="mailto:'+CONTACT_ADDRESS_EMAIL+'?subject='+encodeURIComponent(CONTACT_SUBJECT_EMAIL)+''+encodeURIComponent(arPartyNamesLong[partyNum])+'&body='+encodeURIComponent(CONTACT_TEXT_EMAIL)+'_'+mow_addon_contacts_add_results_to_text()+'" role="button" class="btn btn-sm btn-success">'+CONTACT_BUTTON_EMAIL+'</a>'
				divContent += ' </div>'
			}

			// wenn die Variable auf 1 / aktiv gesetzt ist, schreibe Button
			if (CONTACT_ACTIVE_TEL > 0 ) {
				divContent += ' <div class="col">'
				divContent += '  <a href="tel:'+CONTACT_ADDRESS_TEL+'" role="button" class="btn btn-sm btn-success" aria-pressed="true">'+CONTACT_BUTTON_TEL+'</a>'
				divContent += ' </div>'
			}

			divContent += '</div>'
			
			// TEST TEST TEST
			/*
			divContent += '<div class="row" id="nixTest'+partyNum+'">'
				divContent += ' <div class="col"> Testzeile ohne Funktion j: '+j+' </div>'
			divContent += '</div>'
			*/

			// richtige Nummer der Partei finden und die neue ROW-Zeile dahinter einfügen    	
			var element_resultsShortParty = document.getElementById("resultsShortParty"+partyNum)		
			element_resultsShortParty.insertAdjacentHTML('afterend', divContent)
						
		} // end: for intParties

		// Klick-Funktion auf die gesamte Ergebnis-Zeile legen und am Anfang ausblenden
		mow_addon_contacts_add_click_on_row()
		

	} // end: else

}


// Klick-Funktion auf die gesamte Ergebnis-Zeile legen und am Anfang ausblenden
function mow_addon_contacts_add_click_on_row() {
	// Click-Funktion auf PARTEINAME-Zeile legen zum Anzeigen der BUTTONS 
	// kopiert / angepasst aus "output.js" - ca. Zeile 450
	
	for (let i = 0; i <= (intParties-1); i++)
	{
		// Klickfunktion - bei Überschrift
		$("#resultsShortParty"+i).click(function () { 
				$("#resultsShortPartyAddonContactsInResults"+i).toggle(500);

				// TEST TEST TEST
				// $("#nixTest"+i).toggle(500);				
			});	

		// am Anfang ausblenden
		$("#resultsShortPartyAddonContactsInResults"+i).hide(500);
		
		$("#nixTest"+i).hide(500);
	}
	
}

function mow_addon_contacts_add_results_to_text() {

		var statistics_text = "\n\n Meine Ergebnisse lauteten wie folgt: \n\n"

		for (i = 0; i <= (intParties-1); i++)
		{
			var partyNum=arSortParties[i];	// aus "output.js" kopiert. :)

			var partyNameLong = arPartyNamesLong[partyNum];
			var partyPoints = arResults[partyNum];
			
			statistics_text += "\n"+partyNameLong+": "+partyPoints+" Punkte";
			
		}
		statistics_text = encodeURIComponent(statistics_text);
		return statistics_text;

}




// Start
window.addEventListener("load", mow_addon_contact_in_results_MutationObserver)

/*
window.onload = function () {
	mow_addon_textfilter_MutationObserver() 
}
*/
