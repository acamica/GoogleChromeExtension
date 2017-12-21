var rand = Math.floor(Math.random() * db.length);

window.onload = function() {
    var textarea = document.getElementById('description');
    var name = document.getElementById('name');
    var exa = document.getElementById('example');

    name.innerHTML = db[rand].name;
    if(db[rand]['description'] != ''){
        textarea.innerHTML = db[rand].description.replace(/</g, "&lt;").replace(/>/g, "&gt;");
    }
    if(db[rand]['example'].code != null){
        if(db[rand].example.image !== ""){
            exa.innerHTML+= "<h4 id=example-name>" + db[rand].example.image + "</h4>"
        }
        else{
            exa.innerHTML += "<p>" + db[rand].example.code.replace(/</g, "&lt;") + "</p>"
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
