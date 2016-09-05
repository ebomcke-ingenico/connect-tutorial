var build = function (options) {
    var request = {
        order: {
            amountOfMoney: {
                amount: parseInt(options.paymentContext.totalAmount),
                currencyCode: options.paymentContext.currency
            },
            customer: {
                billingAddress: {
                    countryCode: options.paymentContext.countryCode
                }
            },
            items: []
        }
    };
    options.items.forEach(function (item) {
        request.order.items.push({
            amountOfMoney: {
                amount: Math.round(parseFloat(item.price) * 100),
                currencyCode: 'EUR'
            },
            invoiceData: {
                description: item.name,
                nrOfItems: '1',
                pricePerItem: Math.round(parseFloat(item.price) * 100)
            }
        });
    });
    return request;
}

Modules.client.buildPaymentRequest = build;
