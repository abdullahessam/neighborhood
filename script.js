var map = '';
var markers = [];
var largeInfowindow;
var titles = ['Park Ave Penthouse', 'Chelsea Loft', 'Union Square Open Floor Plan', 'East Village Hip Studio', 'TriBeCa Artsy Bachelor Pad', 'Chinatown Homey Space'];
function showListings() {
    var bounds = new google.maps.LatLngBounds();
    // Extend the boundaries of the map for each marker and display the marker
    for (var i = 0; i < markers.length; i++) {
        markers[i].setMap(map);
        bounds.extend(markers[i].position);
    }
    map.fitBounds(bounds);
}
// This function will loop through the listings and hide them all.
function hideListings() {
    for (var i = 0; i < markers.length; i++) {
        markers[i].setMap(null);

    }
}
var locations = ko.observableArray([{
    title: 'Park Ave Penthouse',
    location: {
        lat: 40.7713024,
        lng: -73.9632393
    }
},
    {
        title: 'Chelsea Loft',
        location: {
            lat: 40.7444883,
            lng: -73.9949465
        }
    },
    {
        title: 'Union Square Open Floor Plan',
        location: {
            lat: 40.7347062,
            lng: -73.9895759
        }
    },
    {
        title: 'East Village Hip Studio',
        location: {
            lat: 40.7281777,
            lng: -73.984377
        }
    },
    {
        title: 'TriBeCa Artsy Bachelor Pad',
        location: {
            lat: 40.7195264,
            lng: -74.0089934
        }
    },
    {
        title: 'Chinatown Homey Space',
        location: {
            lat: 40.7180628,
            lng: -73.9961237
        }
    }
]);
var viewmodel = function () {
    var self = this;
    self.makemap = function () {
        map = new google.maps.Map(document.getElementById('map'), {
            center: {
                lat: 40.7413549,
                lng: -73.9980244
            },
            zoom: 13,
            mapTypeControl: false
        });
        largeInfowindow = new google.maps.InfoWindow();
        // The following group uses the location array to create an array of markers on initialize.

        for (var i = 0; i < locations().length; i++) {
            // Get the position from the location array.
            var position = locations()[i].location;
            var title = locations()[i].title;
            //create li of markers
            /// $("#markers").append('<li onclick="recenterli(\'' + title + '\')" >' + title + ' </li>');
            // Create a marker per location, and put into markers array.
            var marker = new google.maps.Marker({
                position: position,
                title: title,
                animation: google.maps.Animation.DROP,
                id: i
            });
            // Push the marker to our array of markers.
            markers.push(marker);
            // Create an onclick event to open an infowindow at each marker.
            marker.addListener('click', Listener);
            showListings();
        }
        $('#show-listings').click(showListings);
        $('#hide-listings').click(hideListings);
    }
    self.maker = function () {
        self.locations = locations;
        self.selectedmarke = ko.observable();
        self.recenter = function (title) {
            for (var i = 0; i < markers.length; i++) {
                if (markers[i].title == title.title) {
                    map.setCenter(markers[i].getPosition());
                    populateInfoWindow(markers[i], largeInfowindow);
                    //animate the marker

                }
            }
        };
    }

    self.makemap();
    self.maker()
}
function populateInfoWindow(marker, infowindow) {
    // Check to make sure the infowindow is not already opened on this marker.
    if (infowindow.marker != marker) {
        infowindow.marker = marker;
        infowindow.setContent('<div><p id="title">' + marker.title + "</p><br>" +
            '<ul id="nytimes-articles" data-bind="">' +
            '</ul> </div>');
        infowindow.open(map, marker);
        //getnyt(marker.title);
        map.setCenter(marker.getPosition());
        //animate the marker
        //console.log(marker.getAnimation())
        if (marker.getAnimation() !== null) {
            marker.setAnimation(null);
        } else {
            marker.setAnimation(google.maps.Animation.BOUNCE);
            setTimeout(function () {
                marker.setAnimation(null);
            }, 700)
        }
        // Make sure the marker property is cleared if the infowindow is closed.
        infowindow.addListener('closeclick', function () {
            infowindow.marker = null;
        });
    }
}
var Listener = function () {
    populateInfoWindow(this, largeInfowindow);
};
$(function () {
    $("#search").autocomplete({
        source: titles
    });
});
//get maarker from autocomplete
function getmarker() {
    recenterli($('#search').val());

}
function recenterli(title) {
    for (var i = 0; i < markers.length; i++) {
        if (markers[i].title == title) {
            map.setCenter(markers[i].getPosition());
            populateInfoWindow(markers[i], largeInfowindow);
            //animate the marker
            if (markers[i].getAnimation() !== null) {
                markers[i].setAnimation(null);
            } else {
                markers[i].setAnimation(google.maps.Animation.BOUNCE);
                setTimeout(function () {
                    markers[i].setAnimation(null);
                }, 700)
            }
        }
    }
}
ko.applyBindings(new viewmodel());
