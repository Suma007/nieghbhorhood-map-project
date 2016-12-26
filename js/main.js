
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
            lat: 8.5028,
            lng: 76.9513
        },
        title: 'Palayam',
        place_id: 'ChIJm80qrr67BTsR4heEcbyBbE0'
    },
    {
        pos: {
            lat: 8.4909,
            lng: 76.9527
        },
        title: 'Thampanoor',
        place_id: 'ChIJ6akR5KW7BTsRYnHfM-clGtk'
    },
    {
        pos: {
            lat: 8.5086,
            lng: 76.9657
        },
        title: 'Vellayambalam',
        place_id: 'ChIJ3fyLN827BTsRstmaHAF_rBM'
    }
];

var locat = [];
var query;

var viewModel = function() {

    var self = this;
    self.locat = ko.observableArray();
    for (var i = 0; i < locations.length; i++) {
        self.locat.push(locations[i].title);
        console.log(locat[i]);
    }

    //console.log(this.locat);
    self.query = ko.observable('');

    self.listClicker = function(locationInfo) {
        google.maps.event.trigger(locationInfo.marker, 'click')
    };
    //filter the items using the filter text
    self.filteredItems = ko.computed(function() {
        //if no value has been entered, just return the observable array and set the marker to visable
        if (!self.query()) {
            // loop through locations
            self.locat().forEach(function(location) {
                // if marker poperty exists its sets the visibility to true. It won't exist on load, but it WILL exist after the page has loaded and you have typed in the filter box and then cleared it
                if (location.marker) {
                    location.marker.setVisible(true);
                }
            });
            return self.locat();
        } else {
            //the variable filter is holding the results of the user input into filter and then converting it to all lower case
            var filter = self.query().toLowerCase();
            //returns an array that contains only those items in the array that is being filtered that pass the true/false test inside the filter
            return ko.utils.arrayFilter(self.locations(), function(item) {
                var result = item.name.toLowerCase().indexOf(query);
                //If there were no matches between the filter and the list, hide the marker
                if (result < 0) {
                    item.marker.setVisible(false);
                    //If there were matches, show the marker
                } else {
                    item.marker.setVisible(true);
                }
                //Based on how indexOf works, if you have a match at all, the result must be 0 or greater becuase 0 is the lowest index number.
                //So if you have any result, it will be greater than -1 and so returns true. Otherwise it returns false
                return item.name.toLowerCase().indexOf(query) > -1;
            });
        }
    });
};
var view = new viewModel();
ko.applyBindings(view);

