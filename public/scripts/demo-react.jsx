/**
*	List Edit component using React
*
*	@author Lakha Singh
*/

+function( R ){
	if ( !R){
		return false;
	}

	// Data to be used to render list-items
	var data = JSON.parse( $('#data').html() );

	// Holder for list-items
	var comp = $('.react .component');

	// React component
	var List = R.createClass({
		// Called once in component's life-cycle
		getInitialState: function(){
			return {
				data: this.props.data,
				active: null
			};
		},

		// Bind handler to read clicked list-item to textField
		hClick: function( e ){
			var link = $( e.target );

			var txtField = $( React.findDOMNode( this.refs.editField ) );

			if ( this.state.active ){
				this.state.active.removeClass('active');
			}
			link.addClass('active');
			this.state.active = link;

			txtField.val( link.text() );
			txtField.data('index', parseInt( link.attr('data-index') ) );
		},

		// Bind handler to render list-items, when edited
		hKeyUp: function( e ){ console.log('hi');
			var txtField = $( e.target );
			var i = txtField.data('index');
			var value = txtField.val();
			var newData;

			// Mimick data changes from server
			newData = this.props.data.slice(0);
			newData[i] = value;

			// Renders new State
			this.setState({
				data: newData
			});
		},

		// Defines component 
		render: function(){ 
			var listItems = this.state.data.map(function ( item, i ){
				return (
					<li>
						<a data-index={i} href="javascript:void(0)">{item}</a>
					</li>
				);
			});

			return (
				<form>
					<input placeholder="Select fruit to Edit" className="edit-box" type="text" ref="editField" onKeyUp={this.hKeyUp} />	
					<ul className="list" onClick={this.hClick}>
						{listItems}
					</ul>
				</form>
			);
		}
	});

	// Renders VDOM to real DOM
	R.render(
		<List data={data} />,
		comp[0]
	);

}( React )
