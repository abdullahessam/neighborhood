var viewmodel=function () {

    var self=this;
    self.locations=locations;
    self.selectedmarke = ko.observable();
    self.recenter=function (title) {
        for (var i = 0; i < markers.length; i++) {
            if (markers[i].title == title.title) {
                map.setCenter(markers[i].getPosition());
                populateInfoWindow(markers[i], largeInfowindow);
                //animate the marker
                if (markers[i].getAnimation() !== null) {
                    markers[i].setAnimation(null);
                } else {
                    markers[i].setAnimation(google.maps.Animation.BOUNCE);
                }
            }
        }
    };

};
ko.applyBindings( new viewmodel());
