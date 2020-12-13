import { ICart } from './interfaces/cart.prototype';
import { PriceableAddition } from './models/priceable-addition.model';
import { PriceableItem } from './models/priceable-item.model';

export class Cart<T extends PriceableItem<PriceableAddition>> implements ICart<T> {
	items: Array<T>;
	subtotal: number;

	constructor() {
		this.items = new Array<T>();
		this.subtotal = 0;
	}

	private getAdditionsCost(additions: Array<PriceableAddition>): number {
		return additions
			.map(
				(addition: PriceableAddition) =>
					addition.price * (addition.amount ?? 1)
			)
			.reduce(
				(accumulator: number, current: number) => accumulator + current
			);
	}

	addToCart(item: T): boolean {
		/// Adds item and it's price
		const currentItemsAmount: number = this.items.length;
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

	removeFromCart(index: number): boolean {
		/// Retrieves item
		const item: T | undefined = this.items[index];

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

	checkout(cb: (items: Array<T>, subtotal: number) => unknown): unknown {
		return cb([...this.items], this.subtotal);
	}
}
