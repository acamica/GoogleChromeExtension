var rand = Math.floor(Math.random() * db.length);

window.onload = function() {

    var container = document.querySelector('.main-container');

    // element description
    var textarea = document.querySelector('.description');
    // element name
    var name = document.querySelector('.name');
    //element example
    var example = document.querySelector('.example .preview');
    //link to more information
    var moreInfo = document.querySelector('.info-link');
    //code
    var code = document.querySelector('.code');

    var propertyDescription = document.querySelector('.property-description');

    var item = db[rand];

    name.innerHTML = item.name;

    if(item.description !== ''){
        textarea.innerHTML = item.description.replace(/</g, "&lt;").replace(/>/g, "&gt;");
    }

    if(item.example.code !== null) {
        
        if (item.language === 'html') {
            code.innerHTML += item.example.code.replace(/</g, "&lt;");
        }

        // Add property description (if available)
        if (item.example.title !== '') {
            propertyDescription.querySelector('.name').innerHTML = item.example.title;

            propertyDescription.querySelector('.description').innerHTML = item.example.description;
            container.classList.add('css-property');
        } else {
            container.classList.remove('css-property');
        }
        
        if (item.example.show){
            example.innerHTML += item.example.code;
        }

        moreInfo.href += item.reference;
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
