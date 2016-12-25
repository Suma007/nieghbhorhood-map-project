var map;
function initMap() {
   
   map= new google.maps.Map(document.getElementById('map'),{
    center:{lat:8.524139, lng:76.936638},
    zoom:15
   });
   var newInfo= new google.maps.InfoWindow();

   addmarker();
}
var	locations= [
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
var locat=[];
var viewModel = function() {
	this.locat=ko.observableArray();
	for(var i=0;i<locations.length;i++){
	locat.push(locations[i].title);
	 console.log(locat[i]);
	}
};

var markers=[];

function addmarker() {
	var bound= new google.maps.LatLngBounds();
	
		for( i=0;i<locations.length;i++){
			var pos=locations[i].pos;
			var title= locations[i].title;
			var marker= new google.maps.Marker({
				position: pos,
				map: map,
				title: title,
				animation: google.maps.Animation.DROP,
				id: i,
				visible: true
			});
			markers.push(marker);
			bound.extend(marker.position);
			marker.addListener('click',function () {
				// body...
				populateInfoMarker(this,newInfo);
			});

		}
		map.fitBounds(bound);
	}
function populateInfoMarker(self,newInfo) {
	// body...
	infowindow.setContent();
	infowindow.open(map,self);
}


ko.applyBindings(new viewModel());