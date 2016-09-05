import {
    Template
}
from 'meteor/templating';

import {
    cart
}
from '../../api/cart.js';

import './product.html';

Template.product.onRendered(function() {
    $('.rating').rating({});
    $('.ui.card .image').dimmer({
        on: 'hover'
    });
});


Template.product.helpers({
    isInCart() {
        return cart.isInCart(Template.instance().data);
    },
});
