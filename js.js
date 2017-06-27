$(function() {
    var beers = [
        {name:"Dragon's Milk",  brewery:"New Holland Brewing Company",  style:"Imperial Stout"},
        {name:"Oberon",         brewery:"Bell's",                       style:"Wheat"},
        {name:"El Molé Ocho",   brewery:"New Holland Brewing Company",  style:"Mole Ale"},
    ];

    var viewModel = {
        beers: ko.observableArray(beers),

        query: ko.observable(''),

        search: function(value) {
            viewModel.beers.removeAll();
            for(var x in beers) {
                if(beers[x].name.toLowerCase().indexOf(value.toLowerCase()) >= 0) {
                    viewModel.beers.push(beers[x]);
                }
            }
        }
    };

    viewModel.query.subscribe(viewModel.search);

    ko.applyBindings(viewModel);
});