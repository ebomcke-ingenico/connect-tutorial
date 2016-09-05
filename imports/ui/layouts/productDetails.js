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

import './productDetails.html';

Template.productDetails.onRendered(function () {
    $(this.find('.ui.rating')).rating({});
});

Template.productDetails.onCreated(function () {
    var self = this;

    Meteor.subscribe('products');

    if (self.data.productLink) {
        self.filter = {
            link: self.data.productLink()
        }
    } else {
        self.filter = {};
    }

    this.product = function () {
        return Products.findOne(self.filter);
    }
});

Template.productDetails.helpers({
    product() {
            return Template.instance().product();
        },
        isInCart() {
            return cart.isInCart(Template.instance().product());
        },
});

Template.productDetails.events({
    'click .ui.button.add-to-cart' (evt, instance) {
        cart.addToCart(Template.instance().product());
    },
});

var formatCardNumber = function(cardNumber) {
    var i = 0;
    var formattedCardNumber = '';
    while (i < cardNumber.length) {
        let iEnd = (i + 4 > cardNumber.length) ? cardNumber.length + 1 : i + 4;
        formattedCardNumber += cardNumber.substring(i, iEnd) + ' ';
        i += 4;
    }
    return formattedCardNumber;
};
