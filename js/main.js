var	location= [
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
		}];

var viewModel = function() {
	var self = this;
	var locations=ko.observableArray('');
	
	for(var i=0;i<location.length;i++){
	locations.push(location[i].title);
	}
}
function addmarker() {
		for( i=0;i<location.length;i++){
			var pos=location[i].pos;
			var title= location[i].title;
			var marker= new google.maps.Marker({
				position: pos,
				map: map,
				title: title,
				animation: google.maps.animation.DROP,
				id: i
			});
			markers.push(marker);

		}
	}
var map;
function initMap() {
   
   map= new google.maps.Map(document.getElementById('map'),{
    center:{lat:8.524139, lng:76.936638},
    zoom:15
   });
   addmarker();
}
ko.applyBindings(new viewModel());