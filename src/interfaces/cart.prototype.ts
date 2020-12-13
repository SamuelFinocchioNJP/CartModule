import { PriceableAddition } from '../models/priceable-addition.model';
import { PriceableItem } from '../models/priceable-item.model';

export interface ICart<T extends PriceableItem<PriceableAddition>> {
	items: Array<T>;
	subtotal: number;

	addToCart(item: T): boolean;
	removeFromCart(index: number): boolean;
	checkout(cb: (items: Array<T>, subtotal: number) => unknown): unknown;
}
