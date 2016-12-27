var map;

function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: {
            lat: 8.524139,
            lng: 76.936638
        },
        zoom: 15
    });
    var newInfo = new google.maps.InfoWindow();
    addmarker();
    

}
var markers = [];
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

function toggleBounce(marker) {
    //This makes sure that all markers have stopped bouncing first
    for (var i = 0; i < markers.length; i++) {
        locations[i].marker.setAnimation(null);
    };
    //If the marker is already animated, stop animation
    if (marker.getAnimation() !== null) {
        marker.setAnimation(null);
    } else {
        //Otherwise, set animation on this marker
        marker.setAnimation(google.maps.Animation.BOUNCE);
    }
}

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

function populateInfoWindow(marker, newInfo) {
    newInfo.marker = marker;
    if (marker.url != undefined) {
        var content = '<div> <h3>' + marker.title + '</h3><div> Address=' + marker.address+ '</div><div> Contact Number: ' + marker.contact+ '<div> Look: <a href="' + marker.url + '">' + marker.url + '</a></div>';         
        var streetview = '<img class="backgnd" src="http://maps.googleapis.com/maps/api/streetview?size=100x100&location=' + marker.position+ '&key=AIzaSyCOgFFaPBZrnWy1pT6plIk6ezCfAv6L0aY">';
        var add= content + streetview;
        newInfo.setContent(content);
    } else
        newInfo.setContent("INfo not available");
    newInfo.open(map, marker);
    map.setZoom(18);
    map.setCenter(marker.position);
    newInfo.addListener('closeclick', function() {
      newInfo.marker = null;
      //Makes sure the animation of the marker is stopped if the infoWindow close button is clicked
      marker.setAnimation(null);
      map.setZoom(15);
    });
}



function googleError() {
    // body...
    alert("CANNOT LOAD MAPS");
}