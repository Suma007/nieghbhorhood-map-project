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
var markers=[];
var locat=[];
var query;
var viewModel = function() {
	this.locat=ko.observableArray();
	for(var i=0;i<locations.length;i++){
		this.locat.push(locations[i].title);
		//this.locat.push(locations[i].pos);
	}
	//this.locat= ko.observableArray();
	//this.locat.push(locations);
	console.log(this.locat);
	this.query=ko.observable('');
	/*function addM(index){
		for(i=0;i<locations.length;i++){
			if(i===$index){
				marker[i].visible= true;
			}
		}
	}*/

  this.search= function(value) {
    // remove all the current beers, which removes them from the view
    viewModel.locat.removeAll();

    for(var x in locat) {
      if(locat[x].name.toLowerCase().indexOf(value.toLowerCase()) >= 0) {
        viewModel.locat.push(locat[x]);
      }
    }
  }
};

viewModel.query.subscribe(viewModel.search);



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
				visible: false
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
function addContentwiki(city) {
	// body...
	var wikiUrl = 'http://en.wikipedia.org/w/api.php?action=opensearch&search=' + city + '&format=json&callback=wikiCallback';   
    var timeout=setTimeout(function(){
        $wikiElem.text("EROORRR");
    },8000);
    $.ajax({
        url: wikiUrl,
        dataType: 'jsonp',
        success: function(response) {
            // do something with data
            var resp=response[1];
            for(var i=0;i<resp.length;i++){ 
                var sd=resp[i];
                var url="https://en.wikipedia.org/"+sd;
                console.log(url);
                $wikiElem.append('<li><a href="'+url+'">'+sd+'</a></li>');
            };
        clearTimeout(timeout);
        }
    });
}
function addPlaces(){

}
function populateInfoMarker(self,newInfo) {
	// body...
	infowindow.setContent();
	infowindow.open(map,self);
}


ko.applyBindings(new viewModel());