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
        exa.innerHTML = "<p>" + db[rand].example.code.replace(/</g, "&lt;") + "</p>"
        if (db[rand].example.show === "yes"){
            exa.innerHTML+="<pre id=code>"+ db[rand].example.code + "</pre>";
        }
    }

	//primera vez que se abre
	$( '#first-time .modal-footer button' ).on( 'click', function() {
		$( '#first-time' ).modal( 'hide' );
		chrome.storage.local.set( { 'first_time': false } );
	});

    $( '.pre-load' ).fadeOut( 400, function() {
        $( '.pre-load' ).remove();
        $( '.post-load' ).fadeIn();
    });
}
