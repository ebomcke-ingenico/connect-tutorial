import {
    Template
}
from 'meteor/templating';

import '../imports/ui/layouts/mainLayout.js';
import '../imports/ui/layouts/menu.js';
import '../imports/ui/layouts/footer.js';
import '../imports/ui/layouts/store.js';
import '../imports/ui/layouts/product.js';
import '../imports/ui/layouts/cart.js';
import '../imports/ui/layouts/home.js';
import '../imports/ui/layouts/productDetails.js';
import '../imports/ui/layouts/settings.js';

import './main.html';

FlowRouter.route('/', {
    name: 'home',
    action: function () {
        BlazeLayout.render("mainLayout", {
            menu: "menu",
            content: "home",
            footer: "footer"
        });
    }
});

FlowRouter.route('/store', {
    name: 'store',
    action: function () {
        BlazeLayout.render("mainLayout", {
            menu: "menu",
            content: "store",
            footer: "footer"
        });
    }
});

FlowRouter.route('/store/:product', {
    name: 'product',
    action: function (params) {
        BlazeLayout.render("mainLayout", {
            menu: "menu",
            content: "productDetails",
            productLink: params.product,
            footer: "footer"
        });
    }
});

FlowRouter.route('/cart', {
    name: 'cart',
    action: function () {
        BlazeLayout.render("mainLayout", {
            menu: "menu",
            content: "cart",
            footer: "footer"
        });
    }
});

FlowRouter.route('/settings', {
    name: 'settings',
    action: function () {
        BlazeLayout.render("mainLayout", {
            menu: "menu",
            content: "settings",
            footer: "footer"
        });
    }
});

Retina({
    retinajs: true
});

if (!Session.get('paymentContext')) {
    Session.set('paymentContext', {
        totalAmount: 100,
        countryCode: "BE",
        locale: "en_GB",
        currency: "EUR",
        isRecurring: false
    });
}

Meteor.call('toggleClientSideLog', Session.get('logApiCalls'));
if (Session.get('logApiCalls')) {
    ConsoleMe.subscribe();
} else {
    ConsoleMe.unsubscribe();
}
