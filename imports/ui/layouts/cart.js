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

    this.toggleLoading = function (toggle) {
        var dimmer = $('.ui.segment.cart-container > .ui.dimmer');
        if (toggle) {
            dimmer.addClass('active');
        } else {
            dimmer.removeClass('active');
        }
    };

    this.startMyCheckout = function () {
        this.toggleLoading(true);
        Meteor.call('createHostedCheckout', Modules.client.buildPaymentRequest({
            paymentContext: Session.get('paymentContext'),
            items: cart.getItems(),
            returnUrl: window.location.href + '?status=SUCCESS'
        }), function (error, result) {
            if (error) {
                self.toggleLoading(false);
                console.log(error);
            } else {
                window.location = 'https://payment.' + result.body.partialRedirectUrl;
            }
        });
    }
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
        return Template.instance().currentCheckoutStep.get() === 'SHOW_CART_DETAILS' &&
            FlowRouter.current().queryParams.status !== 'SUCCESS';
    },
    showPaymentSuccess() {
        return FlowRouter.current().queryParams.status === 'SUCCESS';
    },
});

Template.cart.events({
    'click .cart .item .button.remove' () {
        cart.removeFromCart(this);
    },
    'click .button.checkout-mycheckout' () {
        Template.instance().startMyCheckout();
    },
})
