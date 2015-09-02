/**
*	List Edit component using angular
*
*	@author Lakha Singh
*/

+function( A ){
	A.module( 'list', [] )
	 .controller( 'ListConroller', [
		'$scope',
		function( $scope ){
			// Data to be used to render list-items
			$scope.items = JSON.parse( document.getElementById('data').innerHTML );

			// to set active class on selected item
			$scope.setActive = function( item ){
				return $scope.editVal === item ? 'active' : '';
			}

			// copy item to be edited to txtField
			$scope.edit = function( i, item ){
				$scope.index = parseInt( i );
				$scope.editVal = item;
			}

			// set new value for edited item
			$scope.modify = function(){
				$scope.items[ $scope.index ] = $scope.editVal;
			}			
		}
	] );
}( angular )