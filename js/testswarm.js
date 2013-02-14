/**
 * JavaScript file for all Pages.
 *
 * @author John Resig, 2008-2011
 * @author Timo Tijhof, 2012
 * @since 0.1.0
 * @package TestSwarm
 */
jQuery(function ( $ ) {
	if ( $.fn.prettyDate ) {
		$( '.pretty' ).prettyDate();
	}

	if ( SWARM.auth ) {
		$( '.swarm-logout-link' ).on( 'click', function ( e ) {
			$( '<form>', {
				action: SWARM.conf.web.contextpath,
				method: 'POST',
				css: { display: 'none' }
			})
			.append(
				$( '<input type="hidden"/>' ).prop({ name: 'action', value: 'logout' }),
				$( '<input type="hidden"/>' ).prop({ name: 'authID', value: SWARM.auth.project.id }),
				$( '<input type="hidden"/>' ).prop({ name: 'authToken', value: SWARM.auth.sessionToken })
			)
			.appendTo( 'body' )
			.submit();

			e.preventDefault();
		});
	}

	$( '.swarm-form-join [name=item]' ).each( function () {
		var el = this;
		$( el ).on( 'input change', function () {
			if ( el.value && el.checkValidity && !el.checkValidity() && el.setCustomValidity ) {
				// Override the error message that is displayed when the field is non-empty
				// and didn't pass validation, defaults to "Did not match pattern" which is not
				// useful as the user doesn't know the pattern.
				el.setCustomValidity(
					'Names should be no longer than 128 characters.'
				);
			} else {
				el.setCustomValidity( '' );
			}
		});
		$([ el, el.form ]).on( 'blur submit', function () {
			if ( !el.value ) {
				el.value = 'anonymous';
			}
		});
	} );
});
