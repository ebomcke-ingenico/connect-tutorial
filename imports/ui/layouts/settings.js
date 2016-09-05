import {
    Template
}
from 'meteor/templating';

import './settings.html';

Template.settings.onCreated(function() {
    this.updateSettings = function() {
        var paymentContext = {
            totalAmount: $(this.find('#amount')).val(),
            currency: $(this.find('#currency')).dropdown('get value')[0],
            countryCode: $(this.find('#country')).dropdown('get value')[0],
            locale: $(this.find('#locale')).dropdown('get value')[0],
            isRecurring: false
        };
        Session.set('paymentContext', paymentContext);
        var msg = $(this.find('.ui.success.message'));
        msg.transition('fade down');
        Meteor.setTimeout(function() {
            msg.transition('fade down');
        }, 5000);
        var logApiCalls = $(this.find('#logApiCalls')).checkbox('is checked');
        Session.set('logApiCalls', logApiCalls);
        Meteor.call('toggleClientSideLog', logApiCalls);
        if (logApiCalls) {
            ConsoleMe.subscribe();
        } else {
            ConsoleMe.unsubscribe();
        }
    };
});

Template.settings.onRendered(function() {
    var paymentContext = Session.get('paymentContext');

    $(this.find('#amount')).val(paymentContext.totalAmount);
    $(this.find('#currency')).dropdown('set selected', paymentContext.currency);
    $(this.find('#country')).dropdown('set selected', paymentContext.countryCode);
    $(this.find('#locale')).dropdown('set selected', paymentContext.locale);
    $(this.find('.ui.checkbox')).checkbox(Session.get('logApiCalls') ? 'check' : 'uncheck');
});

Template.settings.events({
    'click .ui.button' () {
        Template.instance().updateSettings();
    },
})
