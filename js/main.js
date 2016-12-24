
var model = function (){
	location= [
		{
			pos:{lat: 8.5583,
			lng: 76.8812},
			title: 'Technopark'
		},
		{
			pos:{lat: 8.4004,
			lng: 76.9787},
			title: 'Kovalam'
		},
		{
			pos:{lat: 8.4784498,
			lng: 76.911906},
			title:'Shanghumugam'
		},
		{
			pos:{lat: 8.5028,
			lng: 76.9513},
			title: 'Palayam'
		},
		{
			pos:{lat: 8.4909,
			lng: 76.9527},
			title: 'Thampanoor'
		},
		{
			pos:{lat: 8.5086,
			lng: 76.9657},
			title: 'Vellayambalam'
		}],
	loc= ['Technopark','Palayam','Thampanoor','Vellayambalam','Kovalam','Shanghumugam']
};
var viewModel = function() {
	var self = this;
	var marker=ko.observableArray([]);
	var locations=ko.observableArray([]);
	var mo= new model();
	locations.push(mo.location);
	console.log(locations);
	var i=0;
	function addmarker() {
		// body...
		for( i=0;i<locations.length;i++){
			var pos=locations[i].pos;
			var title= locations[i].title;
		var m= new google.maps.Marker({
			position: pos,
			map: map,
			title: title,
			animation: google.maps.animation.DROP,
			id: i
		});
		marker.push(m);
	}
	}


}
ko.applyBindings(new viewModel());