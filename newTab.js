var rand = Math.floor(Math.random() * db.length);

window.onload = function() {
    // element description
    var textarea = document.getElementById('description');
    // element name
    var name = document.getElementById('name');
    //element example
    var exa = document.getElementById('example');

    name.innerHTML = db[rand].name;
    if(db[rand]['description'] != ''){
        textarea.innerHTML = db[rand].description.replace(/</g, "&lt;").replace(/>/g, "&gt;");
    }
    if(db[rand]['example'].code != null){
        if(db[rand].example.title !== ""){
            exa.innerHTML+= "<h4 id=example-title>" + db[rand].example.title + "</h4>"
        }
        else{
            exa.innerHTML += "<p>" + db[rand].example.code.replace(/</g, "&lt;") + "</p>"
        }
        if(db[rand].example.description !== ""){
            exa.innerHTML+= "<p id=example-description>" + db[rand].example.description + "</p>"
        }
        
        if (db[rand].example.show === "yes"){
            exa.innerHTML+="<pre id=code>"+ db[rand].example.code + "</pre>";
        }
        exa.innerHTML+="<a id=reference href="+ db[rand].reference +">Más info</a>";
    }

	//first time
	$( '#first-time .modal-footer button' ).on( 'click', function() {
		$( '#first-time' ).modal( 'hide' );
		chrome.storage.local.set( { 'first_time': false } );
	});

    $( '.pre-load' ).fadeOut( 400, function() {
        $( '.pre-load' ).remove();
        $( '.post-load' ).fadeIn();
    });
}
