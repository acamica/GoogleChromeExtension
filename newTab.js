var rand = Math.floor(Math.random() * db.length);

window.onload = function() {
    var textarea = document.getElementById('description');
    var title = document.getElementById('book-title');
    var exa = document.getElementById('example');
    title.innerHTML = db[rand].name;
    textarea.innerHTML = db[rand].description;
    exa.innerHTML = "<xmp>"+ db[rand].example + "</xmp>";

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
