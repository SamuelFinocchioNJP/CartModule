import { PriceableItem } from '../models/priceable-item.model';

export interface ICart<T extends PriceableItem> {
	items: Map<string, T>;
	subtotal: number;

	addToCart(key: string, item: T): boolean;
	removeFromCart(key: string): boolean;
	checkout(cb: (items: Map<string, T>) => unknown): Array<T> | unknown;
	toArray(): Array<T>;
}
