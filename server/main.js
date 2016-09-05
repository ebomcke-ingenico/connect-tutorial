import {
    Meteor
}
from 'meteor/meteor';

import {
    Products
}
from '../imports/api/products.js';

Meteor.startup(() => {
    Meteor.publish('products', function productsPublication() {
        return Products.find();
    });
});

Meteor.methods({
    'toggleClientSideLog': function(toggle) {
        ConsoleMe.enabled = toggle;
    },
});
