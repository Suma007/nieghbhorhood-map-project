var map;
//Initialise Map
function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: {
            lat: 10.8505,
            lng: 76.2711
        },
        zoom: 10
    });
    var newInfo = new google.maps.InfoWindow();
    addmarker();
    

}
//Add Markers
function addmarker() {
    var bound = new google.maps.LatLngBounds();

    for (i = 0; i < locations.length; i++) {
        var pos = locations[i].pos;
        var title = locations[i].title;
        locations[i].marker = new google.maps.Marker({
            position: pos,
            map: map,
            title: title,
            animation: google.maps.Animation.DROP,
            id: i,
            visible: true,
            draggable: true,
            url:''
        });
        
        bound.extend(locations[i].marker.position);
        var newInfo = new google.maps.InfoWindow();

        locations[i].marker.addListener('click', function() {
            // body...
            console.log(this.title);

            populateInfoWindow(this, newInfo)
        });
        locations[i].marker.addListener('click', function() {
            toggleBounce(this);
        });
         addContentwiki(locations[i].marker);

    }
    map.fitBounds(bound);
    map.setCenter(bound.getCenter());
}

//Add animation
function toggleBounce(marker) {
    for (var i = 0; i < locations.length; i++) {
        locations[i].marker.setAnimation(null);
    };
    if (marker.getAnimation() !== null) {
        marker.setAnimation(null);
    } else {
        marker.setAnimation(google.maps.Animation.BOUNCE);
    }
}

//Add Wikipedia content
function addContentwiki(marker) {
    // body...

    var wikiUrl = 'http://en.wikipedia.org/w/api.php?action=opensearch&search=' + marker.title + '&format=json&callback=wikiCallback';
    var timeout = setTimeout(function() {
        alert("EROORRR WIKI NOT FOUND");
    }, 8000);
    $.ajax({
        url: wikiUrl,
        dataType: 'jsonp',
        success: function(response) {
            // do something with data
            marker.url = response[3][0];
            console.log(marker.url);
            clearTimeout(timeout);
        }

    });
}

//var newInfo = new google.maps.InfoWindow();
var content,streetview,add;
function populateInfoWindow(marker, newInfo) {
    newInfo.marker = marker;
    if (marker.url != undefined) {
        content = '<div><h3>' + marker.title + '<br><hr><a href="' + marker.url + '">' + ' Look ' + '</a>';         
        //Add Streetview
        streetview = '<img class="backgnd" src="http://maps.googleapis.com/maps/api/streetview?size=100x100&location=' + marker.position.lat+ ',' + marker.position.lng + '&key=AIzaSyCOgFFaPBZrnWy1pT6plIk6ezCfAv6L0aY">';
        add= content +'<div> ' + streetview + '</div>';
        newInfo.setContent(add);
        console.log(add);
    } else
        newInfo.setContent("INfo not available");
    newInfo.open(map, marker);
    map.setZoom(18);
    map.setCenter(marker.position);
    newInfo.addListener('closeclick', function() {
      newInfo.marker = null;
      //Makes sure the animation of the marker is stopped if the infoWindow close button is clicked
      marker.setAnimation(null);
      map.setZoom(10);
    });
}

//Error
function googleError() {
    // body...
    alert("CANNOT LOAD MAPS");
}