/**
*	List Edit component using jquery and underscore
*
*	@author Lakha Singh
*/

+function( $, _ ){
	if ( !$ || !_ ){
		return false;
	}

	// holder for list-items
	var listHolder = $('.jquery .list');

	// list-item template fn
	var tmplListItem = _.template( $('#tmpl-list-item').html() );

	// Data to be used to render list-items
	var data = JSON.parse( $('#data').html() );
	
	// holds active list element, if any
	var active;
	
	// Edit textbox
	var txtField =  $('.jquery input');

	// Add list items to DOM
	listHolder.append( tmplListItem({data: data}) );

	// Bind handler to read list-item to textField
	listHolder.on('click', 'a', function( e ){
		var link = $( e.target );

		if ( active ){
			active.removeClass('active');
		}
		link.addClass('active');
		active = link;

		txtField.val( link.text() );
		txtField.data('index', parseInt( link.attr('data-index') ) );
	});

	// Bind handler to render list-items, when edited
	txtField.on('keyup', function( e ){
		var txtFld = $( this );
		var i = txtFld.data('index');
		var value = txtFld.val();

		// modify data
		data[i] = value;

		// Re-render template with changed data
		listHolder.empty();
		listHolder.append( tmplListItem({data: data}) );
		listHolder.find('[data-index=' + i + ']' ).addClass('active');
	});

	// auto select first list-item to edit
	listHolder.find('a').first().click();
}( jQuery, _ )