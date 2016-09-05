var Cart = function () {
    var dep = new Tracker.Dependency;

    this.cart = [];

    this.addToCart = function (product) {
        if (this.cart.filter(function (item) {
                return item._id === product._id;
            }).length === 0) {
            this.cart.push(product);
            dep.changed();
        }
    };

    this.removeFromCart = function (product) {
        let index = this.cart.indexOf(product);
        if (index > -1) {
            this.cart.splice(index, 1);
            dep.changed();
        }
    };

    this.notEmpty = function () {
        dep.depend();
        return this.cart.length > 0;
    };

    this.getItems = function () {
        dep.depend();
        return this.cart;
    };

    this.total = function () {
        dep.depend();
        let total = 0.0;
        this.cart.forEach(function (item) {
            total += parseFloat(item.price);
        });
        return total.toFixed(2);
    };

    this.totalInCents = function () {
        return (this.total() * 100).toFixed(0);
    };

    this.isInCart = function(product) {
        dep.depend();
        return this.cart.filter(function (item) {
                return item._id === product._id;
            }).length === 1;
    };

    this.clear = function() {
        this.cart = [];
        dep.changed();
    };
}

export const cart = new Cart;
