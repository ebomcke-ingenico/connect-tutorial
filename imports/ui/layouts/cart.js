import {
    Template
}
from 'meteor/templating';

import {
    cart
}
from '../../api/cart.js';

import './cart.html';

Template.cart.onCreated(function () {
    var self = this;

    this.currentCheckoutStep = new ReactiveVar('SHOW_CART_DETAILS');
});

Template.cart.helpers({
    cartItems() {
            return cart.getItems();
        },
        notEmpty() {
            return cart.notEmpty();
        },
        total() {
            return cart.total();
        },
        showCartDetails() {
            return Template.instance().currentCheckoutStep.get() === 'SHOW_CART_DETAILS';
        },
});

Template.cart.events({
    'click .cart .item .button.remove' () {
        cart.removeFromCart(this);
    },
})
