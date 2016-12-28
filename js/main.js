//Create locations variable
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
        place_id: 'ChIJbZoJTXmZBzsRDH48VeVQMgY'
    },
    {
        pos: {
            lat: 8.7379,
            lng: 76.7163
        },
        title: 'Varkala',
        place_id: 'ChIJ-yAC2SbvBTsRINBNfcZA7KM'
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


//Viewmodel
var viewModel = function() {

    var self = this;
    //Create observable array
    self.locat = ko.observableArray();
    for (var i = 0; i < locations.length; i++) {
        self.locat.push(locations[i]);
        console.log(self.locat()[i]);
    }

    //console.log(this.locat);
    self.query = ko.observable('');
    //From GitHub: Filter the array

    self.listClicker = function(locations) {
            new google.maps.event.trigger(locations.marker, "click");
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
//Apply bindings
ko.applyBindings(view);