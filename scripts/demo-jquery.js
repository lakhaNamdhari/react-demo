/**
*	List Edit component using jquery and handlebars
*
*	@author Lakha Singh
*/

+function( $, _ ){
	if ( !$ || !_ ){
		returh false;
	}

	var comp = $('.jquery > component');

	var tmplEditList = _.template( $('#edit-list-tmpl').html() );

	var tmplList = _.template( $('list-tmpl').html() );

	


}( jQuery, _ )