/**
*	List Edit component using React
*
*	@author Lakha Singh
*/

+function( R, $ ){
	if ( !R || !$ ){
		return false;
	}

	// Data to be used to render list-items
	var data = JSON.parse( document.getElementById('data').innerHTML );

	// Holder for list-items
	var comp = $('.react .component');

	// List component
	var List = R.createClass({
		// Defines component 
		render: function(){ 
			var listItems = this.props.data.map(function ( item, i ){
				return (
					<li><a data-index={i} href="javascript:void(0)">{item}</a></li>
				);
			});

			return (
				<ul className="list">
					{listItems}
				</ul>
			);
		}
	});

	// Edit-List component
	var EditList = R.createClass({
		// Called once in component's life-cycle
		getInitialState: function(){
			return {
				active: null,
				data: this.props.data
			};
		},

		// Bind handler to read clicked list-item to textField
		hClick: function( e ){
			var link, txtField;

			if ( e.target.tagName === 'A' ){
				link = $( e.target );

				txtField = $( React.findDOMNode( this.refs.editField ) );

				if ( this.state.active ){
					this.state.active.removeClass('active');
				}
				link.addClass('active');
				this.state.active = link;

				txtField.val( link.text() );
				txtField.data('index', parseInt( link.attr('data-index') ) );
			}
		},

		// Bind handler to render list-items, when edited
		hKeyUp: function( e ){
			var txtField = $( e.target );
			var i = txtField.data('index');
			var value = txtField.val();
			var newData;

			// Mimic data changes from server
			newData = this.props.data.slice(0);
			newData[i] = value;

			// Renders new State
			this.setState({
				data: newData
			});
		},

		// Defines component 
		render: function(){ 
			return (
				<form onClick={this.hClick}>
					<input placeholder="Select fruit to Edit" className="edit-box" type="text" ref="editField" onKeyUp={this.hKeyUp} />	
					<List data={this.state.data} />
				</form>
			);
		}
	});

	// Renders VDOM to real DOM
	R.render(
		<EditList data={data} />,
		comp[0]
	);

}( React, jQuery )
