import {
    Template
}
from 'meteor/templating';

import {
    Products
}
from '../../api/products.js';

import {
    cart
}
from '../../api/cart.js';

import './store.html';

Template.store.onCreated(function() {
    var self = this;
    Meteor.subscribe('products', function() {
        self.initData();
    });

    this.initData = function() {
        var data = Products.find({});
        if (data.count() === 0) {
            products.forEach(function(product) {
                Products.insert(product);
            });
        }
    };
});

Template.store.helpers({
    products() {
        return Products.find({});
    },
});

Template.store.events({
    'click .ui.card .button.add-to-cart'(evt, instance) {
        cart.addToCart(this);
    },
    'click .ui.card .button.show-cart'(evt, instance) {
        if ($(evt.target).parents('.ui.dimmer').hasClass('visible')) {
            FlowRouter.go('/cart');
        }
    },
});

var products = [{
    link: 'integration',
    name: 'Fast & secure integration',
    description: 'Fast & secure integration',
    thumbnail: 'fast-secure-integration.png',
    price: '10.00',
    rating: 5
},{
    link: 'checkout',
    name: 'Mobile Optimized Checkout',
    description: 'Mobile Optimized Checkout',
    thumbnail: 'mobile-optimised-checkout.png',
    price: '10.00',
    rating: 5
},{
    link: 'conversion',
    name: 'Conversion Features',
    description: 'Conversion Features',
    thumbnail: 'conversion-features.png',
    price: '10.00',
    rating: 5
},{
    link: 'tools',
    name: 'Integration Support Tools',
    description: 'Integration Support Tools',
    thumbnail: 'support-tools.png',
    price: '10.00',
    rating: 5
}];
