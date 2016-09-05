import {
    Template
}
from 'meteor/templating';

import {
    cart
}
from '../../api/cart.js';

import './menu.html';

Template.menu.helpers({
    notEmpty() {
        return cart.notEmpty();
    },
});

Template.menu.events({
    'click .menu-button' () {
        let menu = $('.ui.stackable.menu > .right.menu');
        if (!menu.hasClass('mobile')) {
            menu.addClass('mobile');
        }
        $('.ui.stackable.menu > .right.menu').slideToggle();
    },
    'click .ui.stackable.menu > .right.menu.mobile > .item' () {
        $('.ui.stackable.menu > .right.menu').hide();
    },
});
