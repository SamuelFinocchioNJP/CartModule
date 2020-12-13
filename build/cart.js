"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// eslint-disable-next-line @typescript-eslint/no-unused-vars
class Cart {
    constructor() {
        this.items = new Map();
        this.subtotal = 0;
    }
    getAdditionsCost(additions) {
        return additions
            .map((addition) => addition.price)
            .reduce((accumulator, current) => accumulator + current);
    }
    addToCart(key, item) {
        /// If item exist already
        if (this.items.has(key)) {
            return false;
        }
        /// Adds item and it's price
        if (this.items.set(key, item)) {
            this.subtotal += item.price * item.amount;
            if (item.additions) {
                this.subtotal += this.getAdditionsCost([
                    ...item.additions.values(),
                ]);
            }
        }
        /// Returns true if item has been successfully inserted
        return this.items.has(key);
    }
    removeFromCart(key) {
        /// Retrieves item
        const item = this.items.get(key);
        /// If item did NOT exist
        if (item === undefined) {
            return false;
        }
        /// Attempts deletion
        if (this.items.delete(key)) {
            /// Scales subtotal
            this.subtotal -= item.price * item.amount;
        }
        /// Returns true if item no longer exists
        return !this.items.has(key);
    }
    checkout(cb) {
        /// Callback with a SHALLOW COPY of the cart
        cb(Object.assign({}, this.items));
        return Object.assign({}, this);
    }
    toArray() {
        return [...this.items.values()];
    }
}
