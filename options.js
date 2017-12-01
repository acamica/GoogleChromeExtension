
function save_options() {

	var speed_dials = [];
	var url = ""; title = "";
	
	$( '.ext-setting.speed-dial > div' ).each( function( k, v ) { 
		
		url = ( $( v ).find( 'input.speed-dial-url' ) ).val();
		title = ( $( v ).find( 'input.speed-dial-title' ) ).val();
		
		if( url && title ) {
			speed_dials.push( [ url, title ] );
		}
	});
  
	chrome.storage.local.set({
		amazon: true,
		save_to: $('input[name=save-to]:checked').val(),
		update_interval: $('input[name=update-every]:checked').val(),
		top_right: $('input[name=topright]:checked').val(),
		gold_topsites: speed_dials 
	}, function() {
		//$( '.settings-saved-message' ).fadeIn();
		$( ".settings-saved-message" ).animate({
			opacity: 1
		}, 500, function() {
		  
			$( ".settings-saved-message" ).animate({
				opacity: 0
			}, 500, function() {

			});
		});
	});
  
}

function register_key() {
	
	$( '.ext-setting.no-gold i' ).hide();
	$( '.ext-setting.no-gold i.loading' ).show();
	
	var key = $( '.ext-setting.no-gold input' ).val();
	prove_gold( 0, key );
	
	return;
}

function prove_gold( last_checked, key ) {
	
	var right_now = Date.now() / 86400000;	//unix time in days
	
	if( ( right_now - last_checked ) > 7 ) {
		
		console.log('checking membership with gumroad');
			
		$.getJSON( 'https://confidencehq.org/allthebooks/100mb-1m.php?gk=' + key + '&callback=?' )

		.done( function( json ) {
			window.setTimeout( function() {
				if( json.success ) {
					$( '.ext-setting.no-gold i.status' ).hide();
					$( '.ext-setting.no-gold' ).hide();
					$( '.ext-setting.got-gold' ).show();
					
					//enable update-interval options
					$( '.ext-setting.update-interval input' ).attr( 'disabled', false );
					$('input[value=seconds]').prop("checked", true);
					
					//new Date( json.purchase.created_at ).getTime()
					
					chrome.storage.local.set({
						gold_key: key,
						gold_status: true,
						gold_lastchecked: right_now,
						update_interval: 'seconds'
					});
					
				} else {
					$( '.ext-setting.no-gold i.status' ).fadeOut();
					$( '.ext-setting.no-gold i.failure' ).show();
					
					chrome.storage.local.set({
						gold_key: '',
						gold_status: false,
						gold_lastchecked: 0
					});
				}
			}, 500 );
		})
		
		.fail( function( jqxhr, textStatus, error ) {
			var err = textStatus + ", " + error;
			console.log( "License Verify Request Failed: " + err );
			
			window.setTimeout( function() {
				$( '.ext-setting.no-gold i.status' ).fadeOut();
				$( '.ext-setting.no-gold i.failure' ).show();
			}, 1000 );
			
			chrome.storage.local.set({
				gold_key: '',
				gold_status: false,
				gold_lastchecked: 0
			});
		});
		
	} else {
		return;
	}
}

function restore_options() {
	chrome.storage.local.get( { 'gold_topsites': [], 'amazon': true, 'save_to': 'goodreads', 'update_interval': 'minutes', 'top_right':  'counter', 'gold_key': '', 'gold_status': false, gold_lastchecked: 0 }, function( items ) {
	  
		if( items.gold_status ) {
			$( '.ext-setting.got-gold' ).show();
			$( '.ext-setting.no-gold' ).hide();
			
			//enable update-interval options
			$( '.ext-setting.update-interval input' ).attr( 'disabled', false );
			
		} else {
			$( '.ext-setting.no-gold' ).show();
			$( '.ext-setting.got-gold' ).hide();
			
			//enable update-interval options
			$( '.ext-setting.update-interval input' ).attr( 'disabled', true );
		}
	  
		for( var l in items.gold_topsites ) {
			$( $( '.ext-setting.speed-dial > div' )[l] ).find( 'input.speed-dial-url' ).val( items.gold_topsites[l][0] );
			$( $( '.ext-setting.speed-dial > div' )[l] ).find( 'input.speed-dial-title' ).val( items.gold_topsites[l][1] );
		}
	  
		switch( items.save_to ) {
			case "goodreads":
				$('input[value=goodreads]').prop("checked", true);
				break;
			case "librarything":
				$('input[value=librarything]').prop("checked", true);
				break;
			case "neither":
				$('input[value=neither]').prop("checked", true);
				break;
		}
      
		switch( items.update_interval ) {
			case "seconds":
				$('input[value=seconds]').prop("checked", true);
				break;
			case "minutes":
				$('input[value=minutes]').prop("checked", true);
				break;
			case "hours":
				$('input[value=hours]').prop("checked", true);
				break;
		}
		  
		  /*switch( items.amazon ) {
			  case true:
				$('#amazon').prop("checked", true);
				break;
			  case false:
				$('#amazon').prop("checked", false);
				break;
		  }*/
		  
		  /*switch( items.top_right ) {
			  case "topsites":
				$('input[value=topsites]').prop("checked", true);
				break;
			  case "counter":
				$('input[value=counter]').prop("checked", true);
				break;
		  }*/
    
	});
}

function set_jquery_funcs() {
	$( '.ext-setting.no-gold input' ).keypress( function(e) {
		if (e.which == 13) {
			register_key();
		}
	} );
	
	return;
}

document.addEventListener('DOMContentLoaded', restore_options);
document.addEventListener('DOMContentLoaded', set_jquery_funcs );

document.getElementById('save').addEventListener('click', save_options);

document.getElementById('register').addEventListener('click', register_key);
