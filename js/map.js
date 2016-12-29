var map,newInfo;
//Initialise Map
function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: {
            lat: 10.8505,
            lng: 76.2711
        },
        zoom: 10
    });
   addMarkers();
}
//Add Markers
function addMarkers() {
    var bound = new google.maps.LatLngBounds();

    for(var i=0;i<locations.length;i++) {
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
            url: ''
        });

        bound.extend(locations[i].marker.position);
        newInfo = new google.maps.InfoWindow();
        locations[i].marker.addListener('click', function() {
            // body...
            console.log(this.title);

            populateInfoWindow(this, newInfo);
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
    locations.forEach(function(locations){
        locations.marker.setAnimation(null);
    });
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

    $.ajax({
        url: wikiUrl,
        dataType: 'jsonp'
    }).done(function(response) {
        // do something with data
        if (response[3][0] === null) {
            alert("No data");
        }
        marker.url = response[3][0];
        console.log(marker.url);
        //clearTimeout(timeout);
    }).fail(function(jqXHR, textStatus) {
        alert("ERROR WIKI NOT FOUND");
    });


}

var content, streetview, add;

function populateInfoWindow(marker, newInfo) {
    newInfo.marker = marker;
    if (marker.url != undefined) {
        //Add Wiki link
        wiki = '<div><h3>' + marker.title + '<br><hr><a target= "_blank" href="' + marker.url + '">' + ' Look ' + '</a>';
        //Add Streetview
        streetview = '<img class="backgnd" src="http://maps.googleapis.com/maps/api/streetview?size=300x100&location=' + marker.title + '&key=AIzaSyDuXp8gXS7Y97AxP8lqmx_hhmruCsdxVZI">';
        add = wiki + '<div> ' + streetview + '</div>';
        newInfo.setContent(add);
        console.log(add);
        //console.log(marker.pos);
    } else{
        newInfo.setContent("Info not available");
    }
    newInfo.open(map, marker);
    map.setZoom(18);
    map.setCenter(marker.position);
    newInfo.addListener('closeclick', function() {
        newInfo.marker = null;
        //Makes sure the animation of the marker is stopped if the infoWindow close button is clicked
        marker.setAnimation(null);
        map.setZoom(8);
    });
}

//Error
function googleError() {
    // body...
    alert("CANNOT LOAD MAPS");
}