"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Cart = void 0;
class Cart {
    constructor() {
        this.items = new Array();
        this.subtotal = 0;
    }
    getAdditionsCost(additions) {
        return additions
            .map((addition) => { var _a; return addition.price * ((_a = addition.amount) !== null && _a !== void 0 ? _a : 1); })
            .reduce((accumulator, current) => accumulator + current);
    }
    addToCart(item) {
        /// Adds item and it's price
        const currentItemsAmount = this.items.length;
        if (this.items.push(item) === currentItemsAmount + 1) {
            this.subtotal += item.price;
            if (item.additions) {
                this.subtotal += this.getAdditionsCost(item.additions);
            }
            /// Returns true if item has been successfully inserted
            return true;
        }
        return false;
    }
    removeFromCart(index) {
        /// Retrieves item
        const item = this.items[index];
        /// If item did NOT exist
        if (item === undefined) {
            return false;
        }
        /// Attempts deletion
        if (this.items.splice(index, 1) !== []) {
            /// Scales subtotal
            this.subtotal -= item.price;
            /// Scales additions price
            if (item.additions) {
                this.subtotal -= this.getAdditionsCost(item.additions);
            }
            return true;
        }
        return false;
    }
    checkout(cb) {
        return cb([...this.items], this.subtotal);
    }
}
exports.Cart = Cart;
