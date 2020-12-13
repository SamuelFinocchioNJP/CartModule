import { ICart } from './interfaces/cart.prototype';
import { PriceableAddition } from './models/priceable-addition.model';
import { PriceableItem } from './models/priceable-item.model';

export class Cart<T extends PriceableItem> implements ICart<T> {
	items: Map<string, T>;
	subtotal: number;

	constructor() {
		this.items = new Map<string, T>();
		this.subtotal = 0;
	}

	private getAdditionsCost(additions: Array<PriceableAddition>): number {
		return additions
			.map((addition: PriceableAddition) => addition.price)
			.reduce(
				(accumulator: number, current: number) => accumulator + current
			);
	}

	addToCart(key: string, item: T): boolean {
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

	removeFromCart(key: string): boolean {
		/// Retrieves item
		const item: T | undefined = this.items.get(key);

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

	checkout(cb: (items: Map<string, T>) => unknown): Cart<T> {
		/// Callback with a SHALLOW COPY of the cart
		cb({ ...this.items });
		return { ...this };
	}

	toArray(): Array<T> {
		return [...this.items.values()];
	}
}
