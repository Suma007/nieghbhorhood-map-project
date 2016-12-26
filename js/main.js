var map;
//var newInfo= new google.maps.InfoWindow();
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
	var self= this;
	self.locat=ko.observableArray();
	for(var i=0;i<locations.length;i++){
		self.locat.push(locations[i].title);
		//self.locat.push('pos:'+locations[i].pos);
	}
	
	//console.log(this.locat);
	self.query=ko.observable('');
	

  //filter the items using the filter text
	self.filteredItems = ko.computed(function() {
    var filter = this.locat.toLowerCase();
    if (!filter) {
        return this.locat();
    } else {
        return ko.utils.arrayFilter(this.locat(), function(locat) {
            return ko.utils.stringStartsWith(locat.title().toLowerCase(), filter);
        });
    }
}, viewModel);
};
var view= new viewModel();
view.query.subscribe(view.search);



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
				visible: true,
				url: ''
			});
			markers.push(marker);
			bound.extend(marker.position);
			var newInfo= new google.maps.InfoWindow();

			marker.addListener('click',function () {
				// body...
				console.log(this.title);
				
				populateInfoWindow(this,newInfo)
			});

		}
		map.fitBounds(bound);
		markers.forEach(function (marker) {
			// body...
			addContentwiki(marker);
		});
	}
function addContentwiki(marker) {
	// body...
	
	var wikiUrl = 'http://en.wikipedia.org/w/api.php?action=opensearch&search=' + marker.title + '&format=json&callback=wikiCallback';   
    var timeout=setTimeout(function(){
        alert("EROORRR WIKI NOT FOUND");
    },8000);
    $.ajax({
        url: wikiUrl,
        dataType: 'jsonp',
        success: function(response) {
            // do something with data
             marker.url=response[3][0];
            
                
               // marker.url="https://en.wikipedia.org/"+sd;
                //console.log(url);
                clearTimeout(timeout);
            }
        
    });
}

ko.applyBindings(new viewModel());
   var newInfo= new google.maps.InfoWindow();

function populateInfoWindow(marker, newInfo) {
		newInfo.marker=marker;
		if(marker.url!=undefined){
			var content='<div> To know more about<h2>' + marker.title + '</h2> <div> Look: <a href="' + marker.url + '">' + marker.url + '</a></div>';
			newInfo.setContent(content);
		}   
		else
			newInfo.setContent("INfo not available");
        newInfo.open(map, marker);
        map.setZoom(18);
        map.setCenter(marker.position);
}

//populating info window based on click in the ordered list item
$('#idListPlaces').click(function (e) {
    var n = $(e.target).index();
    populateInfoWindow(markers[n], largeInfowindow);
});

function googleError() {
	// body...
	alert("CANNOT LOAD MAPS");
}