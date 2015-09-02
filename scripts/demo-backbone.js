/**
*	List Edit component using Backbone
*
*	@author Lakha Singh
*/

+function( bb, $, _ ){
	if ( !$ || !_ || !bb ){
		return false;
	}

	// Data to be used to render list-items
	var data = JSON.parse( $('#bb-data').html() );

	var ListCollection = new bb.Collection( data );

	var List = bb.View.extend({
		initialize: function( opts ){
			this.template = _.template( $('#tmpl-bb-list-item').html() );
			this.listenTo( this.collection, 'update', this.render );
			this.render();
		},

		render: function(){
			this.$el.empty();
			this.$el.append( this.template( { data: this.collection.toJSON() } ) );
		}
	});

	var EditList = bb.View.extend({
		initialize: function(){
			this.render();
		},

		events: {
			'click a': 'hReadListItem',
			'keyup input': 'hEdit'
		},

		// Reads clicked list item to txtField
		hReadListItem: function(e){
			var link = $( e.target );

			var txtField = this.$el.find('input');

			if ( this.active ){
				this.active.removeClass('active');
			}
			link.addClass('active');
			this.active = link;

			txtField.val( link.text() );
			txtField.data('index', parseInt( link.attr('data-index') ) );
		},

		// Edits the selected list item
		hEdit: function(e){
			var txtFld = this.$el.find('input');
			var i = txtFld.data('index');
			var value = txtFld.val();

			// mimic data change
			data[i].item = value;
			ListCollection.set( data );
		},

		// renders the component
		render: function(){
			this.$el.append( $('#tmpl-list-edit').html() );

			// Render Child component
			if ( !this.listComp ){
				this.listComp = new List({
					el: '.backbone .list',
					collection: this.collection
				});
				this.listenTo( this.collection, 'update', this.renderActive );
			}
		},

		// adds active class to active list item after render
		renderActive: function(){
			var i = this.$el.find('input').data('index');

			this.$el.find('[data-index=' + i + ']' ).addClass('active');
		}
	});

	// init Edit-List component
	var myList = new EditList({
		el: '.backbone .component',
		collection: ListCollection
	});

}( Backbone, jQuery, _ )