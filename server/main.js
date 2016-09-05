import {
    Meteor
}
from 'meteor/meteor';

import {
    Products
}
from '../imports/api/products.js';

import {
    connectSdkSettings
}
from '../connectSdkSettings.js';
import connectSdk from 'connect-sdk-jss2s';

Meteor.startup(() => {
    Meteor.publish('products', function productsPublication() {
        return Products.find();
    });
    connectSdk.init(connectSdkSettings);
});

Meteor.methods({
    'toggleClientSideLog': function (toggle) {
        ConsoleMe.enabled = toggle;
    },
    'createHostedCheckout': function (data) {
        console.log(data);
        var apiCall = Meteor.wrapAsync(connectSdk.hostedcheckouts.create);
        return apiCall(connectSdkSettings.merchantId, data, null);
    },
});
