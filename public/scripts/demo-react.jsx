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

	// holder for list-items
	var comp = $('.react .component');

	var List = R.createClass({
		render: function(){
			var listItems = this.props.data.map(function (item){
				return (
					<li>
						<a href="javascript:void(0)">{item}</a>
					</li>
				);
			});

			return (
				<form>
					<input placeholder="Select Item" class="edit-box" type="text">	
					<ul class="list">
						{listItems}
					</ul>
				</form>
			);
		}
	});

	R.render(
		<List data="{data}" />,
		comp[0]
	);

}( React )
