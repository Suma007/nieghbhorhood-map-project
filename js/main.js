
var locations = [{
        pos: {
            lat: 8.5583,
            lng: 76.8812
        },
        title: 'Technopark',
        place_id: 'ChIJg77xrPu-BTsREXn5q5pAFtQ'

    },
    {
        pos: {
            lat: 8.4004,
            lng: 76.9787
        },
        title: 'Kovalam',
        place_id: 'ChIJZewZCgmlBTsRrGK3wFsxf7Y'
    },
    {
        pos: {
            lat: 8.4784498,
            lng: 76.911906
        },
        title: 'Shanghumugam',
        place_id: 'ChIJB_zc3oO8BTsRmJDxZTAgmcg'
    },
    {
        pos: {
            lat: 10.0889,
            lng: 77.0595
        },
        title: 'Munnar',
        place_id: 'ChIJm80qrr67BTsR4heEcbyBbE0'
    },
    {
        pos: {
            lat: 8.7379,
            lng: 76.7163
        },
        title: 'Varkala',
        place_id: 'ChIJ6akR5KW7BTsRYnHfM-clGtk'
    },
    {
        pos: {
            lat: 8.5086,
            lng: 76.9657
        },
        title: 'Vellayambalam',
        place_id: 'ChIJ3fyLN827BTsRstmaHAF_rBM'
    },
];

var locat = [];
var query;

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
    for (var i = 0; i < locations.length; i++) {
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
      map.setZoom(10);
    });
}

var viewModel = function() {

    var self = this;
    self.locat = ko.observableArray();
    for (var i = 0; i < locations.length; i++) {
        self.locat.push(locations[i]);
        console.log(self.locat()[i]);
    }

    //console.log(this.locat);
    self.query = ko.observable('');
    //From GitHub:
   
   self.listClicker = function(locations){
   	new google.maps.event.trigger(locations.marker,"click");
   }
    //filter the items using the filter text
    self.filteredItems = ko.computed(function() {
        if (!self.query()) {
            self.locat().forEach(function(locations) {
                if (locations.marker) {
                    locations.marker.setVisible(true);
                }
            });
            return self.locat();
        } else {
            var filter = self.query().toLowerCase();
            return ko.utils.arrayFilter(self.locat(), function(item) {
                var result = item.title.toLowerCase().indexOf(filter);
                if (result < 0) {
                    item.marker.setVisible(false);
                } else {
                    item.marker.setVisible(true);
                }
                return item.title.toLowerCase().indexOf(filter) > -1;
            });
        }
    });
};
var view = new viewModel();
ko.applyBindings(view);

